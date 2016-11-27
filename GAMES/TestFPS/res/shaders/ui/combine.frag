#version 150

uniform sampler2D color;
uniform sampler2D blur;

uniform float blurStrength;
uniform float distortion;

in vec2 texCoords;

out vec4 fragColor;

float dither(){
	return (-0.5 + fract(dot(gl_FragCoord.xy, vec2(0.5, 0.5)))) * (1.0 / 255.0);
}


void main(){
    
	vec4 c = texture(color, texCoords);
	vec4 b = texture(blur, texCoords);
	//b.rgb *= blurStrength;
	
	fragColor = vec4(c.rgb + b.rgb * (1.0 - c.a) * blurStrength, c.a);
	
    /*vec2 pos = texCoords * 2.0 - 1.0;
    float distLines = pos.y / ((1.0-distortion) + distortion*pos.x*pos.x);
    float lines = max(0.0, abs(fract(distLines * 100)*2.0 - 1.0) - 0.5) * 0.25;*/
    
	
	//fragColor = total;// * (1.0 - lines);
	//fragColor = total;
}