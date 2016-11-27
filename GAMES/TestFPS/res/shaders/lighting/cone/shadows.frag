#version 150

uniform mat4 inverseViewLightMatrix;

uniform vec2 shadowOffset;
uniform vec2 shadowResolution;



float shadow(vec2 coords, float depth);

float shadowCone(vec3 eyeSpace){
	eyeSpace *= 0.9999; //Depth bias to handle to g-buffer imprecision
	
	vec4 shadowMapCoordinates = inverseViewLightMatrix * vec4(eyeSpace, 1.0);
	shadowMapCoordinates.xyz /= shadowMapCoordinates.w;
	
	shadowMapCoordinates = shadowMapCoordinates * 0.5 + 0.5;
	
    
    return shadow(shadowOffset + shadowResolution * shadowMapCoordinates.xy, shadowMapCoordinates.z);
}
