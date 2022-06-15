
// разграничаване на областите
var delimitation;
function delimitationOfAreas()
{
	delimitation=!delimitation;
		if(delimitation)
			{
				mihailovgradska.custom(mihailovgradskaStyle);
				loveshka.custom(loveshkaStyle);
				razgradska.custom(razgradskaStyle);
				burgaska.custom(burgaskaStyle);
				plovdivska.custom(plovdivskaStyle);
				sofiaGrad.custom(sofiaGradStyle);
				sofiiska.custom(sofiiskaStyle);
				varnenska.custom(varnenskaStyle);
				haskovska.custom(haskovskaStyle);
			}
			else
			{
				mihailovgradska.custom(commonStyle);
				loveshka.custom(commonStyle);
				razgradska.custom(commonStyle);
				burgaska.custom(commonStyle);
				plovdivska.custom(commonStyle);
				sofiaGrad.custom(commonStyle);
				sofiiska.custom(commonStyle);
				varnenska.custom(commonStyle);
				haskovska.custom(commonStyle);
				
			}
			
}

function createMap(left,top,d,size,mapLimits) 
		{
			
			mihailovgradskaStyle={color:[115/255, 8/255, 125/255]};
			loveshkaStyle={color:[253/255, 224/255, 221/255]};
			razgradskaStyle={color:[221/235, 52/255, 151/255]};
			burgaskaStyle={color:[250/255, 159/255, 181/255]};
			plovdivskaStyle={color:[247/255, 104/255, 161/255]};
			sofiaGradStyle={color:[252/255, 197/255, 192/255]};
			sofiiskaStyle={color:[174/255, 1/255, 126/255]};
			varnenskaStyle={color:[122/255, 1/255, 119/255]};
			haskovskaStyle={color:[73/255, 0/255, 106/255]};
			
			commonStyle={color:[73/255, 0/255, 106/255]};			

			mihailovgradska = group([]);
			loveshka = group([]);
			razgradska = group([]);
			varnenska = group([]);
			burgaska = group([]);
			haskovska = group([]);
			plovdivska = group([]);
			sofiiska = group([]);
			sofiaGrad = group([]);
			
			mihailovgradska.custom(commonStyle);
				loveshka.custom(commonStyle);
				razgradska.custom(commonStyle);
				burgaska.custom(commonStyle);
				plovdivska.custom(commonStyle);
				sofiaGrad.custom(commonStyle);
				sofiiska.custom(commonStyle);
				varnenska.custom(commonStyle);
				haskovska.custom(commonStyle);
			
			mihailovgradskaSize=0;
			loveshkaSize=0;
			razgradskaSize=0;
			varnenskaSize=0;
			burgaskaSize=0;
			haskovskaSize=0;
			plovdivskaSize=0;
			sofiiskaSize=0;
			sofiaGradSize=0;
			delimitation=false;
			
			row1=[[left,top,0],[left+d,top,0]]; 
			for(var i=0;i<row1.length;++i)
			{
				mapLimits.push(JSON.stringify(row1[i]));
				var current=cube(row1[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	
				mihailovgradska.add(current);
				mihailovgradskaSize++;	
			}
			
			
			row2=[[left-d,top-d,0],[left,top-d,0],[left+d,top-d,0],[left+2*d,top-d,0],[left+22*d,top-d,0],[left+23*d,top-d,0],[left+24*d,top-d,0],[left+25*d,top-d,0],[left+26*d,top-d,0],[left+27*d,top-d,0],[left+29*d,top-d,0],[left+30*d,top-d,0]];
			for(var i=0;i<row2.length;++i)
			{
				mapLimits.push(JSON.stringify(row2[i]));
				var current=cube(row2[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	
				
				if(i<4)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i>=4 && i<10)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
			}
			
		
				
			row3=[[left-2*d,top-2*d,0],[left-d,top-2*d,0],[left,top-2*d,0],[left+d,top-2*d,0],[left+2*d,top-2*d,0],[left+19*d,top-2*d,0],[left+20*d,top-2*d,0],[left+21*d,top-2*d,0],[left+22*d,top-2*d,0],[left+23*d,top-2*d,0],[left+24*d,top-2*d,0],[left+25*d,top-2*d,0],[left+26*d,top-2*d,0],[left+27*d,top-2*d,0],[left+28*d,top-2*d,0],[left+29*d,top-2*d,0],[left+30*d,top-2*d,0],[left+31*d,top-2*d,0],[left+32*d,top-2*d,0],[left+33*d,top-2*d,0],[left+34*d,top-2*d,0]];
			
			for(var i=0;i<row3.length;++i)
			{
				mapLimits.push(JSON.stringify(row3[i]));
				var current=cube(row3[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	
				if(i<5)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
					
				}
				else if(i>=5 && i<13)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
			}

						
			row4=[[left-2*d,top-3*d,0],[left-d,top-3*d,0],[left,top-3*d,0],[left+d,top-3*d,0],[left+2*d,top-3*d,0],[left+3*d,top-3*d,0],[left+4*d,top-3*d,0],[left+5*d,top-3*d,0],[left+6*d,top-3*d,0],[left+19*d,top-3*d,0],[left+20*d,top-3*d,0],[left+21*d,top-3*d,0],[left+22*d,top-3*d,0],[left+23*d,top-3*d,0],[left+24*d,top-3*d,0],[left+25*d,top-3*d,0],[left+26*d,top-3*d,0],[left+27*d,top-3*d,0],[left+28*d,top-3*d,0],[left+29*d,top-3*d,0],[left+30*d,top-3*d,0],[left+31*d,top-3*d,0],[left+32*d,top-3*d,0],[left+33*d,top-3*d,0]];
			for(var i=0;i<row4.length;++i)
			{
				mapLimits.push(JSON.stringify(row4[i]));
				var current=cube(row4[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	
				if(i<9)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
			
				}
				else if(i>=9 && i<18)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
			
			}
				
									
			row5=[[left-2*d,top-4*d,0],[left-d,top-4*d,0],[left,top-4*d,0],[left+d,top-4*d,0],[left+2*d,top-4*d,0],[left+3*d,top-4*d,0],[left+4*d,top-4*d,0],[left+5*d,top-4*d,0],[left+6*d,top-4*d,0],[left+7*d,top-4*d,0],[left+8*d,top-4*d,0],[left+10*d,top-4*d,0],[left+11*d,top-4*d,0],[left+13*d,top-4*d,0],[left+14*d,top-4*d,0],[left+15*d,top-4*d,0],[left+18*d,top-4*d,0],[left+19*d,top-4*d,0],[left+20*d,top-4*d,0],[left+21*d,top-4*d,0],[left+22*d,top-4*d,0],[left+23*d,top-4*d,0],[left+24*d,top-4*d,0],[left+25*d,top-4*d,0],[left+26*d,top-4*d,0],[left+27*d,top-4*d,0],[left+28*d,top-4*d,0],[left+29*d,top-4*d,0],[left+30*d,top-4*d,0],[left+31*d,top-4*d,0],[left+32*d,top-4*d,0],[left+33*d,top-4*d,0],[left+34*d,top-4*d,0],[left+35*d,top-4*d,0]];
			for(var i=0;i<row5.length;++i){
				mapLimits.push(JSON.stringify(row5[i]));
				var current=cube(row5[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<10)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i>=1 && i<16)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else if(i>=16 && i<24)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
				
			}
			
						
			row6=[[left-2*d,top-5*d,0],[left-d,top-5*d,0],[left,top-5*d,0],[left+d,top-5*d,0],[left+2*d,top-5*d,0],[left+3*d,top-5*d,0],[left+4*d,top-5*d,0],[left+5*d,top-5*d,0],[left+6*d,top-5*d,0],[left+7*d,top-5*d,0],[left+8*d,top-5*d,0],[left+9*d,top-5*d,0],[left+10*d,top-5*d,0],[left+11*d,top-5*d,0],[left+12*d,top-5*d,0],[left+13*d,top-5*d,0],[left+14*d,top-5*d,0],[left+15*d,top-5*d,0],[left+16*d,top-5*d,0],[left+17*d,top-5*d,0],[left+18*d,top-5*d,0],[left+19*d,top-5*d,0],[left+20*d,top-5*d,0],[left+21*d,top-5*d,0],[left+22*d,top-5*d,0],[left+23*d,top-5*d,0],[left+24*d,top-5*d,0],[left+25*d,top-5*d,0],[left+26*d,top-5*d,0],[left+27*d,top-5*d,0],[left+28*d,top-5*d,0],[left+29*d,top-5*d,0],[left+30*d,top-5*d,0],[left+31*d,top-5*d,0],[left+32*d,top-5*d,0],[left+33*d,top-5*d,0],[left+34*d,top-5*d,0],[left+35*d,top-5*d,0]];
			for(var i=0;i<row6.length;++i)
			{
				mapLimits.push(JSON.stringify(row6[i]));
				var current=cube(row6[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<8)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i>=8 && i<18)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else if(i>=18 && i<28)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
					
			}
			
						
			row7=[[left-d,top-6*d,0],[left,top-6*d,0],[left+d,top-6*d,0],[left+2*d,top-6*d,0],[left+3*d,top-6*d,0],[left+4*d,top-6*d,0],[left+5*d,top-6*d,0],[left+6*d,top-6*d,0],[left+7*d,top-6*d,0],[left+8*d,top-6*d,0],[left+9*d,top-6*d,0],[left+10*d,top-6*d,0],[left+11*d,top-6*d,0],[left+12*d,top-6*d,0],[left+13*d,top-6*d,0],[left+14*d,top-6*d,0],[left+15*d,top-6*d,0],[left+16*d,top-6*d,0],[left+17*d,top-6*d,0],[left+18*d,top-6*d,0],[left+19*d,top-6*d,0],[left+20*d,top-6*d,0],[left+21*d,top-6*d,0],[left+22*d,top-6*d,0],[left+23*d,top-6*d,0],[left+24*d,top-6*d,0],[left+25*d,top-6*d,0],[left+26*d,top-6*d,0],[left+27*d,top-6*d,0],[left+28*d,top-6*d,0],[left+29*d,top-6*d,0],[left+30*d,top-6*d,0],[left+31*d,top-6*d,0],[left+32*d,top-6*d,0],[left+33*d,top-6*d,0],[left+34*d,top-6*d,0],[left+35*d,top-6*d,0]];
			for(var i=0;i<row7.length;++i)
			{
				mapLimits.push(JSON.stringify(row7[i]));
				var current=cube(row7[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<7)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}	
				else if(i>=7 && i<16)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else if(i>=16 && i<26)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
					
				
			}
			
						
			row8=[[left,top-7*d,0],[left+d,top-7*d,0],[left+2*d,top-7*d,0],[left+3*d,top-7*d,0],[left+4*d,top-7*d,0],[left+5*d,top-7*d,0],[left+6*d,top-7*d,0],[left+7*d,top-7*d,0],[left+8*d,top-7*d,0],[left+9*d,top-7*d,0],[left+10*d,top-7*d,0],[left+11*d,top-7*d,0],[left+12*d,top-7*d,0],[left+13*d,top-7*d,0],[left+14*d,top-7*d,0],[left+15*d,top-7*d,0],[left+16*d,top-7*d,0],[left+17*d,top-7*d,0],[left+18*d,top-7*d,0],[left+19*d,top-7*d,0],[left+20*d,top-7*d,0],[left+21*d,top-7*d,0],[left+22*d,top-7*d,0],[left+23*d,top-7*d,0],[left+24*d,top-7*d,0],[left+25*d,top-7*d,0],[left+26*d,top-7*d,0],[left+27*d,top-7*d,0],[left+28*d,top-7*d,0],[left+29*d,top-7*d,0],[left+30*d,top-7*d,0],[left+31*d,top-7*d,0],[left+32*d,top-7*d,0],[left+33*d,top-7*d,0]];
			for(var i=0;i<row8.length;++i)
			{
				mapLimits.push(JSON.stringify(row8[i]));
				var current=cube(row8[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<7)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i>=7 && i<16)
				{
					loveshka.add(current);
					loveshkaSize++;
				}	
				else if(i>=16 && i<25)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
				
			}
			
						
			row9=[[left+d,top-8*d,0],[left+2*d,top-8*d,0],[left+3*d,top-8*d,0],[left+4*d,top-8*d,0],[left+5*d,top-8*d,0],[left+6*d,top-8*d,0],[left+7*d,top-8*d,0],[left+8*d,top-8*d,0],[left+9*d,top-8*d,0],[left+10*d,top-8*d,0],[left+11*d,top-8*d,0],[left+12*d,top-8*d,0],[left+13*d,top-8*d,0],[left+14*d,top-8*d,0],[left+15*d,top-8*d,0],[left+16*d,top-8*d,0],[left+17*d,top-8*d,0],[left+18*d,top-8*d,0],[left+19*d,top-8*d,0],[left+20*d,top-8*d,0],[left+21*d,top-8*d,0],[left+22*d,top-8*d,0],[left+23*d,top-8*d,0],[left+24*d,top-8*d,0],[left+25*d,top-8*d,0],[left+26*d,top-8*d,0],[left+27*d,top-8*d,0],[left+28*d,top-8*d,0],[left+29*d,top-8*d,0],[left+30*d,top-8*d,0],[left+31*d,top-8*d,0],[left+32*d,top-8*d,0]],[left+33*d,top-8*d,0];
			for(var i=0;i<row9.length;++i)
			{ 
				mapLimits.push(JSON.stringify(row9[i]));
				var current=cube(row9[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<7)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i>=7 && i<17)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else if(i>=17 && i<23)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
					
			}
			
			
			row10=[[left+2*d,top-9*d,0],[left+3*d,top-9*d,0],[left+4*d,top-9*d,0],[left+5*d,top-9*d,0],[left+6*d,top-9*d,0],[left+7*d,top-9*d,0],[left+8*d,top-9*d,0],[left+9*d,top-9*d,0],[left+10*d,top-9*d,0],[left+11*d,top-9*d,0],[left+12*d,top-9*d,0],[left+13*d,top-9*d,0],[left+14*d,top-9*d,0],[left+15*d,top-9*d,0],[left+16*d,top-9*d,0],[left+17*d,top-9*d,0],[left+18*d,top-9*d,0],[left+19*d,top-9*d,0],[left+20*d,top-9*d,0],[left+21*d,top-9*d,0],[left+22*d,top-9*d,0],[left+23*d,top-9*d,0],[left+24*d,top-9*d,0],[left+25*d,top-9*d,0],[left+26*d,top-9*d,0],[left+27*d,top-9*d,0],[left+28*d,top-9*d,0],[left+29*d,top-9*d,0],[left+30*d,top-9*d,0],[left+31*d,top-9*d,0],[left+32*d,top-9*d,0]];
			for(var i=0;i<row10.length;++i)
			{
				mapLimits.push(JSON.stringify(row10[i]));
				var current=cube(row10[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<4)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i>=4 && i<19)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else if(i>=19 && i<22)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
					
			}
			
			row11=[[left+d,top-10*d,0],[left+2*d,top-10*d,0],[left+3*d,top-10*d,0],[left+4*d,top-10*d,0],[left+5*d,top-10*d,0],[left+6*d,top-10*d,0],[left+7*d,top-10*d,0],[left+8*d,top-10*d,0],[left+9*d,top-10*d,0],[left+10*d,top-10*d,0],[left+11*d,top-10*d,0],[left+12*d,top-10*d,0],[left+13*d,top-10*d,0],[left+14*d,top-10*d,0],[left+15*d,top-10*d,0],[left+16*d,top-10*d,0],[left+17*d,top-10*d,0],[left+18*d,top-10*d,0],[left+19*d,top-10*d,0],[left+20*d,top-10*d,0],[left+21*d,top-10*d,0],[left+22*d,top-10*d,0],[left+23*d,top-10*d,0],[left+24*d,top-10*d,0],[left+25*d,top-10*d,0],[left+26*d,top-10*d,0],[left+27*d,top-10*d,0],[left+28*d,top-10*d,0],[left+29*d,top-10*d,0],[left+30*d,top-10*d,0],[left+31*d,top-10*d,0],[left+32*d,top-10*d,0]];
			for(var i=0;i<row11.length;++i)
			{
				mapLimits.push(JSON.stringify(row11[i]));
				var current=cube(row11[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i!=3 && i<5)
				{
					mihailovgradska.add(current);
					mihailovgradskaSize++;
					
				
				}
				else if(i==3 || i==5 || i==6)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=7 && i<19)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else if(i>=19 && i<22)
				{
					razgradska.add(current);
					razgradskaSize++;
				}
				else if(i==22 || i==23 || i==31)
				{
					varnenska.add(current);;
					varnenskaSize++;
				}
				
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
			
						
			row12=[[left+d,top-11*d,0],[left+2*d,top-11*d,0],[left+3*d,top-11*d,0],[left+4*d,top-11*d,0],[left+5*d,top-11*d,0],[left+6*d,top-11*d,0],[left+7*d,top-11*d,0],[left+8*d,top-11*d,0],[left+9*d,top-11*d,0],[left+10*d,top-11*d,0],[left+11*d,top-11*d,0],[left+12*d,top-11*d,0],[left+13*d,top-11*d,0],[left+14*d,top-11*d,0],[left+15*d,top-11*d,0],[left+16*d,top-11*d,0],[left+17*d,top-11*d,0],[left+18*d,top-11*d,0],[left+19*d,top-11*d,0],[left+20*d,top-11*d,0],[left+21*d,top-11*d,0],[left+22*d,top-11*d,0],[left+23*d,top-11*d,0],[left+24*d,top-11*d,0],[left+25*d,top-11*d,0],[left+26*d,top-11*d,0],[left+27*d,top-11*d,0],[left+28*d,top-11*d,0],[left+29*d,top-11*d,0],[left+30*d,top-11*d,0],[left+31*d,top-11*d,0],[left+32*d,top-11*d,0]];
			for(var i=0;i<row12.length;++i)
			{
				mapLimits.push(JSON.stringify(row12[i]));
				var current=cube(row12[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				
				if(i<7)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else  if(i>=7 && i<18)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
					
			}
			
						
			row13=[[left-d,top-12*d,0],[left,top-12*d,0],[left+d,top-12*d,0],[left+2*d,top-12*d,0],[left+3*d,top-12*d,0],[left+4*d,top-12*d,0],[left+5*d,top-12*d,0],[left+6*d,top-12*d,0],[left+7*d,top-12*d,0],[left+8*d,top-12*d,0],[left+9*d,top-12*d,0],[left+10*d,top-12*d,0],[left+11*d,top-12*d,0],[left+12*d,top-12*d,0],[left+13*d,top-12*d,0],[left+14*d,top-12*d,0],[left+15*d,top-12*d,0],[left+16*d,top-12*d,0],[left+17*d,top-12*d,0],[left+18*d,top-12*d,0],[left+19*d,top-12*d,0],[left+20*d,top-12*d,0],[left+21*d,top-12*d,0],[left+22*d,top-12*d,0],[left+23*d,top-12*d,0],[left+24*d,top-12*d,0],[left+25*d,top-12*d,0],[left+26*d,top-12*d,0],[left+27*d,top-12*d,0],[left+28*d,top-12*d,0],[left+29*d,top-12*d,0],[left+30*d,top-12*d,0],[left+31*d,top-12*d,0]];
			for(var i=0;i<row13.length;++i)
			{
				mapLimits.push(JSON.stringify(row13[i]));
			var current=cube(row13[i],size);
			centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<11)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=11 && i<20)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
					
			}
			
						
			row14=[[left-d,top-13*d,0],[left,top-13*d,0],[left+d,top-13*d,0],[left+2*d,top-13*d,0],[left+3*d,top-13*d,0],[left+4*d,top-13*d,0],[left+5*d,top-13*d,0],[left+6*d,top-13*d,0],[left+7*d,top-13*d,0],[left+8*d,top-13*d,0],[left+9*d,top-13*d,0],[left+10*d,top-13*d,0],[left+11*d,top-13*d,0],[left+12*d,top-13*d,0],[left+13*d,top-13*d,0],[left+14*d,top-13*d,0],[left+15*d,top-13*d,0],[left+16*d,top-13*d,0],[left+17*d,top-13*d,0],[left+18*d,top-13*d,0],[left+19*d,top-13*d,0],[left+20*d,top-13*d,0],[left+21*d,top-13*d,0],[left+22*d,top-13*d,0],[left+23*d,top-13*d,0],[left+24*d,top-13*d,0],[left+25*d,top-13*d,0],[left+26*d,top-13*d,0],[left+27*d,top-13*d,0],[left+28*d,top-13*d,0],[left+29*d,top-13*d,0],[left+30*d,top-13*d,0],[left+31*d,top-13*d,0]];
			for(var i=0;i<row14.length;++i)
			{
				mapLimits.push(JSON.stringify(row14[i]));
				var current=cube(row14[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<10)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				} 
				else if(i==13 || i==14)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i>=10 && i<20)
				{
					loveshka.add(current);
					loveshkaSize++;
				}
				
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
			
						
			row15=[[left-2*d,top-14*d,0],[left-d,top-14*d,0],[left,top-14*d,0],[left+d,top-14*d,0],[left+2*d,top-14*d,0],[left+3*d,top-14*d,0],[left+4*d,top-14*d,0],[left+5*d,top-14*d,0],[left+6*d,top-14*d,0],[left+7*d,top-14*d,0],[left+8*d,top-14*d,0],[left+9*d,top-14*d,0],[left+10*d,top-14*d,0],[left+11*d,top-14*d,0],[left+12*d,top-14*d,0],[left+13*d,top-14*d,0],[left+14*d,top-14*d,0],[left+15*d,top-14*d,0],[left+16*d,top-14*d,0],[left+17*d,top-14*d,0],[left+18*d,top-14*d,0],[left+19*d,top-14*d,0],[left+20*d,top-14*d,0],[left+21*d,top-14*d,0],[left+22*d,top-14*d,0],[left+23*d,top-14*d,0],[left+24*d,top-14*d,0],[left+25*d,top-14*d,0],[left+26*d,top-14*d,0],[left+27*d,top-14*d,0],[left+28*d,top-14*d,0],[left+29*d,top-14*d,0],[left+30*d,top-14*d,0]];
			for(var i=0;i<row15.length;++i)
			{
				mapLimits.push(JSON.stringify(row15[i]));
				var current=cube(row15[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i!=6 && i<10)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i==6)
				{
					sofiaGrad.add(current);
					sofiaGradSize++;
				}
				else if(i>=10 && i<18)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i>=18 && i<25)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
			
						
				row16=[[left-d,top-15*d,0],[left,top-15*d,0],[left+d,top-15*d,0],[left+2*d,top-15*d,0],[left+3*d,top-15*d,0],[left+4*d,top-15*d,0],[left+5*d,top-15*d,0],[left+6*d,top-15*d,0],[left+7*d,top-15*d,0],[left+8*d,top-15*d,0],[left+9*d,top-15*d,0],[left+10*d,top-15*d,0],[left+11*d,top-15*d,0],[left+12*d,top-15*d,0],[left+13*d,top-15*d,0],[left+14*d,top-15*d,0],[left+15*d,top-15*d,0],[left+16*d,top-15*d,0],[left+17*d,top-15*d,0],[left+18*d,top-15*d,0],[left+19*d,top-15*d,0],[left+20*d,top-15*d,0],[left+21*d,top-15*d,0],[left+22*d,top-15*d,0],[left+23*d,top-15*d,0],[left+24*d,top-15*d,0],[left+25*d,top-15*d,0],[left+26*d,top-15*d,0],[left+27*d,top-15*d,0],[left+28*d,top-15*d,0],[left+29*d,top-15*d,0]];
			for(var i=0;i<row16.length;++i)
			{
				mapLimits.push(JSON.stringify(row16[i]));
				var current=cube(row16[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i!=3 && i!=4 && i!=5 && i!=6 && i<11)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i<11)
				{
					sofiaGrad.add(current);
					sofiaGradSize++;
				}
				else if(i<18)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i<24)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
		
			row17=[[left-2*d,top-16*d,0],[left-d,top-16*d,0],[left,top-16*d,0],[left+d,top-16*d,0],[left+2*d,top-16*d,0],[left+3*d,top-16*d,0],[left+4*d,top-16*d,0],[left+5*d,top-16*d,0],[left+6*d,top-16*d,0],[left+7*d,top-16*d,0],[left+8*d,top-16*d,0],[left+9*d,top-16*d,0],[left+10*d,top-16*d,0],[left+11*d,top-16*d,0],[left+12*d,top-16*d,0],[left+13*d,top-16*d,0],[left+14*d,top-16*d,0],[left+15*d,top-16*d,0],[left+16*d,top-16*d,0],[left+17*d,top-16*d,0],[left+18*d,top-16*d,0],[left+19*d,top-16*d,0],[left+20*d,top-16*d,0],[left+21*d,top-16*d,0],[left+22*d,top-16*d,0],[left+23*d,top-16*d,0],[left+24*d,top-16*d,0],[left+25*d,top-16*d,0],[left+26*d,top-16*d,0],[left+27*d,top-16*d,0],[left+28*d,top-16*d,0],[left+29*d,top-16*d,0],[left+30*d,top-16*d,0]];
			for(var i=0;i<row17.length;++i)
			{
				mapLimits.push(JSON.stringify(row17[i]));
				var current=cube(row17[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i!=5 && i!=6 && i!=7 && i<11)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i==5 || i==6 || i==7)
				{
					sofiaGrad.add(current);
					sofiaGradSize++;
				}
				else if(i>=11 && i<18)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i<26)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
			
						
			row18=[[left-2*d,top-17*d,0],[left-d,top-17*d,0],[left,top-17*d,0],[left+d,top-17*d,0],[left+2*d,top-17*d,0],[left+3*d,top-17*d,0],[left+4*d,top-17*d,0],[left+5*d,top-17*d,0],[left+6*d,top-17*d,0],[left+7*d,top-17*d,0],[left+8*d,top-17*d,0],[left+9*d,top-17*d,0],[left+10*d,top-17*d,0],[left+11*d,top-17*d,0],[left+12*d,top-17*d,0],[left+13*d,top-17*d,0],[left+14*d,top-17*d,0],[left+15*d,top-17*d,0],[left+16*d,top-17*d,0],[left+17*d,top-17*d,0],[left+18*d,top-17*d,0],[left+19*d,top-17*d,0],[left+20*d,top-17*d,0],[left+21*d,top-17*d,0],[left+22*d,top-17*d,0],[left+23*d,top-17*d,0],[left+24*d,top-17*d,0],[left+25*d,top-17*d,0],[left+26*d,top-17*d,0],[left+27*d,top-17*d,0],[left+28*d,top-17*d,0],[left+29*d,top-17*d,0],[left+30*d,top-17*d,0],[left+31*d,top-17*d,0]];
			for(var i=0;i<row18.length;++i)
			{
				mapLimits.push(JSON.stringify(row18[i]));
				var current=cube(row18[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				 if(i==7)
				{
					sofiaGrad.add(current);
					sofiaGradSize++;
				}
				else if(i!=7 && i<11)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=11 && i<20)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i>=20 && i<27)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
			
		
			
			row19=[[left-d,top-18*d,0],[left,top-18*d,0],[left+d,top-18*d,0],[left+2*d,top-18*d,0],[left+3*d,top-18*d,0],[left+4*d,top-18*d,0],[left+5*d,top-18*d,0],[left+6*d,top-18*d,0],[left+7*d,top-18*d,0],[left+8*d,top-18*d,0],[left+9*d,top-18*d,0],[left+10*d,top-18*d,0],[left+11*d,top-18*d,0],[left+12*d,top-18*d,0],[left+13*d,top-18*d,0],[left+14*d,top-18*d,0],[left+15*d,top-18*d,0],[left+16*d,top-18*d,0],[left+17*d,top-18*d,0],[left+18*d,top-18*d,0],[left+19*d,top-18*d,0],[left+20*d,top-18*d,0],[left+21*d,top-18*d,0],[left+22*d,top-18*d,0],[left+23*d,top-18*d,0],[left+24*d,top-18*d,0],[left+25*d,top-18*d,0],[left+26*d,top-18*d,0],[left+27*d,top-18*d,0],[left+28*d,top-18*d,0],[left+29*d,top-18*d,0],[left+30*d,top-18*d,0],[left+31*d,top-18*d,0],[left+32*d,top-18*d,0]];
			for(var i=0;i<row19.length;++i)
			{
				mapLimits.push(JSON.stringify(row19[i]));
				var current=cube(row19[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<11)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=11 && i<18)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i>=18 && i<26)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
			
			}
								
			row20=[[left,top-19*d,0],[left+d,top-19*d,0],[left+2*d,top-19*d,0],[left+3*d,top-19*d,0],[left+4*d,top-19*d,0],[left+5*d,top-19*d,0],[left+6*d,top-19*d,0],[left+7*d,top-19*d,0],[left+8*d,top-19*d,0],[left+9*d,top-19*d,0],[left+10*d,top-19*d,0],[left+11*d,top-19*d,0],[left+12*d,top-19*d,0],[left+13*d,top-19*d,0],[left+14*d,top-19*d,0],[left+15*d,top-19*d,0],[left+16*d,top-19*d,0],[left+17*d,top-19*d,0],[left+18*d,top-19*d,0],[left+19*d,top-19*d,0],[left+20*d,top-19*d,0],[left+21*d,top-19*d,0],[left+22*d,top-19*d,0],[left+23*d,top-19*d,0],[left+24*d,top-19*d,0],[left+25*d,top-19*d,0],[left+26*d,top-19*d,0],[left+27*d,top-19*d,0],[left+28*d,top-19*d,0],[left+29*d,top-19*d,0],[left+30*d,top-19*d,0],[left+31*d,top-19*d,0],[left+32*d,top-19*d,0]];
			for(var i=0;i<row20.length;++i)
			{
				mapLimits.push(JSON.stringify(row20[i]));
				var current=cube(row20[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<10)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=10 && i<17)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i>=17 && i<25)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
					
			row21=[[left+d,top-20*d,0],[left+2*d,top-20*d,0],[left+3*d,top-20*d,0],[left+4*d,top-20*d,0],[left+5*d,top-20*d,0],[left+6*d,top-20*d,0],[left+7*d,top-20*d,0],[left+8*d,top-20*d,0],[left+9*d,top-20*d,0],[left+10*d,top-20*d,0],[left+11*d,top-20*d,0],[left+12*d,top-20*d,0],[left+13*d,top-20*d,0],[left+14*d,top-20*d,0],[left+15*d,top-20*d,0],[left+16*d,top-20*d,0],[left+17*d,top-20*d,0],[left+18*d,top-20*d,0],[left+19*d,top-20*d,0],[left+20*d,top-20*d,0],[left+21*d,top-20*d,0],[left+22*d,top-20*d,0],[left+23*d,top-20*d,0],[left+24*d,top-20*d,0],[left+25*d,top-20*d,0],[left+29*d,top-20*d,0],[left+30*d,top-20*d,0],[left+31*d,top-20*d,0]];
			for(var i=0;i<row21.length;++i)
			{
				mapLimits.push(JSON.stringify(row21[i]));
				var current=cube(row21[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<8)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=8 && i<17)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else if(i>=17 && i<25)
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				else
				{
				burgaska.add(current);
					burgaskaSize++;
				}
				
			}
			
		
			row22=[[left+d,top-21*d,0],[left+2*d,top-21*d,0],[left+3*d,top-21*d,0],[left+4*d,top-21*d,0],[left+5*d,top-21*d,0],[left+6*d,top-21*d,0],[left+7*d,top-21*d,0],[left+8*d,top-21*d,0],[left+9*d,top-21*d,0],[left+10*d,top-21*d,0],[left+11*d,top-21*d,0],[left+12*d,top-21*d,0],[left+13*d,top-21*d,0],[left+14*d,top-21*d,0],[left+15*d,top-21*d,0],[left+16*d,top-21*d,0],[left+17*d,top-21*d,0],[left+18*d,top-21*d,0],[left+19*d,top-21*d,0],[left+20*d,top-21*d,0],[left+21*d,top-21*d,0],[left+22*d,top-21*d,0],[left+23*d,top-21*d,0],[left+24*d,top-21*d,0]];
			for(var i=0;i<row22.length;++i)
			{
				mapLimits.push(JSON.stringify(row22[i]));
				var current=cube(row22[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<7)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=7 && i<16)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else 
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				}
			
						
			row23=[[left+2*d,top-22*d,0],[left+3*d,top-22*d,0],[left+4*d,top-22*d,0],[left+5*d,top-22*d,0],[left+6*d,top-22*d,0],[left+7*d,top-22*d,0],[left+8*d,top-22*d,0],[left+9*d,top-22*d,0],[left+10*d,top-22*d,0],[left+11*d,top-22*d,0],[left+12*d,top-22*d,0],[left+13*d,top-22*d,0],[left+14*d,top-22*d,0],[left+15*d,top-22*d,0],[left+16*d,top-22*d,0],[left+17*d,top-22*d,0],[left+18*d,top-22*d,0],[left+19*d,top-22*d,0],[left+20*d,top-22*d,0],[left+21*d,top-22*d,0],[left+22*d,top-22*d,0]];
			for(var i=0;i<row23.length;++i)
			{
				mapLimits.push(JSON.stringify(row23[i]));
				var current=cube(row23[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<5)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=5 && i<13)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else 
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				
			}
					
			row24=[[left+2*d,top-23*d,0],[left+3*d,top-23*d,0],[left+4*d,top-23*d,0],[left+5*d,top-23*d,0],[left+6*d,top-23*d,0],[left+7*d,top-23*d,0],[left+8*d,top-23*d,0],[left+9*d,top-23*d,0],[left+10*d,top-23*d,0],[left+11*d,top-23*d,0],[left+12*d,top-23*d,0],[left+13*d,top-23*d,0],[left+14*d,top-23*d,0],[left+15*d,top-23*d,0],[left+16*d,top-23*d,0],[left+17*d,top-23*d,0],[left+18*d,top-23*d,0],[left+19*d,top-23*d,0]];
			for(var i=0;i<row24.length;++i)
			{
				mapLimits.push(JSON.stringify(row24[i]));
				var current=cube(row24[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<6)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=6 && i<13)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else 
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				
			}
				
			row25=[[left+d,top-24*d,0],[left+2*d,top-24*d,0],[left+3*d,top-24*d,0],[left+4*d,top-24*d,0],[left+5*d,top-24*d,0],[left+6*d,top-24*d,0],[left+7*d,top-24*d,0],[left+8*d,top-24*d,0],[left+9*d,top-24*d,0],[left+10*d,top-24*d,0],[left+11*d,top-24*d,0],[left+12*d,top-24*d,0],[left+13*d,top-24*d,0],[left+14*d,top-24*d,0],[left+15*d,top-24*d,0],[left+16*d,top-24*d,0],[left+17*d,top-24*d,0],[left+18*d,top-24*d,0],[left+19*d,top-24*d,0],[left+20*d,top-24*d,0]];
			for(var i=0;i<row25.length;++i)
			{
				mapLimits.push(JSON.stringify(row25[i]));
				var current=cube(row25[i],size);
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<6)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i>=6 && i<13)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else 
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				
			}
				
			row26=[[left+d,top-25*d,0],[left+2*d,top-25*d,0],[left+3*d,top-25*d,0],[left+4*d,top-25*d,0],[left+5*d,top-25*d,0],[left+12*d,top-25*d,0],[left+13*d,top-25*d,0],[left+14*d,top-25*d,0],[left+15*d,top-25*d,0],[left+16*d,top-25*d,0],[left+17*d,top-25*d,0],[left+18*d,top-25*d,0],[left+19*d,top-25*d,0],[left+20*d,top-25*d,0],[left+21*d,top-25*d,0]];
			for(var i=0;i<row26.length;++i)
			{
				mapLimits.push(JSON.stringify(row26[i]));
				var current=cube(row26[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				if(i<5)
				{
					sofiiska.add(current);
					sofiiskaSize++;
				}
				else if(i==5)
				{
					plovdivska.add(current);
					plovdivskaSize++;
				}
				else 
				{
					haskovska.add(current)
					haskovskaSize++;
				}
				
			}					
			row27=[[left+14*d,top-26*d,0],[left+15*d,top-26*d,0],[left+16*d,top-26*d,0],[left+17*d,top-26*d,0],[left+18*d,top-26*d,0]];
			for(var i=0;i<row27.length;++i)
			{
				mapLimits.push(JSON.stringify(row27[i]));
				var current=cube(row27[i],size); 
				centersOfMap.push([current.center[0],current.center[1]]);	 
				haskovska.add(current)
				haskovskaSize++;
				
			}
					
				
			mihailovgradska.mergeColor();
			loveshka.mergeColor();		
			razgradska.mergeColor();		
			varnenska.mergeColor();			
			sofiiska.mergeColor();		
			sofiaGrad.mergeColor();			
			plovdivska.mergeColor();		
			haskovska.mergeColor();		
			burgaska.mergeColor();
			
			 delimitationOfAreas();
			 
		
			console.log("Монтанска "+mihailovgradskaSize);
			console.log("Ловешка "+loveshkaSize);	
			console.log("Разградска "+razgradskaSize);
			console.log("Варненска "+varnenskaSize);
			console.log("Софийска "+sofiiskaSize);
			console.log("София град "+ sofiaGradSize);
			console.log("Пловдивска "+ plovdivskaSize);
			console.log("Хасковска "+ haskovskaSize);
			console.log("Бургаска "+ burgaskaSize);
			console.log(mihailovgradskaSize+loveshkaSize+razgradskaSize+varnenskaSize+sofiiskaSize+plovdivskaSize+haskovskaSize+burgaskaSize+sofiaGradSize);
		}