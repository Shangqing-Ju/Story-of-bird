$(function(){
    var canvas = $("#canvas")[0];
    var canvas_obj = canvas.getContext("2d");
    var colour_choose = $("#colour_choose");
    var colour_box = ['#000000', '#999999', '#CC66FF', '#FF0000', '#FF9900', '#FFFF00', '#008000', '#00CCFF'];
    var colour = "#000000";
    var fragment = document.createDocumentFragment();
    var colour_select = document.getElementsByTagName("span");
    var clear_canvas = $("#clear_canvas");

    var _span = null;
    function init_Colour_box(){
        // produce the colour box, use span tag as the colour box, then appendchild to "colour_choose" div.
        for(var i = 0; i < colour_box.length; i++){
            _span = document.createElement("span");
            _span.className = "colour_box";
            _span.style.backgroundColor = colour_box[i];
            _span.click = function(){
                colour = window.getComputedStyle(this,null).getPropertyValue('background-color');
            };
            fragment.appendChild(_span);
        }
        colour_choose.html(fragment);
    }
    function init_Pencil(colour = "#000000"){
        // initial pencil tool, the default value is black.
        canvas.onmousedown = function(event){
            canvas_obj.lineWidth = 2;
            canvas_obj.strokeStyle = colour;
            var x = event.offsetX;
            var y = event.offsetY;
            canvas_obj.beginPath();
            canvas_obj.moveTo(x,y);
            canvas.onmousemove = function(event){
                var move_X = event.offsetX;
                var move_Y = event.offsetY;
                canvas_obj.lineTo(move_X,move_Y);
                canvas_obj.stroke();
                x = move_X;
                y = move_Y;
            }
            document.onmouseup = function(){
                canvas.onmousemove = null;
            }
        } 
    }
    
    window.onload = function(){
        init_Colour_box();
        init_Pencil();
        // decide which colour the user choose, then change the colour of pencil
        for(var i = 0;i<colour_select.length;i++){
            colour_select[i].onclick = function(){
                var select_which_colour = this.style.backgroundColor;
                canvas_obj.strokeStyle = select_which_colour;
                init_Pencil(select_which_colour);
            }
        }
        // clear the canvas
        clear_canvas[0].onclick = function(){
            canvas_obj.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        }
    }



});