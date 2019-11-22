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
    jumpHeight: number = 0;
    @property
    jumpDuration: number = 0;
    @property
    maxMovementSpeed: number = 0;
    @property
    accel: number = 0;
    jumpAction: any;
    accLeft: boolean;
    accRight: boolean;
    xSpeed: number;
    @property(cc.AudioClip)
    jumpSound: cc.AudioClip= null;

    setJumpAction(){
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionInOut());
        var jumpDown =  cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionInOut());

        var myCallback = cc.callFunc(this.playJumpSound, this);

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, myCallback));
    }

    playJumpSound(){
        cc.audioEngine.playEffect(this.jumpSound, false);
    }

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = true;
                console.log("accleft true");
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                console.log("accRight true");
                break;
        }
    }

    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = false;
                console.log("accLeft false");
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                console.log("accRight false");
                break;
        }
    }

    onLoad () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }

    update (dt) {

        if(this.accLeft){
            this.xSpeed -= this.accel * dt ;
        }

        if(this.accRight){
            this.xSpeed += this.accel * dt;
        }

        if(Math.abs(this.xSpeed) > this.maxMovementSpeed ){
            this.xSpeed = this.maxMovementSpeed * this.xSpeed/ Math.abs(this.xSpeed);
        }

        this.node.x +=this.xSpeed * dt;

    }


}
