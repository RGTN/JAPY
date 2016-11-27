#version 150

uniform mat4 viewProjectionMatrix;
uniform mat4 objectMatrix;

uniform float lightIntensity;
uniform float cosineCutoff;

in vec3 position;

void main(){
	vec2 xyScale = vec2(1.0 / cosineCutoff);
    gl_Position = viewProjectionMatrix * objectMatrix * vec4(position * vec3(xyScale, 1) * lightIntensity, 1.0);
}