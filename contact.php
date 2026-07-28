<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recipient email address
    $to = "contact@alliancenetworkresources.com";
    
    // Sanitize input data
    $firstName = filter_var(trim($_POST["first_name"]), FILTER_SANITIZE_STRING);
    $lastName = filter_var(trim($_POST["last_name"]), FILTER_SANITIZE_STRING);
    $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $assetClass = filter_var(trim($_POST["asset_class"]), FILTER_SANITIZE_STRING);
    $mandateRange = filter_var(trim($_POST["mandate_range"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    
    // Check required fields
    if (empty($firstName) || empty($lastName) || empty($phone) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["message" => "Please complete all required fields."]);
        exit;
    }
    
    // Build the email content
    $subject = "Secure Consultation Request: $firstName $lastName";
    
    $emailContent = "New Secure Consultation Request received from A.N RESOURCES.\n\n";
    $emailContent .= "===============================================\n\n";
    $emailContent .= "CLIENT DETAILS:\n";
    $emailContent .= "Name: $firstName $lastName\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= "Phone: $phone\n\n";
    
    $emailContent .= "INVESTMENT PROFILE:\n";
    $emailContent .= "Primary Asset Class: $assetClass\n";
    $emailContent .= "Estimated Mandate: $mandateRange\n\n";
    
    $emailContent .= "CONFIDENTIAL OBJECTIVES:\n";
    $emailContent .= "$message\n\n";
    $emailContent .= "===============================================\n";
    
    // Email Headers
    $headers = "From: webmaster@alliancenetworkresources.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send Email
    if (mail($to, $subject, $emailContent, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Your secure consultation request has been transmitted successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Oops! Something went wrong and we couldn't transmit your request."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "There was a problem with your submission, please try again."]);
}
?>
