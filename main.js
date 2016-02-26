// init 
enchant();

window.onload = function() {
    var game = new Game( 320, 320 );
    game.preload('chara1.png', 'start.png', 'gameover.png', 'clear.png');
    game.fps = 15;
	
    // 読込完了 
    game.onload = function() {
        var kuma = [],

            score = new Label(),
            scoreRate = 100,
            nowScore,
            num = 0,
            hit = 0,
            interval = 500,
            
            gameStart = new Sprite( 236, 48 ),
            gameStartScene = new Scene(),
            
            gameOver = new Sprite( 189, 97 ),
            gameOverScene = new Scene(),
            
            gameClear = new Sprite( 267, 48 ),
            gameClearScene = new Scene();

        
        // 背景色 
        game.rootScene.backgroundColor = 'lightblue';
        

        // スコア挿入 
        score.color = 'white';
        score.text = 'SCORE ' + hit;
        score.x = 10;
        score.y = 10;
        game.rootScene.addChild( score );
        
     
     	
        // スタート 
        gameStart.image = game.assets['start.png'];
        gameStart.x = 42;
        gameStart.y = 136;
        //gameStart._element.style.cursor = 'pointer';
        gameStartScene.addChild( gameStart );
        game.pushScene( gameStartScene );
 
        
        
        
       gameStart.addEventListener( 'touchstart', function() {
            // スタート非表示 
            game.popScene();
            
            
            // interval毎にくまさん挿入 
            (function() {
            
            
                // くまさん5体以上表示：ゲームオーバー 
                // 7000点以上獲得：ゲームクリア 
                if ( num - hit >= 5 ) {
                    game.pushScene( gameOverScene );
                    return;
                } else if ( nowScore >= 7000 ) {
                    game.pushScene( gameClearScene );
                    return;
                }
                
                
                // くまさん生成
                kuma[num] = new Sprite( 32, 32 );
                kuma[num].image = game.assets['chara1.png'];
                
                // ランダムに座標設定 
                kuma[num].x = 10 + Math.floor( Math.random() * 268 );
                kuma[num].y = 30 + Math.floor( Math.random() * 248 );
                
                // シーンへ追加 
                game.rootScene.addChild( kuma[num] );
                
                // くまさんタッチ 
                kuma[num].addEventListener( 'touchstart', function() {
 
                    // くまさん削除 
                    this.parentNode.removeChild( this );
                    
                    // スコア更新 
                    hit++;
                    nowScore = hit * scoreRate;
                    score.text = 'SCORE ' + nowScore;
                    
                    // 5体消す毎に間隔を短く 
                    if ( hit % 3 === 0 ) {
                        scoreRate = scoreRate + 20;
                        interval = interval - 70;
                    }
                }, false );
                
                // ループ 
                num++;
                setTimeout( arguments.callee, interval );
            })();
        }, false );
        
        // ゲームオーバー 
        gameOver.image = game.assets['gameover.png'];
        gameOver.x = 65;
        gameOver.y = 111;
        gameOverScene.addChild( gameOver );
        
        // ゲームクリア 
        gameClear.image = game.assets['clear.png'];
        gameClear.x = 26;
        gameClear.y = 136;
        gameClearScene.addChild( gameClear );
    };
    game.start();
}