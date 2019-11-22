// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;
    @property(cc.Node)
    ground: cc.Node = null;
    @property
    maxStarDuration: number = 0;
    @property
    minStarDuration: number = 0;
    @property(cc.Node)
    player: cc.Node = null;
    groundY: any;
    @property(cc.Label)
    score: cc.Label = null;
    playerScore: number = 0;

    timer: number;
    starDuration: number;

    @property(cc.AudioClip)
    playSound: cc.AudioClip = null;
    

    gainScore(){
        this.playerScore += 1;
        this.score.string = 'SCORE: '+ this.playerScore.toString();
        cc.audioEngine.playEffect(this.playSound, false);
    }

    spawnNewStar(){
        var newStar = cc.instantiate(this.starPrefab);
      
        //newStar.addComponent(cc.CircleCollider);
        newStar.group = 'star';
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        this.starDuration = this.minStarDuration + Math.random()* (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;


    }

    getNewStarPosition(){
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight +50  ;
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5 )*2 * maxX ;
        return cc.v2(randX, randY);
    }

    onLoad () {
        this.groundY = this.ground.y + this.ground.height/2;
        this.timer = 0;
        this.starDuration = 0;
        this.spawnNewStar();
        cc.director.preloadScene('Menu');
    }

    start () {

    }

    gameOver(){

        this.player.stopAllActions();
        cc.director.loadScene('Menu');

    }

    update (dt) {
        if(this.timer > this.starDuration ){
            this.gameOver();
            return ;
        }
        this.timer += dt;
        
    }
}
