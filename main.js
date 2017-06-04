function ShootyController(o) { var c, ctx, def = {

    // ****************************
    //      Default Settings
    // ****************************
    
    // Shooter Color:
    'sc':          'blue',
            
    // Shooter Size:
    'ss':          15,
        
    // Bullet Color:
    'bc':          'red',
                
    // Bullet Size:
    'bs':          5,
    
    // Bullet Speed:
    's':           20
    }

    if (!o.parent) {
        console.log('var myVar = ShootyController({');
        console.log("(required)    'parent': Element");
        console.log("(optional)    'shooterColor': Any Web Color");
        console.log("(optional)    'shooterSize': Pixels");
        console.log("(optional)    'bulletColor': Any Web Color");
        console.log("(optional)    'bulletSize': Pixels");
        console.log("(optional)    'bulletSpeed': Pixels/Frame");
        console.log("});");
        return;
    }
    this.parent = o.parent;
    this.shooterColor = o.shooterColor ? o.shooterColor : def.sc;
    this.shooterSize = o.shooterSize ? o. shooterSize : def.ss;
    this.bulletColor = o.bulletColor ? o.bulletColor : def.bc;
    this.bulletSize = o.bulletSize ? o.bulletSize : def.bs;
    this.bulletSpeed = o.bulletSpeed ? o.bulletSpeed : def.s;
    
    var shooter = {
        'exists': false,
        'color': this.shooterColor,
        'size': this.shooterSize,
        'X': undefined,
        'Y': undefined,
        'fire': false
    },
        bullet = {
        'color': this.bulletColor,
        'size': this.bulletSize,
        'speed': this.bulletSpeed,
        'array': []
    },
        mouse = {
        'X': undefined,
        'Y': undefined,
        'D': undefined, //distance
        'A': undefined  //Angle
    },  canvas = document.createElement('canvas');
                              
    canvas.width = this.parent.clientWidth;
    canvas.height = this.parent.clientHeight;
    canvas.style.borderColor = shooter.color;
    
    this.parent.appendChild(canvas);
    
    canvas.onmousemove = function (e) {
        c = e.toElement
        ctx = c.getContext('2d');
        mouse.X = e.offsetX;
        mouse.Y = e.offsetY;    
        
        if (shooter.exists) {
            var a = mouse.X - shooter.X;
            var b = mouse.Y - shooter.Y;
            mouse.D = Math.sqrt(a*a + b*b);
            mouse.A = Math.atan2(b ,a);
        }
    };
    
    canvas.onmousedown = function () {
        if (!shooter.exists) { 
            shooter.X = mouse.X;
            shooter.Y = mouse.Y;
            shooter.exists = true;
        } else {
            if (mouse.D < shooter.size +1) shooter.exists = false;
            else shooter.fire = true;
        }
    }
    
    canvas.onmouseup = function () { shooter.fire = false; }
    canvas.onmouseout = function () { shooter.fire = false; }
    
    
    function animate() {
        requestAnimationFrame(animate)
        
        if (ctx) {
            ctx.clearRect(0, 0, c.width, c.height)
            
            if (shooter.fire) {
                bullet.array.push({
                    'X': shooter.X,
                    'Y': shooter.Y,
                    'vX': bullet.speed * Math.cos(mouse.A),
                    'vY': bullet.speed * Math.sin(mouse.A)
            }); }
                  
            if (bullet.array.length > 0) {
                for(var i = bullet.array.length -1; i >= 0; i--) {
                    
                    var b = bullet.array[i]
                    ctx.beginPath();
                    ctx.arc(b.X, b.Y, bullet.size, 0, 2* Math.PI);
                    ctx.stroke();
                    ctx.fillStyle = bullet.color;
                    ctx.fill();

                    b.X += b.vX;
                    b.Y += b.vY;

                    if (b.X > c.width || b.X < 0 || b.Y > c.height || b.Y < 0) bullet.array.splice(i, 1);
            } }
            
            if (shooter.exists) {
                ctx.beginPath();
                ctx.arc(shooter.X, shooter.Y, shooter.size, 0, 2* Math.PI);
                ctx.stroke();
                ctx.fillStyle = shooter.color;
                ctx.fill();
            }
        }
    }
    animate();
}