
window.addEventListener( 'load', function(){
  if (!Detector.webgl) Detector.addGetWebGLMessage();
  
  var vertexShader = [
      'void main() {',
          'gl_Position = vec4( position, 1.0 );',
      '}'
  ].join('');
  
  var colorizeShader = [
      'uniform vec2 resolution;',
      'uniform sampler2D texture;',
      'uniform vec3 color1;',
      'uniform vec3 color2;',

      'void main( void ){',
          'vec2 uv = gl_FragCoord.xy / resolution;',
          'gl_FragColor = vec4( mix( ',
              'color1,',
              'color2,',
              'texture2D( texture, uv ).r',
          '), 1.0);',
      '}'
  ].join('');
  
  var gameOfLife = [
      'uniform int timer;',
      'uniform vec2 resolution;',
      'uniform bool mouseDown;',
      'uniform vec2 mouse;',
      'uniform sampler2D texture;',
      'uniform float brushSize;',

      'vec2 pos;',
      'vec2 texColor;',
      'vec2 offset;',
      'float pixelSize = 5.0;',

      'void main( void ){',
          'pos = vec2(',
              'floor( gl_FragCoord.x / pixelSize ) * pixelSize + pixelSize / 2.0,',
              'floor( gl_FragCoord.y / pixelSize ) * pixelSize + pixelSize / 2.0',
          ');',
      
          'vec3 color = texture2D( texture, pos / resolution ).rgb;',
      
          'float neighbors = 0.0;',
          'for( float y = -1.0; y <= 1.0; y++){',
              'for( float x = -1.0; x <= 1.0; x++){',
                  'neighbors += step(',
                      '0.5,',
                      'texture2D( texture, (pos + vec2(x * pixelSize, y * pixelSize ) ) / resolution ).r',
                  ');',
              '}',
          '}',
      
          'float status = step(0.5, color.r);', 
          'neighbors -= status;',
      
          // Dying
          'if( status == 1.0 && ( neighbors >= 4.0 || neighbors <= 1.0 )){',
            'color = vec3(0.49);',
          '}',
          // Birth
          'else if( status == 0.0 && neighbors == 3.0 ){',
              'color = vec3(1.0);',
          '}',
          'else if(mouseDown){',
              'if(floor(pos / (pixelSize * brushSize)) == floor(mouse / (pixelSize * brushSize))){',
                'color = vec3(1.0);',
              '}',
          '}',
          // Stasis
          
          'gl_FragColor = vec4(color, 1.0);',
      '}'
  ].join('');
  
  var w = window.innerWidth, h = window.innerHeight,
      camera, scene, renderer, uniforms,
      uniforms2, ctx, startText,
      bufferScene, ping, pong,
      timer = 0, mouse = { x : 0, y : 0 }, mouseDown = false;

  var params = {
      color1 : [ 30, 38, 48 ],
      color2 : [ 251, 53, 80 ]
  };

  ( function init() {
      var container = document.body;
      var color1 = new THREE.Vector3( params.color1[ 0 ] / 255, params.color1[ 1 ] / 255, params.color1[ 2 ] / 255 );
      var color2 = new THREE.Vector3( params.color2[ 0 ] / 255, params.color2[ 1 ] / 255, params.color2[ 2 ] / 255 );

      function setStartTex(){
          ctx.fillStyle = 'black';
          ctx.fillRect( 0, 0, w, h );
          ctx.font = '800 ' + h / 4 + 'px Roboto';
          ctx.fillStyle = 'yellow';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText( 'THE', w / 2, 0, w);
          ctx.fillText( 'GAME', w / 2, h/4 * 1, w);
          ctx.fillText( 'OF', w / 2, h/4 * 2, w);
          ctx.fillText( 'LIFE', w / 2, h/4 * 3, w);
      }

      ( function initStartTex(){
          var cnvs = document.createElement( 'canvas' );
          cnvs.width = w;
          cnvs.height = h;
          ctx = cnvs.getContext( '2d' );
          setStartTex();
          startText = new THREE.Texture( cnvs );
      } )();

      ( function setupPingPong(){
          bufferScene = new THREE.Scene();

          var renderTargetParams = {
              minFilter: THREE.LinearFilter,
              magFilter: THREE.LinearFilter,
              format: THREE.RGBAFormat,
              type: THREE.FloatType
          };

          ping = new THREE.WebGLRenderTarget( w, h, renderTargetParams );
          pong = new THREE.WebGLRenderTarget( w, h, renderTargetParams );
          ping.texture.wrapS = THREE.ClampToEdgeWrapping;
          ping.texture.wrapT = THREE.ClampToEdgeWrapping;
          pong.texture.wrapS = THREE.ClampToEdgeWrapping;
          pong.texture.wrapT = THREE.ClampToEdgeWrapping;

          uniforms2 = {
              brushSize : {
                  type: 'f',
                  value:  5.0
              },
              timer : {
                  type: 'i',
                  value: 0
              },
              resolution : {
                  type : 'v2',
                  value : new THREE.Vector2()
              },
              mouseDown : {
                  type: 'bool',
                  value : false,
              },
              mouse : {
                  type : 'v2',
                  value : new THREE.Vector2()
              },
              color1 : {
                  type : 'v3',
                  value : color1
              },
              color2 : {
                  type : 'v3',
                  value : color2
              },
              texture : {
                  type : 't',
                  value : startText
              },
              dA : {
                  type: 'f',
                  value : params.dA
              },
              dB : {
                  type: 'f',
                  value : params.dB
              },
              kill : {
                  type: 'f',
                  value : params.kill
              },
              feed : {
                  type: 'f',
                  value : params.feed
              },
              dT : {
                  type: 'f',
                  value : params.dT
              },
          };

          var material2 = new THREE.ShaderMaterial( {
              uniforms : uniforms2,
              vertexShader : vertexShader,
              fragmentShader : gameOfLife
          } );

          var geometry2 = new THREE.PlaneBufferGeometry( 2, 2 );

          var mesh2 = new THREE.Mesh( geometry2, material2 );
          bufferScene.add( mesh2 );

          startText.needsUpdate = true;
      } )();

      ( function setupScene(){
          renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setClearColor( 0x665544, 1 );
          container.appendChild( renderer.domElement );

          camera = new THREE.Camera();
          camera.position.z = 1;
          scene = new THREE.Scene();
          
          var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
          
          uniforms = {
              resolution : {
                  type : 'v2',
                  value : new THREE.Vector2( w, h )
              },
              texture : {
                  type : 't',
                  value : pong.texture,
                  minFilter : THREE.NearestFilter 
              },
              color1 : {
                  type : 'v3',
                  value : color1
              },
              color2 : {
                  type : 'v3',
                  value : color2
              }
          };
          
          var material = new THREE.ShaderMaterial( {
              uniforms : uniforms,
              vertexShader : vertexShader,
              fragmentShader : colorizeShader
          } );

          var mesh = new THREE.Mesh( geometry, material );
          scene.add( mesh );
      } )();
  } )();

  ( function setupEvents(){
      function updateMouse( canvas, evt ) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = evt.clientX - rect.left;
        mouse.y = evt.clientY - rect.top;
      }

      renderer.domElement.addEventListener('mousemove', function( evt ) {
          updateMouse( renderer.domElement, evt );
          uniforms2.mouse.value.x = mouse.x;
          uniforms2.mouse.value.y = (h - mouse.y);
      } );

      renderer.domElement.addEventListener('mousedown', function( evt ) {
        mouseDown = true;
        uniforms2.mouseDown.value = mouseDown;
      });

      renderer.domElement.addEventListener('mouseup', function( evt ) {
        mouseDown = false;
        uniforms2.mouseDown.value = mouseDown;
        console.log(mouseDown);
      });

      function onWindowResize( event ) {
          w = window.innerWidth;
          h = window.innerHeight;

          renderer.setSize( w, h );
          uniforms.resolution.value.x = w;
          uniforms.resolution.value.y = h;

          ping.setSize( w, h );
          pong.setSize( w, h );
          uniforms2.resolution.value.x = w;
          uniforms2.resolution.value.y = h;

          uniforms2.timer.value = 0;
          uniforms2.texture.value = startText;
      }
      onWindowResize();
      window.addEventListener( 'resize', onWindowResize, false );
  } )();

  ( function rendering(){
      var t=0;
      ( function render() {
          requestAnimationFrame( render );
          t++;
          if( t % 3 == 1 ){
              stepSim();

              renderer.render( scene, camera );
              ++ uniforms2.timer.value;
          }
      } )();

      function stepSim() {
          renderer.render( bufferScene, camera, ping, true );
          swapBuffers();
      }

      function swapBuffers() {
          var a = pong;
          pong = ping;
          ping = a;
          uniforms2.texture.value = pong.texture;
      }
  } )();
} );
