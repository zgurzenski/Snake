function callToStart() {
    $("#gameOver").empty();
    $(document).ready(function () {
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        var w = $("#canvas").width();
        var h = $("#canvas").height();
        var cw = 20;
        var d;
        var food;
        var score;
        var game_loop;
        var snake_array;
        function init() {
            d = "right";
            create_snake();
            create_food();
            score = 0;
            if (game_loop !== null) {
                clearInterval(game_loop);
            }
            game_loop = setInterval(paint, 60);
        }
        init();
        function create_snake() {
            var length = 3;
            snake_array = [];
            for (var i = length - 1; i >= 0; i--) {
                snake_array.push({x: i, y: 0});
            }
        }
        function create_food() {
            food = {
                x: Math.round(Math.random() * (w - cw) / cw),
                y: Math.round(Math.random() * (h - cw) / cw)
            };
        }
        function paint() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = "#404040";
            ctx.strokeRect(0, 0, w, h);
            for (var x = .5; x < 481; x += 20) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 481);
            }
            for (var y = .5; y < 481; y += 20) {
                ctx.moveTo(0, y);
                ctx.lineTo(481, y);
            }
            ctx.stroke();

            var nx = snake_array[0].x;
            var ny = snake_array[0].y;
            if (d === 'right') {
                nx++;
            }
            else if (d === 'left') {
                nx--;
            }
            else if (d === 'up') {
                ny--;
            }
            else if (d === 'down') {
                ny++;
            }
            if (nx === -1 || nx === w / cw || ny === -1 || ny === h / cw || check_collision(nx, ny, snake_array)) {
                gameOver();
            }
            function gameOver()
            {
                ctx = null;

                $("#gameOver").append("Game Over...  Score:" + score);
            }
            var tail;
            if (nx === food.x && ny === food.y) {
                tail = {x: nx, y: ny};
                score++;
                create_food();
            }
            else {
                tail = snake_array.pop();
                tail.x = nx;
                tail.y = ny;
            }

                snake_array.unshift(tail);
            for (var i = 0; i < snake_array.length; i++) {
                var c = snake_array[i];
                paint_cell(c.x, c.y);
            }
            paint_food(food.x, food.y);
            var score_text = "score: " + score;
            ctx.fillText(score_text, 5, h - 5);

           // delay(100, paint());
        }

        function paint_food(x, y) {
            ctx.fillStyle = "red";
            ctx.fillRect(x * cw, y * cw, cw, cw);
            ctx.strokeStyle = "#1d0007";
            ctx.strokeRect(x * cw, y * cw, cw, cw);
        }
        function paint_cell(x, y) {
            ctx.fillStyle = "lime";
            ctx.fillRect(x * cw, y * cw, cw, cw);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x * cw, y * cw, cw, cw);
        }
        function check_collision(x, y, array) {
            for (var i = 0; i < array.length; i++) {
               // console.log("checking cell: " + i);
                if (array[i].x === x && array[i].y === y) {
                   // console.log("collision");
                    return true;
                }
            }
        }
        $(document).keydown(function (e) {
            var key = e.which;
            if (key == '37' && d !== 'right') {
                d = 'left';
            }
            else if (key == '38' && d !== 'down') {
                d = 'up';
            }
            else if (key == '39' && d !== 'left') {
                d = 'right';
            }
            else if (key == '40' && d !== 'up') {
                d = 'down';
            }
        });
    });
}

