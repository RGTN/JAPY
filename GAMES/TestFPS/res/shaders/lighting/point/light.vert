#version 150

uniform mat4 projectionMatrix;

uniform vec3 lightEyePosition;
uniform float lightIntensity;

in vec3 position;

void main(){
	vec3 eyeSpace = lightEyePosition + position * lightIntensity * 1.025;
	vec4 pos = projectionMatrix * vec4(eyeSpace, 1.0);
	
	//Prevents the light volume from being clipped by the far plane.
	//This is not a noticeable problem for the near plane, and clamping
	//it to the near plane can cause a very heavy performance hits since
	//it'll almost definitely cover the whole screen in that case.
	//pos.z = min(pos.z, pos.w);
	
    gl_Position = pos;
}