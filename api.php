<?php

$post_data = json_decode(file_get_contents("php://input"),true);
$url = 'https://hooks.zapier.com/hooks/catch/12569876/bad735h/';
$dateTime = new DateTime();
$dateTime = $dateTime->format(DateTimeInterface::ISO8601);
$data = [
    "first_name" => $post_data['first_name'],
    "last_name" => $post_data['last_name'],
    "email" => $post_data['email'],
    "cell_phone" => $post_data['cell_phone'],
    "bathrooms" => $post_data['bathrooms'],
    "bedrooms" => $post_data['bedrooms'],
    "floors" => $post_data['floors'],
    "built_year" => $post_data['built_year'],
    "area" => $post_data['area'],
    "instant_offer" => $post_data['instant_offer'],
    "property_type" => $post_data['property_type'],
    "lot_size" => $post_data['lot_size'],
    "market_value" => $post_data['market_value'],
    "mailing_address" => $post_data['mailing_address'],
    "mailing_city" => $post_data['mailing_city'],
    "mailing_state" => $post_data['mailing_state'],
    "mailing_zip" => $post_data['mailing_zip'],
    "created_at" => $dateTime,
];

$headers = [
    'Content-Type: application/json',
];

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => $headers,
));

$response = curl_exec($curl);
if (curl_errno($curl)) {
    $error_msg = curl_error($curl);
    echo $error_msg;
} else {
    print_r (json_decode($response, true));
}

curl_close($curl);

