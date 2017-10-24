<?php require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php'; ?>
<?php

    $fb = new Facebook\Facebook([
                            'app_id' => '1011201082313379',
                            'app_secret' => 'e264c699f818f589ac9fb5685c4f7603',
                            'default_graph_version' => 'v2.8',
                            'default_access_token' => 'EAAOXrplOyqMBADSJC4RfJMVhp02mhPhNZCJZA7tqMikyeXJtnF79aeeiFeoLbIAYvne7EfTSsolZAmD4NHb0pnIVOdtcwq6yHiPUukhISW8p7P91M7pzJ8DCb2s4ZAFcaFIJaMjZBShidlDAd8sAZBgjy6fC74dZBoZD',
            ]); 
    if(isset($_GET["detailid"]))
    {
        $detail=$fb->get('/'.$_GET['detailid'].'?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5){created_time,message}');
        echo  json_encode(json_decode($detail->getBody()));
    }
    else if(isset($_GET["keyword"]))
    {
    ///call all the 5 json object and return them to the browser
        $qv=$_GET["keyword"];
        $user=$fb->get('/search?q='.$qv.'&type=user&fields=id,name,picture.width(700).height(700)');
        $userjson=json_decode($user->getBody());
        
        $page=$fb->get('/search?q='.$qv.'&type=page&fields=id,name,picture.width(700).height(700)');
        $pagejson=json_decode($page->getBody());
        
        $event=$fb->get('/search?q='.$qv.'&type=event&fields=id,name,picture.width(700).height(700)');
        $eventjson=json_decode($event->getBody());
        
        if($_GET["loc"])
        {
        $placeurl="/search?q=".$qv."&type=place&center=".$_GET["lat"].",".$_GET["long"]."&fields=id,name,picture.width(700).height(700)";
        try{
            $place=$fb->get($placeurl);
            $placejson=json_decode($place->getBody());
        }
        catch(Facebook\Exceptions\FacebookAuthenticationException $e){ $placejson=(object)[]; }
        catch(Facebook\Exceptions\FacebookResponseException $e){ $placejson=(object)[]; }
        }
        else
        {
            $placejson=(object)[]; 
        }
        
        $group=$fb->get('/search?q='.$qv.'&type=group&fields=id,name,picture.width(700).height(700)');
        $groupjson=json_decode($group->getBody());
        
        $jsonobj=new stdClass();
        $jsonobj->userjson=$userjson;
        $jsonobj->pagejson=$pagejson;
        $jsonobj->eventjson=$eventjson;
        $jsonobj->placejson=$placejson;
        $jsonobj->groupjson=$groupjson;
        
        echo json_encode($jsonobj);
    }

?>