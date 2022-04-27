<?php

$post_data = json_decode(file_get_contents("php://input"),true);
if ($post_data['token'] != '') {

    $url = 'https://app.investorpo.com/apiV2/add-update-lead';
    $data = [
        "first_name" => $post_data['first_name'],
        "last_name" => $post_data['last_name'],
        "cell_phone" => $post_data['landline_phone'],
        "email" => $post_data['email'],
        "address" => $post_data['address'],
        "lead_type" => 'Seller',
        "next_action" => 'Create Lead',
    ];
    
    $headers = [
        'Content-Type: application/json',
        'Authorization: '. $post_data['token']
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
} else {
    echo "API Key is Missing";
}

