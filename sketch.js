let createImg;
let createImg1;
let createImg2;
// let bgrandom = []
// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];
let points = [[-8,4], [-5,4], [-5,5],[-4,6],[-2,6],[-1,5],[-1,2],[-2,1],[0,1],[3,0],[3,-3],[2,-5],[0,-5],[0,-6],[-1,-6],[-1,-5],[-2,-5],[-2,-6],[-3,-6],[-3,-5],[-4,-5],[-6,-4],[-6,-1],[-5,0],[-4,1],[-5,2],[-5,3],[-9,3]]; //list資料，
var fill_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373-edc4b3-e6b8a2-deab90-d69f7e-cd9777-c38e70-b07d62-9d6b53-8a5a44-774936".split("-").map(a=>"#"+a)
var line_colors = "606c38-283618-fefae0-dda15e-bc6c25".split("-").map(a=>"#"+a)
var score=0

//class:類別，粒子

//+++++++++++++++++++++++++設定point點的物件設定+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var woodz //目前要處理的物件，暫時放到ball裡面
var nuest=[] //把產生'所有'物件，為倉庫，所有資料都在此
//+++++++++++++++++++++++++設定飛彈物件變數+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var bullet
var bullets=[]
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var monster
var monsters=[]
//++++++++++++++++++++++++設定砲台位置+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var shipP
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function preload(){ //程式碼準備執行之前比setup更早執行
  kiwi_sound=loadSound('sound/kiwi.mp3')
  bullet_sound=loadSound('sound/SHOOTING.WAV')
  monster_sound=loadSound("sound/Explosion 03.wav")
  angry_music=loadSound("Atlantis Rage - Jimena Contreras.mp3")
  victory_music=loadSound("VICTORY.WAV")
  createImg = loadImage("jeremy-thomas-99326-unsplash-624x412.jpg");
  createImg1 = loadImage("銀河系.jpg");
  createImg2 = loadImage("黑洞.jpg");
  createImg3 = loadImage("怒.png");
  createImg4 = loadImage("kiwi.png");
  createImg5 = loadImage("mad-removebg-preview.png");
  // bgrandom = [createImg,createImg1,createImg2]

}





function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP=createVector(width/2, height/2);//預設砲台位置
  for(var i=0;i<15;i=i+1){ //i=0、2、4、6、8、10
    woodz=new Obj({}) //產生Obj class物件，
    nuest.push(woodz) //把ball物件放入balls裡面

  }
  for(var i=0;i<15;i=i+1){ //i=0、2、4、6、8、10
    monster=new Monster({}) //產生Monster class物件，
    monsters.push(monster) //把monster物件放入monsters裡面

  }

  
  

  
}


function draw() {
 
  background(createImg2);
  // background(0);


  // for(var j=0;j<nuest.length;j=j+1){
  //   woodz=nuest[j]
  //   woodz.draw()
  //   woodz.update()
  // }
  //+++++++++++++++++++++按按鈕+++++++++++++++++++++++++
  if(keyIsPressed){
    if(key=="ArrowLeft"||key=="a"){
      shipP.x=shipP.x-5
    }
    if(key=="ArrowRight"||key=="d"){
      shipP.x=shipP.x+5
    }
    if(key=="ArrowUp"||key=="w"){
      shipP.y=shipP.y-5
    }
    if(key=="ArrowDown"||key=="s"){
      shipP.y=shipP.y+5
    }
  
  }
  //+++++++++++++大象++++++++++++++++++++++++++
  for(let woodz of nuest) //設定迴圈以重複執行
  {
    woodz.draw() //畫圖
    woodz.update() 
    for (let bullet of bullets){ //檢查每一個物件
      if(woodz.isBallInRange(bullet.p.x,bullet.p.y)){ //判斷子彈是否有碰觸到物件
        nuest.splice(nuest.indexOf(woodz),1) //有的話便刪除物件
        bullets.splice(bullets.indexOf(bullet),1)//從balls取出被滑鼠按到的物件編號
        score=score-3 //分數-3
        kiwi_sound.play() //播放聲音
        

      }
    }
  }
//++++++++++++++++++飛彈++++++++++++++++++++++++++
  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update() 
    
  }
//++++++++++++++++++怪物++++++++++++
  for(let monster of monsters)
  {
    if(monster.dead==true && monster.timenumber>4){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for (let bullet of bullets){ //檢查每一個物件
    if(monster.isBallInRange(bullet.p.x,bullet.p.y)){
      // monsters.splice(monsters.indexOf(monster),1)
      bullets.splice(bullets.indexOf(bullet),1)//從balls取出被滑鼠按到的物件編號
      score=score+1
      monster_sound.play()
      monster.dead=true //代表怪物死亡
      

    }
  }
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  fill("#white")
  textSize(50)
  text(score,50,50) //在座標(50,50)上，顯示score分數
  if(score<0&&score>-15){
    text("你殺太多奇異鳥>:(",200,50)
  }else if(score<-14){
    text("奇異鳥要絕種了>:(",200,50)
  }
  push()
    let dx=mouseX-width/2
    let dy=mouseY-height/2
    let angle=atan2(dy,dx)
    translate(shipP.x,shipP.y)
    fill("#C89FA3")
    noStroke()
    rotate(angle)
    //+++++++++++++++++++++++畫槍++++++++++++++++++++++++++++++++
    fill("#e63946")
    rect(20,-5,80,10)
    fill("#0077b6")
    arc(50,1.5,40,30,0,90)
    arc(50,-2.5,40,30,-90,0)
    fill("#e5e5e5")
    triangle(50,0,-25,25,-25,-25) //設三點畫三角形
    ellipse(0,0,50)
    fill("#ffc300")
    ellipse(2.5,0,40,20)
    
  pop()


  if (monsters.length == 0) {
    nuest.splice(0, nuest.length); // 移除所有球體
    bullets.splice(0, bullets.length); // 移除所有子彈
    background(createImg1)
    fill("#edede9")
    rect(width/2-200,height/2-100,400,200)
    fill("#000000")
    textSize(30)
    text("你的分數是:",width/2-100,height/2-20)
    text(score,width/2+60,height/2-20)
    text("你拯救了奇異鳥:)",width/2-125,height/2+40)
    image(createImg4, mouseX-75, mouseY-75 , 150, 150)




  }else if(nuest.length == 0){
    monsters.splice(0, nuest.length); // 移除所有球體
    bullets.splice(0, bullets.length); // 移除所有子彈

    background("black")
    background(createImg3)
    fill("#d62828")
    text("你讓奇異鳥滅絕了",width/2-200,height/2-150)
    text("分數",width/2-100,height/2-90)
    text(score,width/2,height/2-90)
    image(createImg5, mouseX-75, mouseY-75 , 150, 150)
  


  }


  
}







function mousePressed(){ //在滑鼠按下的地方，產生Obj class物件，

  //+++++++++++++++++++++++++++++++++++++++產生一個物件++++++++++++++++++++++++++++++++++++++++
  // woodz=new Obj({
  //   p:{x:mouseX,y:mouseY}
  // })
  // nuest.push(woodz)
 //+++++++++++++++++++++++按一下會產生飛彈++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  bullet=new Bullet({})
  bullets.push(bullet)
  if (monsters.length == 0) {
    bullet_sound.stop()
  }else if(nuest.length == 0){
    bullet_sound.stop()
  }else{
    bullet_sound.play()
  }

  if (monsters.length == 0) {
    victory_music.play()
  }else if(nuest.length == 0){
    angry_music.play()
  }

  
  
 //在物件上按下滑鼠，分數加一
    // for (let woodz of nuest){ //檢查每一個物件
    //   if(woodz.isBallInRange(mouseX,mouseY)){
    //     nuest.splice(nuest.indexOf(woodz),1)//從balls取出被滑鼠按到的物件編號
    //     score=score+1

    //   }
    // }

}

function keyPressed(){
  if(key==" "){ //按下空白鍵，射飛彈
    bullet=new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()

  }
  // if(key=="ArrowLeft"){
  //   shipP.x=shipP.x-5
  // }
  // if(key=="ArrowRight"){
  //   shipP.x=shipP.x+5
  // }
  // if(key=="ArrowUp"){
  //   shipP.y=shipP.y-5
  // }
  // if(key=="ArrowDown"){
  //   shipP.y=shipP.y+5
  // }



}