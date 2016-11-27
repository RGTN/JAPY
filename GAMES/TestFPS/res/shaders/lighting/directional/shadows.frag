#version 150

uniform mat4 inverseViewLightMatrix;
uniform float shadowDistance;


float shadow(vec2 coords, float depth);

float sample(vec2 center, float scale, vec2 offset, float z){
	return shadow(((center * scale * 0.5 + 0.5) + offset) * vec2(1.0/3, 0.5), z);
}

float shadowDirectional(vec3 eyeSpace){
	eyeSpace *= 0.9999; //Depth bias to handle to g-buffer imprecision
	
	float distance = sqrt(dot(eyeSpace, eyeSpace));
	
	if(distance > shadowDistance * 7.9){
		return 1.0;
	}
	
	
	vec3 shadowMapCoordinates = (inverseViewLightMatrix * vec4(eyeSpace, 1.0)).xyz;
	
	float z = shadowMapCoordinates.z * 0.5 + 0.5;
	
	
	float scale;
	vec2 offset;
	float alpha;
	
	// Depth of shadowmap
	float cascade1 = 1.0;
	float cascade2 = 2.0;
	float cascade3 = 4.0;
	float cascade4 = 8.0;
	
	// Scale of shadowmap
	float scale1 = 1.0 / cascade1;
	float scale2 = 1.0 / cascade2;
	float scale3 = 1.0 / cascade3;
	float scale4 = 1.0 / cascade4;
	
	// Ensure that the distance is within the cascade
	cascade1 -= 0.1;
	cascade2 -= 0.1;
	cascade3 -= 0.1;
	cascade4 -= 0.1;
	
	if(distance < shadowDistance * cascade1 ){
		scale = scale1;
		offset = vec2(0.0, 0.0);
		alpha = 1.0;
	}else
	 
	if(distance < shadowDistance * cascade2 ){
		scale = scale2;
		offset = vec2(1.0, 0.0);
		alpha = 1.0;
	}else
	
	if(distance < shadowDistance * cascade3 ){
		scale = scale3;
		offset = vec2(0.0, 1.0);
		alpha = 1.0;
	}else
	
	if(distance < shadowDistance * cascade4 ){
		scale = scale4;
		offset = vec2(1.0, 1.0);
		alpha = 1.0;
		//alpha = clamp((shadowDistance*cascade4 - distance) / (shadowDistance*cascade2), 0.0, 1.0);
	}
	
	return mix(1.0, sample(shadowMapCoordinates.xy, scale, offset, z), alpha);
    
}
