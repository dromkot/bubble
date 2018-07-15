<?php
	if(isset($_POST['your__namber'])&&$_POST['your__namber']!=''){
		$sends = array('web.developer.den@gmail.com');
		$data=array(
			'item1'=>'Какое мероприятие планируете?',
			'item2'=>'Где планируете отмечать?',
			'item3'=>'Какое количество детей будет на празднике?',
			'item4'=>'Какое количество взрослых будет присутствовать на празднике?',
			'item5'=>'Участие взрослых на празднике',
			'item6'=>'Требуется ли вам звуковое и световое оборудование?',
			'item7'=>'Желаете заказать торт на праздник?',
			'item8'=>'Как скоро планируется праздник?',
			'your__namber'=>'Телефон',
		);
		$mess = "";
		$mess = "<table>";
		foreach ($data as $key => $title) {
			if (isset($_POST[$key])) {
				$value = (is_array($_POST[$key])) ? json_encode($_POST[$key]) : $_POST[$key];
				$mess .= "
				<tr>
				<td>{$title}</td>
				<td>{$value}</td>
				</tr>";
			}
		}
		$mess .= "<table>";
		$_POST["email"]=(isset($_POST["email"]))?$_POST["email"]:'admin@email.loc';
		$headers = "From: " . strip_tags(trim($_POST["email"])) . "\r\n";
		$headers .= "Reply-To: " . strip_tags(trim($_POST["email"])) . "\r\n";
		$headers .= "CC: " . $_SERVER['SERVER_NAME'] . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		$sub = "Новое сообщения от " . strip_tags(trim($_SERVER['SERVER_NAME']));
		foreach ($sends as $key => $to) {
			if(!mail($to, $sub, $mess, $headers)){
				echo json_encode(array(
					'error'=>"Сообщения не одправлено",
					'mail_error'=>"Ошибка на ".$to
				));
				exit();
			}
		}
		echo json_encode(array(
			'ok'=>"Сообщения одправлено"
		));

	}else{
		echo json_encode(array(
			'error'=>"Телефон не заполнен"
		));
	}
 
?>