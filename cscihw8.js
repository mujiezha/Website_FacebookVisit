///for location
var lat='';
var long='';
var loc=false;
var showPosition=function(pos)
{
    lat=pos.coords.latitude;
    long=pos.coords.longitude;
    loc=true; 
};
var cantShow=function(error)
{
    loc=false;
};
       
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,cantShow);} 
else {
    loc=false;
}



var headerapp = angular.module('headerapp', []);
///for get the current location
headerapp.controller('headerCtrl', function($scope, $http,$timeout) {
    ///for initialization
        $scope.searchinput='';
      $scope.InitFavorlist=function()
      {
          $scope.favorlist=[];
          for(var i=0;i<localStorage.length;i++)
          {
            var obj =JSON.parse(localStorage.getItem(localStorage.key(i)));
            $scope.favorlist.push(obj);
          }
      };
    
      $scope.SetInactive=function(para)
      {
          $scope.usersactive="";
          $scope.pagesactive="";
          $scope.eventsactive="";
          $scope.placesactive=""; 
          $scope.groupsactive=""; 
          $scope.favoritesactive="";
          
          if($scope.tbcontent)$scope.tbcontent.type=para;
          if(para=="users"){$scope.usersactive="active";}
          if(para=="pages"){$scope.pagesactive="active";}
          if(para=="events"){$scope.eventsactive="active";}
          if(para=="places"){$scope.placesactive="active";} 
          if(para=="groups"){$scope.groupsactive="active";}
          if(para=="favor"){$scope.favoritesactive="active";}
      };
      $scope.usersactive="active";
      $scope.isClear=true;
      $scope.slideBack=false;
      $scope.tbcontent='';
      $scope.showFBbar=false;
    
      $scope.Search = function() {
       ////for initialization
        $scope.Usersarr='';
        $scope.Pagesarr='';
        $scope.Eventsarr='';
        $scope.Placesarr='';
        $scope.Groupsarr='';
        $scope.isClear=false;
        $scope.slideBack=false;
        $scope.InitFavorlist();
       
        $scope.fivejson="";
        //$scope.detailjson='';
        $scope.showdetail=false;
        $scope.showDT=false;
        $scope.showFB=false;
        if($scope.searchinput)
            $scope.showFBbar=true;
        else
            $scope.showFBbar=false;
        //$scope.noAlbum=true;
        //$scope.noPosts=true;
        $scope.showfavor=false;
        $scope.albumindex=0;
        ////end of initialization
       
        /////for search 
       $http({
           method:'GET',
           url: 'cscihw8.php',
          params: {
                    keyword:$scope.searchinput,
                    lat:lat,
                    long:long,
                    loc:loc
                  }
       }).then(function successCallback(response){
            $scope.fivejson=response.data;
            $scope.Usersarr=$scope.fivejson.userjson;
            $scope.Pagesarr=$scope.fivejson.pagejson;
            $scope.Eventsarr=$scope.fivejson.eventjson;
            $scope.Placesarr=$scope.fivejson.placejson;
            $scope.Groupsarr=$scope.fivejson.groupjson;
            $scope.showFB=true;
           
            if($scope.usersactive=="active")
                {$scope.tbcontent=$scope.Usersarr;$scope.tbcontent.type="users";}
            else if($scope.pagesactive=="active")
                {$scope.tbcontent=$scope.Pagesarr;$scope.tbcontent.type="pages";}
            else if($scope.eventsactive=="active")
                {$scope.tbcontent=$scope.Eventsarr;$scope.tbcontent.type="events";}
            else if($scope.placesactive=="active")
                {$scope.tbcontent=$scope.Placesarr;$scope.tbcontent.type="places";}
            else if($scope.groupsactive=="active")
                {$scope.tbcontent=$scope.Groupsarr;$scope.tbcontent.type="groups";}
            else if($scope.favoritesactive=="active")
                {
                    if(!$scope.tbcontent)
                        $scope.tbcontent=$scope.Usersarr;
                    $scope.tbcontent.type='favor';
                    $scope.FavoritesFunc(true);
                }
                    $scope.showFBbar=false;
           
       },function errorCallback(response){
           $scope.fivejson =response.statusText;
       });
    };
    
    $scope.Clear= function(){
        ///for Clear 
        $scope.searchinput='';
        $scope.isClear=true;
        ////for initialization
        $scope.Usersarr='';
        $scope.Pagesarr='';
        $scope.Eventsarr='';
        $scope.Placesarr='';
        $scope.Groupsarr='';
        $scope.tbcontent='';
        $scope.InitFavorlist();
       
        $scope.fivejson="";
        $scope.detailjson='';
        $scope.showdetail=false;
        $scope.showDT=false;
        $scope.showFB=false;
        //$scope.noAlbum=true;
        //$scope.noPosts=true;
        $scope.showfavor=false;
        $scope.albumindex=0;
        ////end of initialization
        
        $scope.SetInactive("users");
        $scope.slideBack=false;
    };
    

    $scope.UsersFunc=function(){
        $scope.SetInactive("users");
        $scope.slideBack=false;
        if($scope.tbcontent){
        $scope.tbcontent=$scope.Usersarr;
        $scope.tbcontent.type='users';}
        $scope.showdetail=false;
        $scope.showfavor=false;
        $scope.showFB=true;
    };
    
    $scope.PagesFunc=function(){
        $scope.SetInactive("pages");
        $scope.slideBack=false;
        if($scope.tbcontent){
        $scope.tbcontent=$scope.Pagesarr;
        $scope.tbcontent.type='pages';}
        $scope.showdetail=false;
        $scope.showfavor=false;
        $scope.showFB=true;
    };
    $scope.EventsFunc=function(){
        $scope.SetInactive("events");
        $scope.slideBack=false;
        if($scope.tbcontent){
        $scope.tbcontent=$scope.Eventsarr;
        $scope.tbcontent.type='events';}
        $scope.showdetail=false;
        $scope.showfavor=false;
        $scope.showFB=true;
    };
    $scope.PlacesFunc=function(){
        $scope.SetInactive("places");
        $scope.slideBack=false;
        if($scope.tbcontent){
        $scope.tbcontent=$scope.Placesarr;
        $scope.tbcontent.type='places';}
        $scope.showdetail=false;
        $scope.showfavor=false;
        $scope.showFB=true;
    };
    $scope.GroupsFunc=function(){
        $scope.SetInactive("groups");
        $scope.slideBack=false;
        if($scope.tbcontent){
        $scope.tbcontent=$scope.Groupsarr;
        $scope.tbcontent.type='groups';}
        $scope.showdetail=false;
        $scope.showfavor=false;
        $scope.showFB=true;
    };
    $scope.FavoritesFunc=function(showFav){
        ///a little diffrent
        if(showFav){
        $scope.SetInactive("favor");
        $scope.slideBack=false;
        $scope.showdetail=false;
        $scope.showfavor=true;
        $scope.showFB=false;
        if($scope.tbcontent){
            $scope.tbcontent.type='favor';}
        }
        $scope.favorlist=[];
        for(var i=0;i<localStorage.length;i++)
        {
            var obj =JSON.parse(localStorage.getItem(localStorage.key(i)));
            $scope.favorlist.push(obj);
        }
    };
    
    $scope.UserNext=function(nexturl){
        $scope.slideBack=false;
        $http({
            method:'GET',
            url:nexturl
        }).then(function successCallback(response){
            $scope.tbcontent=response.data;
        },function errorCallback(response){
            response.statusText;
        });
        
    };
    $scope.UserPre=function(preurl){
        $scope.slideBack=false;
        $http({
            method:'GET',
            url:preurl
        }).then(function successCallback(response){
            $scope.tbcontent=response.data;
        },function errorCallback(response){
            response.statusText;
        });
        
    };
    
    
    $scope.ChangeStar=function(favor,showFav){
        if(localStorage.getItem(favor.id))
        { 
            localStorage.removeItem(favor.id);
            $scope.FavoritesFunc(showFav);
        }
        else
        {  
           
            var tempobj={id:favor.id, name:favor.name, type:$scope.tbcontent.type, picture:favor.picture.data.url};
            var tempstr=JSON.stringify(tempobj);
            localStorage.setItem(favor.id,tempstr);
        }
    };
    
  
    
    $scope.Detailcall=function(searchitem){
        $scope.noAlbum=true;
        $scope.noPosts=true;
        $scope.showfavor=false;
        $scope.showFB=false;
        $scope.showdetail=true;
        $scope.showDT=true;
        $scope.detailitem=searchitem;
        $scope.albumindex=0;
        $http({
           method:'GET',
           url: 'cscihw8.php',
          params: {
                    detailid:searchitem.id
                  }
       }).then(function successCallback(response){
            $scope.showDT=false;
            $scope.detailjson=response.data;
            if($scope.detailjson.albums&&$scope.detailjson.albums.data && $scope.detailjson.albums.data.length) 
                $scope.noAlbum=false;
            if($scope.detailjson.posts&&$scope.detailjson.posts.data && $scope.detailjson.posts.data.length) 
                $scope.noPosts=false;           
       },function errorCallback(response){
           $scope.showDT=false;
           $scope.noAlbum=true;
           $scope.noPosts=true;
           //$scope.detailjson=[]; 
           //$scope.detailjson=[];
       });
    };
    
   
    $scope.PostFBstatus=function(detailitem){
       var picturl='';
       if(detailitem.picture.data)
           picturl=detailitem.picture.data.url;
       else
           picturl=detailitem.picture;
       FB.ui({
            app_id:'1011201082313379',
            method:'feed',
            link:window.location.href,
            picture:picturl,
            name:detailitem.name,
            caption:'FB SEARCH FROM USC CSCI571',
        },function(response){
            
            if(response &&!response.error_message)
                {alert("Posted Successfully");}
            else
                {alert("Not Posted");}
        });
   };
     
    $scope.DetailBack=function(){
        $scope.showdetail=false;
        $scope.showfavor=false;
        $scope.showFB=false;
        $scope.slideBack=true;
        if($scope.tbcontent.type=='favor')
            $scope.showfavor=true;
        else
            $scope.showFB=true;
    };
    
    
    $scope.DecideStar=function(para){
        if(localStorage.getItem(para)){
            return "true";
        }
        else{
            return "";
        }
    };
    
    $scope.CanShow=function(para)
    {
        if(para==$scope.albumindex)
            return "true";
        else
            return "";
    };
    
    $scope.ChangeShow=function(para)
    {
        if($scope.albumindex==para)
            $scope.albumindex=-1;
        else
            $scope.albumindex=para;
    };
    
    $scope.hasData=function(para)
    {
        if(para&&para.length)
            return "true";
        else
            return "";     
    }; 
    $scope.ShowPageButton=function(para)
    {
        if(para&&para.length)
            return "true";
        else
            return ""; 
    };
});

