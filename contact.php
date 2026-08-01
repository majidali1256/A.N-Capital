<?php
header('Content-Type: application/json');

/**
 * Send via GoDaddy Internal Hosting Mail Relay (relay-hosting.secureserver.net)
 * Required for GoDaddy Professional Email to bypass local cPanel mail trapping.
 */
function sendGoDaddyRelayMail($to, $subject, $bodyText, $replyToEmail) {
    $host = 'relay-hosting.secureserver.net';
    $port = 25;
    
    $socket = @fsockopen($host, $port, $errno, $errstr, 10);
    if (!$socket) {
        // Fallback to standard mail()
        $headers  = "From: contact@alliancenetworkresources.com\r\n";
        $headers .= "Reply-To: $replyToEmail\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        return @mail($to, $subject, $bodyText, $headers);
    }
    
    $read = function($sock) {
        $resp = '';
        while ($line = fgets($sock, 515)) {
            $resp .= $line;
            if (substr($line, 3, 1) == ' ') break;
        }
        return $resp;
    };

    $read($socket); // 220 banner

    fwrite($socket, "HELO " . ($_SERVER['SERVER_NAME'] ?? 'alliancenetworkresources.com') . "\r\n");
    $read($socket);

    fwrite($socket, "MAIL FROM: <contact@alliancenetworkresources.com>\r\n");
    $read($socket);

    fwrite($socket, "RCPT TO: <" . $to . ">\r\n");
    $read($socket);

    fwrite($socket, "DATA\r\n");
    $read($socket);

    $headers  = "From: A.N Resources <contact@alliancenetworkresources.com>\r\n";
    $headers .= "To: <" . $to . ">\r\n";
    $headers .= "Reply-To: <" . $replyToEmail . ">\r\n";
    $headers .= "Subject: " . $subject . "\r\n";
    $headers .= "Date: " . date("r") . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "MIME-Version: 1.0\r\n\r\n";

    fwrite($socket, $headers . $bodyText . "\r\n.\r\n");
    $read($socket);

    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "contact@alliancenetworkresources.com";
    
    // Sanitize input data (PHP 8.x compatible)
    $firstName   = isset($_POST["first_name"]) ? htmlspecialchars(strip_tags(trim($_POST["first_name"]))) : '';
    $lastName    = isset($_POST["last_name"])  ? htmlspecialchars(strip_tags(trim($_POST["last_name"])))  : '';
    $phone       = isset($_POST["phone"])      ? htmlspecialchars(strip_tags(trim($_POST["phone"])))      : '';
    $rawEmail    = isset($_POST["email"])      ? trim($_POST["email"]) : '';
    $email       = filter_var($rawEmail, FILTER_VALIDATE_EMAIL);
    $assetClass  = isset($_POST["asset_class"])? htmlspecialchars(strip_tags(trim($_POST["asset_class"]))) : 'General Investment';
    $mandateRange= isset($_POST["mandate_range"])? htmlspecialchars(strip_tags(trim($_POST["mandate_range"]))): 'N/A';
    $message     = isset($_POST["message"])    ? htmlspecialchars(strip_tags(trim($_POST["message"])))    : '';
    
    if (empty($firstName) || empty($lastName) || empty($phone) || !$email || empty($message)) {
        http_response_code(400);
        echo json_encode(["message" => "Please complete all required fields with a valid email address."]);
        exit;
    }
    
    $subject = "New Consultation";
    
    $emailContent = "New Consultation Inquiry received from A.N RESOURCES Website\n";
    $emailContent .= "========================================================\n\n";
    $emailContent .= "CLIENT DETAILS:\n";
    $emailContent .= "Name: $firstName $lastName\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= "Phone: $phone\n\n";
    
    $emailContent .= "INVESTMENT PARAMETERS:\n";
    $emailContent .= "Asset Class Interest: $assetClass\n";
    $emailContent .= "Mandate Range: $mandateRange\n\n";
    
    $emailContent .= "CONFIDENTIAL OBJECTIVES & NOTES:\n";
    $emailContent .= "$message\n\n";
    $emailContent .= "========================================================\n";
    $emailContent .= "Submitted at: " . date("F j, Y, g:i a") . " UTC\n";
    
    sendGoDaddyRelayMail($to, $subject, $emailContent, $email);
    
    http_response_code(200);
    echo json_encode(["message" => "Your secure consultation request has been transmitted successfully."]);
} else {
    http_response_code(403);
    echo json_encode(["message" => "Invalid request method."]);
}
?>
