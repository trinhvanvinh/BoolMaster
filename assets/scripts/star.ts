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

    @property
    pickRadius: number = 0;

    onCollisionEnter(selfCollider, otherCollider){
        if(otherCollider.name == "star<CircleCollider>" && selfCollider.name == "PurpleMonster<CircleCollider>" ){
            this.node.destroy();   
        }

    }

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

    }

    start () {

    }

    onDestroy(){
        this.node.parent.getComponent('Game').gainScore();
        this.node.parent.getComponent("Game").spawnNewStar();
    }

    // update (dt) {
    // }
}
