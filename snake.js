
angular.module('myApp',['snakeGame']);
angular.module('snakeGame',[])
	.directive('snake',function(){
		return {
			restrict:'E',
			link:function(scope,element,attr){
				var htmlText ='';
				var idIndex = 0;
				
				for(var i=1;i<=30;i++){
					for(var j=1;j<=30;j++){
						if(j == 1 && i<=5){
							
							scope.pointStringArr = ";"+idIndex+scope.pointStringArr;
							if(i ==1){
								scope.endPoint = idIndex;
								
								}
							else if(i==5)	{
								scope.startPoint = idIndex;
								
								}
//							else
								htmlText+="<div class='block marked' id='block"+idIndex+"'></div>"; 	
						}
						else
							htmlText +="<div class='block' id='block"+idIndex+"'></div>";
					idIndex++;
					}
				}
				element.html(htmlText);
				scope.startingPointArr= scope.pointStringArr ;
				scope.createPoints();
				scope.initialStartPoint = scope.startPoint;
				scope.initialendPoint = scope.endPoint;
				scope.intervalVar = setInterval(scope.moveSnake,scope.speed[scope.level]);
				scope.createWall();
			}
			
			
			
		}
	}).controller("MyController", function($scope) {
      //  console.log($scope);
		$scope.level =0;
		$scope.speed =[200,150,100,75,60,50,40,30,20];
		$scope.difficulty = 'easy';
        $scope.pointStringArr =';';
        $scope.startingPointArr ='';
        $scope.initialStartPoint =0;
        $scope.initialendPoint =0;
		$scope.endPoint =0;
		$scope.startPoint =0;
		$scope.gameOnClickAction = 'pause';
		$scope.nextActionText = 'Pause';
		$scope.currDirection ='down';
		$scope.intervalVar =0;
		$scope.score =0;
		$scope.restart = function(){
		$('.block').removeClass("marked");
		$('.block').removeClass("pointScore");
		$(document).on('swipeup', $scope.changeDirection('top'));	
		$(document).on('swipedown', $scope.changeDirection('down'));	
		$(document).on('swiperight', $scope.changeDirection('top'));	
		$(document).on('swipeleft', $scope.changeDirection('top'));	
			var pointStr =  $scope.startingPointArr.split(";");
			for(var index=0;index<pointStr.length;index++){
				if(pointStr[index] && $('#block'+pointStr[index]))
					$('.block'+pointStr[index]).addClass("marked");
				$scope.createPoints();
				$scope.score = 0;
				$scope.level = 0;
				
			}
			
		 }
		 $scope.changeDifficultLevel = function(diff,event){
		 	if(!$(event.target).hasClass("current") )
		 	{	
			 	$('.difficultLevel label').removeClass("current");
				alert(diff);
			 	$(event.target).addClass("current");
			 	$scope.difficulty = diff;
			 	$scope.restartGame();
			 	$scope.gameOver = false;
		 	}
		 }
        $scope.createPoints = function() {
            if($('.pointScore').length == 0){
            		var pointNotColliding = false;
            		var pointVar ;
					while(!pointNotColliding){
						pointVar = Math.floor((Math.random() * 900) );
						if($scope.pointStringArr.indexOf(":"+pointVar+":") ==-1)
							pointNotColliding = true;
							
					}
					$scope.pointvar = pointVar;
					$('#block'+$scope.pointvar).addClass("pointScore")
				}
        };
         $scope.restartGame = function(){
         	clearInterval($scope.intervalVar);
            $('.block').removeClass("marked");
           
            $scope.pointStringArr = $scope.startingPointArr;
            var pointsArr = $scope.pointStringArr.split(";");

            for(var index=0;index<pointsArr.length;index++){

           		if(pointsArr[index] !=undefined && pointsArr[index] != ""){
           		   	$('#block'+pointsArr[index]).addClass("marked");
	           	}
            }
            $scope.currDirection = 'down';
	   	    $scope.endPoint = $scope.initialendPoint;
		    $scope.startPoint = $scope.initialStartPoint;
			$scope.level = 0;
			$scope.score = 0;			
			$scope.intervalVar = setInterval($scope.moveSnake,$scope.speed[$scope.level]);
        };   
        
	        
        $scope.catchKeyDown = function(event) {

            var keyCodee = event.keyCode;
            
			if(keyCodee == 37 || keyCodee == 65)
				$scope.changeDirection('left');
			else if(keyCodee == 38 || keyCodee == 87)
				$scope.changeDirection('top');	
			else if(keyCodee == 39 || keyCodee == 76)
				$scope.changeDirection('right');	
			else if(keyCodee == 40 || keyCodee == 77)
				$scope.changeDirection('down');
				
			event.preventDefault();	
        };
        
        $scope.takeAction = function(){
        	console.log($scope.pointStringArr);
        	console.log($scope.currDirection);
        	
        	if($scope.gameOnClickAction == 'pause'){
        		clearInterval($scope.intervalVar);
        		
        		$scope.gameOnClickAction = "play";
        		
        	}
        	else if($scope.gameOnClickAction == 'play'){
        		$scope.intervalVar = setInterval($scope.moveSnake,$scope.speed[$scope.level]);
        		
        		$scope.gameOnClickAction = "pause";
        	}
        	
        }
        
        $scope.changeDirection = function(dir) {
            if(dir == $scope.currDirection)	
				return false;
			if((dir == 'top' && $scope.currDirection == 'down') || (dir == 'down' && $scope.currDirection == 'top')  || (dir == 'left' && $scope.currDirection == 'right') || (dir == 'right' && $scope.currDirection == 'left') ){
				return false;
			}
			else
			{
				$scope.currDirection = dir;
				
			}
        };
        
        $scope.getStartPoint =function(dir){
        	var currDirection  = $scope.currDirection;
        	var startPoint  = $scope.startPoint;
			if(currDirection=='down'){
				if(startPoint+30 >= 900){
					if($scope.difficulty === 'easy')
						startPoint -= 870;
					else
						startPoint = -1;
				}
				else
					startPoint += 30;
			}
			else if(currDirection=='right'){
				if((startPoint+1)%30 == 0){
					if($scope.difficulty === 'easy')
						startPoint -= 29;
					else
						startPoint = -1;
							
				}
				else
					startPoint += 1;
			
			}
			else if(currDirection=='top'){
				if(startPoint-30 <= 0){
					
					if($scope.difficulty === 'easy')
						startPoint += 870;
					else
						startPoint = -1;
				}
			else
				startPoint -= 30;
			}
			else {
				if(startPoint%30 == 0){
					
					if($scope.difficulty === 'easy')
						startPoint += 29;
					else
						startPoint = -1;
				}
				else
					startPoint -= 1;
			}
			return startPoint;
		
		};
		
		$scope.moveSnake = function(){

				if($scope.gameOver){
					clearInterval($scope.intervalVar);
					//return false;
					$scope.nextActionText = 'Game Over';
					$scope.gameOnClickAction = 'Restart';					
				}
				$scope.pointStringArr = $scope.pointStringArr.replace(";"+$scope.endPoint+";","");
				$scope.pointStringArr += ";";
				$('#block'+$scope.endPoint).removeClass("marked");
				var lastPointCal = $scope.pointStringArr.split(";")
				$scope.endPoint = lastPointCal[lastPointCal.length-2];
			
				$scope.startPoint = $scope.getStartPoint($scope.currDirection);	
				if($scope.checkClash()){
					//alert("game over!!")
					$scope.nextActionText = 'Game Over';
					$scope.gameOnClickAction = 'Restart';
					$scope.gameOver = true;
					clearInterval($scope.intervalVar);
					$('#mask').show();
					return false;
					
				}
				if($scope.startPoint == $scope.pointvar)
				{
					$scope.score +=5;
					if($scope.score % 100 == 0)	
					{
						$scope.level++;
						clearInterval($scope.intervalVar);
						$scope.intervalVar = setInterval($scope.moveSnake,$scope.speed[$scope.level]);
					}	
					$scope.pointStringArr = ";"+$scope.startPoint+$scope.pointStringArr;
					$('#block'+$scope.startPoint).addClass("marked");
					$scope.startPoint = $scope.getStartPoint($scope.currDirection);
					
					if($scope.checkClash() ){
						//alert("game over!!")
						$scope.gameOver = true;
						$scope.nextActionText = 'Game Over';
						$scope.gameOnClickAction = 'Restart';
						clearInterval($scope.intervalVar);
						$('#mask').show();
						return false;
					}
					$scope.pointStringArr = ";"+$scope.startPoint+$scope.pointStringArr;
					$('#block'+$scope.startPoint).addClass("marked");
			
					$('#block'+$scope.pointvar).removeClass("pointScore");
					$scope.createPoints();
				}
				else{	
					$scope.pointStringArr = ";"+$scope.startPoint+$scope.pointStringArr;
					$('#block'+$scope.startPoint).addClass("marked");
				}	
											
 			
		} 
    	
        $scope.checkClash = function(){
        	if($scope.startPoint == -1)
        		return true;
     		var pointStringArr = $scope.pointStringArr;
			var clashIndex = pointStringArr.indexOf(";"+$scope.startPoint+";");
			if(clashIndex != -1)
				return true;
			
			if($('#block'+$scope.startPoint).hasClass("wall"))	
				return true;
			return false;	
		}
      	$scope.createWall = function(){
		var idIndex = 159;
		$('#block'+idIndex).addClass("wall");
		for(var i=0;i<11;i++){
			idIndex +=1;
			$('#block'+idIndex).addClass("wall");
		}
		
	}
       
    });