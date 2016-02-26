// init 
enchant();

window.onload = function() {
    var game = new Game( 320, 320 );
    game.preload('chara1.png', 'start.png', 'gameover.png', 'clear.png');
    game.fps = 15;
	
    // �Ǎ����� 
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

        
        // �w�i�F 
        game.rootScene.backgroundColor = 'lightblue';
        

        // �X�R�A�}�� 
        score.color = 'white';
        score.text = 'SCORE ' + hit;
        score.x = 10;
        score.y = 10;
        game.rootScene.addChild( score );
        
     
     	
        // �X�^�[�g 
        gameStart.image = game.assets['start.png'];
        gameStart.x = 42;
        gameStart.y = 136;
        //gameStart._element.style.cursor = 'pointer';
        gameStartScene.addChild( gameStart );
        game.pushScene( gameStartScene );
 
        
        
        
       gameStart.addEventListener( 'touchstart', function() {
            // �X�^�[�g��\�� 
            game.popScene();
            
            
            // interval���ɂ��܂���}�� 
            (function() {
            
            
                // ���܂���5�̈ȏ�\���F�Q�[���I�[�o�[ 
                // 7000�_�ȏ�l���F�Q�[���N���A 
                if ( num - hit >= 5 ) {
                    game.pushScene( gameOverScene );
                    return;
                } else if ( nowScore >= 6000 ) {
                    game.pushScene( gameClearScene );
                    return;
                }
                
                
                // ���܂��񐶐�
                kuma[num] = new Sprite( 32, 32 );
                kuma[num].image = game.assets['chara1.png'];
                
                // �����_���ɍ��W�ݒ� 
                kuma[num].x = 10 + Math.floor( Math.random() * 268 );
                kuma[num].y = 30 + Math.floor( Math.random() * 248 );
                
                // �V�[���֒ǉ� 
                game.rootScene.addChild( kuma[num] );
                
                // ���܂���^�b�` 
                kuma[num].addEventListener( 'touchstart', function() {
 
                    // ���܂���폜 
                    this.parentNode.removeChild( this );
                    
                    // �X�R�A�X�V 
                    hit++;
                    nowScore = hit * scoreRate;
                    score.text = 'SCORE ' + nowScore;
                    
                    // 5�̏������ɊԊu��Z�� 
                    if ( hit % 3 === 0 ) {
                        scoreRate = scoreRate + 20;
                        interval = interval - 90;
                    }
                }, false );
                
                // ���[�v 
                num++;
                setTimeout( arguments.callee, interval );
            })();
        }, false );
        
        // �Q�[���I�[�o�[ 
        gameOver.image = game.assets['gameover.png'];
        gameOver.x = 65;
        gameOver.y = 111;
        gameOverScene.addChild( gameOver );
        
        // �Q�[���N���A 
        gameClear.image = game.assets['clear.png'];
        gameClear.x = 26;
        gameClear.y = 136;
        gameClearScene.addChild( gameClear );
    };
    game.start();
}