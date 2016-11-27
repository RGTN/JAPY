#version 150

#define ANTI_BLEED 1

uniform sampler2D shadowMap;

uniform float near;
uniform float lightIntensity;

float linearize(float depth){
	//return 2 / ((near + lightIntensity) - depth * (lightIntensity - near));
	//return 2 / (nearFar.x - depth * nearFar.y);
	//return depth;
	
	float n = near;
	float f = lightIntensity;
	return (2 * n) / (f + n - depth * (f - n)) * 2 - 1;
}


float inequality(vec2 moments, float depth){
	float sigmaSquared = moments.y - moments.x*moments.x;
	float dDepth = moments.x - depth;
	return max(float(depth <= moments.x), sigmaSquared / (sigmaSquared + dDepth*dDepth));
}

const float c = 40;

float shadow(vec2 coords, float d){
	vec4 moments = texture(shadowMap, coords.xy);
	float depth = linearize(d);
	//float depth = abs(linearize(d) - linearDepth / lightIntensity);
	
	float ineq0 = inequality(moments.xy, exp(c*depth));
	float ineq1 = inequality(moments.zw, -exp(-c*depth));
	float shadowValue = min(ineq0, ineq1);
	
	shadowValue = clamp(-ANTI_BLEED + (1+ANTI_BLEED) * shadowValue, 0.0, 1.0);
	
	return shadowValue*shadowValue; //Square to reduce bleeding and provide a better gradient.
	///return shadowValue;
	//return 100;
	
	//return step(depth, moments.x);
	
	//return depth * 10;
	//return moments.x;
}