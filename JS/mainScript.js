
		function main()
		{
			p = new Suica();
			orthographic(-10000,10000);
			lookAt([0,0,100],[0,0,0],[0,1,0]);
			background([0.85,0.8,0.8]); 	
		
			// събития за реализиране на интерактивността на картата
			p.gl.canvas.addEventListener('mousedown',mouseDown,false);
			p.gl.canvas.addEventListener('mouseup',mouseUp,false);
			p.gl.canvas.addEventListener('mousemove',mouseMove,false);
			p.gl.canvas.addEventListener('mouseleave',mouseUp,false);
			p.gl.canvas.addEventListener('dblclick',DBlclick,false);
		 
			// помощни променливи за построяване на картата
			var left=-240; 
			var top=220;
			d=16; // празното пространство около квадратите 
			size=14; // страната на квадратите 
			actualSize=size+(d-size); // помощно изчисление, което помага при реализирането на някои от функциите
			coef=153; // коефициента, чрез който пресмятаме площта на кубчетата.
								
			//червеният цвят беше много трудно решение - не намерих по-подгодяща комбинация. 
			segmentStyle = {color:[1,0,0], interactive:true};
			squareStyle = {color:[1,0,0], interactive:true};
		
			lastCubeNumber=0; // колко са страните на последната фигура
			totalCountVisited=0; // за пресмятане на общата площ
			idNumber=0; // генериране на уникални id-та за елементите, чрез който правим измерванията
			
			checkDirection=false; 
			mapLimits=[]; // границите, в които можем да местим елементите

			createMap(left,top,d,size,mapLimits); // създаване на картата 
			motionByDefault="horisontal"; // задаване на стойност по подразбиране на посоката на местене
		
		}

		var obj; // връх, който влачим
		var centersOfMap=[]; // масив от кординатите на кубчетата, съставящи картата
		var id=[]; // масив съдържащ основна информация за елемент - двата му края и връзката между тях, както и id на елемента 
		var total=[]; // масив съдържащ информация, която ни е необходима за изчисляването на площа - id и дължината на елемент
		var countSquareAtSamePosition=0;
		
		function changeMotionByDefault(motion)
		{
			if(motion=="horisontal")
			{
				motionByDefault="horisontal";
			}
			else if(motion=='vertical')
			{
				motionByDefault="vertical";
			}
		}
		
		function mouseDown(event)
		{
			x = event.clientX;
			y = event.clientY;
			obj = p.objectAtPoint(x,y);
		}
		
		function mouseUp(event)
		{		
			if(obj)
			{				
				var center=findCenter(obj.center[0],obj.center[1]);
				if(center!=null)
				{		
					obj.center[0]=center[0];
					obj.center[1]=center[1];
					
					var otherSideSquare=findOtherSideSquare(obj);
					
					pushSquares(obj,otherSideSquare,direction);					
					
					var currentCount=calculateCountVisitedSquares(obj,otherSideSquare);
					currentId=findId(obj,otherSideSquare);
					updateValue(currentId,currentCount);
					calculateArea();
				}
				
			}
			obj = undefined;
		}
		
		
		//функция, която намира броя на кубчетата (ако са от един и същ елемент едно върху друго ги броим за 1), имащи център подадения аргумент
		function findCountSquareAtThatPosition()
		{
			var countSquaresAtThatPosition=0; 
			var visited=[];
			
			for(var i=0;i<id.length;++i)
			{
			
				for(var j=0;j<id.length;++j)
				{
					if(i!=j && !visited.includes(j) && !visited.includes(i))
					{		
						
						if(JSON.stringify(id[i][0].center)==JSON.stringify(id[j][0].center) && JSON.stringify(id[i][1].center)==JSON.stringify(id[j][1].center))
						{
							visited.push(j);
							countSquaresAtThatPosition+=1;						
						}	
					}
				}
			}
			return countSquaresAtThatPosition;
		}

		
		//функция, която намира id на елемента крайщата,
		//на който са element1 и element2
		function findId(element1,element2)
		{
			for(var i=0;i<id.length;++i)
			{				
				if((id[i][0]==element1 && id[i][1]==element2) || (id[i][0]==element2 && id[i][1]==element1))
				{
					return id[i][2]; //idNumber;
				}
			}
			return null; // неуспешно
		}
		
		//функция, която намира индекса в масива id на елемента крайщата,
		//на който са element1 и element2
		function findIndex(element1,element2)
		{
			for(var i=0;i<id.length;++i)
			{
				
				if((id[i][0]==element1 && id[i][1]==element2) || (id[i][0]==element2 && id[i][1]==element1))
				{
					return i; //индекса;
				}
			}
			return null; // неуспешно
		}
		

		
		//функция, която избутва края/краищата на елемент
		// при преоразмеряването на текущия елемент
		
		// доста дълга и грозно написана функция, която реализира основна част от интерактивността и каскадността на проекта
		// опитах се да направя отделни функции за по-голяма яснота, но се обърках още повече и започнаха да ми се появяват различни грешки от недооглеждане 
		// затова реших да напиша последователно задачата, така както си я нарисувах на лист хартия
		
		// основната идея е следната:
		// ако двата края на някои елемент лежат на същата права, по която се движим, то избутваме елемента по посока на движението
 		// ако единия край на някои елемент лежи на същата права, по която се движим, то избутваме този край на елемента в посоката, в която се намира и другия му край.
		 function pushSquares(firstSideSquare,otherSideSquare,direction)
		 {
			 if(id.length>1)
				{
					for(var i=0;i<id.length;++i)
					{
						var done=false;
						if(id[i][0]!=null && id[i][1]!=null && id[i][0]!=firstSideSquare && id[i][1]!=firstSideSquare)
						{
							for(var j=0;j<2;++j)
							{						
								if(direction=='left')
								{									
									if(firstSideSquare.center[0]>=id[i][j].center[0] && firstSideSquare.center[1]==id[i][j].center[1] && otherSideSquare.center[0]<=id[i][j].center[0] )
									{
										done=true;
										if(j==0)
										{
											if(id[i][j].center[0]==id[i][1].center[0])
												{
													
													if( id[i][0].center[1]>id[i][0].center[1])
													{														
														
														id[i][0].center[1]-=actualSize;
														
													break;
														
													}	
													else if( id[i][0].center[1]<id[i][0].center[1])
													{
														id[i][0].center[1]+=actualSize;
													
													break;
													}		
												}	
										}
										else
										{
											if(id[i][j].center[0]==id[i][0].center[0])
											{
												
												if( id[i][1].center[1]>id[i][0].center[1])
												{
													id[i][1].center[1]-=actualSize;
													
												break;
												}
												else if( id[i][1].center[1]<id[i][0].center[1])
												{
													id[i][1].center[1]+=actualSize;
													
												break;
												}
											}
											
										}
										newCenter=id[i][j].center[0]-actualSize;	
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[0]=lastCorrectCenter[0];
										}
										else
										{
											id[i][j].center[0]=newCenter;
										}
												
									}
									else if(otherSideSquare.center[0]>=id[i][j].center[0] && otherSideSquare.center[1]==id[i][j].center[1]  && firstSideSquare.center[0]<=id[i][j].center[0] )
									{ 
										done=true;
										if(j==0)
										{
											if(id[i][j].center[0]==id[i][1].center[0])
											{
												
												if( id[i][0].center[1]>id[i][1].center[1])
												{
													id[i][0].center[1]-=actualSize;
													
												break;
												}	
												else if( id[i][0].center[1]<id[i][1].center[1])
												{
													id[i][0].center[1]+=actualSize;
													
												break;
												}
											}
										}
										else
										{
											if(id[i][1].center[0]==id[i][0].center[0])
											{
												
												if( id[i][1].center[1]>id[i][0].center[1])
												{
													id[i][1].center[1]-=actualSize;
													
												break;
												}	
												else if( id[i][1].center[1]<id[i][0].center[1])
												{
													id[i][1].center[1]+=actualSize;
													
												break;
												}											
											}	
										}

										
										
										newCenter=id[i][j].center[0]-actualSize;	
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[0]=lastCorrectCenter[0];
										}
										else
										{
											id[i][j].center[0]=newCenter;
										}
										
									}							
								}
								else if(direction=='right')
								{
								
									if(firstSideSquare.center[0]>=id[i][j].center[0] && firstSideSquare.center[1]==id[i][j].center[1] && otherSideSquare.center[0]<=id[i][j].center[0] )
									{
										done=true;
										if(j==0)
										{
											if(id[i][j].center[0]==id[i][1].center[0])
											{
												
												if( id[i][0].center[1]>id[i][1].center[1])
												{
													id[i][0].center[1]-=actualSize;
												break;
												}	
												else if( id[i][0].center[1]<id[i][1].center[1])
												{
													id[i][0].center[1]+=actualSize;
												break;
												}	
												
											}
										}
										else
										{
											if(id[i][1].center[0]==id[i][0].center[0])
											{
											
												
												if( id[i][1].center[1]>id[i][0].center[1])
												{
													id[i][1].center[1]-=actualSize;
												break;
												}
												else if( id[i][1].center[1]<id[i][0].center[1])
												{
													id[i][1].center[1]+=actualSize;
												break;
												}													
											}
											
										}
										newCenter=id[i][j].center[0]+actualSize;
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[0]=lastCorrectCenter[0];
										}
										else
										{
											id[i][j].center[0]=newCenter;
										}
									}
									else if(otherSideSquare.center[0]>=id[i][j].center[0] && otherSideSquare.center[1]==id[i][j].center[1]  && firstSideSquare.center[0]<=id[i][j].center[0] )
									{
										done=true;
										if(j==0)
										{										
											if(id[i][j].center[0]==id[i][1].center[0])
											{
												
												if( id[i][0].center[1]>id[i][1].center[1])
												{
													id[i][0].center[1]-=actualSize;
												break;
												}	
												else if( id[i][0].center[1]<id[i][1].center[1])
												{
													id[i][0].center[1]+=actualSize;
												break;
												}	
											}
										}
										else
										{
											if(id[i][1].center[0]==id[i][0].center[0])
											{
												
												if( id[i][1].center[1]>id[i][0].center[1])
												{
													id[i][1].center[1]-=actualSize;
												break;
												}	
												else if( id[i][1].center[1]<id[i][0].center[1])
												{
													id[i][1].center[1]+=actualSize;
												break;
												}				
											}										
										}
										newCenter=id[i][j].center[0]+actualSize;
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[0]=lastCorrectCenter[0];
										}
										else
										{
											id[i][j].center[0]=newCenter;
										}										
									}
								}
								
								else if(direction=='top')
								{
									if(firstSideSquare.center[1]>=id[i][j].center[1] && firstSideSquare.center[0]==id[i][j].center[0] && otherSideSquare.center[1]<=id[i][j].center[1] )
									{
										done=true;
										if(j==0)
										{
											if(id[i][0].center[1]==id[i][1].center[1])
											{	
													
													if( id[i][1].center[0]>id[i][0].center[0])
													{
													
														id[i][0].center[0]+=actualSize;
													break;
														
													}	
													else if( id[i][1].center[0]<id[i][0].center[0])
													{
											
														id[i][0].center[0]-=actualSize;
													break;
													}		
											}				
										}
										else
										{
											//ако съвпадат по y-кординатите им
											if(id[i][1].center[1]==id[i][0].center[1])
											{
												
												if( id[i][1].center[0]>id[i][0].center[0])
												{
													id[i][1].center[0]-=actualSize;												
													break;
												}
												else if( id[i][1].center[0]<id[i][0].center[0])
												{
													id[i][1].center[0]+=actualSize;
													break;
												}
											}										
										}							
										newCenter=id[i][j].center[1]+actualSize;
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[1]=lastCorrectCenter[1];
										}
										else
										{
											id[i][j].center[1]=newCenter;
										}
									}
									else if(otherSideSquare.center[1]>=id[i][j].center[1] && otherSideSquare.center[0]==id[i][j].center[0]  && firstSideSquare.center[1]<=id[i][j].center[1] )
									{
										done=true;
										if(j==0)
										{
											if(id[i][j].center[1]==id[i][1].center[1])
											{
												
												if( id[i][0].center[0]>id[i][1].center[0])
												{
													id[i][0].center[0]-=actualSize;
													break;
												}	
												else if( id[i][0].center[0]<id[i][1].center[0])
												{
													id[i][0].center[0]+=actualSize;
													break;
												}
											}
										}
										else
										{
											if(id[i][1].center[1]==id[i][0].center[1])
											{
												
												if( id[i][1].center[0]>id[i][0].center[0])
												{
													id[i][1].center[0]-=actualSize;													
													break;
												}	
												else if( id[i][1].center[0]<id[i][0].center[0])
												{												
													id[i][1].center[0]+=actualSize;
													break;
												}											
											}	
										}
										newCenter=id[i][j].center[1]+actualSize;
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[1]=lastCorrectCenter[1];
										}
										else
										{
											id[i][j].center[1]=newCenter;
										}
									}
								
									
								}
								else if(direction=='down')
								{
									
									if(firstSideSquare.center[1]>=id[i][j].center[1] && firstSideSquare.center[0]==id[i][j].center[0] && otherSideSquare.center[1]<=id[i][j].center[1] )
									{
										done=true;
										if(j==0)
										{
											if(id[i][0].center[1]==id[i][1].center[1])
											{
													
													if( id[i][1].center[0]>id[i][0].center[0])
													{
												
														id[i][0].center[0]+=actualSize;
														break;
														
													}	
													else if( id[i][1].center[0]<id[i][0].center[0])
													{
													
														id[i][0].center[0]-=actualSize;
														break;
													}		
											}				
										}
										else
										{
											//ако съвпадат по y-кординатите им
											if(id[i][1].center[1]==id[i][0].center[1])
											{
												
												if( id[i][1].center[0]>id[i][0].center[0])
												{
													id[i][1].center[0]-=actualSize;
													break;
												}
												else if( id[i][1].center[0]<id[i][0].center[0])
												{
												
													id[i][1].center[0]+=actualSize;	
													break;
												}
											}										
										}
										newCenter=id[i][j].center[1]-actualSize;
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[1]=lastCorrectCenter[1];
										}
										else
										{
											id[i][j].center[1]=newCenter;
										}
									}
									else if(otherSideSquare.center[1]>=id[i][j].center[1] && otherSideSquare.center[0]==id[i][j].center[0]  && firstSideSquare.center[1]<=id[i][j].center[1] )
									{
										done=true;
										if(j==0)
										{
											if(id[i][j].center[1]==id[i][1].center[1])
											{
												
												if( id[i][0].center[0]>id[i][1].center[0])
												{
													id[i][0].center[0]-=actualSize;
													break;
												}	
												else if( id[i][0].center[0]<id[i][1].center[0])
												{
													id[i][0].center[0]+=actualSize;
													break;
												}
											}
										}
										else
										{
											if(id[i][1].center[1]==id[i][0].center[1])
											{
												
												if( id[i][1].center[0]>id[i][0].center[0])
												{
													id[i][1].center[0]-=actualSize;
													break;
												}	
												else if( id[i][1].center[0]<id[i][0].center[0])
												{
												
													id[i][1].center[0]+=actualSize;
													break;
												}											
											}	
										}
										newCenter=id[i][j].center[1]-actualSize;
										if(!mapLimits.includes(JSON.stringify(id[i][j].center)))
										{
												id[i][j].center[1]=lastCorrectCenter[1];
										}
										else
										{
											id[i][j].center[1]=newCenter;
										}
									}
									
								}
							}
							if(done)
							{
								calculateCountVisitedSquares(id[i][0],id[i][1]);
								currentId=findId(id[i][0],id[i][1]);
								updateValue(currentId,currentCountSquares);
								break;
							}		
						}
						
					}
				}
		 }
		
		
		
		//функция, която служи за разделянето на даден елемент на два отделни елемента,
		// които не лежат на правата определена от центровете на двата края на текущия елемент
		function partition(firstSideSquare,otherSideSquare)
		{
			if(id.length>1)
			{
				for(var i=0;i<id.length;++i)
				{
					if(id[i][0]!=null && id[i][1]!=null && id[i][0]!=firstSideSquare && id[i][1]!=firstSideSquare && haveIntersectionPoint(id[i][0],id[i][1],firstSideSquare,otherSideSquare))
					{	
						var horisontal; // булева променлива определяща какво ще бъде
										// отрязването на елемента, с който се пресичат
								if(firstSideSquare.center[0]==otherSideSquare.center[0] && firstSideSquare.center[1]!=otherSideSquare.center[1])
								{
									horisontal=true;
								}
								else if(firstSideSquare.center[1]==otherSideSquare.center[1] &&
										firstSideSquare.center[0]!=otherSideSquare.center[0])
								{
									horisontal=false;
								}
								
								var oldLink=findLinkBetweenTwoSquares(id[i][2]);
								var fromFirst=oldLink.from;
								if(horisontal)
								{
									
									var leftOld; // елемента, намиращ се по-наляво от двата края
									var rightOld; // елемента, намиращ се по-надясно от двата края
									
									if(id[i][0].center[0]<id[i][1].center[0])
									{
										leftOld=id[i][0];
										rightOld=id[i][1];
									}
									else
									{
										leftOld=id[i][1];
										rightOld=id[i][0];
									}

									if(fromFirst==leftOld.center)
									{
										var toNewSquare=cube([firstSideSquare.center[0]-actualSize,leftOld.center[1],size],size).custom(squareStyle);
										oldLink.to=toNewSquare.center;
										updateOtherSideSquare(leftOld,toNewSquare);
										var currentCount=calculateCountVisitedSquares(leftOld,toNewSquare);
										updateValue(id[i][2],currentCount);
										var fromNewSquare=cube([firstSideSquare.center[0]+actualSize,leftOld.center[1],size],size).custom(squareStyle);
										var newLink=segment(fromNewSquare.center,rightOld.center).custom(segmentStyle);
										idNumber++;
										id.push([fromNewSquare,rightOld,idNumber,newLink]);
										currentCount=calculateCountVisitedSquares(fromNewSquare,rightOld);
										total.push([idNumber,currentCount]);
																
									}
									else if(fromFirst==rightOld.center)
									{
										var toNewSquare=cube([firstSideSquare.center[0]+actualSize,rightOld.center[1],size],size).custom(squareStyle);
										oldLink.to=toNewSquare.center;
										updateOtherSideSquare(rightOld,toNewSquare);
										var currentCount=calculateCountVisitedSquares(rightOld,toNewSquare);
										updateValue(id[i][2],currentCount);
										var fromNewSquare=cube([firstSideSquare.center[0]-actualSize,rightOld.center[1],size],size).custom(squareStyle);
										var newLink=segment(fromNewSquare.center,leftOld.center).custom(segmentStyle);
										idNumber++;
										id.push([fromNewSquare,leftOld,idNumber,newLink]);
										var currentCount=calculateCountVisitedSquares(fromNewSquare,leftOld);
										total.push([idNumber,currentCount]);
									
									}
									
								
								}
								else //вертикално
								{
									var fromFirst=oldLink.from;
								
									var topOld; // елемента, намиращ се по-нагоре от двата края
									var bottomOld; // елемента, намиращ се по-надолу от двата края
									
									if(id[i][0].center[1]<id[i][1].center[1])
									{
										topOld=id[i][1];
										bottomOld=id[i][0];
									}
									else 
									{
										topOld=id[i][0];
										bottomOld=id[i][1];
									}
									
									if(fromFirst==bottomOld.center)
									{
										var toNewSquare=cube([bottomOld.center[0],firstSideSquare.center[1]-actualSize,size],size).custom(squareStyle);
										oldLink.to=toNewSquare.center;
										updateOtherSideSquare(bottomOld,toNewSquare);
										var currentCount=calculateCountVisitedSquares(bottomOld,toNewSquare);
										updateValue(id[i][2],currentCount);
										
										var fromNewSquare=cube([bottomOld.center[0],firstSideSquare.center[1]+actualSize,size],size).custom(squareStyle);
										var newLink=segment(fromNewSquare.center,topOld.center).custom(segmentStyle);
										idNumber++;
										id.push([fromNewSquare,topOld,idNumber,newLink]);
										var currentCount=calculateCountVisitedSquares(fromNewSquare,topOld);
										total.push([idNumber,currentCount]);
									
									}
									else if(fromFirst==topOld.center)
									{
										var toNewSquare=cube([topOld.center[0],firstSideSquare.center[1]+actualSize,size],size).custom(squareStyle);
										oldLink.to=toNewSquare.center;
										updateOtherSideSquare(topOld,toNewSquare);
										var currentCount=calculateCountVisitedSquares(topOld,toNewSquare);
										updateValue(id[i][2],currentCount);
										var fromNewSquare=cube([topOld.center[0],firstSideSquare.center[1]-actualSize,size],size).custom(squareStyle);
										var newLink=segment(fromNewSquare.center,bottomOld.center).custom(segmentStyle);
										idNumber++;
										id.push([fromNewSquare,bottomOld,idNumber,newLink]);
										var currentCount=calculateCountVisitedSquares(fromNewSquare,bottomOld);
										total.push([idNumber,currentCount]);
										
									}
								}
								break;		
							}
						}
					
					}
			}
		
		
		//Функция, която по дадено квадратче намира неговото другарче-
		//другия край на елемента
		function findOtherSideSquare(element)
		{
			for(var i=0;i<id.length;++i)
			{
				if(id[i][0]==element)
					return id[i][1];
				else if(id[i][1]==element)
					return id[i][0];
			}
			return null; // неуспешно
		}

		//Функция, която по дадено id на елемент намира 
		// съединението между двата края
		function findLinkBetweenTwoSquares(idN)
		{
			for(var i=0;i<id.length;++i)
			{
				if(id[i][2]==idN)
				{	
					return id[i][3];
				}
			}
			return null; // неуспешно
		}

		function isExistsThisId(idN)
		{
			for(var i=0;i<total.length;++i)
			{
				if(total[i][0]==idN)
					return true; // съществува
			}
			return false; // не съществува
		}
		
		//функция, която променя другия на елемента,
		//който е подаден като аргумент
		
		function updateOtherSideSquare(firstSide,newOtherSide)
		{
			for(var i=0;i<id.length;++i)
			{
				if(id[i][0]==firstSide)
				{
					id[i][1]=newOtherSide;
					return true; // успешна промяна
				}	
				else if(id[i][1]==firstSide)
				{
					id[i][0]=newOtherSide;
					return true; // успешна промяна
				}
			}
			return false; // неуспешна промяна
		}
		
		//функция, която променя стойността на текущия брой квадратчета
		//за съответното id-подадено като аргумент
		function updateValue(idN,newValue)
		{
			for(var i=0;i<total.length;++i)
			{
				if(total[i][0]==idN)
				{
					total[i][1]=newValue
					return true; // успешно сменена стойност
				}
			}
			return false; // неуспешно сменена стойност
		}
		
		function findCenter(currentX,currentY)
		{
			for(var i=0;i<centersOfMap.length;++i)
			{
				if(Math.abs(centersOfMap[i][0]-currentX)<actualSize && Math.abs(centersOfMap[i][1]-currentY)<actualSize)
				{
					return [centersOfMap[i][0],centersOfMap[i][1],0]; // връща центрираните стойности
				} 
			}
			return null; // неуспешно
		}
		

		//функция, която проверява дали два елемента имат пресечна точка
		//като елементите се определят от крайните им точки
		var epsilon = 0.0000001;
		function between(a, b, c) 
		{
			return a-epsilon <= b && b <= c+epsilon;
		}
		function segment_intersection(x1,y1,x2,y2, x3,y3,x4,y4) 
		{
			var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
					((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
			var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
					((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
			if (isNaN(x)||isNaN(y)) 
			{
				return false;
			} else 
			{
				if (x1>=x2) 
				{
					if (!between(x2, x, x1)) 
					{
						return false;
					}
				} 
				else 
				{
					if (!between(x1, x, x2)) 
					{
						return false;
					}
				}
				if (y1>=y2) 
				{
					if (!between(y2, y, y1)) 
					{
						return false;
					}
				} 
				else 
				{
					if (!between(y1, y, y2))
					{
						return false;
					}
				}
				if (x3>=x4) 
				{
					if (!between(x4, x, x3)) 
					{
						return false;
					}
				} 
				else 
				{
					if (!between(x3, x, x4)) 
					{
						return false;
					}
				}
				if (y3>=y4) 
				{
					if (!between(y4, y, y3))
					{
						return false;
					}
				}
				else 
				{
					if (!between(y3, y, y4))
					{
						return false;
					}
				}
			}
			return [x,y];
		}
		
		function haveIntersectionPoint(element1FirstSide,element1SecondSide,element2FirstSide,element2SecondSide)
		{
			var element1Height=distance(element1FirstSide,element1SecondSide);
			var element2Height=distance(element2FirstSide,element2SecondSide);
			
			var intersectionPoint=segment_intersection(
			element1FirstSide.center[0],element1FirstSide.center[1],
			element1SecondSide.center[0],element1SecondSide.center[1],
			element2FirstSide.center[0],element2FirstSide.center[1],
			element2SecondSide.center[0],element2SecondSide.center[1]);

			if(intersectionPoint)
				return true; 
			else
				return false;
	
		}

		var direction; // пазим посоката на движение като глобална променлива
		function mouseMove(event)
		{
			if (obj)
			{	
			var otherSideSquare=findOtherSideSquare(obj);
			var center=findCenter(obj.center[0],obj.center[1]);
			if(center)
			{
				lastCorrectCenter=center;
			}
			if(motionByDefault=="vertical")
			{
						if(event.ctrlKey)
				{
					if(obj.center[1]=otherSideSquare.center[1])
					checkDirection=false;
					
					if(!checkDirection)
					{
						//слагаме ги в една точка
						obj.center[1] = otherSideSquare.center[1];
						checkDirection=true;
					}
					var old=obj.center[0];	
					if(!mapLimits.includes(JSON.stringify(center)))
					{
						obj.center[0]=lastCorrectCenter[0];
					}
					else
					{
						obj.center[0] += event.clientX-x;
					}
					
					if(old<obj.center[0])
						direction='right';
					else
						direction='left';
				}
				else
				{
					if(obj.center[0]=otherSideSquare.center[0])
					checkDirection=true;
					if(checkDirection)
					{
						//слагаме ги в една точка
						obj.center[0] = otherSideSquare.center[0];
						checkDirection=false;
					}
					var old=obj.center[1];
				
			
					if(!mapLimits.includes(JSON.stringify(center)))
					{
						obj.center[1]=lastCorrectCenter[1];
					}
					else
					{
						obj.center[1] -= event.clientY-y;
					}
				
					if(old<obj.center[1])
						direction='top';
					else
						direction='down';
				}
				}
				if(motionByDefault=="horisontal")
				{
					if(event.ctrlKey)
					{
						if(obj.center[0]=otherSideSquare.center[0])
						checkDirection=false;
						
						if(!checkDirection)
						{
							//слагаме ги в една точка
							obj.center[0] = otherSideSquare.center[0];
							checkDirection=true;
						}
						var old=obj.center[1];	
						if(!mapLimits.includes(JSON.stringify(center)))
						{
							obj.center[1]=lastCorrectCenter[1];
						}
						else
						{
							obj.center[1] -= event.clientY-y;
						}
						
						if(old<obj.center[1])
							direction='top';
						else
							direction='down';
						}
					else
					{
					if(obj.center[1]=otherSideSquare.center[1])
					checkDirection=true;
					if(checkDirection)
					{
						//слагаме ги в една точка
						obj.center[1] = otherSideSquare.center[1];
						checkDirection=false;
					}
					var old=obj.center[0];			
					if(!mapLimits.includes(JSON.stringify(center)))
					{
						obj.center[0]=lastCorrectCenter[0];
					}
					else
					{
						obj.center[0] += event.clientX-x;
					}
				
					if(old<obj.center[0])
						direction='right';
					else
						direction='left';
					}
				}
				
			
				if(otherSideSquare)
				{
					pushSquares(obj,otherSideSquare,direction);
					partition(obj,otherSideSquare);	
					var currentCount=calculateCountVisitedSquares(obj,otherSideSquare);
					currentId=findId(obj,otherSideSquare);
					updateValue(currentId,currentCount);
					calculateArea();
				}
			}
			
			x = event.clientX;
			y = event.clientY;
						
			
			if( navigator.systemLanguage )
			{} else
			{
				if (obj || p.objectAtPoint(x,y))
					p.gl.canvas.style.cursor = 'all-scroll';
				else
					p.gl.canvas.style.cursor = 'auto';
			}
		}
	
		function DBlclick(event)
		{
			var x = event.pageX-event.target.offsetLeft-event.target.offsetWidth/2;
			var y = -(event.pageY-event.target.offsetTop-event.target.offsetHeight/2);
			
			//поставяме квадратчето точно в центъра..			
			currentCordinates=findCenter(x,y)
			if(currentCordinates)
			{
				firstVertexOfElement=cube([currentCordinates[0],currentCordinates[1],size],size).custom(squareStyle);
				seconVertexOfElement=cube([currentCordinates[0],currentCordinates[1],size],size).custom(squareStyle);
			}
				firstVertexOfElement;
				seconVertexOfElement;			
				lastCubeNumber++;				
					
				var link=segment(firstVertexOfElement.center,seconVertexOfElement.center).custom(segmentStyle);				
				
				calculateCountVisitedSquares(firstVertexOfElement,seconVertexOfElement);
				idNumber++;
				id.push([firstVertexOfElement,seconVertexOfElement,idNumber,link]);
				partition(firstVertexOfElement,seconVertexOfElement);					
					
				total.push([idNumber,currentCountSquares])
				calculateArea();
			
		}				
		function distance(p,q)
		{
			if(p!=null && q!=null)
			{
				var v = vectorPoints(p.center,q.center);
				return Math.sqrt(scalarProduct(v,v));
			}
			return null;
		}
		
		
		//функция, която изчислява броя на маркираните квадратчета при текущото изчисляване на площта
		function calculateCountVisitedSquares(p,q)
		{
			var dist=distance(p,q)
			currentCountSquares=Math.round(dist/(size+2))+1;
			document.getElementById('currentCountSquares').innerHTML = currentCountSquares;
			return currentCountSquares;
		}
		
		
		function calculateArea()
		{
			totalCountVisited=0;
			for(var i=0;i<total.length;++i)
			{
				totalCountVisited+=total[i][1];
			}
			
			var repeated=findCountSquareAtThatPosition();
			
			totalCountVisited-=repeated;
			document.getElementById('countSquares').innerHTML = totalCountVisited;
			document.getElementById('area').innerHTML = totalCountVisited*coef;
		}