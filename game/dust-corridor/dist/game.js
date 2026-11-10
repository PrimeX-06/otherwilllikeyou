const Fi="srgb",sa="srgb-linear",io="linear",ge="srgb";const Ui="300 es";class ra{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,r=n.length;s<r;s++)n[s].call(this,t);t.target=null}}}const je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hc=1234567;const Pa=Math.PI/180,Ia=180/Math.PI;function oa(){const a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(je[a&255]+je[a>>8&255]+je[a>>16&255]+je[a>>24&255]+"-"+je[t&255]+je[t>>8&255]+"-"+je[t>>16&15|64]+je[t>>24&255]+"-"+je[e&63|128]+je[e>>8&255]+"-"+je[e>>16&255]+je[e>>24&255]+je[i&255]+je[i>>8&255]+je[i>>16&255]+je[i>>24&255]).toLowerCase()}function ne(a,t,e){return Math.max(t,Math.min(e,a))}function Kl(a,t){return(a%t+t)%t}function md(a,t,e,i,n){return i+(a-t)*(n-i)/(e-t)}function gd(a,t,e){return a!==t?(e-a)/(t-a):0}function La(a,t,e){return(1-e)*a+e*t}function vd(a,t,e,i){return La(a,t,1-Math.exp(-e*i))}function _d(a,t=1){return t-Math.abs(Kl(a,t*2)-t)}function xd(a,t,e){return a<=t?0:a>=e?1:(a=(a-t)/(e-t),a*a*(3-2*a))}function yd(a,t,e){return a<=t?0:a>=e?1:(a=(a-t)/(e-t),a*a*a*(a*(a*6-15)+10))}function Sd(a,t){return a+Math.floor(Math.random()*(t-a+1))}function wd(a,t){return a+Math.random()*(t-a)}function Md(a){return a*(.5-Math.random())}function bd(a){a!==void 0&&(hc=a);let t=hc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Td(a){return a*Pa}function Ed(a){return a*Ia}function Ad(a){return(a&a-1)===0&&a!==0}function Cd(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function Rd(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function Pd(a,t,e,i,n){const s=Math.cos,r=Math.sin,o=s(e/2),l=r(e/2),c=s((t+i)/2),h=r((t+i)/2),u=s((t-i)/2),d=r((t-i)/2),g=s((i-t)/2),m=r((i-t)/2);switch(n){case"XYX":a.set(o*h,l*u,l*d,o*c);break;case"YZY":a.set(l*d,o*h,l*u,o*c);break;case"ZXZ":a.set(l*u,l*d,o*h,o*c);break;case"XZX":a.set(o*h,l*m,l*g,o*c);break;case"YXY":a.set(l*g,o*h,l*m,o*c);break;case"ZYZ":a.set(l*m,l*g,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function ea(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function ai(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}const Ht={DEG2RAD:Pa,RAD2DEG:Ia,generateUUID:oa,clamp:ne,euclideanModulo:Kl,mapLinear:md,inverseLerp:gd,lerp:La,damp:vd,pingpong:_d,smoothstep:xd,smootherstep:yd,randInt:Sd,randFloat:wd,randFloatSpread:Md,seededRandom:bd,degToRad:Td,radToDeg:Ed,isPowerOfTwo:Ad,ceilPowerOfTwo:Cd,floorPowerOfTwo:Rd,setQuaternionFromProperEuler:Pd,normalize:ai,denormalize:ea};class It{constructor(t=0,e=0){It.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*n+t.x,this.y=s*n+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,r,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const d=s[r+0],g=s[r+1],m=s[r+2],v=s[r+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=g,t[e+2]=m,t[e+3]=v;return}if(u!==v||l!==d||c!==g||h!==m){let p=1-o;const f=l*d+c*g+h*m+u*v,S=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const M=Math.sqrt(x),T=Math.atan2(M,f*S);p=Math.sin(p*T)/M,o=Math.sin(o*T)/M}const _=o*S;if(l=l*p+d*_,c=c*p+g*_,h=h*p+m*_,u=u*p+v*_,p===1-o){const M=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=M,c*=M,h*=M,u*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,s,r){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=s[r],d=s[r+1],g=s[r+2],m=s[r+3];return t[e]=o*m+h*u+l*g-c*d,t[e+1]=l*m+h*d+c*u-o*g,t[e+2]=c*m+h*g+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(s/2),d=l(i/2),g=l(n/2),m=l(s/2);switch(r){case"XYZ":this._x=d*h*u+c*g*m,this._y=c*g*u-d*h*m,this._z=c*h*m+d*g*u,this._w=c*h*u-d*g*m;break;case"YXZ":this._x=d*h*u+c*g*m,this._y=c*g*u-d*h*m,this._z=c*h*m-d*g*u,this._w=c*h*u+d*g*m;break;case"ZXY":this._x=d*h*u-c*g*m,this._y=c*g*u+d*h*m,this._z=c*h*m+d*g*u,this._w=c*h*u-d*g*m;break;case"ZYX":this._x=d*h*u-c*g*m,this._y=c*g*u+d*h*m,this._z=c*h*m-d*g*u,this._w=c*h*u+d*g*m;break;case"YZX":this._x=d*h*u+c*g*m,this._y=c*g*u+d*h*m,this._z=c*h*m-d*g*u,this._w=c*h*u-d*g*m;break;case"XZY":this._x=d*h*u-c*g*m,this._y=c*g*u-d*h*m,this._z=c*h*m+d*g*u,this._w=c*h*u+d*g*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],r=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-l)*g,this._y=(s-c)*g,this._z=(r-n)*g}else if(i>o&&i>u){const g=2*Math.sqrt(1+i-o-u);this._w=(h-l)/g,this._x=.25*g,this._y=(n+r)/g,this._z=(s+c)/g}else if(o>u){const g=2*Math.sqrt(1+o-i-u);this._w=(s-c)/g,this._x=(n+r)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+u-i-o);this._w=(r-n)/g,this._x=(s+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,r=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+r*o+n*c-s*l,this._y=n*h+r*l+s*o-i*c,this._z=s*h+r*c+i*l-n*o,this._w=r*h-i*o-n*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,s=this._z,r=this._w;let o=r*t._w+i*t._x+n*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=n,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const g=1-e;return this._w=g*r+e*this._w,this._x=g*i+e*this._x,this._y=g*n+e*this._y,this._z=g*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=r*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class y{constructor(t=0,e=0,i=0){y.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(uc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(uc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,r=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*r,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*r,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*n-o*i),h=2*(o*e-s*n),u=2*(s*i-r*e);return this.x=e+l*c+r*u-o*h,this.y=i+l*h+o*c-s*u,this.z=n+l*u+s*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,r=e.x,o=e.y,l=e.z;return this.x=n*l-s*o,this.y=s*r-i*l,this.z=i*o-n*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return fo.copy(this).projectOnVector(t),this.sub(fo)}reflect(t){return this.sub(fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fo=new y,uc=new Qe;class qt{constructor(t,e,i,n,s,r,o,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,r,o,l,c)}set(t,e,i,n,s,r,o,l,c){const h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],g=i[5],m=i[8],v=n[0],p=n[3],f=n[6],S=n[1],x=n[4],_=n[7],M=n[2],T=n[5],E=n[8];return s[0]=r*v+o*S+l*M,s[3]=r*p+o*x+l*T,s[6]=r*f+o*_+l*E,s[1]=c*v+h*S+u*M,s[4]=c*p+h*x+u*T,s[7]=c*f+h*_+u*E,s[2]=d*v+g*S+m*M,s[5]=d*p+g*x+m*T,s[8]=d*f+g*_+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*r*h-e*o*c-i*s*h+i*o*l+n*s*c-n*r*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*r-o*c,d=o*l-h*s,g=c*s-r*l,m=e*u+i*d+n*g;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(n*c-h*i)*v,t[2]=(o*i-n*r)*v,t[3]=d*v,t[4]=(h*e-n*l)*v,t[5]=(n*s-o*e)*v,t[6]=g*v,t[7]=(i*l-c*e)*v,t[8]=(r*e-i*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-n*c,n*l,-n*(-c*r+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(po.makeScale(t,e)),this}rotate(t){return this.premultiply(po.makeRotation(-t)),this}translate(t,e){return this.premultiply(po.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const po=new qt;function Ou(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function no(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function Ld(){const a=no("canvas");return a.style.display="block",a}const dc={};function Fa(a){a in dc||(dc[a]=!0,console.warn(a))}function Dd(a,t,e){return new Promise(function(i,n){function s(){switch(a.clientWaitSync(t,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:n();break;case a.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}const fc=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pc=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Id(){const a={enabled:!0,workingColorSpace:sa,spaces:{},convert:function(n,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ge&&(n.r=gn(n.r),n.g=gn(n.g),n.b=gn(n.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ge&&(n.r=na(n.r),n.g=na(n.g),n.b=na(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===""?io:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,r){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return Fa("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return Fa("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return a.define({[sa]:{primaries:t,whitePoint:i,transfer:io,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fi},outputColorSpaceConfig:{drawingBufferColorSpace:Fi}},[Fi]:{primaries:t,whitePoint:i,transfer:ge,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fi}}}),a}const he=Id();function gn(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function na(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let Ts;class Fd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ts===void 0&&(Ts=no("canvas")),Ts.width=t.width,Ts.height=t.height;const n=Ts.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Ts}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=no("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let r=0;r<s.length;r++)s[r]=gn(s[r]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(gn(e[i]/255)*255):e[i]=gn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ud=0;class Yl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=oa(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let r=0,o=n.length;r<o;r++)n[r].isDataTexture?s.push(mo(n[r].image)):s.push(mo(n[r]))}else s=mo(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function mo(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Fd.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bd=0;const go=new y;class li extends ra{constructor(t=li.DEFAULT_IMAGE,e=li.DEFAULT_MAPPING,i=1001,n=1001,s=1006,r=1008,o=1023,l=1009,c=li.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=oa(),this.name="",this.source=new Yl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(go).x}get height(){return this.source.getSize(go).y}get depth(){return this.source.getSize(go).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==300)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case 1e3:t.x=t.x-Math.floor(t.x);break;case 1001:t.x=t.x<0?0:1;break;case 1002:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case 1e3:t.y=t.y-Math.floor(t.y);break;case 1001:t.y=t.y<0?0:1;break;case 1002:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}li.DEFAULT_IMAGE=null;li.DEFAULT_MAPPING=300;li.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,e=0,i=0,n=1){be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n+r[12]*s,this.y=r[1]*e+r[5]*i+r[9]*n+r[13]*s,this.z=r[2]*e+r[6]*i+r[10]*n+r[14]*s,this.w=r[3]*e+r[7]*i+r[11]*n+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],g=l[5],m=l[9],v=l[2],p=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+p)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(g+1)/2,M=(f+1)/2,T=(h+d)/4,E=(u+v)/4,R=(m+p)/4;return x>_&&x>M?x<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(x),n=T/i,s=E/i):_>M?_<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(_),i=T/n,s=R/n):M<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(M),i=E/s,n=R/s),this.set(i,n,s,e),this}let S=Math.sqrt((p-m)*(p-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(p-m)/S,this.y=(u-v)/S,this.z=(d-h)/S,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nd extends ra{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new li(n);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isArrayTexture=this.textures[n].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Yl(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ye extends Nd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class $l extends li{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qr extends ye{constructor(t=1,e=1,i=1,n={}){super(t,e,n),this.isWebGLArrayRenderTarget=!0,this.depth=i,this.texture=new $l(null,t,e,i),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}}class ku extends li{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _n{constructor(t=new y(1/0,1/0,1/0),e=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Bi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Bi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Bi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Bi):Bi.fromBufferAttribute(s,r),Bi.applyMatrix4(t.matrixWorld),this.expandByPoint(Bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),za.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),za.copy(i.boundingBox)),za.applyMatrix4(t.matrixWorld),this.union(za)}const n=t.children;for(let s=0,r=n.length;s<r;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bi),Bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ua),Va.subVectors(this.max,ua),Es.subVectors(t.a,ua),As.subVectors(t.b,ua),Cs.subVectors(t.c,ua),xn.subVectors(As,Es),yn.subVectors(Cs,As),Hn.subVectors(Es,Cs);let e=[0,-xn.z,xn.y,0,-yn.z,yn.y,0,-Hn.z,Hn.y,xn.z,0,-xn.x,yn.z,0,-yn.x,Hn.z,0,-Hn.x,-xn.y,xn.x,0,-yn.y,yn.x,0,-Hn.y,Hn.x,0];return!vo(e,Es,As,Cs,Va)||(e=[1,0,0,0,1,0,0,0,1],!vo(e,Es,As,Cs,Va))?!1:(Ha.crossVectors(xn,yn),e=[Ha.x,Ha.y,Ha.z],vo(e,Es,As,Cs,Va))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const tn=[new y,new y,new y,new y,new y,new y,new y,new y],Bi=new y,za=new _n,Es=new y,As=new y,Cs=new y,xn=new y,yn=new y,Hn=new y,ua=new y,Va=new y,Ha=new y,Gn=new y;function vo(a,t,e,i,n){for(let s=0,r=a.length-3;s<=r;s+=3){Gn.fromArray(a,s);const o=n.x*Math.abs(Gn.x)+n.y*Math.abs(Gn.y)+n.z*Math.abs(Gn.z),l=t.dot(Gn),c=e.dot(Gn),h=i.dot(Gn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Od=new _n,da=new y,_o=new y;class Ss{constructor(t=new y,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Od.setFromPoints(t).getCenter(i);let n=0;for(let s=0,r=t.length;s<r;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;da.subVectors(t,this.center);const e=da.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(da,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(da.copy(t.center).add(_o)),this.expandByPoint(da.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const en=new y,xo=new y,Ga=new y,Sn=new y,yo=new y,Wa=new y,So=new y;class kd{constructor(t=new y,e=new y(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,en)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=en.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(en.copy(this.origin).addScaledVector(this.direction,e),en.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){xo.copy(t).add(e).multiplyScalar(.5),Ga.copy(e).sub(t).normalize(),Sn.copy(this.origin).sub(xo);const s=t.distanceTo(e)*.5,r=-this.direction.dot(Ga),o=Sn.dot(this.direction),l=-Sn.dot(Ga),c=Sn.lengthSq(),h=Math.abs(1-r*r);let u,d,g,m;if(h>0)if(u=r*l-o,d=r*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,g=u*(u+r*d+2*o)+d*(r*u+d+2*l)+c}else d=s,u=Math.max(0,-(r*d+o)),g=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(r*d+o)),g=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-r*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),g=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),g=d*(d+2*l)+c):(u=Math.max(0,-(r*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),g=-u*u+d*(d+2*l)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+o)),g=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(xo).addScaledVector(Ga,d),g}intersectSphere(t,e){en.subVectors(t.center,this.origin);const i=en.dot(this.direction),n=en.dot(en)-i*i,s=t.radius*t.radius;if(n>s)return null;const r=Math.sqrt(s-n),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,n=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,n=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),i>r||s>n||((s>i||isNaN(i))&&(i=s),(r<n||isNaN(n))&&(n=r),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,en)!==null}intersectTriangle(t,e,i,n,s){yo.subVectors(e,t),Wa.subVectors(i,t),So.crossVectors(yo,Wa);let r=this.direction.dot(So),o;if(r>0){if(n)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Sn.subVectors(this.origin,t);const l=o*this.direction.dot(Wa.crossVectors(Sn,Wa));if(l<0)return null;const c=o*this.direction.dot(yo.cross(Sn));if(c<0||l+c>r)return null;const h=-o*Sn.dot(So);return h<0?null:this.at(h/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nt{constructor(t,e,i,n,s,r,o,l,c,h,u,d,g,m,v,p){Nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,r,o,l,c,h,u,d,g,m,v,p)}set(t,e,i,n,s,r,o,l,c,h,u,d,g,m,v,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=n,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=g,f[7]=m,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/Rs.setFromMatrixColumn(t,0).length(),s=1/Rs.setFromMatrixColumn(t,1).length(),r=1/Rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=r*h,g=r*u,m=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=g+m*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=m+g*c,e[10]=r*l}else if(t.order==="YXZ"){const d=l*h,g=l*u,m=c*h,v=c*u;e[0]=d+v*o,e[4]=m*o-g,e[8]=r*c,e[1]=r*u,e[5]=r*h,e[9]=-o,e[2]=g*o-m,e[6]=v+d*o,e[10]=r*l}else if(t.order==="ZXY"){const d=l*h,g=l*u,m=c*h,v=c*u;e[0]=d-v*o,e[4]=-r*u,e[8]=m+g*o,e[1]=g+m*o,e[5]=r*h,e[9]=v-d*o,e[2]=-r*c,e[6]=o,e[10]=r*l}else if(t.order==="ZYX"){const d=r*h,g=r*u,m=o*h,v=o*u;e[0]=l*h,e[4]=m*c-g,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=g*c-m,e[2]=-c,e[6]=o*l,e[10]=r*l}else if(t.order==="YZX"){const d=r*l,g=r*c,m=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=m*u+g,e[1]=u,e[5]=r*h,e[9]=-o*h,e[2]=-c*h,e[6]=g*u+m,e[10]=d-v*u}else if(t.order==="XZY"){const d=r*l,g=r*c,m=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=r*h,e[9]=g*u-m,e[2]=m*u-g,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zd,t,Vd)}lookAt(t,e,i){const n=this.elements;return vi.subVectors(t,e),vi.lengthSq()===0&&(vi.z=1),vi.normalize(),wn.crossVectors(i,vi),wn.lengthSq()===0&&(Math.abs(i.z)===1?vi.x+=1e-4:vi.z+=1e-4,vi.normalize(),wn.crossVectors(i,vi)),wn.normalize(),qa.crossVectors(vi,wn),n[0]=wn.x,n[4]=qa.x,n[8]=vi.x,n[1]=wn.y,n[5]=qa.y,n[9]=vi.y,n[2]=wn.z,n[6]=qa.z,n[10]=vi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],g=i[13],m=i[2],v=i[6],p=i[10],f=i[14],S=i[3],x=i[7],_=i[11],M=i[15],T=n[0],E=n[4],R=n[8],w=n[12],b=n[1],L=n[5],P=n[9],B=n[13],k=n[2],F=n[6],N=n[10],z=n[14],U=n[3],W=n[7],J=n[11],tt=n[15];return s[0]=r*T+o*b+l*k+c*U,s[4]=r*E+o*L+l*F+c*W,s[8]=r*R+o*P+l*N+c*J,s[12]=r*w+o*B+l*z+c*tt,s[1]=h*T+u*b+d*k+g*U,s[5]=h*E+u*L+d*F+g*W,s[9]=h*R+u*P+d*N+g*J,s[13]=h*w+u*B+d*z+g*tt,s[2]=m*T+v*b+p*k+f*U,s[6]=m*E+v*L+p*F+f*W,s[10]=m*R+v*P+p*N+f*J,s[14]=m*w+v*B+p*z+f*tt,s[3]=S*T+x*b+_*k+M*U,s[7]=S*E+x*L+_*F+M*W,s[11]=S*R+x*P+_*N+M*J,s[15]=S*w+x*B+_*z+M*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],g=t[14],m=t[3],v=t[7],p=t[11],f=t[15];return m*(+s*l*u-n*c*u-s*o*d+i*c*d+n*o*g-i*l*g)+v*(+e*l*g-e*c*d+s*r*d-n*r*g+n*c*h-s*l*h)+p*(+e*c*u-e*o*g-s*r*u+i*r*g+s*o*h-i*c*h)+f*(-n*o*h-e*l*u+e*o*d+n*r*u-i*r*d+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],g=t[11],m=t[12],v=t[13],p=t[14],f=t[15],S=u*p*c-v*d*c+v*l*g-o*p*g-u*l*f+o*d*f,x=m*d*c-h*p*c-m*l*g+r*p*g+h*l*f-r*d*f,_=h*v*c-m*u*c+m*o*g-r*v*g-h*o*f+r*u*f,M=m*u*l-h*v*l-m*o*d+r*v*d+h*o*p-r*u*p,T=e*S+i*x+n*_+s*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=S*E,t[1]=(v*d*s-u*p*s-v*n*g+i*p*g+u*n*f-i*d*f)*E,t[2]=(o*p*s-v*l*s+v*n*c-i*p*c-o*n*f+i*l*f)*E,t[3]=(u*l*s-o*d*s-u*n*c+i*d*c+o*n*g-i*l*g)*E,t[4]=x*E,t[5]=(h*p*s-m*d*s+m*n*g-e*p*g-h*n*f+e*d*f)*E,t[6]=(m*l*s-r*p*s-m*n*c+e*p*c+r*n*f-e*l*f)*E,t[7]=(r*d*s-h*l*s+h*n*c-e*d*c-r*n*g+e*l*g)*E,t[8]=_*E,t[9]=(m*u*s-h*v*s-m*i*g+e*v*g+h*i*f-e*u*f)*E,t[10]=(r*v*s-m*o*s+m*i*c-e*v*c-r*i*f+e*o*f)*E,t[11]=(h*o*s-r*u*s-h*i*c+e*u*c+r*i*g-e*o*g)*E,t[12]=M*E,t[13]=(h*v*n-m*u*n+m*i*d-e*v*d-h*i*p+e*u*p)*E,t[14]=(m*o*n-r*v*n-m*i*l+e*v*l+r*i*p-e*o*p)*E,t[15]=(r*u*n-h*o*n+h*i*l-e*u*l-r*i*d+e*o*d)*E,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,h=s*o;return this.set(c*r+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*r,0,c*l-n*o,h*l+n*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,r){return this.set(1,i,s,0,t,1,r,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,r=e._y,o=e._z,l=e._w,c=s+s,h=r+r,u=o+o,d=s*c,g=s*h,m=s*u,v=r*h,p=r*u,f=o*u,S=l*c,x=l*h,_=l*u,M=i.x,T=i.y,E=i.z;return n[0]=(1-(v+f))*M,n[1]=(g+_)*M,n[2]=(m-x)*M,n[3]=0,n[4]=(g-_)*T,n[5]=(1-(d+f))*T,n[6]=(p+S)*T,n[7]=0,n[8]=(m+x)*E,n[9]=(p-S)*E,n[10]=(1-(d+v))*E,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=Rs.set(n[0],n[1],n[2]).length();const r=Rs.set(n[4],n[5],n[6]).length(),o=Rs.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],Ni.copy(this);const c=1/s,h=1/r,u=1/o;return Ni.elements[0]*=c,Ni.elements[1]*=c,Ni.elements[2]*=c,Ni.elements[4]*=h,Ni.elements[5]*=h,Ni.elements[6]*=h,Ni.elements[8]*=u,Ni.elements[9]*=u,Ni.elements[10]*=u,e.setFromRotationMatrix(Ni),i.x=s,i.y=r,i.z=o,this}makePerspective(t,e,i,n,s,r,o=2e3,l=!1){const c=this.elements,h=2*s/(e-t),u=2*s/(i-n),d=(e+t)/(e-t),g=(i+n)/(i-n);let m,v;if(l)m=s/(r-s),v=r*s/(r-s);else if(o===2e3)m=-(r+s)/(r-s),v=-2*r*s/(r-s);else if(o===2001)m=-r/(r-s),v=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,s,r,o=2e3,l=!1){const c=this.elements,h=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),g=-(i+n)/(i-n);let m,v;if(l)m=1/(r-s),v=r/(r-s);else if(o===2e3)m=-2/(r-s),v=-(r+s)/(r-s);else if(o===2001)m=-1/(r-s),v=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Rs=new y,Ni=new Nt,zd=new y(0,0,0),Vd=new y(1,1,1),wn=new y,qa=new y,vi=new y,mc=new Nt,gc=new Qe;class oe{constructor(t=0,e=0,i=0,n=oe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],r=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],g=n[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-ne(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return mc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return gc.setFromEuler(this),this.setFromQuaternion(gc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oe.DEFAULT_ORDER="XYZ";class zu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hd=0;const vc=new y,Ps=new Qe,nn=new Nt,Xa=new y,fa=new y,Gd=new y,Wd=new Qe,_c=new y(1,0,0),xc=new y(0,1,0),yc=new y(0,0,1),Sc={type:"added"},qd={type:"removed"},Ls={type:"childadded",child:null},wo={type:"childremoved",child:null};class bi extends ra{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=oa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bi.DEFAULT_UP.clone();const t=new y,e=new oe,i=new Qe,n=new y(1,1,1);function s(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Nt},normalMatrix:{value:new qt}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=bi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.premultiply(Ps),this}rotateX(t){return this.rotateOnAxis(_c,t)}rotateY(t){return this.rotateOnAxis(xc,t)}rotateZ(t){return this.rotateOnAxis(yc,t)}translateOnAxis(t,e){return vc.copy(t).applyQuaternion(this.quaternion),this.position.add(vc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(_c,t)}translateY(t){return this.translateOnAxis(xc,t)}translateZ(t){return this.translateOnAxis(yc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(nn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xa.copy(t):Xa.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?nn.lookAt(fa,Xa,this.up):nn.lookAt(Xa,fa,this.up),this.quaternion.setFromRotationMatrix(nn),n&&(nn.extractRotation(n.matrixWorld),Ps.setFromRotationMatrix(nn),this.quaternion.premultiply(Ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sc),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qd),wo.child=t,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(nn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sc),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,t,Gd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,Wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));n.material=o}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(t.animations,l))}}if(e){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),g=r(t.animations),m=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),m.length>0&&(i.nodes=m)}return i.object=n,i;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}bi.DEFAULT_UP=new y(0,1,0);bi.DEFAULT_MATRIX_AUTO_UPDATE=!0;bi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Oi=new y,sn=new y,Mo=new y,an=new y,Ds=new y,Is=new y,wc=new y,bo=new y,To=new y,Eo=new y,Ao=new be,Co=new be,Ro=new be;class Wi{constructor(t=new y,e=new y,i=new y){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Oi.subVectors(t,e),n.cross(Oi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){Oi.subVectors(n,e),sn.subVectors(i,e),Mo.subVectors(t,e);const r=Oi.dot(Oi),o=Oi.dot(sn),l=Oi.dot(Mo),c=sn.dot(sn),h=sn.dot(Mo),u=r*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,g=(c*l-o*h)*d,m=(r*h-o*l)*d;return s.set(1-g-m,m,g)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getInterpolation(t,e,i,n,s,r,o,l){return this.getBarycoord(t,e,i,n,an)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,an.x),l.addScaledVector(r,an.y),l.addScaledVector(o,an.z),l)}static getInterpolatedAttribute(t,e,i,n,s,r){return Ao.setScalar(0),Co.setScalar(0),Ro.setScalar(0),Ao.fromBufferAttribute(t,e),Co.fromBufferAttribute(t,i),Ro.fromBufferAttribute(t,n),r.setScalar(0),r.addScaledVector(Ao,s.x),r.addScaledVector(Co,s.y),r.addScaledVector(Ro,s.z),r}static isFrontFacing(t,e,i,n){return Oi.subVectors(i,e),sn.subVectors(t,e),Oi.cross(sn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Oi.subVectors(this.c,this.b),sn.subVectors(this.a,this.b),Oi.cross(sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Wi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return Wi.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return Wi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let r,o;Ds.subVectors(n,i),Is.subVectors(s,i),bo.subVectors(t,i);const l=Ds.dot(bo),c=Is.dot(bo);if(l<=0&&c<=0)return e.copy(i);To.subVectors(t,n);const h=Ds.dot(To),u=Is.dot(To);if(h>=0&&u<=h)return e.copy(n);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),e.copy(i).addScaledVector(Ds,r);Eo.subVectors(t,s);const g=Ds.dot(Eo),m=Is.dot(Eo);if(m>=0&&g<=m)return e.copy(s);const v=g*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(i).addScaledVector(Is,o);const p=h*m-g*u;if(p<=0&&u-h>=0&&g-m>=0)return wc.subVectors(s,n),o=(u-h)/(u-h+(g-m)),e.copy(n).addScaledVector(wc,o);const f=1/(p+v+d);return r=v*f,o=d*f,e.copy(i).addScaledVector(Ds,r).addScaledVector(Is,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},Ka={h:0,s:0,l:0};function Po(a,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?a+(t-a)*6*e:e<1/2?t:e<2/3?a+(t-a)*6*(2/3-e):a}class re{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=he.workingColorSpace){return this.r=t,this.g=e,this.b=i,he.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=he.workingColorSpace){if(t=Kl(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,r=2*i-s;this.r=Po(r,s,t+1/3),this.g=Po(r,s,t),this.b=Po(r,s,t-1/3)}return he.colorSpaceToWorking(this,n),this}setStyle(t,e=Fi){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fi){const i=Vu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gn(t.r),this.g=gn(t.g),this.b=gn(t.b),this}copyLinearToSRGB(t){return this.r=na(t.r),this.g=na(t.g),this.b=na(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fi){return he.workingToColorSpace(Ze.copy(this),t),Math.round(ne(Ze.r*255,0,255))*65536+Math.round(ne(Ze.g*255,0,255))*256+Math.round(ne(Ze.b*255,0,255))}getHexString(t=Fi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.workingToColorSpace(Ze.copy(this),e);const i=Ze.r,n=Ze.g,s=Ze.b,r=Math.max(i,n,s),o=Math.min(i,n,s);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=h<=.5?u/(r+o):u/(2-r-o),r){case i:l=(n-s)/u+(n<s?6:0);break;case n:l=(s-i)/u+2;break;case s:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.workingToColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=Fi){he.workingToColorSpace(Ze.copy(this),t);const e=Ze.r,i=Ze.g,n=Ze.b;return t!==Fi?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Mn),this.setHSL(Mn.h+t,Mn.s+e,Mn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Mn),t.getHSL(Ka);const i=La(Mn.h,Ka.h,e),n=La(Mn.s,Ka.s,e),s=La(Mn.l,Ka.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ze=new re;re.NAMES=Vu;let Xd=0;class ro extends ra{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=oa(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(e){const s=n(t.textures),r=n(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Hu extends ro{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oe,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ne=new y,Ya=new It;let Kd=0;class Xt{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ya.fromBufferAttribute(this,e),Ya.applyMatrix3(t),this.setXY(e,Ya.x,Ya.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ea(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ai(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ea(e,this.array)),e}setX(t,e){return this.normalized&&(e=ai(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ea(e,this.array)),e}setY(t,e){return this.normalized&&(e=ai(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ea(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ai(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ea(e,this.array)),e}setW(t,e){return this.normalized&&(e=ai(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ai(e,this.array),i=ai(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ai(e,this.array),i=ai(i,this.array),n=ai(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=ai(e,this.array),i=ai(i,this.array),n=ai(n,this.array),s=ai(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==35044&&(t.usage=this.usage),t}}class Gu extends Xt{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Wu extends Xt{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ti extends Xt{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Yd=0;const Ri=new Nt,Lo=new bi,Fs=new y,_i=new _n,pa=new _n,Xe=new y;class ti extends ra{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=oa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ou(t)?Wu:Gu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new qt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ri.makeRotationFromQuaternion(t),this.applyMatrix4(Ri),this}rotateX(t){return Ri.makeRotationX(t),this.applyMatrix4(Ri),this}rotateY(t){return Ri.makeRotationY(t),this.applyMatrix4(Ri),this}rotateZ(t){return Ri.makeRotationZ(t),this.applyMatrix4(Ri),this}translate(t,e,i){return Ri.makeTranslation(t,e,i),this.applyMatrix4(Ri),this}scale(t,e,i){return Ri.makeScale(t,e,i),this.applyMatrix4(Ri),this}lookAt(t){return Lo.lookAt(t),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ti(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _n);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];_i.setFromBufferAttribute(s),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,_i.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,_i.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(_i.min),this.boundingBox.expandByPoint(_i.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(t){const i=this.boundingSphere.center;if(_i.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const o=e[s];pa.setFromBufferAttribute(o),this.morphTargetsRelative?(Xe.addVectors(_i.min,pa.min),_i.expandByPoint(Xe),Xe.addVectors(_i.max,pa.max),_i.expandByPoint(Xe)):(_i.expandByPoint(pa.min),_i.expandByPoint(pa.max))}_i.getCenter(i);let n=0;for(let s=0,r=t.count;s<r;s++)Xe.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Xe));if(e)for(let s=0,r=e.length;s<r;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Xe.fromBufferAttribute(o,c),l&&(Fs.fromBufferAttribute(t,c),Xe.add(Fs)),n=Math.max(n,i.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xt(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new y,l[R]=new y;const c=new y,h=new y,u=new y,d=new It,g=new It,m=new It,v=new y,p=new y;function f(R,w,b){c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,b),d.fromBufferAttribute(s,R),g.fromBufferAttribute(s,w),m.fromBufferAttribute(s,b),h.sub(c),u.sub(c),g.sub(d),m.sub(d);const L=1/(g.x*m.y-m.x*g.y);isFinite(L)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-g.y).multiplyScalar(L),p.copy(u).multiplyScalar(g.x).addScaledVector(h,-m.x).multiplyScalar(L),o[R].add(v),o[w].add(v),o[b].add(v),l[R].add(p),l[w].add(p),l[b].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let R=0,w=S.length;R<w;++R){const b=S[R],L=b.start,P=b.count;for(let B=L,k=L+P;B<k;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const x=new y,_=new y,M=new y,T=new y;function E(R){M.fromBufferAttribute(n,R),T.copy(M);const w=o[R];x.copy(w),x.sub(M.multiplyScalar(M.dot(w))).normalize(),_.crossVectors(T,w);const L=_.dot(l[R])<0?-1:1;r.setXYZW(R,x.x,x.y,x.z,L)}for(let R=0,w=S.length;R<w;++R){const b=S[R],L=b.start,P=b.count;for(let B=L,k=L+P;B<k;B+=3)E(t.getX(B+0)),E(t.getX(B+1)),E(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xt(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const n=new y,s=new y,r=new y,o=new y,l=new y,c=new y,h=new y,u=new y;if(t)for(let d=0,g=t.count;d<g;d+=3){const m=t.getX(d+0),v=t.getX(d+1),p=t.getX(d+2);n.fromBufferAttribute(e,m),s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,p),h.subVectors(r,s),u.subVectors(n,s),h.cross(u),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,g=e.count;d<g;d+=3)n.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,s),u.subVectors(n,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let g=0,m=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?g=l[v]*o.data.stride+o.offset:g=l[v]*h;for(let f=0;f<h;f++)d[m++]=c[g++]}return new Xt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ti,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=t(l,i);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],g=t(d,i);l.push(g)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const n={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const g=c[u];h.push(g.toJSON(t.data))}h.length>0&&(n[l]=h,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,g=u.length;d<g;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mc=new Nt,Wn=new kd,$a=new Ss,bc=new y,ja=new y,Za=new y,Ja=new y,Do=new y,Qa=new y,Tc=new y,tr=new y;class Ee extends bi{constructor(t=new ti,e=new Hu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(s&&o){Qa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Do.fromBufferAttribute(u,t),r?Qa.addScaledVector(Do,h):Qa.addScaledVector(Do.sub(e),h))}e.add(Qa)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$a.copy(i.boundingSphere),$a.applyMatrix4(s),Wn.copy(t.ray).recast(t.near),!($a.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere($a,bc)===null||Wn.origin.distanceToSquared(bc)>(t.far-t.near)**2))&&(Mc.copy(s).invert(),Wn.copy(t.ray).applyMatrix4(Mc),!(i.boundingBox!==null&&Wn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Wn)))}_computeIntersections(t,e,i){let n;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,g=s.drawRange;if(o!==null)if(Array.isArray(r))for(let m=0,v=d.length;m<v;m++){const p=d[m],f=r[p.materialIndex],S=Math.max(p.start,g.start),x=Math.min(o.count,Math.min(p.start+p.count,g.start+g.count));for(let _=S,M=x;_<M;_+=3){const T=o.getX(_),E=o.getX(_+1),R=o.getX(_+2);n=er(this,f,t,i,c,h,u,T,E,R),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const m=Math.max(0,g.start),v=Math.min(o.count,g.start+g.count);for(let p=m,f=v;p<f;p+=3){const S=o.getX(p),x=o.getX(p+1),_=o.getX(p+2);n=er(this,r,t,i,c,h,u,S,x,_),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(r))for(let m=0,v=d.length;m<v;m++){const p=d[m],f=r[p.materialIndex],S=Math.max(p.start,g.start),x=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let _=S,M=x;_<M;_+=3){const T=_,E=_+1,R=_+2;n=er(this,f,t,i,c,h,u,T,E,R),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const m=Math.max(0,g.start),v=Math.min(l.count,g.start+g.count);for(let p=m,f=v;p<f;p+=3){const S=p,x=p+1,_=p+2;n=er(this,r,t,i,c,h,u,S,x,_),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}}}function $d(a,t,e,i,n,s,r,o){let l;if(t.side===1?l=i.intersectTriangle(r,s,n,!0,o):l=i.intersectTriangle(n,s,r,t.side===0,o),l===null)return null;tr.copy(o),tr.applyMatrix4(a.matrixWorld);const c=e.ray.origin.distanceTo(tr);return c<e.near||c>e.far?null:{distance:c,point:tr.clone(),object:a}}function er(a,t,e,i,n,s,r,o,l,c){a.getVertexPosition(o,ja),a.getVertexPosition(l,Za),a.getVertexPosition(c,Ja);const h=$d(a,t,e,i,ja,Za,Ja,Tc);if(h){const u=new y;Wi.getBarycoord(Tc,ja,Za,Ja,u),n&&(h.uv=Wi.getInterpolatedAttribute(n,o,l,c,u,new It)),s&&(h.uv1=Wi.getInterpolatedAttribute(s,o,l,c,u,new It)),r&&(h.normal=Wi.getInterpolatedAttribute(r,o,l,c,u,new y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new y,materialIndex:0};Wi.getNormal(ja,Za,Ja,d.normal),h.face=d,h.barycoord=u}return h}class ws extends ti{constructor(t=1,e=1,i=1,n=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:r};const o=this;n=Math.floor(n),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,g=0;m("z","y","x",-1,-1,i,e,t,r,s,0),m("z","y","x",1,-1,i,e,-t,r,s,1),m("x","z","y",1,1,t,i,e,n,r,2),m("x","z","y",1,-1,t,i,-e,n,r,3),m("x","y","z",1,-1,t,e,i,n,s,4),m("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Ti(c,3)),this.setAttribute("normal",new Ti(h,3)),this.setAttribute("uv",new Ti(u,2));function m(v,p,f,S,x,_,M,T,E,R,w){const b=_/E,L=M/R,P=_/2,B=M/2,k=T/2,F=E+1,N=R+1;let z=0,U=0;const W=new y;for(let J=0;J<N;J++){const tt=J*L-B;for(let gt=0;gt<F;gt++){const Lt=gt*b-P;W[v]=Lt*S,W[p]=tt*x,W[f]=k,c.push(W.x,W.y,W.z),W[v]=0,W[p]=0,W[f]=T>0?1:-1,h.push(W.x,W.y,W.z),u.push(gt/E),u.push(1-J/R),z+=1}}for(let J=0;J<R;J++)for(let tt=0;tt<E;tt++){const gt=d+tt+F*J,Lt=d+tt+F*(J+1),se=d+(tt+1)+F*(J+1),Jt=d+(tt+1)+F*J;l.push(gt,Lt,Jt),l.push(Lt,se,Jt),U+=6}o.addGroup(g,U,w),g+=U,d+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function aa(a){const t={};for(const e in a){t[e]={};for(const i in a[e]){const n=a[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function ri(a){const t={};for(let e=0;e<a.length;e++){const i=aa(a[e]);for(const n in i)t[n]=i[n]}return t}function jd(a){const t=[];for(let e=0;e<a.length;e++)t.push(a[e].clone());return t}function qu(a){const t=a.getRenderTarget();return t===null?a.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}const Zd={clone:aa,merge:ri};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends ro{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=aa(t.uniforms),this.uniformsGroups=jd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?e.uniforms[n]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[n]={type:"m4",value:r.toArray()}:e.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Xu extends bi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bn=new y,Ec=new It,Ac=new It;class Mi extends Xu{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ia*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ia*2*Math.atan(Math.tan(Pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bn.x,bn.y).multiplyScalar(-t/bn.z),bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bn.x,bn.y).multiplyScalar(-t/bn.z)}getViewSize(t,e){return this.getViewBounds(t,Ec,Ac),e.subVectors(Ac,Ec)}setViewOffset(t,e,i,n,s,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Pa*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*n/l,e-=r.offsetY*i/c,n*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Us=-90,Bs=1;class t0 extends bi{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Mi(Us,Bs,t,e);n.layers=this.layers,this.add(n);const s=new Mi(Us,Bs,t,e);s.layers=this.layers,this.add(s);const r=new Mi(Us,Bs,t,e);r.layers=this.layers,this.add(r);const o=new Mi(Us,Bs,t,e);o.layers=this.layers,this.add(o);const l=new Mi(Us,Bs,t,e);l.layers=this.layers,this.add(l);const c=new Mi(Us,Bs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,r,o,l]=e;for(const c of e)this.remove(c);if(t===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,r),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(u,d,g),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Ku extends li{constructor(t=[],e=301,i,n,s,r,o,l,c,h){super(t,e,i,n,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class e0 extends ye{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Ku(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new ws(5,5,5),s=new vn({name:"CubemapFromEquirect",uniforms:aa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=e;const r=new Ee(n,s),o=e.minFilter;return e.minFilter===1008&&(e.minFilter=1006),new t0(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,n);t.setRenderTarget(s)}}class pn extends bi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const i0={type:"move"};class Io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,i),f=this._getHandJoint(c,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),g=.02,m=.005;c.inputState.pinching&&d>g+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=g-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(i0)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new pn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class so extends bi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oe,this.environmentIntensity=1,this.environmentRotation=new oe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class jl extends li{constructor(t=null,e=1,i=1,n,s,r,o,l,c=1003,h=1003,u,d){super(null,r,o,l,c,h,n,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class On extends Xt{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ns=new Nt,Cc=new Nt,ir=[],Rc=new _n,n0=new Nt,ma=new Ee,ga=new Ss;class s0 extends Ee{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new On(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,n0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new _n),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ns),Rc.copy(t.boundingBox).applyMatrix4(Ns),this.boundingBox.union(Rc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ns),ga.copy(t.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(ga)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,r=t*s+1;for(let o=0;o<i.length;o++)i[o]=n[r+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(ma.geometry=this.geometry,ma.material=this.material,ma.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ga.copy(this.boundingSphere),ga.applyMatrix4(i),t.ray.intersectsSphere(ga)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,Ns),Cc.multiplyMatrices(i,Ns),ma.matrixWorld=Cc,ma.raycast(t,ir);for(let r=0,o=ir.length;r<o;r++){const l=ir[r];l.instanceId=s,l.object=this,e.push(l)}ir.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new On(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new jl(new Float32Array(n*this.count),n,this.count,1028,1015));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=n*t;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Fo=new y,a0=new y,r0=new qt;class hs{constructor(t=new y(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Fo.subVectors(i,e).cross(a0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Fo),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||r0.getNormalMatrix(t),n=this.coplanarPoint(Fo).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qn=new Ss,o0=new It(.5,.5),nr=new y;class Yu{constructor(t=new hs,e=new hs,i=new hs,n=new hs,s=new hs,r=new hs){this.planes=[t,e,i,n,s,r]}set(t,e,i,n,s,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=2e3,i=!1){const n=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],g=s[7],m=s[8],v=s[9],p=s[10],f=s[11],S=s[12],x=s[13],_=s[14],M=s[15];if(n[0].setComponents(c-r,g-h,f-m,M-S).normalize(),n[1].setComponents(c+r,g+h,f+m,M+S).normalize(),n[2].setComponents(c+o,g+u,f+v,M+x).normalize(),n[3].setComponents(c-o,g-u,f-v,M-x).normalize(),i)n[4].setComponents(l,d,p,_).normalize(),n[5].setComponents(c-l,g-d,f-p,M-_).normalize();else if(n[4].setComponents(c-l,g-d,f-p,M-_).normalize(),e===2e3)n[5].setComponents(c+l,g+d,f+p,M+_).normalize();else if(e===2001)n[5].setComponents(l,d,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(t){qn.center.set(0,0,0);const e=o0.distanceTo(t.center);return qn.radius=.7071067811865476+e,qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(nr.x=n.normal.x>0?t.max.x:t.min.x,nr.y=n.normal.y>0?t.max.y:t.min.y,nr.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(nr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zl extends li{constructor(t,e,i=1014,n,s,r,o=1003,l=1003,c,h=1026,u=1){if(h!==1026&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,n,s,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Yl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class $u extends li{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ua extends ti{constructor(t=1,e=1,i=1,n=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),s=Math.floor(s);const h=[],u=[],d=[],g=[];let m=0;const v=[],p=i/2;let f=0;S(),r===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ti(u,3)),this.setAttribute("normal",new Ti(d,3)),this.setAttribute("uv",new Ti(g,2));function S(){const _=new y,M=new y;let T=0;const E=(e-t)/i;for(let R=0;R<=s;R++){const w=[],b=R/s,L=b*(e-t)+t;for(let P=0;P<=n;P++){const B=P/n,k=B*l+o,F=Math.sin(k),N=Math.cos(k);M.x=L*F,M.y=-b*i+p,M.z=L*N,u.push(M.x,M.y,M.z),_.set(F,E,N).normalize(),d.push(_.x,_.y,_.z),g.push(B,1-b),w.push(m++)}v.push(w)}for(let R=0;R<n;R++)for(let w=0;w<s;w++){const b=v[w][R],L=v[w+1][R],P=v[w+1][R+1],B=v[w][R+1];(t>0||w!==0)&&(h.push(b,L,B),T+=3),(e>0||w!==s-1)&&(h.push(L,P,B),T+=3)}c.addGroup(f,T,0),f+=T}function x(_){const M=m,T=new It,E=new y;let R=0;const w=_===!0?t:e,b=_===!0?1:-1;for(let P=1;P<=n;P++)u.push(0,p*b,0),d.push(0,b,0),g.push(.5,.5),m++;const L=m;for(let P=0;P<=n;P++){const k=P/n*l+o,F=Math.cos(k),N=Math.sin(k);E.x=w*N,E.y=p*b,E.z=w*F,u.push(E.x,E.y,E.z),d.push(0,b,0),T.x=F*.5+.5,T.y=N*.5*b+.5,g.push(T.x,T.y),m++}for(let P=0;P<n;P++){const B=M+P,k=L+P;_===!0?h.push(k,k+1,B):h.push(k+1,k,B),R+=3}c.addGroup(f,R,_===!0?1:2),f+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ua(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class la extends ti{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,r=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=t/o,d=e/l,g=[],m=[],v=[],p=[];for(let f=0;f<h;f++){const S=f*d-r;for(let x=0;x<c;x++){const _=x*u-s;m.push(_,-S,0),v.push(0,0,1),p.push(x/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const x=S+c*f,_=S+c*(f+1),M=S+1+c*(f+1),T=S+1+c*f;g.push(x,_,T),g.push(_,M,T)}this.setIndex(g),this.setAttribute("position",new Ti(m,3)),this.setAttribute("normal",new Ti(v,3)),this.setAttribute("uv",new Ti(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new la(t.width,t.height,t.widthSegments,t.heightSegments)}}class Jl extends ti{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const h=[],u=new y,d=new y,g=[],m=[],v=[],p=[];for(let f=0;f<=i;f++){const S=[],x=f/i;let _=0;f===0&&r===0?_=.5/e:f===i&&l===Math.PI&&(_=-.5/e);for(let M=0;M<=e;M++){const T=M/e;u.x=-t*Math.cos(n+T*s)*Math.sin(r+x*o),u.y=t*Math.cos(r+x*o),u.z=t*Math.sin(n+T*s)*Math.sin(r+x*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),p.push(T+_,1-x),S.push(c++)}h.push(S)}for(let f=0;f<i;f++)for(let S=0;S<e;S++){const x=h[f][S+1],_=h[f][S],M=h[f+1][S],T=h[f+1][S+1];(f!==0||r>0)&&g.push(x,_,T),(f!==i-1||l<Math.PI)&&g.push(_,M,T)}this.setIndex(g),this.setAttribute("position",new Ti(m,3)),this.setAttribute("normal",new Ti(v,3)),this.setAttribute("uv",new Ti(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ji extends vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class l0 extends ro{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class c0 extends ro{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ao extends Xu{constructor(t=-1,e=1,i=1,n=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,r=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class h0 extends ti{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class u0 extends Mi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Pc(a,t,e,i){const n=d0(i);switch(e){case 1021:return a*t;case 1028:return a*t/n.components*n.byteLength;case 1029:return a*t/n.components*n.byteLength;case 1030:return a*t*2/n.components*n.byteLength;case 1031:return a*t*2/n.components*n.byteLength;case 1022:return a*t*3/n.components*n.byteLength;case 1023:return a*t*4/n.components*n.byteLength;case 1033:return a*t*4/n.components*n.byteLength;case 33776:case 33777:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(a,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(a,8)*Math.max(t,8)/2;case 36196:case 37492:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case 37496:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((a+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((a+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((a+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((a+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((a+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((a+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((a+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((a+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((a+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((a+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((a+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((a+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((a+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(a/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(a/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(a/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function d0(a){switch(a){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function ju(){let a=null,t=!1,e=null,i=null;function n(s,r){e(s,r),i=a.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=a.requestAnimationFrame(n),t=!0)},stop:function(){a.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){a=s}}}function f0(a){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=a.createBuffer();a.bindBuffer(l,d),a.bufferData(l,c,h),o.onUploadCallback();let g;if(c instanceof Float32Array)g=a.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=a.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=a.HALF_FLOAT:g=a.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=a.SHORT;else if(c instanceof Uint32Array)g=a.UNSIGNED_INT;else if(c instanceof Int32Array)g=a.INT;else if(c instanceof Int8Array)g=a.BYTE;else if(c instanceof Uint8Array)g=a.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(a.bindBuffer(c,o),u.length===0)a.bufferSubData(c,0,h);else{u.sort((g,m)=>g.start-m.start);let d=0;for(let g=1;g<u.length;g++){const m=u[d],v=u[g];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let g=0,m=u.length;g<m;g++){const v=u[g];a.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(a.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:s,update:r}}var p0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,g0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,v0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,x0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,S0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,w0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,M0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,b0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,T0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,E0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,A0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,C0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,R0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,I0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,U0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,N0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,O0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,k0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,z0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,H0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,G0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,W0="gl_FragColor = linearToOutputTexel( gl_FragColor );",q0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,X0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,K0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Y0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,J0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ef=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,of=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,df=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ff=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ef=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,If=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$f=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Zf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Jf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Qf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ep=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ep=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ip=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Up=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:p0,alphahash_pars_fragment:m0,alphamap_fragment:g0,alphamap_pars_fragment:v0,alphatest_fragment:_0,alphatest_pars_fragment:x0,aomap_fragment:y0,aomap_pars_fragment:S0,batching_pars_vertex:w0,batching_vertex:M0,begin_vertex:b0,beginnormal_vertex:T0,bsdfs:E0,iridescence_fragment:A0,bumpmap_pars_fragment:C0,clipping_planes_fragment:R0,clipping_planes_pars_fragment:P0,clipping_planes_pars_vertex:L0,clipping_planes_vertex:D0,color_fragment:I0,color_pars_fragment:F0,color_pars_vertex:U0,color_vertex:B0,common:N0,cube_uv_reflection_fragment:O0,defaultnormal_vertex:k0,displacementmap_pars_vertex:z0,displacementmap_vertex:V0,emissivemap_fragment:H0,emissivemap_pars_fragment:G0,colorspace_fragment:W0,colorspace_pars_fragment:q0,envmap_fragment:X0,envmap_common_pars_fragment:K0,envmap_pars_fragment:Y0,envmap_pars_vertex:$0,envmap_physical_pars_fragment:of,envmap_vertex:j0,fog_vertex:Z0,fog_pars_vertex:J0,fog_fragment:Q0,fog_pars_fragment:tf,gradientmap_pars_fragment:ef,lightmap_pars_fragment:nf,lights_lambert_fragment:sf,lights_lambert_pars_fragment:af,lights_pars_begin:rf,lights_toon_fragment:lf,lights_toon_pars_fragment:cf,lights_phong_fragment:hf,lights_phong_pars_fragment:uf,lights_physical_fragment:df,lights_physical_pars_fragment:ff,lights_fragment_begin:pf,lights_fragment_maps:mf,lights_fragment_end:gf,logdepthbuf_fragment:vf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:xf,logdepthbuf_vertex:yf,map_fragment:Sf,map_pars_fragment:wf,map_particle_fragment:Mf,map_particle_pars_fragment:bf,metalnessmap_fragment:Tf,metalnessmap_pars_fragment:Ef,morphinstance_vertex:Af,morphcolor_vertex:Cf,morphnormal_vertex:Rf,morphtarget_pars_vertex:Pf,morphtarget_vertex:Lf,normal_fragment_begin:Df,normal_fragment_maps:If,normal_pars_fragment:Ff,normal_pars_vertex:Uf,normal_vertex:Bf,normalmap_pars_fragment:Nf,clearcoat_normal_fragment_begin:Of,clearcoat_normal_fragment_maps:kf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:Vf,opaque_fragment:Hf,packing:Gf,premultiplied_alpha_fragment:Wf,project_vertex:qf,dithering_fragment:Xf,dithering_pars_fragment:Kf,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:$f,shadowmap_pars_fragment:jf,shadowmap_pars_vertex:Zf,shadowmap_vertex:Jf,shadowmask_pars_fragment:Qf,skinbase_vertex:tp,skinning_pars_vertex:ep,skinning_vertex:ip,skinnormal_vertex:np,specularmap_fragment:sp,specularmap_pars_fragment:ap,tonemapping_fragment:rp,tonemapping_pars_fragment:op,transmission_fragment:lp,transmission_pars_fragment:cp,uv_pars_fragment:hp,uv_pars_vertex:up,uv_vertex:dp,worldpos_vertex:fp,background_vert:pp,background_frag:mp,backgroundCube_vert:gp,backgroundCube_frag:vp,cube_vert:_p,cube_frag:xp,depth_vert:yp,depth_frag:Sp,distanceRGBA_vert:wp,distanceRGBA_frag:Mp,equirect_vert:bp,equirect_frag:Tp,linedashed_vert:Ep,linedashed_frag:Ap,meshbasic_vert:Cp,meshbasic_frag:Rp,meshlambert_vert:Pp,meshlambert_frag:Lp,meshmatcap_vert:Dp,meshmatcap_frag:Ip,meshnormal_vert:Fp,meshnormal_frag:Up,meshphong_vert:Bp,meshphong_frag:Np,meshphysical_vert:Op,meshphysical_frag:kp,meshtoon_vert:zp,meshtoon_frag:Vp,points_vert:Hp,points_frag:Gp,shadow_vert:Wp,shadow_frag:qp,sprite_vert:Xp,sprite_frag:Kp},ut={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},ji={basic:{uniforms:ri([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:ri([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new re(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:ri([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:ri([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:ri([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new re(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:ri([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:ri([ut.points,ut.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:ri([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:ri([ut.common,ut.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:ri([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:ri([ut.sprite,ut.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:ri([ut.common,ut.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:ri([ut.lights,ut.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};ji.physical={uniforms:ri([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const sr={r:0,b:0,g:0},Xn=new oe,Yp=new Nt;function $p(a,t,e,i,n,s,r){const o=new re(0);let l=s===!0?0:1,c,h,u=null,d=0,g=null;function m(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function v(x){let _=!1;const M=m(x);M===null?f(o,l):M&&M.isColor&&(f(M,1),_=!0);const T=a.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(a.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function p(x,_){const M=m(_);M&&(M.isCubeTexture||M.mapping===306)?(h===void 0&&(h=new Ee(new ws(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:aa(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),Xn.copy(_.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Yp.makeRotationFromEuler(Xn)),h.material.toneMapped=he.getTransfer(M.colorSpace)!==ge,(u!==M||d!==M.version||g!==a.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,g=a.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Ee(new la(2,2),new vn({name:"BackgroundMaterial",uniforms:aa(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=he.getTransfer(M.colorSpace)!==ge,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||g!==a.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,g=a.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,_){x.getRGB(sr,qu(a)),i.buffers.color.setClear(sr.r,sr.g,sr.b,_,r)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),l=_,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,f(o,l)},render:v,addToRenderList:p,dispose:S}}function jp(a,t){const e=a.getParameter(a.MAX_VERTEX_ATTRIBS),i={},n=d(null);let s=n,r=!1;function o(b,L,P,B,k){let F=!1;const N=u(B,P,L);s!==N&&(s=N,c(s.object)),F=g(b,B,P,k),F&&m(b,B,P,k),k!==null&&t.update(k,a.ELEMENT_ARRAY_BUFFER),(F||r)&&(r=!1,_(b,L,P,B),k!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return a.createVertexArray()}function c(b){return a.bindVertexArray(b)}function h(b){return a.deleteVertexArray(b)}function u(b,L,P){const B=P.wireframe===!0;let k=i[b.id];k===void 0&&(k={},i[b.id]=k);let F=k[L.id];F===void 0&&(F={},k[L.id]=F);let N=F[B];return N===void 0&&(N=d(l()),F[B]=N),N}function d(b){const L=[],P=[],B=[];for(let k=0;k<e;k++)L[k]=0,P[k]=0,B[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:P,attributeDivisors:B,object:b,attributes:{},index:null}}function g(b,L,P,B){const k=s.attributes,F=L.attributes;let N=0;const z=P.getAttributes();for(const U in z)if(z[U].location>=0){const J=k[U];let tt=F[U];if(tt===void 0&&(U==="instanceMatrix"&&b.instanceMatrix&&(tt=b.instanceMatrix),U==="instanceColor"&&b.instanceColor&&(tt=b.instanceColor)),J===void 0||J.attribute!==tt||tt&&J.data!==tt.data)return!0;N++}return s.attributesNum!==N||s.index!==B}function m(b,L,P,B){const k={},F=L.attributes;let N=0;const z=P.getAttributes();for(const U in z)if(z[U].location>=0){let J=F[U];J===void 0&&(U==="instanceMatrix"&&b.instanceMatrix&&(J=b.instanceMatrix),U==="instanceColor"&&b.instanceColor&&(J=b.instanceColor));const tt={};tt.attribute=J,J&&J.data&&(tt.data=J.data),k[U]=tt,N++}s.attributes=k,s.attributesNum=N,s.index=B}function v(){const b=s.newAttributes;for(let L=0,P=b.length;L<P;L++)b[L]=0}function p(b){f(b,0)}function f(b,L){const P=s.newAttributes,B=s.enabledAttributes,k=s.attributeDivisors;P[b]=1,B[b]===0&&(a.enableVertexAttribArray(b),B[b]=1),k[b]!==L&&(a.vertexAttribDivisor(b,L),k[b]=L)}function S(){const b=s.newAttributes,L=s.enabledAttributes;for(let P=0,B=L.length;P<B;P++)L[P]!==b[P]&&(a.disableVertexAttribArray(P),L[P]=0)}function x(b,L,P,B,k,F,N){N===!0?a.vertexAttribIPointer(b,L,P,k,F):a.vertexAttribPointer(b,L,P,B,k,F)}function _(b,L,P,B){v();const k=B.attributes,F=P.getAttributes(),N=L.defaultAttributeValues;for(const z in F){const U=F[z];if(U.location>=0){let W=k[z];if(W===void 0&&(z==="instanceMatrix"&&b.instanceMatrix&&(W=b.instanceMatrix),z==="instanceColor"&&b.instanceColor&&(W=b.instanceColor)),W!==void 0){const J=W.normalized,tt=W.itemSize,gt=t.get(W);if(gt===void 0)continue;const Lt=gt.buffer,se=gt.type,Jt=gt.bytesPerElement,j=se===a.INT||se===a.UNSIGNED_INT||W.gpuType===1013;if(W.isInterleavedBufferAttribute){const et=W.data,ct=et.stride,Ot=W.offset;if(et.isInstancedInterleavedBuffer){for(let bt=0;bt<U.locationSize;bt++)f(U.location+bt,et.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let bt=0;bt<U.locationSize;bt++)p(U.location+bt);a.bindBuffer(a.ARRAY_BUFFER,Lt);for(let bt=0;bt<U.locationSize;bt++)x(U.location+bt,tt/U.locationSize,se,J,ct*Jt,(Ot+tt/U.locationSize*bt)*Jt,j)}else{if(W.isInstancedBufferAttribute){for(let et=0;et<U.locationSize;et++)f(U.location+et,W.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let et=0;et<U.locationSize;et++)p(U.location+et);a.bindBuffer(a.ARRAY_BUFFER,Lt);for(let et=0;et<U.locationSize;et++)x(U.location+et,tt/U.locationSize,se,J,tt*Jt,tt/U.locationSize*et*Jt,j)}}else if(N!==void 0){const J=N[z];if(J!==void 0)switch(J.length){case 2:a.vertexAttrib2fv(U.location,J);break;case 3:a.vertexAttrib3fv(U.location,J);break;case 4:a.vertexAttrib4fv(U.location,J);break;default:a.vertexAttrib1fv(U.location,J)}}}}S()}function M(){R();for(const b in i){const L=i[b];for(const P in L){const B=L[P];for(const k in B)h(B[k].object),delete B[k];delete L[P]}delete i[b]}}function T(b){if(i[b.id]===void 0)return;const L=i[b.id];for(const P in L){const B=L[P];for(const k in B)h(B[k].object),delete B[k];delete L[P]}delete i[b.id]}function E(b){for(const L in i){const P=i[L];if(P[b.id]===void 0)continue;const B=P[b.id];for(const k in B)h(B[k].object),delete B[k];delete P[b.id]}}function R(){w(),r=!0,s!==n&&(s=n,c(s.object))}function w(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:R,resetDefaultState:w,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:p,disableUnusedAttributes:S}}function Zp(a,t,e){let i;function n(c){i=c}function s(c,h){a.drawArrays(i,c,h),e.update(h,i,1)}function r(c,h,u){u!==0&&(a.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let g=0;for(let m=0;m<u;m++)g+=h[m];e.update(g,i,1)}function l(c,h,u,d){if(u===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<c.length;m++)r(c[m],h[m],d[m]);else{g.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];e.update(m,i,1)}}this.setMode=n,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Jp(a,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");n=a.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(E){return!(E!==1023&&i.convert(E)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const R=E===1016&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==1009&&i.convert(E)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==1015&&!R)}function l(E){if(E==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),g=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),m=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=a.getParameter(a.MAX_TEXTURE_SIZE),p=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),f=a.getParameter(a.MAX_VERTEX_ATTRIBS),S=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),x=a.getParameter(a.MAX_VARYING_VECTORS),_=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),M=m>0,T=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:M,maxSamples:T}}function Qp(a){const t=this;let e=null,i=0,n=!1,s=!1;const r=new hs,o=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const g=u.length!==0||d||i!==0||n;return n=d,i=u.length,g},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,g){const m=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,f=a.get(u);if(!n||m===null||m.length===0||s&&!p)s?h(null):c();else{const S=s?0:i,x=S*4;let _=f.clippingState||null;l.value=_,_=h(m,d,x,g);for(let M=0;M!==x;++M)_[M]=e[M];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,g,m){const v=u!==null?u.length:0;let p=null;if(v!==0){if(p=l.value,m!==!0||p===null){const f=g+v*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<f)&&(p=new Float32Array(f));for(let x=0,_=g;x!==v;++x,_+=4)r.copy(u[x]).applyMatrix4(S,o),r.normal.toArray(p,_),p[_+3]=r.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function tm(a){let t=new WeakMap;function e(r,o){return o===303?r.mapping=301:o===304&&(r.mapping=302),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===303||o===304)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new e0(l.height);return c.fromEquirectangularTexture(a,r),t.set(r,c),r.addEventListener("dispose",n),e(c.texture,r.mapping)}else return null}}return r}function n(r){const o=r.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const ia=4,Lc=[.125,.215,.35,.446,.526,.582],ps=20,Uo=new ao,Dc=new re;let Bo=null,No=0,Oo=0,ko=!1;const us=(1+Math.sqrt(5))/2,Os=1/us,Ic=[new y(-us,Os,0),new y(us,Os,0),new y(-Os,0,us),new y(Os,0,us),new y(0,us,-Os),new y(0,us,Os),new y(-1,1,-1),new y(1,1,-1),new y(-1,1,1),new y(1,1,1)],em=new y;class Fc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100,s={}){const{size:r=256,position:o=em}=s;Bo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Bo,No,Oo),this._renderer.xr.enabled=ko,t.scissorTest=!1,ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===301||t.mapping===302?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:sa,depthBuffer:!1},n=Uc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=im(s)),this._blurMaterial=nm(s,t,e)}return n}_compileMaterial(t){const e=new Ee(this._lodPlanes[0],t);this._renderer.compile(e,Uo)}_sceneToCubeUV(t,e,i,n,s){const l=new Mi(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,g=u.toneMapping;u.getClearColor(Dc),u.toneMapping=0,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null));const v=new Hu({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),p=new Ee(new ws,v);let f=!1;const S=t.background;S?S.isColor&&(v.color.copy(S),t.background=null,f=!0):(v.color.copy(Dc),f=!0);for(let x=0;x<6;x++){const _=x%3;_===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[x],s.y,s.z)):_===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[x]));const M=this._cubeSize;ar(n,_*M,x>2?M:0,M,M),u.setRenderTarget(n),f&&u.render(p,l),u.render(t,l)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=g,u.autoClear=d,t.background=S}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===301||t.mapping===302;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bc());const s=n?this._cubemapMaterial:this._equirectMaterial,r=new Ee(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;ar(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(r,Uo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodPlanes.length;for(let s=1;s<n;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ic[(n-s-1)%Ic.length];this._blur(t,s-1,s,r,o)}e.autoClear=i}_blur(t,e,i,n,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,n,"latitudinal",s),this._halfBlur(r,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ee(this._lodPlanes[n],c),d=c.uniforms,g=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*ps-1),v=s/m,p=isFinite(s)?1+Math.floor(h*v):ps;p>ps&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ps}`);const f=[];let S=0;for(let E=0;E<ps;++E){const R=E/v,w=Math.exp(-R*R/2);f.push(w),E===0?S+=w:E<p&&(S+=2*w)}for(let E=0;E<f.length;E++)f[E]=f[E]/S;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=r==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-i;const _=this._sizeLods[n],M=3*_*(n>x-ia?n-x+ia:0),T=4*(this._cubeSize-_);ar(e,M,T,3*_,2*_),l.setRenderTarget(e),l.render(u,Uo)}}function im(a){const t=[],e=[],i=[];let n=a;const s=a-ia+1+Lc.length;for(let r=0;r<s;r++){const o=Math.pow(2,n);e.push(o);let l=1/o;r>a-ia?l=Lc[r-a+ia-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],g=6,m=6,v=3,p=2,f=1,S=new Float32Array(v*m*g),x=new Float32Array(p*m*g),_=new Float32Array(f*m*g);for(let T=0;T<g;T++){const E=T%3*2/3-1,R=T>2?0:-1,w=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];S.set(w,v*m*T),x.set(d,p*m*T);const b=[T,T,T,T,T,T];_.set(b,f*m*T)}const M=new ti;M.setAttribute("position",new Xt(S,v)),M.setAttribute("uv",new Xt(x,p)),M.setAttribute("faceIndex",new Xt(_,f)),t.push(M),n>ia&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Uc(a,t,e){const i=new ye(a,t,e);return i.texture.mapping=306,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ar(a,t,e,i,n){a.viewport.set(t,e,i,n),a.scissor.set(t,e,i,n)}function nm(a,t,e){const i=new Float32Array(ps),n=new y(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bc(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Nc(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ql(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function sm(a){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===303||l===304,h=l===301||l===302;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Fc(a)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const g=o.image;return c&&g&&g.height>0||h&&g&&n(g)?(e===null&&(e=new Fc(a)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function am(a){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=a.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&Fa("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function rm(a,t,e,i){const n={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",r),delete n[d.id];const g=s.get(d);g&&(t.remove(g),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",r),n[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],a.ARRAY_BUFFER)}function c(u){const d=[],g=u.index,m=u.attributes.position;let v=0;if(g!==null){const S=g.array;v=g.version;for(let x=0,_=S.length;x<_;x+=3){const M=S[x+0],T=S[x+1],E=S[x+2];d.push(M,T,T,E,E,M)}}else if(m!==void 0){const S=m.array;v=m.version;for(let x=0,_=S.length/3-1;x<_;x+=3){const M=x+0,T=x+1,E=x+2;d.push(M,T,T,E,E,M)}}else return;const p=new(Ou(d)?Wu:Gu)(d,1);p.version=v;const f=s.get(u);f&&t.remove(f),s.set(u,p)}function h(u){const d=s.get(u);if(d){const g=u.index;g!==null&&d.version<g.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function om(a,t,e){let i;function n(d){i=d}let s,r;function o(d){s=d.type,r=d.bytesPerElement}function l(d,g){a.drawElements(i,g,s,d*r),e.update(g,i,1)}function c(d,g,m){m!==0&&(a.drawElementsInstanced(i,g,s,d*r,m),e.update(g,i,m))}function h(d,g,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,s,d,0,m);let p=0;for(let f=0;f<m;f++)p+=g[f];e.update(p,i,1)}function u(d,g,m,v){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)c(d[f]/r,g[f],v[f]);else{p.multiDrawElementsInstancedWEBGL(i,g,0,s,d,0,v,0,m);let f=0;for(let S=0;S<m;S++)f+=g[S]*v[S];e.update(f,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function lm(a){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(e.calls++,r){case a.TRIANGLES:e.triangles+=o*(s/3);break;case a.LINES:e.lines+=o*(s/2);break;case a.LINE_STRIP:e.lines+=o*(s-1);break;case a.LINE_LOOP:e.lines+=o*s;break;case a.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function cm(a,t,e){const i=new WeakMap,n=new be;function s(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let b=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",b)};var g=b;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),v===!0&&(_=2),p===!0&&(_=3);let M=o.attributes.position.count*_,T=1;M>t.maxTextureSize&&(T=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const E=new Float32Array(M*T*4*u),R=new $l(E,M,T,u);R.type=1015,R.needsUpdate=!0;const w=_*4;for(let L=0;L<u;L++){const P=f[L],B=S[L],k=x[L],F=M*T*4*L;for(let N=0;N<P.count;N++){const z=N*w;m===!0&&(n.fromBufferAttribute(P,N),E[F+z+0]=n.x,E[F+z+1]=n.y,E[F+z+2]=n.z,E[F+z+3]=0),v===!0&&(n.fromBufferAttribute(B,N),E[F+z+4]=n.x,E[F+z+5]=n.y,E[F+z+6]=n.z,E[F+z+7]=0),p===!0&&(n.fromBufferAttribute(k,N),E[F+z+8]=n.x,E[F+z+9]=n.y,E[F+z+10]=n.z,E[F+z+11]=k.itemSize===4?n.w:1)}}d={count:u,texture:R,size:new It(M,T)},i.set(o,d),o.addEventListener("dispose",b)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(a,"morphTexture",r.morphTexture,e);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(a,"morphTargetBaseInfluence",v),l.getUniforms().setValue(a,"morphTargetInfluences",c)}l.getUniforms().setValue(a,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(a,"morphTargetsTextureSize",d.size)}return{update:s}}function hm(a,t,e,i){let n=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(n.get(u)!==c&&(t.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(e.update(l.instanceMatrix,a.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,a.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return u}function r(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:r}}const Zu=new li,Oc=new Zl(1,1),Ju=new $l,Qu=new ku,td=new Ku,kc=[],zc=[],Vc=new Float32Array(16),Hc=new Float32Array(9),Gc=new Float32Array(4);function ca(a,t,e){const i=a[0];if(i<=0||i>0)return a;const n=t*e;let s=kc[n];if(s===void 0&&(s=new Float32Array(n),kc[n]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=e,a[r].toArray(s,o)}return s}function Ge(a,t){if(a.length!==t.length)return!1;for(let e=0,i=a.length;e<i;e++)if(a[e]!==t[e])return!1;return!0}function We(a,t){for(let e=0,i=t.length;e<i;e++)a[e]=t[e]}function oo(a,t){let e=zc[t];e===void 0&&(e=new Int32Array(t),zc[t]=e);for(let i=0;i!==t;++i)e[i]=a.allocateTextureUnit();return e}function um(a,t){const e=this.cache;e[0]!==t&&(a.uniform1f(this.addr,t),e[0]=t)}function dm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;a.uniform2fv(this.addr,t),We(e,t)}}function fm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;a.uniform3fv(this.addr,t),We(e,t)}}function pm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;a.uniform4fv(this.addr,t),We(e,t)}}function mm(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;a.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,i))return;Gc.set(i),a.uniformMatrix2fv(this.addr,!1,Gc),We(e,i)}}function gm(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;a.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,i))return;Hc.set(i),a.uniformMatrix3fv(this.addr,!1,Hc),We(e,i)}}function vm(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;a.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,i))return;Vc.set(i),a.uniformMatrix4fv(this.addr,!1,Vc),We(e,i)}}function _m(a,t){const e=this.cache;e[0]!==t&&(a.uniform1i(this.addr,t),e[0]=t)}function xm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;a.uniform2iv(this.addr,t),We(e,t)}}function ym(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;a.uniform3iv(this.addr,t),We(e,t)}}function Sm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;a.uniform4iv(this.addr,t),We(e,t)}}function wm(a,t){const e=this.cache;e[0]!==t&&(a.uniform1ui(this.addr,t),e[0]=t)}function Mm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;a.uniform2uiv(this.addr,t),We(e,t)}}function bm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;a.uniform3uiv(this.addr,t),We(e,t)}}function Tm(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;a.uniform4uiv(this.addr,t),We(e,t)}}function Em(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n);let s;this.type===a.SAMPLER_2D_SHADOW?(Oc.compareFunction=515,s=Oc):s=Zu,e.setTexture2D(t||s,n)}function Am(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Qu,n)}function Cm(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||td,n)}function Rm(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Ju,n)}function Pm(a){switch(a){case 5126:return um;case 35664:return dm;case 35665:return fm;case 35666:return pm;case 35674:return mm;case 35675:return gm;case 35676:return vm;case 5124:case 35670:return _m;case 35667:case 35671:return xm;case 35668:case 35672:return ym;case 35669:case 35673:return Sm;case 5125:return wm;case 36294:return Mm;case 36295:return bm;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return Am;case 35680:case 36300:case 36308:case 36293:return Cm;case 36289:case 36303:case 36311:case 36292:return Rm}}function Lm(a,t){a.uniform1fv(this.addr,t)}function Dm(a,t){const e=ca(t,this.size,2);a.uniform2fv(this.addr,e)}function Im(a,t){const e=ca(t,this.size,3);a.uniform3fv(this.addr,e)}function Fm(a,t){const e=ca(t,this.size,4);a.uniform4fv(this.addr,e)}function Um(a,t){const e=ca(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,e)}function Bm(a,t){const e=ca(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,e)}function Nm(a,t){const e=ca(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,e)}function Om(a,t){a.uniform1iv(this.addr,t)}function km(a,t){a.uniform2iv(this.addr,t)}function zm(a,t){a.uniform3iv(this.addr,t)}function Vm(a,t){a.uniform4iv(this.addr,t)}function Hm(a,t){a.uniform1uiv(this.addr,t)}function Gm(a,t){a.uniform2uiv(this.addr,t)}function Wm(a,t){a.uniform3uiv(this.addr,t)}function qm(a,t){a.uniform4uiv(this.addr,t)}function Xm(a,t,e){const i=this.cache,n=t.length,s=oo(e,n);Ge(i,s)||(a.uniform1iv(this.addr,s),We(i,s));for(let r=0;r!==n;++r)e.setTexture2D(t[r]||Zu,s[r])}function Km(a,t,e){const i=this.cache,n=t.length,s=oo(e,n);Ge(i,s)||(a.uniform1iv(this.addr,s),We(i,s));for(let r=0;r!==n;++r)e.setTexture3D(t[r]||Qu,s[r])}function Ym(a,t,e){const i=this.cache,n=t.length,s=oo(e,n);Ge(i,s)||(a.uniform1iv(this.addr,s),We(i,s));for(let r=0;r!==n;++r)e.setTextureCube(t[r]||td,s[r])}function $m(a,t,e){const i=this.cache,n=t.length,s=oo(e,n);Ge(i,s)||(a.uniform1iv(this.addr,s),We(i,s));for(let r=0;r!==n;++r)e.setTexture2DArray(t[r]||Ju,s[r])}function jm(a){switch(a){case 5126:return Lm;case 35664:return Dm;case 35665:return Im;case 35666:return Fm;case 35674:return Um;case 35675:return Bm;case 35676:return Nm;case 5124:case 35670:return Om;case 35667:case 35671:return km;case 35668:case 35672:return zm;case 35669:case 35673:return Vm;case 5125:return Hm;case 36294:return Gm;case 36295:return Wm;case 36296:return qm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return Km;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return $m}}class Zm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Pm(e.type)}}class Jm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jm(e.type)}}class Qm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,r=n.length;s!==r;++s){const o=n[s];o.setValue(t,e[o.id],i)}}}const zo=/(\w+)(\])?(\[|\.)?/g;function Wc(a,t){a.seq.push(t),a.map[t.id]=t}function tg(a,t,e){const i=a.name,n=i.length;for(zo.lastIndex=0;;){const s=zo.exec(i),r=zo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===n){Wc(e,c===void 0?new Zm(o,a,t):new Jm(o,a,t));break}else{let u=e.map[o];u===void 0&&(u=new Qm(o),Wc(e,u)),e=u}}}class to{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),r=t.getUniformLocation(e,s.name);tg(s,r,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,r=e.length;s!==r;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.id in e&&i.push(r)}return i}}function qc(a,t,e){const i=a.createShader(t);return a.shaderSource(i,e),a.compileShader(i),i}const eg=37297;let ig=0;function ng(a,t){const e=a.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let r=n;r<s;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return i.join(`
`)}const Xc=new qt;function sg(a){he._getMatrix(Xc,he.workingColorSpace,a);const t=`mat3( ${Xc.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(a)){case io:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",a),[t,"LinearTransferOETF"]}}function Kc(a,t,e){const i=a.getShaderParameter(t,a.COMPILE_STATUS),s=(a.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+ng(a.getShaderSource(t),o)}else return s}function ag(a,t){const e=sg(t);return[`vec4 ${a}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rg(a,t){let e;switch(t){case 1:e="Linear";break;case 2:e="Reinhard";break;case 3:e="Cineon";break;case 4:e="ACESFilmic";break;case 6:e="AgX";break;case 7:e="Neutral";break;case 5:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const rr=new y;function og(){he.getLuminanceCoefficients(rr);const a=rr.x.toFixed(4),t=rr.y.toFixed(4),e=rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lg(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ra).join(`
`)}function cg(a){const t=[];for(const e in a){const i=a[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function hg(a,t){const e={},i=a.getProgramParameter(t,a.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=a.getActiveAttrib(t,n),r=s.name;let o=1;s.type===a.FLOAT_MAT2&&(o=2),s.type===a.FLOAT_MAT3&&(o=3),s.type===a.FLOAT_MAT4&&(o=4),e[r]={type:s.type,location:a.getAttribLocation(t,r),locationSize:o}}return e}function Ra(a){return a!==""}function Yc(a,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $c(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function kl(a){return a.replace(ug,fg)}const dg=new Map;function fg(a,t){let e=jt[t];if(e===void 0){const i=dg.get(t);if(i!==void 0)e=jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return kl(e)}const pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jc(a){return a.replace(pg,mg)}function mg(a,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Zc(a){let t=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?t+=`
#define HIGH_PRECISION`:a.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function gg(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===1?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===2?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===3&&(t="SHADOWMAP_TYPE_VSM"),t}function vg(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case 301:case 302:t="ENVMAP_TYPE_CUBE";break;case 306:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _g(a){let t="ENVMAP_MODE_REFLECTION";return a.envMap&&a.envMapMode===302&&(t="ENVMAP_MODE_REFRACTION"),t}function xg(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case 0:t="ENVMAP_BLENDING_MULTIPLY";break;case 1:t="ENVMAP_BLENDING_MIX";break;case 2:t="ENVMAP_BLENDING_ADD";break}return t}function yg(a){const t=a.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Sg(a,t,e,i){const n=a.getContext(),s=e.defines;let r=e.vertexShader,o=e.fragmentShader;const l=gg(e),c=vg(e),h=_g(e),u=xg(e),d=yg(e),g=lg(e),m=cg(s),v=n.createProgram();let p,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ra).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ra).join(`
`),f.length>0&&(f+=`
`)):(p=[Zc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ra).join(`
`),f=[Zc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==0?"#define TONE_MAPPING":"",e.toneMapping!==0?jt.tonemapping_pars_fragment:"",e.toneMapping!==0?rg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,ag("linearToOutputTexel",e.outputColorSpace),og(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ra).join(`
`)),r=kl(r),r=Yc(r,e),r=$c(r,e),o=kl(o),o=Yc(o,e),o=$c(o,e),r=jc(r),o=jc(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Ui?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ui?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=S+p+r,_=S+f+o,M=qc(n,n.VERTEX_SHADER,x),T=qc(n,n.FRAGMENT_SHADER,_);n.attachShader(v,M),n.attachShader(v,T),e.index0AttributeName!==void 0?n.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function E(L){if(a.debug.checkShaderErrors){const P=n.getProgramInfoLog(v)||"",B=n.getShaderInfoLog(M)||"",k=n.getShaderInfoLog(T)||"",F=P.trim(),N=B.trim(),z=k.trim();let U=!0,W=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(U=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(n,v,M,T);else{const J=Kc(n,M,"vertex"),tt=Kc(n,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+J+`
`+tt)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(N===""||z==="")&&(W=!1);W&&(L.diagnostics={runnable:U,programLog:F,vertexShader:{log:N,prefix:p},fragmentShader:{log:z,prefix:f}})}n.deleteShader(M),n.deleteShader(T),R=new to(n,v),w=hg(n,v)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=n.getProgramParameter(v,eg)),b},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ig++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=T,this}let wg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new bg(t),e.set(t,i)),i}}class bg{constructor(t){this.id=wg++,this.code=t,this.usedTimes=0}}function Tg(a,t,e,i,n,s,r){const o=new zu,l=new Mg,c=new Set,h=[],u=n.logarithmicDepthBuffer,d=n.vertexTextures;let g=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function p(w,b,L,P,B){const k=P.fog,F=B.geometry,N=w.isMeshStandardMaterial?P.environment:null,z=(w.isMeshStandardMaterial?e:t).get(w.envMap||N),U=z&&z.mapping===306?z.image.height:null,W=m[w.type];w.precision!==null&&(g=n.getMaxPrecision(w.precision),g!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",g,"instead."));const J=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,tt=J!==void 0?J.length:0;let gt=0;F.morphAttributes.position!==void 0&&(gt=1),F.morphAttributes.normal!==void 0&&(gt=2),F.morphAttributes.color!==void 0&&(gt=3);let Lt,se,Jt,j;if(W){const ue=ji[W];Lt=ue.vertexShader,se=ue.fragmentShader}else Lt=w.vertexShader,se=w.fragmentShader,l.update(w),Jt=l.getVertexShaderID(w),j=l.getFragmentShaderID(w);const et=a.getRenderTarget(),ct=a.state.buffers.depth.getReversed(),Ot=B.isInstancedMesh===!0,bt=B.isBatchedMesh===!0,Qt=!!w.map,Be=!!w.matcap,I=!!z,ve=!!w.aoMap,Gt=!!w.lightMap,Bt=!!w.bumpMap,_t=!!w.normalMap,Ae=!!w.displacementMap,Tt=!!w.emissiveMap,$t=!!w.metalnessMap,qe=!!w.roughnessMap,Fe=w.anisotropy>0,D=w.clearcoat>0,A=w.dispersion>0,G=w.iridescence>0,Z=w.sheen>0,it=w.transmission>0,$=Fe&&!!w.anisotropyMap,Pt=D&&!!w.clearcoatMap,ot=D&&!!w.clearcoatNormalMap,Et=D&&!!w.clearcoatRoughnessMap,Ct=G&&!!w.iridescenceMap,at=G&&!!w.iridescenceThicknessMap,pt=Z&&!!w.sheenColorMap,zt=Z&&!!w.sheenRoughnessMap,Rt=!!w.specularMap,dt=!!w.specularColorMap,Yt=!!w.specularIntensityMap,O=it&&!!w.transmissionMap,rt=it&&!!w.thicknessMap,lt=!!w.gradientMap,xt=!!w.alphaMap,nt=w.alphaTest>0,Q=!!w.alphaHash,St=!!w.extensions;let Kt=0;w.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Kt=a.toneMapping);const Se={shaderID:W,shaderType:w.type,shaderName:w.name,vertexShader:Lt,fragmentShader:se,defines:w.defines,customVertexShaderID:Jt,customFragmentShaderID:j,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:g,batching:bt,batchingColor:bt&&B._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&B.instanceColor!==null,instancingMorph:Ot&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:et===null?a.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:sa,alphaToCoverage:!!w.alphaToCoverage,map:Qt,matcap:Be,envMap:I,envMapMode:I&&z.mapping,envMapCubeUVHeight:U,aoMap:ve,lightMap:Gt,bumpMap:Bt,normalMap:_t,displacementMap:d&&Ae,emissiveMap:Tt,normalMapObjectSpace:_t&&w.normalMapType===1,normalMapTangentSpace:_t&&w.normalMapType===0,metalnessMap:$t,roughnessMap:qe,anisotropy:Fe,anisotropyMap:$,clearcoat:D,clearcoatMap:Pt,clearcoatNormalMap:ot,clearcoatRoughnessMap:Et,dispersion:A,iridescence:G,iridescenceMap:Ct,iridescenceThicknessMap:at,sheen:Z,sheenColorMap:pt,sheenRoughnessMap:zt,specularMap:Rt,specularColorMap:dt,specularIntensityMap:Yt,transmission:it,transmissionMap:O,thicknessMap:rt,gradientMap:lt,opaque:w.transparent===!1&&w.blending===1&&w.alphaToCoverage===!1,alphaMap:xt,alphaTest:nt,alphaHash:Q,combine:w.combine,mapUv:Qt&&v(w.map.channel),aoMapUv:ve&&v(w.aoMap.channel),lightMapUv:Gt&&v(w.lightMap.channel),bumpMapUv:Bt&&v(w.bumpMap.channel),normalMapUv:_t&&v(w.normalMap.channel),displacementMapUv:Ae&&v(w.displacementMap.channel),emissiveMapUv:Tt&&v(w.emissiveMap.channel),metalnessMapUv:$t&&v(w.metalnessMap.channel),roughnessMapUv:qe&&v(w.roughnessMap.channel),anisotropyMapUv:$&&v(w.anisotropyMap.channel),clearcoatMapUv:Pt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:ot&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:at&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:zt&&v(w.sheenRoughnessMap.channel),specularMapUv:Rt&&v(w.specularMap.channel),specularColorMapUv:dt&&v(w.specularColorMap.channel),specularIntensityMapUv:Yt&&v(w.specularIntensityMap.channel),transmissionMapUv:O&&v(w.transmissionMap.channel),thicknessMapUv:rt&&v(w.thicknessMap.channel),alphaMapUv:xt&&v(w.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(_t||Fe),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!F.attributes.uv&&(Qt||xt),fog:!!k,useFog:w.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ct,skinning:B.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:gt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:w.dithering,shadowMapEnabled:a.shadowMap.enabled&&L.length>0,shadowMapType:a.shadowMap.type,toneMapping:Kt,decodeVideoTexture:Qt&&w.map.isVideoTexture===!0&&he.getTransfer(w.map.colorSpace)===ge,decodeVideoTextureEmissive:Tt&&w.emissiveMap.isVideoTexture===!0&&he.getTransfer(w.emissiveMap.colorSpace)===ge,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===2,flipSided:w.side===1,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:St&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&w.extensions.multiDraw===!0||bt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Se.vertexUv1s=c.has(1),Se.vertexUv2s=c.has(2),Se.vertexUv3s=c.has(3),c.clear(),Se}function f(w){const b=[];if(w.shaderID?b.push(w.shaderID):(b.push(w.customVertexShaderID),b.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)b.push(L),b.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(S(b,w),x(b,w),b.push(a.outputColorSpace)),b.push(w.customProgramCacheKey),b.join()}function S(w,b){w.push(b.precision),w.push(b.outputColorSpace),w.push(b.envMapMode),w.push(b.envMapCubeUVHeight),w.push(b.mapUv),w.push(b.alphaMapUv),w.push(b.lightMapUv),w.push(b.aoMapUv),w.push(b.bumpMapUv),w.push(b.normalMapUv),w.push(b.displacementMapUv),w.push(b.emissiveMapUv),w.push(b.metalnessMapUv),w.push(b.roughnessMapUv),w.push(b.anisotropyMapUv),w.push(b.clearcoatMapUv),w.push(b.clearcoatNormalMapUv),w.push(b.clearcoatRoughnessMapUv),w.push(b.iridescenceMapUv),w.push(b.iridescenceThicknessMapUv),w.push(b.sheenColorMapUv),w.push(b.sheenRoughnessMapUv),w.push(b.specularMapUv),w.push(b.specularColorMapUv),w.push(b.specularIntensityMapUv),w.push(b.transmissionMapUv),w.push(b.thicknessMapUv),w.push(b.combine),w.push(b.fogExp2),w.push(b.sizeAttenuation),w.push(b.morphTargetsCount),w.push(b.morphAttributeCount),w.push(b.numDirLights),w.push(b.numPointLights),w.push(b.numSpotLights),w.push(b.numSpotLightMaps),w.push(b.numHemiLights),w.push(b.numRectAreaLights),w.push(b.numDirLightShadows),w.push(b.numPointLightShadows),w.push(b.numSpotLightShadows),w.push(b.numSpotLightShadowsWithMaps),w.push(b.numLightProbes),w.push(b.shadowMapType),w.push(b.toneMapping),w.push(b.numClippingPlanes),w.push(b.numClipIntersection),w.push(b.depthPacking)}function x(w,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),w.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),w.push(o.mask)}function _(w){const b=m[w.type];let L;if(b){const P=ji[b];L=Zd.clone(P.uniforms)}else L=w.uniforms;return L}function M(w,b){let L;for(let P=0,B=h.length;P<B;P++){const k=h[P];if(k.cacheKey===b){L=k,++L.usedTimes;break}}return L===void 0&&(L=new Sg(a,b,w,s),h.push(L)),L}function T(w){if(--w.usedTimes===0){const b=h.indexOf(w);h[b]=h[h.length-1],h.pop(),w.destroy()}}function E(w){l.remove(w)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:_,acquireProgram:M,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:R}}function Eg(){let a=new WeakMap;function t(r){return a.has(r)}function e(r){let o=a.get(r);return o===void 0&&(o={},a.set(r,o)),o}function i(r){a.delete(r)}function n(r,o,l){a.get(r)[o]=l}function s(){a=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function Ag(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function Jc(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function Qc(){const a=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function r(u,d,g,m,v,p){let f=a[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:g,groupOrder:m,renderOrder:u.renderOrder,z:v,group:p},a[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=g,f.groupOrder=m,f.renderOrder=u.renderOrder,f.z=v,f.group=p),t++,f}function o(u,d,g,m,v,p){const f=r(u,d,g,m,v,p);g.transmission>0?i.push(f):g.transparent===!0?n.push(f):e.push(f)}function l(u,d,g,m,v,p){const f=r(u,d,g,m,v,p);g.transmission>0?i.unshift(f):g.transparent===!0?n.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||Ag),i.length>1&&i.sort(d||Jc),n.length>1&&n.sort(d||Jc)}function h(){for(let u=t,d=a.length;u<d;u++){const g=a[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:h,sort:c}}function Cg(){let a=new WeakMap;function t(i,n){const s=a.get(i);let r;return s===void 0?(r=new Qc,a.set(i,[r])):n>=s.length?(r=new Qc,s.push(r)):r=s[n],r}function e(){a=new WeakMap}return{get:t,dispose:e}}function Rg(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new y,color:new re};break;case"SpotLight":e={position:new y,direction:new y,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new y,color:new re,distance:0,decay:0};break;case"HemisphereLight":e={direction:new y,skyColor:new re,groundColor:new re};break;case"RectAreaLight":e={color:new re,position:new y,halfWidth:new y,halfHeight:new y};break}return a[t.id]=e,e}}}function Pg(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=e,e}}}let Lg=0;function Dg(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function Ig(a){const t=new Rg,e=Pg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new y);const n=new y,s=new Nt,r=new Nt;function o(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let g=0,m=0,v=0,p=0,f=0,S=0,x=0,_=0,M=0,T=0,E=0;c.sort(Dg);for(let w=0,b=c.length;w<b;w++){const L=c[w],P=L.color,B=L.intensity,k=L.distance,F=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=P.r*B,u+=P.g*B,d+=P.b*B;else if(L.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(L.sh.coefficients[N],B);E++}else if(L.isDirectionalLight){const N=t.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const z=L.shadow,U=e.get(L);U.shadowIntensity=z.intensity,U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,i.directionalShadow[g]=U,i.directionalShadowMap[g]=F,i.directionalShadowMatrix[g]=L.shadow.matrix,S++}i.directional[g]=N,g++}else if(L.isSpotLight){const N=t.get(L);N.position.setFromMatrixPosition(L.matrixWorld),N.color.copy(P).multiplyScalar(B),N.distance=k,N.coneCos=Math.cos(L.angle),N.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),N.decay=L.decay,i.spot[v]=N;const z=L.shadow;if(L.map&&(i.spotLightMap[M]=L.map,M++,z.updateMatrices(L),L.castShadow&&T++),i.spotLightMatrix[v]=z.matrix,L.castShadow){const U=e.get(L);U.shadowIntensity=z.intensity,U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,i.spotShadow[v]=U,i.spotShadowMap[v]=F,_++}v++}else if(L.isRectAreaLight){const N=t.get(L);N.color.copy(P).multiplyScalar(B),N.halfWidth.set(L.width*.5,0,0),N.halfHeight.set(0,L.height*.5,0),i.rectArea[p]=N,p++}else if(L.isPointLight){const N=t.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity),N.distance=L.distance,N.decay=L.decay,L.castShadow){const z=L.shadow,U=e.get(L);U.shadowIntensity=z.intensity,U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,U.shadowCameraNear=z.camera.near,U.shadowCameraFar=z.camera.far,i.pointShadow[m]=U,i.pointShadowMap[m]=F,i.pointShadowMatrix[m]=L.shadow.matrix,x++}i.point[m]=N,m++}else if(L.isHemisphereLight){const N=t.get(L);N.skyColor.copy(L.color).multiplyScalar(B),N.groundColor.copy(L.groundColor).multiplyScalar(B),i.hemi[f]=N,f++}}p>0&&(a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const R=i.hash;(R.directionalLength!==g||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==p||R.hemiLength!==f||R.numDirectionalShadows!==S||R.numPointShadows!==x||R.numSpotShadows!==_||R.numSpotMaps!==M||R.numLightProbes!==E)&&(i.directional.length=g,i.spot.length=v,i.rectArea.length=p,i.point.length=m,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=_+M-T,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=E,R.directionalLength=g,R.pointLength=m,R.spotLength=v,R.rectAreaLength=p,R.hemiLength=f,R.numDirectionalShadows=S,R.numPointShadows=x,R.numSpotShadows=_,R.numSpotMaps=M,R.numLightProbes=E,i.version=Lg++)}function l(c,h){let u=0,d=0,g=0,m=0,v=0;const p=h.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const x=c[f];if(x.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(p),u++}else if(x.isSpotLight){const _=i.spot[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(n),_.direction.transformDirection(p),g++}else if(x.isRectAreaLight){const _=i.rectArea[m];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),r.identity(),s.copy(x.matrixWorld),s.premultiply(p),r.extractRotation(s),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),m++}else if(x.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:i}}function th(a){const t=new Ig(a),e=[],i=[];function n(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function r(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function Fg(a){let t=new WeakMap;function e(n,s=0){const r=t.get(n);let o;return r===void 0?(o=new th(a),t.set(n,[o])):s>=r.length?(o=new th(a),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const Ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ng(a,t,e){let i=new Yu;const n=new It,s=new It,r=new be,o=new l0({depthPacking:3201}),l=new c0,c={},h=e.maxTextureSize,u={0:1,1:0,2:2},d=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:Ug,fragmentShader:Bg}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const m=new ti;m.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ee(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let f=this.type;this.render=function(T,E,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const w=a.getRenderTarget(),b=a.getActiveCubeFace(),L=a.getActiveMipmapLevel(),P=a.state;P.setBlending(0),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const B=f!==3&&this.type===3,k=f===3&&this.type!==3;for(let F=0,N=T.length;F<N;F++){const z=T[F],U=z.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;n.copy(U.mapSize);const W=U.getFrameExtents();if(n.multiply(W),s.copy(U.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/W.x),n.x=s.x*W.x,U.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/W.y),n.y=s.y*W.y,U.mapSize.y=s.y)),U.map===null||B===!0||k===!0){const tt=this.type!==3?{minFilter:1003,magFilter:1003}:{};U.map!==null&&U.map.dispose(),U.map=new ye(n.x,n.y,tt),U.map.texture.name=z.name+".shadowMap",U.camera.updateProjectionMatrix()}a.setRenderTarget(U.map),a.clear();const J=U.getViewportCount();for(let tt=0;tt<J;tt++){const gt=U.getViewport(tt);r.set(s.x*gt.x,s.y*gt.y,s.x*gt.z,s.y*gt.w),P.viewport(r),U.updateMatrices(z,tt),i=U.getFrustum(),_(E,R,U.camera,z,this.type)}U.isPointLightShadow!==!0&&this.type===3&&S(U,R),U.needsUpdate=!1}f=this.type,p.needsUpdate=!1,a.setRenderTarget(w,b,L)};function S(T,E){const R=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,g.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ye(n.x,n.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,a.setRenderTarget(T.mapPass),a.clear(),a.renderBufferDirect(E,null,R,d,v,null),g.uniforms.shadow_pass.value=T.mapPass.texture,g.uniforms.resolution.value=T.mapSize,g.uniforms.radius.value=T.radius,a.setRenderTarget(T.map),a.clear(),a.renderBufferDirect(E,null,R,g,v,null)}function x(T,E,R,w){let b=null;const L=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)b=L;else if(b=R.isPointLight===!0?l:o,a.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const P=b.uuid,B=E.uuid;let k=c[P];k===void 0&&(k={},c[P]=k);let F=k[B];F===void 0&&(F=b.clone(),k[B]=F,E.addEventListener("dispose",M)),b=F}if(b.visible=E.visible,b.wireframe=E.wireframe,w===3?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:u[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=a.properties.get(b);P.light=R}return b}function _(T,E,R,w,b){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===3)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const B=t.update(T),k=T.material;if(Array.isArray(k)){const F=B.groups;for(let N=0,z=F.length;N<z;N++){const U=F[N],W=k[U.materialIndex];if(W&&W.visible){const J=x(T,W,w,b);T.onBeforeShadow(a,T,E,R,B,J,U),a.renderBufferDirect(R,null,B,J,T,U),T.onAfterShadow(a,T,E,R,B,J,U)}}}else if(k.visible){const F=x(T,k,w,b);T.onBeforeShadow(a,T,E,R,B,F,null),a.renderBufferDirect(R,null,B,F,T,null),T.onAfterShadow(a,T,E,R,B,F,null)}}const P=T.children;for(let B=0,k=P.length;B<k;B++)_(P[B],E,R,w,b)}function M(T){T.target.removeEventListener("dispose",M);for(const R in c){const w=c[R],b=T.target.uuid;b in w&&(w[b].dispose(),delete w[b])}}}const Og={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function kg(a,t){function e(){let O=!1;const rt=new be;let lt=null;const xt=new be(0,0,0,0);return{setMask:function(nt){lt!==nt&&!O&&(a.colorMask(nt,nt,nt,nt),lt=nt)},setLocked:function(nt){O=nt},setClear:function(nt,Q,St,Kt,Se){Se===!0&&(nt*=Kt,Q*=Kt,St*=Kt),rt.set(nt,Q,St,Kt),xt.equals(rt)===!1&&(a.clearColor(nt,Q,St,Kt),xt.copy(rt))},reset:function(){O=!1,lt=null,xt.set(-1,0,0,0)}}}function i(){let O=!1,rt=!1,lt=null,xt=null,nt=null;return{setReversed:function(Q){if(rt!==Q){const St=t.get("EXT_clip_control");Q?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),rt=Q;const Kt=nt;nt=null,this.setClear(Kt)}},getReversed:function(){return rt},setTest:function(Q){Q?et(a.DEPTH_TEST):ct(a.DEPTH_TEST)},setMask:function(Q){lt!==Q&&!O&&(a.depthMask(Q),lt=Q)},setFunc:function(Q){if(rt&&(Q=Og[Q]),xt!==Q){switch(Q){case 0:a.depthFunc(a.NEVER);break;case 1:a.depthFunc(a.ALWAYS);break;case 2:a.depthFunc(a.LESS);break;case 3:a.depthFunc(a.LEQUAL);break;case 4:a.depthFunc(a.EQUAL);break;case 5:a.depthFunc(a.GEQUAL);break;case 6:a.depthFunc(a.GREATER);break;case 7:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}xt=Q}},setLocked:function(Q){O=Q},setClear:function(Q){nt!==Q&&(rt&&(Q=1-Q),a.clearDepth(Q),nt=Q)},reset:function(){O=!1,lt=null,xt=null,nt=null,rt=!1}}}function n(){let O=!1,rt=null,lt=null,xt=null,nt=null,Q=null,St=null,Kt=null,Se=null;return{setTest:function(ue){O||(ue?et(a.STENCIL_TEST):ct(a.STENCIL_TEST))},setMask:function(ue){rt!==ue&&!O&&(a.stencilMask(ue),rt=ue)},setFunc:function(ue,Qi,Ki){(lt!==ue||xt!==Qi||nt!==Ki)&&(a.stencilFunc(ue,Qi,Ki),lt=ue,xt=Qi,nt=Ki)},setOp:function(ue,Qi,Ki){(Q!==ue||St!==Qi||Kt!==Ki)&&(a.stencilOp(ue,Qi,Ki),Q=ue,St=Qi,Kt=Ki)},setLocked:function(ue){O=ue},setClear:function(ue){Se!==ue&&(a.clearStencil(ue),Se=ue)},reset:function(){O=!1,rt=null,lt=null,xt=null,nt=null,Q=null,St=null,Kt=null,Se=null}}}const s=new e,r=new i,o=new n,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,g=[],m=null,v=!1,p=null,f=null,S=null,x=null,_=null,M=null,T=null,E=new re(0,0,0),R=0,w=!1,b=null,L=null,P=null,B=null,k=null;const F=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,z=0;const U=a.getParameter(a.VERSION);U.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(U)[1]),N=z>=1):U.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),N=z>=2);let W=null,J={};const tt=a.getParameter(a.SCISSOR_BOX),gt=a.getParameter(a.VIEWPORT),Lt=new be().fromArray(tt),se=new be().fromArray(gt);function Jt(O,rt,lt,xt){const nt=new Uint8Array(4),Q=a.createTexture();a.bindTexture(O,Q),a.texParameteri(O,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(O,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let St=0;St<lt;St++)O===a.TEXTURE_3D||O===a.TEXTURE_2D_ARRAY?a.texImage3D(rt,0,a.RGBA,1,1,xt,0,a.RGBA,a.UNSIGNED_BYTE,nt):a.texImage2D(rt+St,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,nt);return Q}const j={};j[a.TEXTURE_2D]=Jt(a.TEXTURE_2D,a.TEXTURE_2D,1),j[a.TEXTURE_CUBE_MAP]=Jt(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[a.TEXTURE_2D_ARRAY]=Jt(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),j[a.TEXTURE_3D]=Jt(a.TEXTURE_3D,a.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),et(a.DEPTH_TEST),r.setFunc(3),Bt(!1),_t(1),et(a.CULL_FACE),ve(0);function et(O){h[O]!==!0&&(a.enable(O),h[O]=!0)}function ct(O){h[O]!==!1&&(a.disable(O),h[O]=!1)}function Ot(O,rt){return u[O]!==rt?(a.bindFramebuffer(O,rt),u[O]=rt,O===a.DRAW_FRAMEBUFFER&&(u[a.FRAMEBUFFER]=rt),O===a.FRAMEBUFFER&&(u[a.DRAW_FRAMEBUFFER]=rt),!0):!1}function bt(O,rt){let lt=g,xt=!1;if(O){lt=d.get(rt),lt===void 0&&(lt=[],d.set(rt,lt));const nt=O.textures;if(lt.length!==nt.length||lt[0]!==a.COLOR_ATTACHMENT0){for(let Q=0,St=nt.length;Q<St;Q++)lt[Q]=a.COLOR_ATTACHMENT0+Q;lt.length=nt.length,xt=!0}}else lt[0]!==a.BACK&&(lt[0]=a.BACK,xt=!0);xt&&a.drawBuffers(lt)}function Qt(O){return m!==O?(a.useProgram(O),m=O,!0):!1}const Be={100:a.FUNC_ADD,101:a.FUNC_SUBTRACT,102:a.FUNC_REVERSE_SUBTRACT};Be[103]=a.MIN,Be[104]=a.MAX;const I={200:a.ZERO,201:a.ONE,202:a.SRC_COLOR,204:a.SRC_ALPHA,210:a.SRC_ALPHA_SATURATE,208:a.DST_COLOR,206:a.DST_ALPHA,203:a.ONE_MINUS_SRC_COLOR,205:a.ONE_MINUS_SRC_ALPHA,209:a.ONE_MINUS_DST_COLOR,207:a.ONE_MINUS_DST_ALPHA,211:a.CONSTANT_COLOR,212:a.ONE_MINUS_CONSTANT_COLOR,213:a.CONSTANT_ALPHA,214:a.ONE_MINUS_CONSTANT_ALPHA};function ve(O,rt,lt,xt,nt,Q,St,Kt,Se,ue){if(O===0){v===!0&&(ct(a.BLEND),v=!1);return}if(v===!1&&(et(a.BLEND),v=!0),O!==5){if(O!==p||ue!==w){if((f!==100||_!==100)&&(a.blendEquation(a.FUNC_ADD),f=100,_=100),ue)switch(O){case 1:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case 2:a.blendFunc(a.ONE,a.ONE);break;case 3:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case 4:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case 1:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case 2:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case 3:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}S=null,x=null,M=null,T=null,E.set(0,0,0),R=0,p=O,w=ue}return}nt=nt||rt,Q=Q||lt,St=St||xt,(rt!==f||nt!==_)&&(a.blendEquationSeparate(Be[rt],Be[nt]),f=rt,_=nt),(lt!==S||xt!==x||Q!==M||St!==T)&&(a.blendFuncSeparate(I[lt],I[xt],I[Q],I[St]),S=lt,x=xt,M=Q,T=St),(Kt.equals(E)===!1||Se!==R)&&(a.blendColor(Kt.r,Kt.g,Kt.b,Se),E.copy(Kt),R=Se),p=O,w=!1}function Gt(O,rt){O.side===2?ct(a.CULL_FACE):et(a.CULL_FACE);let lt=O.side===1;rt&&(lt=!lt),Bt(lt),O.blending===1&&O.transparent===!1?ve(0):ve(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),s.setMask(O.colorWrite);const xt=O.stencilWrite;o.setTest(xt),xt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Tt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?et(a.SAMPLE_ALPHA_TO_COVERAGE):ct(a.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(O){b!==O&&(O?a.frontFace(a.CW):a.frontFace(a.CCW),b=O)}function _t(O){O!==0?(et(a.CULL_FACE),O!==L&&(O===1?a.cullFace(a.BACK):O===2?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):ct(a.CULL_FACE),L=O}function Ae(O){O!==P&&(N&&a.lineWidth(O),P=O)}function Tt(O,rt,lt){O?(et(a.POLYGON_OFFSET_FILL),(B!==rt||k!==lt)&&(a.polygonOffset(rt,lt),B=rt,k=lt)):ct(a.POLYGON_OFFSET_FILL)}function $t(O){O?et(a.SCISSOR_TEST):ct(a.SCISSOR_TEST)}function qe(O){O===void 0&&(O=a.TEXTURE0+F-1),W!==O&&(a.activeTexture(O),W=O)}function Fe(O,rt,lt){lt===void 0&&(W===null?lt=a.TEXTURE0+F-1:lt=W);let xt=J[lt];xt===void 0&&(xt={type:void 0,texture:void 0},J[lt]=xt),(xt.type!==O||xt.texture!==rt)&&(W!==lt&&(a.activeTexture(lt),W=lt),a.bindTexture(O,rt||j[O]),xt.type=O,xt.texture=rt)}function D(){const O=J[W];O!==void 0&&O.type!==void 0&&(a.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function A(){try{a.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function G(){try{a.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(){try{a.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{a.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $(){try{a.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{a.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ot(){try{a.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Et(){try{a.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ct(){try{a.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{a.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pt(O){Lt.equals(O)===!1&&(a.scissor(O.x,O.y,O.z,O.w),Lt.copy(O))}function zt(O){se.equals(O)===!1&&(a.viewport(O.x,O.y,O.z,O.w),se.copy(O))}function Rt(O,rt){let lt=c.get(rt);lt===void 0&&(lt=new WeakMap,c.set(rt,lt));let xt=lt.get(O);xt===void 0&&(xt=a.getUniformBlockIndex(rt,O.name),lt.set(O,xt))}function dt(O,rt){const xt=c.get(rt).get(O);l.get(rt)!==xt&&(a.uniformBlockBinding(rt,xt,O.__bindingPointIndex),l.set(rt,xt))}function Yt(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),r.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),h={},W=null,J={},u={},d=new WeakMap,g=[],m=null,v=!1,p=null,f=null,S=null,x=null,_=null,M=null,T=null,E=new re(0,0,0),R=0,w=!1,b=null,L=null,P=null,B=null,k=null,Lt.set(0,0,a.canvas.width,a.canvas.height),se.set(0,0,a.canvas.width,a.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:et,disable:ct,bindFramebuffer:Ot,drawBuffers:bt,useProgram:Qt,setBlending:ve,setMaterial:Gt,setFlipSided:Bt,setCullFace:_t,setLineWidth:Ae,setPolygonOffset:Tt,setScissorTest:$t,activeTexture:qe,bindTexture:Fe,unbindTexture:D,compressedTexImage2D:A,compressedTexImage3D:G,texImage2D:Ct,texImage3D:at,updateUBOMapping:Rt,uniformBlockBinding:dt,texStorage2D:ot,texStorage3D:Et,texSubImage2D:Z,texSubImage3D:it,compressedTexSubImage2D:$,compressedTexSubImage3D:Pt,scissor:pt,viewport:zt,reset:Yt}}function zg(a,t,e,i,n,s,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,A){return g?new OffscreenCanvas(D,A):no("canvas")}function v(D,A,G){let Z=1;const it=Fe(D);if((it.width>G||it.height>G)&&(Z=G/Math.max(it.width,it.height)),Z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const $=Math.floor(Z*it.width),Pt=Math.floor(Z*it.height);u===void 0&&(u=m($,Pt));const ot=A?m($,Pt):u;return ot.width=$,ot.height=Pt,ot.getContext("2d").drawImage(D,0,0,$,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+$+"x"+Pt+")."),ot}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),D;return D}function p(D){return D.generateMipmaps}function f(D){a.generateMipmap(D)}function S(D){return D.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?a.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function x(D,A,G,Z,it=!1){if(D!==null){if(a[D]!==void 0)return a[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let $=A;if(A===a.RED&&(G===a.FLOAT&&($=a.R32F),G===a.HALF_FLOAT&&($=a.R16F),G===a.UNSIGNED_BYTE&&($=a.R8)),A===a.RED_INTEGER&&(G===a.UNSIGNED_BYTE&&($=a.R8UI),G===a.UNSIGNED_SHORT&&($=a.R16UI),G===a.UNSIGNED_INT&&($=a.R32UI),G===a.BYTE&&($=a.R8I),G===a.SHORT&&($=a.R16I),G===a.INT&&($=a.R32I)),A===a.RG&&(G===a.FLOAT&&($=a.RG32F),G===a.HALF_FLOAT&&($=a.RG16F),G===a.UNSIGNED_BYTE&&($=a.RG8)),A===a.RG_INTEGER&&(G===a.UNSIGNED_BYTE&&($=a.RG8UI),G===a.UNSIGNED_SHORT&&($=a.RG16UI),G===a.UNSIGNED_INT&&($=a.RG32UI),G===a.BYTE&&($=a.RG8I),G===a.SHORT&&($=a.RG16I),G===a.INT&&($=a.RG32I)),A===a.RGB_INTEGER&&(G===a.UNSIGNED_BYTE&&($=a.RGB8UI),G===a.UNSIGNED_SHORT&&($=a.RGB16UI),G===a.UNSIGNED_INT&&($=a.RGB32UI),G===a.BYTE&&($=a.RGB8I),G===a.SHORT&&($=a.RGB16I),G===a.INT&&($=a.RGB32I)),A===a.RGBA_INTEGER&&(G===a.UNSIGNED_BYTE&&($=a.RGBA8UI),G===a.UNSIGNED_SHORT&&($=a.RGBA16UI),G===a.UNSIGNED_INT&&($=a.RGBA32UI),G===a.BYTE&&($=a.RGBA8I),G===a.SHORT&&($=a.RGBA16I),G===a.INT&&($=a.RGBA32I)),A===a.RGB&&(G===a.UNSIGNED_INT_5_9_9_9_REV&&($=a.RGB9_E5),G===a.UNSIGNED_INT_10F_11F_11F_REV&&($=a.R11F_G11F_B10F)),A===a.RGBA){const Pt=it?io:he.getTransfer(Z);G===a.FLOAT&&($=a.RGBA32F),G===a.HALF_FLOAT&&($=a.RGBA16F),G===a.UNSIGNED_BYTE&&($=Pt===ge?a.SRGB8_ALPHA8:a.RGBA8),G===a.UNSIGNED_SHORT_4_4_4_4&&($=a.RGBA4),G===a.UNSIGNED_SHORT_5_5_5_1&&($=a.RGB5_A1)}return($===a.R16F||$===a.R32F||$===a.RG16F||$===a.RG32F||$===a.RGBA16F||$===a.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function _(D,A){let G;return D?A===null||A===1014||A===1020?G=a.DEPTH24_STENCIL8:A===1015?G=a.DEPTH32F_STENCIL8:A===1012&&(G=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===1014||A===1020?G=a.DEPTH_COMPONENT24:A===1015?G=a.DEPTH_COMPONENT32F:A===1012&&(G=a.DEPTH_COMPONENT16),G}function M(D,A){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==1003&&D.minFilter!==1006?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function T(D){const A=D.target;A.removeEventListener("dispose",T),R(A),A.isVideoTexture&&h.delete(A)}function E(D){const A=D.target;A.removeEventListener("dispose",E),b(A)}function R(D){const A=i.get(D);if(A.__webglInit===void 0)return;const G=D.source,Z=d.get(G);if(Z){const it=Z[A.__cacheKey];it.usedTimes--,it.usedTimes===0&&w(D),Object.keys(Z).length===0&&d.delete(G)}i.remove(D)}function w(D){const A=i.get(D);a.deleteTexture(A.__webglTexture);const G=D.source,Z=d.get(G);delete Z[A.__cacheKey],r.memory.textures--}function b(D){const A=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(A.__webglFramebuffer[Z]))for(let it=0;it<A.__webglFramebuffer[Z].length;it++)a.deleteFramebuffer(A.__webglFramebuffer[Z][it]);else a.deleteFramebuffer(A.__webglFramebuffer[Z]);A.__webglDepthbuffer&&a.deleteRenderbuffer(A.__webglDepthbuffer[Z])}else{if(Array.isArray(A.__webglFramebuffer))for(let Z=0;Z<A.__webglFramebuffer.length;Z++)a.deleteFramebuffer(A.__webglFramebuffer[Z]);else a.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&a.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&a.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let Z=0;Z<A.__webglColorRenderbuffer.length;Z++)A.__webglColorRenderbuffer[Z]&&a.deleteRenderbuffer(A.__webglColorRenderbuffer[Z]);A.__webglDepthRenderbuffer&&a.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const G=D.textures;for(let Z=0,it=G.length;Z<it;Z++){const $=i.get(G[Z]);$.__webglTexture&&(a.deleteTexture($.__webglTexture),r.memory.textures--),i.remove(G[Z])}i.remove(D)}let L=0;function P(){L=0}function B(){const D=L;return D>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+n.maxTextures),L+=1,D}function k(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function F(D,A){const G=i.get(D);if(D.isVideoTexture&&$t(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&G.__version!==D.version){const Z=D.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(G,D,A);return}}else D.isExternalTexture&&(G.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(a.TEXTURE_2D,G.__webglTexture,a.TEXTURE0+A)}function N(D,A){const G=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){j(G,D,A);return}e.bindTexture(a.TEXTURE_2D_ARRAY,G.__webglTexture,a.TEXTURE0+A)}function z(D,A){const G=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){j(G,D,A);return}e.bindTexture(a.TEXTURE_3D,G.__webglTexture,a.TEXTURE0+A)}function U(D,A){const G=i.get(D);if(D.version>0&&G.__version!==D.version){et(G,D,A);return}e.bindTexture(a.TEXTURE_CUBE_MAP,G.__webglTexture,a.TEXTURE0+A)}const W={1e3:a.REPEAT,1001:a.CLAMP_TO_EDGE,1002:a.MIRRORED_REPEAT},J={1003:a.NEAREST,1004:a.NEAREST_MIPMAP_NEAREST,1005:a.NEAREST_MIPMAP_LINEAR,1006:a.LINEAR,1007:a.LINEAR_MIPMAP_NEAREST,1008:a.LINEAR_MIPMAP_LINEAR},tt={512:a.NEVER,519:a.ALWAYS,513:a.LESS,515:a.LEQUAL,514:a.EQUAL,518:a.GEQUAL,516:a.GREATER,517:a.NOTEQUAL};function gt(D,A){if(A.type===1015&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===1006||A.magFilter===1007||A.magFilter===1005||A.magFilter===1008||A.minFilter===1006||A.minFilter===1007||A.minFilter===1005||A.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(D,a.TEXTURE_WRAP_S,W[A.wrapS]),a.texParameteri(D,a.TEXTURE_WRAP_T,W[A.wrapT]),(D===a.TEXTURE_3D||D===a.TEXTURE_2D_ARRAY)&&a.texParameteri(D,a.TEXTURE_WRAP_R,W[A.wrapR]),a.texParameteri(D,a.TEXTURE_MAG_FILTER,J[A.magFilter]),a.texParameteri(D,a.TEXTURE_MIN_FILTER,J[A.minFilter]),A.compareFunction&&(a.texParameteri(D,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(D,a.TEXTURE_COMPARE_FUNC,tt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===1003||A.minFilter!==1005&&A.minFilter!==1008||A.type===1015&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");a.texParameterf(D,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,n.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Lt(D,A){let G=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",T));const Z=A.source;let it=d.get(Z);it===void 0&&(it={},d.set(Z,it));const $=k(A);if($!==D.__cacheKey){it[$]===void 0&&(it[$]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,G=!0),it[$].usedTimes++;const Pt=it[D.__cacheKey];Pt!==void 0&&(it[D.__cacheKey].usedTimes--,Pt.usedTimes===0&&w(A)),D.__cacheKey=$,D.__webglTexture=it[$].texture}return G}function se(D,A,G){return Math.floor(Math.floor(D/G)/A)}function Jt(D,A,G,Z){const $=D.updateRanges;if($.length===0)e.texSubImage2D(a.TEXTURE_2D,0,0,0,A.width,A.height,G,Z,A.data);else{$.sort((at,pt)=>at.start-pt.start);let Pt=0;for(let at=1;at<$.length;at++){const pt=$[Pt],zt=$[at],Rt=pt.start+pt.count,dt=se(zt.start,A.width,4),Yt=se(pt.start,A.width,4);zt.start<=Rt+1&&dt===Yt&&se(zt.start+zt.count-1,A.width,4)===dt?pt.count=Math.max(pt.count,zt.start+zt.count-pt.start):(++Pt,$[Pt]=zt)}$.length=Pt+1;const ot=a.getParameter(a.UNPACK_ROW_LENGTH),Et=a.getParameter(a.UNPACK_SKIP_PIXELS),Ct=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,A.width);for(let at=0,pt=$.length;at<pt;at++){const zt=$[at],Rt=Math.floor(zt.start/4),dt=Math.ceil(zt.count/4),Yt=Rt%A.width,O=Math.floor(Rt/A.width),rt=dt,lt=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,Yt),a.pixelStorei(a.UNPACK_SKIP_ROWS,O),e.texSubImage2D(a.TEXTURE_2D,0,Yt,O,rt,lt,G,Z,A.data)}D.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,ot),a.pixelStorei(a.UNPACK_SKIP_PIXELS,Et),a.pixelStorei(a.UNPACK_SKIP_ROWS,Ct)}}function j(D,A,G){let Z=a.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(Z=a.TEXTURE_2D_ARRAY),A.isData3DTexture&&(Z=a.TEXTURE_3D);const it=Lt(D,A),$=A.source;e.bindTexture(Z,D.__webglTexture,a.TEXTURE0+G);const Pt=i.get($);if($.version!==Pt.__version||it===!0){e.activeTexture(a.TEXTURE0+G);const ot=he.getPrimaries(he.workingColorSpace),Et=A.colorSpace===""?null:he.getPrimaries(A.colorSpace),Ct=A.colorSpace===""||ot===Et?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,A.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,A.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let at=v(A.image,!1,n.maxTextureSize);at=qe(A,at);const pt=s.convert(A.format,A.colorSpace),zt=s.convert(A.type);let Rt=x(A.internalFormat,pt,zt,A.colorSpace,A.isVideoTexture);gt(Z,A);let dt;const Yt=A.mipmaps,O=A.isVideoTexture!==!0,rt=Pt.__version===void 0||it===!0,lt=$.dataReady,xt=M(A,at);if(A.isDepthTexture)Rt=_(A.format===1027,A.type),rt&&(O?e.texStorage2D(a.TEXTURE_2D,1,Rt,at.width,at.height):e.texImage2D(a.TEXTURE_2D,0,Rt,at.width,at.height,0,pt,zt,null));else if(A.isDataTexture)if(Yt.length>0){O&&rt&&e.texStorage2D(a.TEXTURE_2D,xt,Rt,Yt[0].width,Yt[0].height);for(let nt=0,Q=Yt.length;nt<Q;nt++)dt=Yt[nt],O?lt&&e.texSubImage2D(a.TEXTURE_2D,nt,0,0,dt.width,dt.height,pt,zt,dt.data):e.texImage2D(a.TEXTURE_2D,nt,Rt,dt.width,dt.height,0,pt,zt,dt.data);A.generateMipmaps=!1}else O?(rt&&e.texStorage2D(a.TEXTURE_2D,xt,Rt,at.width,at.height),lt&&Jt(A,at,pt,zt)):e.texImage2D(a.TEXTURE_2D,0,Rt,at.width,at.height,0,pt,zt,at.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){O&&rt&&e.texStorage3D(a.TEXTURE_2D_ARRAY,xt,Rt,Yt[0].width,Yt[0].height,at.depth);for(let nt=0,Q=Yt.length;nt<Q;nt++)if(dt=Yt[nt],A.format!==1023)if(pt!==null)if(O){if(lt)if(A.layerUpdates.size>0){const St=Pc(dt.width,dt.height,A.format,A.type);for(const Kt of A.layerUpdates){const Se=dt.data.subarray(Kt*St/dt.data.BYTES_PER_ELEMENT,(Kt+1)*St/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,nt,0,0,Kt,dt.width,dt.height,1,pt,Se)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,nt,0,0,0,dt.width,dt.height,at.depth,pt,dt.data)}else e.compressedTexImage3D(a.TEXTURE_2D_ARRAY,nt,Rt,dt.width,dt.height,at.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?lt&&e.texSubImage3D(a.TEXTURE_2D_ARRAY,nt,0,0,0,dt.width,dt.height,at.depth,pt,zt,dt.data):e.texImage3D(a.TEXTURE_2D_ARRAY,nt,Rt,dt.width,dt.height,at.depth,0,pt,zt,dt.data)}else{O&&rt&&e.texStorage2D(a.TEXTURE_2D,xt,Rt,Yt[0].width,Yt[0].height);for(let nt=0,Q=Yt.length;nt<Q;nt++)dt=Yt[nt],A.format!==1023?pt!==null?O?lt&&e.compressedTexSubImage2D(a.TEXTURE_2D,nt,0,0,dt.width,dt.height,pt,dt.data):e.compressedTexImage2D(a.TEXTURE_2D,nt,Rt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?lt&&e.texSubImage2D(a.TEXTURE_2D,nt,0,0,dt.width,dt.height,pt,zt,dt.data):e.texImage2D(a.TEXTURE_2D,nt,Rt,dt.width,dt.height,0,pt,zt,dt.data)}else if(A.isDataArrayTexture)if(O){if(rt&&e.texStorage3D(a.TEXTURE_2D_ARRAY,xt,Rt,at.width,at.height,at.depth),lt)if(A.layerUpdates.size>0){const nt=Pc(at.width,at.height,A.format,A.type);for(const Q of A.layerUpdates){const St=at.data.subarray(Q*nt/at.data.BYTES_PER_ELEMENT,(Q+1)*nt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,Q,at.width,at.height,1,pt,zt,St)}A.clearLayerUpdates()}else e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,pt,zt,at.data)}else e.texImage3D(a.TEXTURE_2D_ARRAY,0,Rt,at.width,at.height,at.depth,0,pt,zt,at.data);else if(A.isData3DTexture)O?(rt&&e.texStorage3D(a.TEXTURE_3D,xt,Rt,at.width,at.height,at.depth),lt&&e.texSubImage3D(a.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,pt,zt,at.data)):e.texImage3D(a.TEXTURE_3D,0,Rt,at.width,at.height,at.depth,0,pt,zt,at.data);else if(A.isFramebufferTexture){if(rt)if(O)e.texStorage2D(a.TEXTURE_2D,xt,Rt,at.width,at.height);else{let nt=at.width,Q=at.height;for(let St=0;St<xt;St++)e.texImage2D(a.TEXTURE_2D,St,Rt,nt,Q,0,pt,zt,null),nt>>=1,Q>>=1}}else if(Yt.length>0){if(O&&rt){const nt=Fe(Yt[0]);e.texStorage2D(a.TEXTURE_2D,xt,Rt,nt.width,nt.height)}for(let nt=0,Q=Yt.length;nt<Q;nt++)dt=Yt[nt],O?lt&&e.texSubImage2D(a.TEXTURE_2D,nt,0,0,pt,zt,dt):e.texImage2D(a.TEXTURE_2D,nt,Rt,pt,zt,dt);A.generateMipmaps=!1}else if(O){if(rt){const nt=Fe(at);e.texStorage2D(a.TEXTURE_2D,xt,Rt,nt.width,nt.height)}lt&&e.texSubImage2D(a.TEXTURE_2D,0,0,0,pt,zt,at)}else e.texImage2D(a.TEXTURE_2D,0,Rt,pt,zt,at);p(A)&&f(Z),Pt.__version=$.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function et(D,A,G){if(A.image.length!==6)return;const Z=Lt(D,A),it=A.source;e.bindTexture(a.TEXTURE_CUBE_MAP,D.__webglTexture,a.TEXTURE0+G);const $=i.get(it);if(it.version!==$.__version||Z===!0){e.activeTexture(a.TEXTURE0+G);const Pt=he.getPrimaries(he.workingColorSpace),ot=A.colorSpace===""?null:he.getPrimaries(A.colorSpace),Et=A.colorSpace===""||Pt===ot?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,A.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,A.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Ct=A.isCompressedTexture||A.image[0].isCompressedTexture,at=A.image[0]&&A.image[0].isDataTexture,pt=[];for(let Q=0;Q<6;Q++)!Ct&&!at?pt[Q]=v(A.image[Q],!0,n.maxCubemapSize):pt[Q]=at?A.image[Q].image:A.image[Q],pt[Q]=qe(A,pt[Q]);const zt=pt[0],Rt=s.convert(A.format,A.colorSpace),dt=s.convert(A.type),Yt=x(A.internalFormat,Rt,dt,A.colorSpace),O=A.isVideoTexture!==!0,rt=$.__version===void 0||Z===!0,lt=it.dataReady;let xt=M(A,zt);gt(a.TEXTURE_CUBE_MAP,A);let nt;if(Ct){O&&rt&&e.texStorage2D(a.TEXTURE_CUBE_MAP,xt,Yt,zt.width,zt.height);for(let Q=0;Q<6;Q++){nt=pt[Q].mipmaps;for(let St=0;St<nt.length;St++){const Kt=nt[St];A.format!==1023?Rt!==null?O?lt&&e.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,0,0,Kt.width,Kt.height,Rt,Kt.data):e.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,Yt,Kt.width,Kt.height,0,Kt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?lt&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,0,0,Kt.width,Kt.height,Rt,dt,Kt.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,Yt,Kt.width,Kt.height,0,Rt,dt,Kt.data)}}}else{if(nt=A.mipmaps,O&&rt){nt.length>0&&xt++;const Q=Fe(pt[0]);e.texStorage2D(a.TEXTURE_CUBE_MAP,xt,Yt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(at){O?lt&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,pt[Q].width,pt[Q].height,Rt,dt,pt[Q].data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Yt,pt[Q].width,pt[Q].height,0,Rt,dt,pt[Q].data);for(let St=0;St<nt.length;St++){const Se=nt[St].image[Q].image;O?lt&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,0,0,Se.width,Se.height,Rt,dt,Se.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,Yt,Se.width,Se.height,0,Rt,dt,Se.data)}}else{O?lt&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Rt,dt,pt[Q]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Yt,Rt,dt,pt[Q]);for(let St=0;St<nt.length;St++){const Kt=nt[St];O?lt&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,0,0,Rt,dt,Kt.image[Q]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,Yt,Rt,dt,Kt.image[Q])}}}p(A)&&f(a.TEXTURE_CUBE_MAP),$.__version=it.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function ct(D,A,G,Z,it,$){const Pt=s.convert(G.format,G.colorSpace),ot=s.convert(G.type),Et=x(G.internalFormat,Pt,ot,G.colorSpace),Ct=i.get(A),at=i.get(G);if(at.__renderTarget=A,!Ct.__hasExternalTextures){const pt=Math.max(1,A.width>>$),zt=Math.max(1,A.height>>$);it===a.TEXTURE_3D||it===a.TEXTURE_2D_ARRAY?e.texImage3D(it,$,Et,pt,zt,A.depth,0,Pt,ot,null):e.texImage2D(it,$,Et,pt,zt,0,Pt,ot,null)}e.bindFramebuffer(a.FRAMEBUFFER,D),Tt(A)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,Z,it,at.__webglTexture,0,Ae(A)):(it===a.TEXTURE_2D||it>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,Z,it,at.__webglTexture,$),e.bindFramebuffer(a.FRAMEBUFFER,null)}function Ot(D,A,G){if(a.bindRenderbuffer(a.RENDERBUFFER,D),A.depthBuffer){const Z=A.depthTexture,it=Z&&Z.isDepthTexture?Z.type:null,$=_(A.stencilBuffer,it),Pt=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ot=Ae(A);Tt(A)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ot,$,A.width,A.height):G?a.renderbufferStorageMultisample(a.RENDERBUFFER,ot,$,A.width,A.height):a.renderbufferStorage(a.RENDERBUFFER,$,A.width,A.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Pt,a.RENDERBUFFER,D)}else{const Z=A.textures;for(let it=0;it<Z.length;it++){const $=Z[it],Pt=s.convert($.format,$.colorSpace),ot=s.convert($.type),Et=x($.internalFormat,Pt,ot,$.colorSpace),Ct=Ae(A);G&&Tt(A)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,Ct,Et,A.width,A.height):Tt(A)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Ct,Et,A.width,A.height):a.renderbufferStorage(a.RENDERBUFFER,Et,A.width,A.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function bt(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(a.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(A.depthTexture);Z.__renderTarget=A,(!Z.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),F(A.depthTexture,0);const it=Z.__webglTexture,$=Ae(A);if(A.depthTexture.format===1026)Tt(A)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,it,0,$):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,it,0);else if(A.depthTexture.format===1027)Tt(A)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,it,0,$):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Qt(D){const A=i.get(D),G=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const Z=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),Z){const it=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,Z.removeEventListener("dispose",it)};Z.addEventListener("dispose",it),A.__depthDisposeCallback=it}A.__boundDepthTexture=Z}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const Z=D.texture.mipmaps;Z&&Z.length>0?bt(A.__webglFramebuffer[0],D):bt(A.__webglFramebuffer,D)}else if(G){A.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer[Z]),A.__webglDepthbuffer[Z]===void 0)A.__webglDepthbuffer[Z]=a.createRenderbuffer(),Ot(A.__webglDepthbuffer[Z],D,!1);else{const it=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer[Z];a.bindRenderbuffer(a.RENDERBUFFER,$),a.framebufferRenderbuffer(a.FRAMEBUFFER,it,a.RENDERBUFFER,$)}}else{const Z=D.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer[0]):e.bindFramebuffer(a.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=a.createRenderbuffer(),Ot(A.__webglDepthbuffer,D,!1);else{const it=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,$),a.framebufferRenderbuffer(a.FRAMEBUFFER,it,a.RENDERBUFFER,$)}}e.bindFramebuffer(a.FRAMEBUFFER,null)}function Be(D,A,G){const Z=i.get(D);A!==void 0&&ct(Z.__webglFramebuffer,D,D.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),G!==void 0&&Qt(D)}function I(D){const A=D.texture,G=i.get(D),Z=i.get(A);D.addEventListener("dispose",E);const it=D.textures,$=D.isWebGLCubeRenderTarget===!0,Pt=it.length>1;if(Pt||(Z.__webglTexture===void 0&&(Z.__webglTexture=a.createTexture()),Z.__version=A.version,r.memory.textures++),$){G.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(A.mipmaps&&A.mipmaps.length>0){G.__webglFramebuffer[ot]=[];for(let Et=0;Et<A.mipmaps.length;Et++)G.__webglFramebuffer[ot][Et]=a.createFramebuffer()}else G.__webglFramebuffer[ot]=a.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){G.__webglFramebuffer=[];for(let ot=0;ot<A.mipmaps.length;ot++)G.__webglFramebuffer[ot]=a.createFramebuffer()}else G.__webglFramebuffer=a.createFramebuffer();if(Pt)for(let ot=0,Et=it.length;ot<Et;ot++){const Ct=i.get(it[ot]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=a.createTexture(),r.memory.textures++)}if(D.samples>0&&Tt(D)===!1){G.__webglMultisampledFramebuffer=a.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(a.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ot=0;ot<it.length;ot++){const Et=it[ot];G.__webglColorRenderbuffer[ot]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,G.__webglColorRenderbuffer[ot]);const Ct=s.convert(Et.format,Et.colorSpace),at=s.convert(Et.type),pt=x(Et.internalFormat,Ct,at,Et.colorSpace,D.isXRRenderTarget===!0),zt=Ae(D);a.renderbufferStorageMultisample(a.RENDERBUFFER,zt,pt,D.width,D.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ot,a.RENDERBUFFER,G.__webglColorRenderbuffer[ot])}a.bindRenderbuffer(a.RENDERBUFFER,null),D.depthBuffer&&(G.__webglDepthRenderbuffer=a.createRenderbuffer(),Ot(G.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(a.FRAMEBUFFER,null)}}if($){e.bindTexture(a.TEXTURE_CUBE_MAP,Z.__webglTexture),gt(a.TEXTURE_CUBE_MAP,A);for(let ot=0;ot<6;ot++)if(A.mipmaps&&A.mipmaps.length>0)for(let Et=0;Et<A.mipmaps.length;Et++)ct(G.__webglFramebuffer[ot][Et],D,A,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et);else ct(G.__webglFramebuffer[ot],D,A,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(A)&&f(a.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let ot=0,Et=it.length;ot<Et;ot++){const Ct=it[ot],at=i.get(Ct);let pt=a.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(pt=D.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),e.bindTexture(pt,at.__webglTexture),gt(pt,Ct),ct(G.__webglFramebuffer,D,Ct,a.COLOR_ATTACHMENT0+ot,pt,0),p(Ct)&&f(pt)}e.unbindTexture()}else{let ot=a.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ot=D.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),e.bindTexture(ot,Z.__webglTexture),gt(ot,A),A.mipmaps&&A.mipmaps.length>0)for(let Et=0;Et<A.mipmaps.length;Et++)ct(G.__webglFramebuffer[Et],D,A,a.COLOR_ATTACHMENT0,ot,Et);else ct(G.__webglFramebuffer,D,A,a.COLOR_ATTACHMENT0,ot,0);p(A)&&f(ot),e.unbindTexture()}D.depthBuffer&&Qt(D)}function ve(D){const A=D.textures;for(let G=0,Z=A.length;G<Z;G++){const it=A[G];if(p(it)){const $=S(D),Pt=i.get(it).__webglTexture;e.bindTexture($,Pt),f($),e.unbindTexture()}}}const Gt=[],Bt=[];function _t(D){if(D.samples>0){if(Tt(D)===!1){const A=D.textures,G=D.width,Z=D.height;let it=a.COLOR_BUFFER_BIT;const $=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Pt=i.get(D),ot=A.length>1;if(ot)for(let Ct=0;Ct<A.length;Ct++)e.bindFramebuffer(a.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ct,a.RENDERBUFFER,null),e.bindFramebuffer(a.FRAMEBUFFER,Pt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ct,a.TEXTURE_2D,null,0);e.bindFramebuffer(a.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer);const Et=D.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer[0]):e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Ct=0;Ct<A.length;Ct++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(it|=a.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(it|=a.STENCIL_BUFFER_BIT)),ot){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Pt.__webglColorRenderbuffer[Ct]);const at=i.get(A[Ct]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,at,0)}a.blitFramebuffer(0,0,G,Z,0,0,G,Z,it,a.NEAREST),l===!0&&(Gt.length=0,Bt.length=0,Gt.push(a.COLOR_ATTACHMENT0+Ct),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Gt.push($),Bt.push($),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,Bt)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Gt))}if(e.bindFramebuffer(a.READ_FRAMEBUFFER,null),e.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),ot)for(let Ct=0;Ct<A.length;Ct++){e.bindFramebuffer(a.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ct,a.RENDERBUFFER,Pt.__webglColorRenderbuffer[Ct]);const at=i.get(A[Ct]).__webglTexture;e.bindFramebuffer(a.FRAMEBUFFER,Pt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ct,a.TEXTURE_2D,at,0)}e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const A=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[A])}}}function Ae(D){return Math.min(n.maxSamples,D.samples)}function Tt(D){const A=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function $t(D){const A=r.render.frame;h.get(D)!==A&&(h.set(D,A),D.update())}function qe(D,A){const G=D.colorSpace,Z=D.format,it=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||G!==sa&&G!==""&&(he.getTransfer(G)===ge?(Z!==1023||it!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),A}function Fe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=P,this.setTexture2D=F,this.setTexture2DArray=N,this.setTexture3D=z,this.setTextureCube=U,this.rebindTextures=Be,this.setupRenderTarget=I,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Qt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=Tt}function Vg(a,t){function e(i,n=""){let s;const r=he.getTransfer(n);if(i===1009)return a.UNSIGNED_BYTE;if(i===1017)return a.UNSIGNED_SHORT_4_4_4_4;if(i===1018)return a.UNSIGNED_SHORT_5_5_5_1;if(i===35902)return a.UNSIGNED_INT_5_9_9_9_REV;if(i===35899)return a.UNSIGNED_INT_10F_11F_11F_REV;if(i===1010)return a.BYTE;if(i===1011)return a.SHORT;if(i===1012)return a.UNSIGNED_SHORT;if(i===1013)return a.INT;if(i===1014)return a.UNSIGNED_INT;if(i===1015)return a.FLOAT;if(i===1016)return a.HALF_FLOAT;if(i===1021)return a.ALPHA;if(i===1022)return a.RGB;if(i===1023)return a.RGBA;if(i===1026)return a.DEPTH_COMPONENT;if(i===1027)return a.DEPTH_STENCIL;if(i===1028)return a.RED;if(i===1029)return a.RED_INTEGER;if(i===1030)return a.RG;if(i===1031)return a.RG_INTEGER;if(i===1033)return a.RGBA_INTEGER;if(i===33776||i===33777||i===33778||i===33779)if(r===ge)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===35840||i===35841||i===35842||i===35843)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===36196||i===37492||i===37496)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===36196||i===37492)return r===ge?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===37496)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===37808||i===37809||i===37810||i===37811||i===37812||i===37813||i===37814||i===37815||i===37816||i===37817||i===37818||i===37819||i===37820||i===37821)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===37808)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===37809)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===37810)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===37811)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===37812)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===37813)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===37814)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===37815)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===37816)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===37817)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===37818)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===37819)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===37820)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===37821)return r===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===36492||i===36494||i===36495)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===36492)return r===ge?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===36283||i===36284||i===36285||i===36286)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===36283)return s.COMPRESSED_RED_RGTC1_EXT;if(i===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===1020?a.UNSIGNED_INT_24_8:a[i]!==void 0?a[i]:null}return{convert:e}}const Hg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Wg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new $u(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new vn({vertexShader:Hg,fragmentShader:Gg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ee(new la(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qg extends ra{constructor(t,e){super();const i=this;let n=null,s=1,r=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,g=null,m=null;const v=typeof XRWebGLBinding<"u",p=new Wg,f={},S=e.getContextAttributes();let x=null,_=null;const M=[],T=[],E=new It;let R=null;const w=new Mi;w.viewport=new be;const b=new Mi;b.viewport=new be;const L=[w,b],P=new u0;let B=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let et=M[j];return et===void 0&&(et=new Io,M[j]=et),et.getTargetRaySpace()},this.getControllerGrip=function(j){let et=M[j];return et===void 0&&(et=new Io,M[j]=et),et.getGripSpace()},this.getHand=function(j){let et=M[j];return et===void 0&&(et=new Io,M[j]=et),et.getHandSpace()};function F(j){const et=T.indexOf(j.inputSource);if(et===-1)return;const ct=M[et];ct!==void 0&&(ct.update(j.inputSource,j.frame,c||r),ct.dispatchEvent({type:j.type,data:j.inputSource}))}function N(){n.removeEventListener("select",F),n.removeEventListener("selectstart",F),n.removeEventListener("selectend",F),n.removeEventListener("squeeze",F),n.removeEventListener("squeezestart",F),n.removeEventListener("squeezeend",F),n.removeEventListener("end",N),n.removeEventListener("inputsourceschange",z);for(let j=0;j<M.length;j++){const et=T[j];et!==null&&(T[j]=null,M[j].disconnect(et))}B=null,k=null,p.reset();for(const j in f)delete f[j];t.setRenderTarget(x),g=null,d=null,u=null,n=null,_=null,Jt.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(j){if(n=j,n!==null){if(x=t.getRenderTarget(),n.addEventListener("select",F),n.addEventListener("selectstart",F),n.addEventListener("selectend",F),n.addEventListener("squeeze",F),n.addEventListener("squeezestart",F),n.addEventListener("squeezeend",F),n.addEventListener("end",N),n.addEventListener("inputsourceschange",z),S.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Ot=null,bt=null;S.depth&&(bt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=S.stencil?1027:1026,Ot=S.stencil?1020:1014);const Qt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Qt),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new ye(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new Zl(d.textureWidth,d.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ct={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(n,e,ct),n.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),_=new ye(g.framebufferWidth,g.framebufferHeight,{format:1023,type:1009,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await n.requestReferenceSpace(o),Jt.setContext(n),Jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function z(j){for(let et=0;et<j.removed.length;et++){const ct=j.removed[et],Ot=T.indexOf(ct);Ot>=0&&(T[Ot]=null,M[Ot].disconnect(ct))}for(let et=0;et<j.added.length;et++){const ct=j.added[et];let Ot=T.indexOf(ct);if(Ot===-1){for(let Qt=0;Qt<M.length;Qt++)if(Qt>=T.length){T.push(ct),Ot=Qt;break}else if(T[Qt]===null){T[Qt]=ct,Ot=Qt;break}if(Ot===-1)break}const bt=M[Ot];bt&&bt.connect(ct)}}const U=new y,W=new y;function J(j,et,ct){U.setFromMatrixPosition(et.matrixWorld),W.setFromMatrixPosition(ct.matrixWorld);const Ot=U.distanceTo(W),bt=et.projectionMatrix.elements,Qt=ct.projectionMatrix.elements,Be=bt[14]/(bt[10]-1),I=bt[14]/(bt[10]+1),ve=(bt[9]+1)/bt[5],Gt=(bt[9]-1)/bt[5],Bt=(bt[8]-1)/bt[0],_t=(Qt[8]+1)/Qt[0],Ae=Be*Bt,Tt=Be*_t,$t=Ot/(-Bt+_t),qe=$t*-Bt;if(et.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(qe),j.translateZ($t),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),bt[10]===-1)j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const Fe=Be+$t,D=I+$t,A=Ae-qe,G=Tt+(Ot-qe),Z=ve*I/D*Fe,it=Gt*I/D*Fe;j.projectionMatrix.makePerspective(A,G,Z,it,Fe,D),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function tt(j,et){et===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(et.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(n===null)return;let et=j.near,ct=j.far;p.texture!==null&&(p.depthNear>0&&(et=p.depthNear),p.depthFar>0&&(ct=p.depthFar)),P.near=b.near=w.near=et,P.far=b.far=w.far=ct,(B!==P.near||k!==P.far)&&(n.updateRenderState({depthNear:P.near,depthFar:P.far}),B=P.near,k=P.far),P.layers.mask=j.layers.mask|6,w.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Ot=j.parent,bt=P.cameras;tt(P,Ot);for(let Qt=0;Qt<bt.length;Qt++)tt(bt[Qt],Ot);bt.length===2?J(P,w,b):P.projectionMatrix.copy(w.projectionMatrix),gt(j,P,Ot)};function gt(j,et,ct){ct===null?j.matrix.copy(et.matrixWorld):(j.matrix.copy(ct.matrixWorld),j.matrix.invert(),j.matrix.multiply(et.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ia*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(P)},this.getCameraTexture=function(j){return f[j]};let Lt=null;function se(j,et){if(h=et.getViewerPose(c||r),m=et,h!==null){const ct=h.views;g!==null&&(t.setRenderTargetFramebuffer(_,g.framebuffer),t.setRenderTarget(_));let Ot=!1;ct.length!==P.cameras.length&&(P.cameras.length=0,Ot=!0);for(let I=0;I<ct.length;I++){const ve=ct[I];let Gt=null;if(g!==null)Gt=g.getViewport(ve);else{const _t=u.getViewSubImage(d,ve);Gt=_t.viewport,I===0&&(t.setRenderTargetTextures(_,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(_))}let Bt=L[I];Bt===void 0&&(Bt=new Mi,Bt.layers.enable(I),Bt.viewport=new be,L[I]=Bt),Bt.matrix.fromArray(ve.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(ve.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),I===0&&(P.matrix.copy(Bt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ot===!0&&P.cameras.push(Bt)}const bt=n.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&v){u=i.getBinding();const I=u.getDepthInformation(ct[0]);I&&I.isValid&&I.texture&&p.init(I,n.renderState)}if(bt&&bt.includes("camera-access")&&v){t.state.unbindTexture(),u=i.getBinding();for(let I=0;I<ct.length;I++){const ve=ct[I].camera;if(ve){let Gt=f[ve];Gt||(Gt=new $u,f[ve]=Gt);const Bt=u.getCameraImage(ve);Gt.sourceTexture=Bt}}}}for(let ct=0;ct<M.length;ct++){const Ot=T[ct],bt=M[ct];Ot!==null&&bt!==void 0&&bt.update(Ot,et,c||r)}Lt&&Lt(j,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),m=null}const Jt=new ju;Jt.setAnimationLoop(se),this.setAnimationLoop=function(j){Lt=j},this.dispose=function(){}}}const Kn=new oe,Xg=new Nt;function Kg(a,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,qu(a)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function n(p,f,S,x,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),u(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&g(p,f,_)):f.isMeshMatcapMaterial?(s(p,f),m(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),v(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(r(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,S,x):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===1&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===1&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const S=t.get(f),x=S.envMap,_=S.envMapRotation;x&&(p.envMap.value=x,Kn.copy(_),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),p.envMapRotation.value.setFromMatrix4(Xg.makeRotationFromEuler(Kn)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function r(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,S,x){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*S,p.scale.value=x*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function g(p,f,S){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===1&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){const S=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Yg(a,t,e,i){let n={},s={},r=[];const o=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const _=x.program;i.uniformBlockBinding(S,_)}function c(S,x){let _=n[S.id];_===void 0&&(m(S),_=h(S),n[S.id]=_,S.addEventListener("dispose",p));const M=x.program;i.updateUBOMapping(S,M);const T=t.render.frame;s[S.id]!==T&&(d(S),s[S.id]=T)}function h(S){const x=u();S.__bindingPointIndex=x;const _=a.createBuffer(),M=S.__size,T=S.usage;return a.bindBuffer(a.UNIFORM_BUFFER,_),a.bufferData(a.UNIFORM_BUFFER,M,T),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,x,_),_}function u(){for(let S=0;S<o;S++)if(r.indexOf(S)===-1)return r.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const x=n[S.id],_=S.uniforms,M=S.__cache;a.bindBuffer(a.UNIFORM_BUFFER,x);for(let T=0,E=_.length;T<E;T++){const R=Array.isArray(_[T])?_[T]:[_[T]];for(let w=0,b=R.length;w<b;w++){const L=R[w];if(g(L,T,w,M)===!0){const P=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let k=0;for(let F=0;F<B.length;F++){const N=B[F],z=v(N);typeof N=="number"||typeof N=="boolean"?(L.__data[0]=N,a.bufferSubData(a.UNIFORM_BUFFER,P+k,L.__data)):N.isMatrix3?(L.__data[0]=N.elements[0],L.__data[1]=N.elements[1],L.__data[2]=N.elements[2],L.__data[3]=0,L.__data[4]=N.elements[3],L.__data[5]=N.elements[4],L.__data[6]=N.elements[5],L.__data[7]=0,L.__data[8]=N.elements[6],L.__data[9]=N.elements[7],L.__data[10]=N.elements[8],L.__data[11]=0):(N.toArray(L.__data,k),k+=z.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,P,L.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function g(S,x,_,M){const T=S.value,E=x+"_"+_;if(M[E]===void 0)return typeof T=="number"||typeof T=="boolean"?M[E]=T:M[E]=T.clone(),!0;{const R=M[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return M[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function m(S){const x=S.uniforms;let _=0;const M=16;for(let E=0,R=x.length;E<R;E++){const w=Array.isArray(x[E])?x[E]:[x[E]];for(let b=0,L=w.length;b<L;b++){const P=w[b],B=Array.isArray(P.value)?P.value:[P.value];for(let k=0,F=B.length;k<F;k++){const N=B[k],z=v(N),U=_%M,W=U%z.boundary,J=U+W;_+=W,J!==0&&M-J<z.storage&&(_+=M-J),P.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=z.storage}}}const T=_%M;return T>0&&(_+=M-T),S.__size=_,S.__cache={},this}function v(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){const x=S.target;x.removeEventListener("dispose",p);const _=r.indexOf(x.__bindingPointIndex);r.splice(_,1),a.deleteBuffer(n[x.id]),delete n[x.id],delete s[x.id]}function f(){for(const S in n)a.deleteBuffer(n[S]);r=[],n={},s={}}return{bind:l,update:c,dispose:f}}class $g{constructor(t={}){const{canvas:e=Ld(),context:i=null,depth:n=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const m=new Uint32Array(4),v=new Int32Array(4);let p=null,f=null;const S=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let M=!1;this._outputColorSpace=Fi;let T=0,E=0,R=null,w=-1,b=null;const L=new be,P=new be;let B=null;const k=new re(0);let F=0,N=e.width,z=e.height,U=1,W=null,J=null;const tt=new be(0,0,N,z),gt=new be(0,0,N,z);let Lt=!1;const se=new Yu;let Jt=!1,j=!1;const et=new Nt,ct=new y,Ot=new be,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function Be(){return R===null?U:1}let I=i;function ve(C,V){return e.getContext(C,V)}try{const C={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r180"),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",nt,!1),I===null){const V="webgl2";if(I=ve(V,C),I===null)throw ve(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Gt,Bt,_t,Ae,Tt,$t,qe,Fe,D,A,G,Z,it,$,Pt,ot,Et,Ct,at,pt,zt,Rt,dt,Yt;function O(){Gt=new am(I),Gt.init(),Rt=new Vg(I,Gt),Bt=new Jp(I,Gt,t,Rt),_t=new kg(I,Gt),Bt.reversedDepthBuffer&&d&&_t.buffers.depth.setReversed(!0),Ae=new lm(I),Tt=new Eg,$t=new zg(I,Gt,_t,Tt,Bt,Rt,Ae),qe=new tm(_),Fe=new sm(_),D=new f0(I),dt=new jp(I,D),A=new rm(I,D,Ae,dt),G=new hm(I,A,D,Ae),at=new cm(I,Bt,$t),ot=new Qp(Tt),Z=new Tg(_,qe,Fe,Gt,Bt,dt,ot),it=new Kg(_,Tt),$=new Cg,Pt=new Fg(Gt),Ct=new $p(_,qe,Fe,_t,G,g,l),Et=new Ng(_,G,Bt),Yt=new Yg(I,Ae,Bt,_t),pt=new Zp(I,Gt,Ae),zt=new om(I,Gt,Ae),Ae.programs=Z.programs,_.capabilities=Bt,_.extensions=Gt,_.properties=Tt,_.renderLists=$,_.shadowMap=Et,_.state=_t,_.info=Ae}O();const rt=new qg(_,I);this.xr=rt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const C=Gt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Gt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(C){C!==void 0&&(U=C,this.setSize(N,z,!1))},this.getSize=function(C){return C.set(N,z)},this.setSize=function(C,V,K=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=C,z=V,e.width=Math.floor(C*U),e.height=Math.floor(V*U),K===!0&&(e.style.width=C+"px",e.style.height=V+"px"),this.setViewport(0,0,C,V)},this.getDrawingBufferSize=function(C){return C.set(N*U,z*U).floor()},this.setDrawingBufferSize=function(C,V,K){N=C,z=V,U=K,e.width=Math.floor(C*K),e.height=Math.floor(V*K),this.setViewport(0,0,C,V)},this.getCurrentViewport=function(C){return C.copy(L)},this.getViewport=function(C){return C.copy(tt)},this.setViewport=function(C,V,K,Y){C.isVector4?tt.set(C.x,C.y,C.z,C.w):tt.set(C,V,K,Y),_t.viewport(L.copy(tt).multiplyScalar(U).round())},this.getScissor=function(C){return C.copy(gt)},this.setScissor=function(C,V,K,Y){C.isVector4?gt.set(C.x,C.y,C.z,C.w):gt.set(C,V,K,Y),_t.scissor(P.copy(gt).multiplyScalar(U).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(C){_t.setScissorTest(Lt=C)},this.setOpaqueSort=function(C){W=C},this.setTransparentSort=function(C){J=C},this.getClearColor=function(C){return C.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(C=!0,V=!0,K=!0){let Y=0;if(C){let H=!1;if(R!==null){const st=R.texture.format;H=st===1033||st===1031||st===1029}if(H){const st=R.texture.type,ft=st===1009||st===1014||st===1012||st===1020||st===1017||st===1018,yt=Ct.getClearColor(),vt=Ct.getClearAlpha(),kt=yt.r,Vt=yt.g,Ft=yt.b;ft?(m[0]=kt,m[1]=Vt,m[2]=Ft,m[3]=vt,I.clearBufferuiv(I.COLOR,0,m)):(v[0]=kt,v[1]=Vt,v[2]=Ft,v[3]=vt,I.clearBufferiv(I.COLOR,0,v))}else Y|=I.COLOR_BUFFER_BIT}V&&(Y|=I.DEPTH_BUFFER_BIT),K&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",nt,!1),Ct.dispose(),$.dispose(),Pt.dispose(),Tt.dispose(),qe.dispose(),Fe.dispose(),G.dispose(),dt.dispose(),Yt.dispose(),Z.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Ki),rt.removeEventListener("sessionend",sc),zn.stop()};function lt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=Ae.autoReset,V=Et.enabled,K=Et.autoUpdate,Y=Et.needsUpdate,H=Et.type;O(),Ae.autoReset=C,Et.enabled=V,Et.autoUpdate=K,Et.needsUpdate=Y,Et.type=H}function nt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Q(C){const V=C.target;V.removeEventListener("dispose",Q),St(V)}function St(C){Kt(C),Tt.remove(C)}function Kt(C){const V=Tt.get(C).programs;V!==void 0&&(V.forEach(function(K){Z.releaseProgram(K)}),C.isShaderMaterial&&Z.releaseShaderCache(C))}this.renderBufferDirect=function(C,V,K,Y,H,st){V===null&&(V=bt);const ft=H.isMesh&&H.matrixWorld.determinant()<0,yt=cd(C,V,K,Y,H);_t.setMaterial(Y,ft);let vt=K.index,kt=1;if(Y.wireframe===!0){if(vt=A.getWireframeAttribute(K),vt===void 0)return;kt=2}const Vt=K.drawRange,Ft=K.attributes.position;let ie=Vt.start*kt,fe=(Vt.start+Vt.count)*kt;st!==null&&(ie=Math.max(ie,st.start*kt),fe=Math.min(fe,(st.start+st.count)*kt)),vt!==null?(ie=Math.max(ie,0),fe=Math.min(fe,vt.count)):Ft!=null&&(ie=Math.max(ie,0),fe=Math.min(fe,Ft.count));const Le=fe-ie;if(Le<0||Le===1/0)return;dt.setup(H,Y,yt,K,vt);let Te,_e=pt;if(vt!==null&&(Te=D.get(vt),_e=zt,_e.setIndex(Te)),H.isMesh)Y.wireframe===!0?(_t.setLineWidth(Y.wireframeLinewidth*Be()),_e.setMode(I.LINES)):_e.setMode(I.TRIANGLES);else if(H.isLine){let Ut=Y.linewidth;Ut===void 0&&(Ut=1),_t.setLineWidth(Ut*Be()),H.isLineSegments?_e.setMode(I.LINES):H.isLineLoop?_e.setMode(I.LINE_LOOP):_e.setMode(I.LINE_STRIP)}else H.isPoints?_e.setMode(I.POINTS):H.isSprite&&_e.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Fa("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_e.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Gt.get("WEBGL_multi_draw"))_e.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ut=H._multiDrawStarts,Ce=H._multiDrawCounts,le=H._multiDrawCount,mi=vt?D.get(vt).bytesPerElement:1,bs=Tt.get(Y).currentProgram.getUniforms();for(let gi=0;gi<le;gi++)bs.setValue(I,"_gl_DrawID",gi),_e.render(Ut[gi]/mi,Ce[gi])}else if(H.isInstancedMesh)_e.renderInstances(ie,Le,H.count);else if(K.isInstancedBufferGeometry){const Ut=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ce=Math.min(K.instanceCount,Ut);_e.renderInstances(ie,Le,Ce)}else _e.render(ie,Le)};function Se(C,V,K){C.transparent===!0&&C.side===2&&C.forceSinglePass===!1?(C.side=1,C.needsUpdate=!0,ka(C,V,K),C.side=0,C.needsUpdate=!0,ka(C,V,K),C.side=2):ka(C,V,K)}this.compile=function(C,V,K=null){K===null&&(K=C),f=Pt.get(K),f.init(V),x.push(f),K.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),C!==K&&C.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();const Y=new Set;return C.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const st=H.material;if(st)if(Array.isArray(st))for(let ft=0;ft<st.length;ft++){const yt=st[ft];Se(yt,K,H),Y.add(yt)}else Se(st,K,H),Y.add(st)}),f=x.pop(),Y},this.compileAsync=function(C,V,K=null){const Y=this.compile(C,V,K);return new Promise(H=>{function st(){if(Y.forEach(function(ft){Tt.get(ft).currentProgram.isReady()&&Y.delete(ft)}),Y.size===0){H(C);return}setTimeout(st,10)}Gt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let ue=null;function Qi(C){ue&&ue(C)}function Ki(){zn.stop()}function sc(){zn.start()}const zn=new ju;zn.setAnimationLoop(Qi),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(C){ue=C,rt.setAnimationLoop(C),C===null?zn.stop():zn.start()},rt.addEventListener("sessionstart",Ki),rt.addEventListener("sessionend",sc),this.render=function(C,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(V),V=rt.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,V,R),f=Pt.get(C,x.length),f.init(V),x.push(f),et.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),se.setFromProjectionMatrix(et,2e3,V.reversedDepth),j=this.localClippingEnabled,Jt=ot.init(this.clippingPlanes,j),p=$.get(C,S.length),p.init(),S.push(p),rt.enabled===!0&&rt.isPresenting===!0){const st=_.xr.getDepthSensingMesh();st!==null&&ho(st,V,-1/0,_.sortObjects)}ho(C,V,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(W,J),Qt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Qt&&Ct.addToRenderList(p,C),this.info.render.frame++,Jt===!0&&ot.beginShadows();const K=f.state.shadowsArray;Et.render(K,C,V),Jt===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=p.opaque,H=p.transmissive;if(f.setupLights(),V.isArrayCamera){const st=V.cameras;if(H.length>0)for(let ft=0,yt=st.length;ft<yt;ft++){const vt=st[ft];rc(Y,H,C,vt)}Qt&&Ct.render(C);for(let ft=0,yt=st.length;ft<yt;ft++){const vt=st[ft];ac(p,C,vt,vt.viewport)}}else H.length>0&&rc(Y,H,C,V),Qt&&Ct.render(C),ac(p,C,V);R!==null&&E===0&&($t.updateMultisampleRenderTarget(R),$t.updateRenderTargetMipmap(R)),C.isScene===!0&&C.onAfterRender(_,C,V),dt.resetDefaultState(),w=-1,b=null,x.pop(),x.length>0?(f=x[x.length-1],Jt===!0&&ot.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?p=S[S.length-1]:p=null};function ho(C,V,K,Y){if(C.visible===!1)return;if(C.layers.test(V.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(V);else if(C.isLight)f.pushLight(C),C.castShadow&&f.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||se.intersectsSprite(C)){Y&&Ot.setFromMatrixPosition(C.matrixWorld).applyMatrix4(et);const ft=G.update(C),yt=C.material;yt.visible&&p.push(C,ft,yt,K,Ot.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||se.intersectsObject(C))){const ft=G.update(C),yt=C.material;if(Y&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ot.copy(C.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ot.copy(ft.boundingSphere.center)),Ot.applyMatrix4(C.matrixWorld).applyMatrix4(et)),Array.isArray(yt)){const vt=ft.groups;for(let kt=0,Vt=vt.length;kt<Vt;kt++){const Ft=vt[kt],ie=yt[Ft.materialIndex];ie&&ie.visible&&p.push(C,ft,ie,K,Ot.z,Ft)}}else yt.visible&&p.push(C,ft,yt,K,Ot.z,null)}}const st=C.children;for(let ft=0,yt=st.length;ft<yt;ft++)ho(st[ft],V,K,Y)}function ac(C,V,K,Y){const H=C.opaque,st=C.transmissive,ft=C.transparent;f.setupLightsView(K),Jt===!0&&ot.setGlobalState(_.clippingPlanes,K),Y&&_t.viewport(L.copy(Y)),H.length>0&&Oa(H,V,K),st.length>0&&Oa(st,V,K),ft.length>0&&Oa(ft,V,K),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function rc(C,V,K,Y){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Y.id]===void 0&&(f.state.transmissionRenderTarget[Y.id]=new ye(1,1,{generateMipmaps:!0,type:Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));const st=f.state.transmissionRenderTarget[Y.id],ft=Y.viewport||L;st.setSize(ft.z*_.transmissionResolutionScale,ft.w*_.transmissionResolutionScale);const yt=_.getRenderTarget(),vt=_.getActiveCubeFace(),kt=_.getActiveMipmapLevel();_.setRenderTarget(st),_.getClearColor(k),F=_.getClearAlpha(),F<1&&_.setClearColor(16777215,.5),_.clear(),Qt&&Ct.render(K);const Vt=_.toneMapping;_.toneMapping=0;const Ft=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),f.setupLightsView(Y),Jt===!0&&ot.setGlobalState(_.clippingPlanes,Y),Oa(C,K,Y),$t.updateMultisampleRenderTarget(st),$t.updateRenderTargetMipmap(st),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let fe=0,Le=V.length;fe<Le;fe++){const Te=V[fe],_e=Te.object,Ut=Te.geometry,Ce=Te.material,le=Te.group;if(Ce.side===2&&_e.layers.test(Y.layers)){const mi=Ce.side;Ce.side=1,Ce.needsUpdate=!0,oc(_e,K,Y,Ut,Ce,le),Ce.side=mi,Ce.needsUpdate=!0,ie=!0}}ie===!0&&($t.updateMultisampleRenderTarget(st),$t.updateRenderTargetMipmap(st))}_.setRenderTarget(yt,vt,kt),_.setClearColor(k,F),Ft!==void 0&&(Y.viewport=Ft),_.toneMapping=Vt}function Oa(C,V,K){const Y=V.isScene===!0?V.overrideMaterial:null;for(let H=0,st=C.length;H<st;H++){const ft=C[H],yt=ft.object,vt=ft.geometry,kt=ft.group;let Vt=ft.material;Vt.allowOverride===!0&&Y!==null&&(Vt=Y),yt.layers.test(K.layers)&&oc(yt,V,K,vt,Vt,kt)}}function oc(C,V,K,Y,H,st){C.onBeforeRender(_,V,K,Y,H,st),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),H.onBeforeRender(_,V,K,Y,C,st),H.transparent===!0&&H.side===2&&H.forceSinglePass===!1?(H.side=1,H.needsUpdate=!0,_.renderBufferDirect(K,V,Y,H,C,st),H.side=0,H.needsUpdate=!0,_.renderBufferDirect(K,V,Y,H,C,st),H.side=2):_.renderBufferDirect(K,V,Y,H,C,st),C.onAfterRender(_,V,K,Y,H,st)}function ka(C,V,K){V.isScene!==!0&&(V=bt);const Y=Tt.get(C),H=f.state.lights,st=f.state.shadowsArray,ft=H.state.version,yt=Z.getParameters(C,H.state,st,V,K),vt=Z.getProgramCacheKey(yt);let kt=Y.programs;Y.environment=C.isMeshStandardMaterial?V.environment:null,Y.fog=V.fog,Y.envMap=(C.isMeshStandardMaterial?Fe:qe).get(C.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&C.envMap===null?V.environmentRotation:C.envMapRotation,kt===void 0&&(C.addEventListener("dispose",Q),kt=new Map,Y.programs=kt);let Vt=kt.get(vt);if(Vt!==void 0){if(Y.currentProgram===Vt&&Y.lightsStateVersion===ft)return cc(C,yt),Vt}else yt.uniforms=Z.getUniforms(C),C.onBeforeCompile(yt,_),Vt=Z.acquireProgram(yt,vt),kt.set(vt,Vt),Y.uniforms=yt.uniforms;const Ft=Y.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ft.clippingPlanes=ot.uniform),cc(C,yt),Y.needsLights=ud(C),Y.lightsStateVersion=ft,Y.needsLights&&(Ft.ambientLightColor.value=H.state.ambient,Ft.lightProbe.value=H.state.probe,Ft.directionalLights.value=H.state.directional,Ft.directionalLightShadows.value=H.state.directionalShadow,Ft.spotLights.value=H.state.spot,Ft.spotLightShadows.value=H.state.spotShadow,Ft.rectAreaLights.value=H.state.rectArea,Ft.ltc_1.value=H.state.rectAreaLTC1,Ft.ltc_2.value=H.state.rectAreaLTC2,Ft.pointLights.value=H.state.point,Ft.pointLightShadows.value=H.state.pointShadow,Ft.hemisphereLights.value=H.state.hemi,Ft.directionalShadowMap.value=H.state.directionalShadowMap,Ft.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ft.spotShadowMap.value=H.state.spotShadowMap,Ft.spotLightMatrix.value=H.state.spotLightMatrix,Ft.spotLightMap.value=H.state.spotLightMap,Ft.pointShadowMap.value=H.state.pointShadowMap,Ft.pointShadowMatrix.value=H.state.pointShadowMatrix),Y.currentProgram=Vt,Y.uniformsList=null,Vt}function lc(C){if(C.uniformsList===null){const V=C.currentProgram.getUniforms();C.uniformsList=to.seqWithValue(V.seq,C.uniforms)}return C.uniformsList}function cc(C,V){const K=Tt.get(C);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function cd(C,V,K,Y,H){V.isScene!==!0&&(V=bt),$t.resetTextureUnits();const st=V.fog,ft=Y.isMeshStandardMaterial?V.environment:null,yt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:sa,vt=(Y.isMeshStandardMaterial?Fe:qe).get(Y.envMap||ft),kt=Y.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Vt=!!K.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ft=!!K.morphAttributes.position,ie=!!K.morphAttributes.normal,fe=!!K.morphAttributes.color;let Le=0;Y.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Le=_.toneMapping);const Te=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,_e=Te!==void 0?Te.length:0,Ut=Tt.get(Y),Ce=f.state.lights;if(Jt===!0&&(j===!0||C!==b)){const ei=C===b&&Y.id===w;ot.setState(Y,C,ei)}let le=!1;Y.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Ce.state.version||Ut.outputColorSpace!==yt||H.isBatchedMesh&&Ut.batching===!1||!H.isBatchedMesh&&Ut.batching===!0||H.isBatchedMesh&&Ut.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ut.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ut.instancing===!1||!H.isInstancedMesh&&Ut.instancing===!0||H.isSkinnedMesh&&Ut.skinning===!1||!H.isSkinnedMesh&&Ut.skinning===!0||H.isInstancedMesh&&Ut.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ut.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ut.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ut.instancingMorph===!1&&H.morphTexture!==null||Ut.envMap!==vt||Y.fog===!0&&Ut.fog!==st||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ot.numPlanes||Ut.numIntersection!==ot.numIntersection)||Ut.vertexAlphas!==kt||Ut.vertexTangents!==Vt||Ut.morphTargets!==Ft||Ut.morphNormals!==ie||Ut.morphColors!==fe||Ut.toneMapping!==Le||Ut.morphTargetsCount!==_e)&&(le=!0):(le=!0,Ut.__version=Y.version);let mi=Ut.currentProgram;le===!0&&(mi=ka(Y,V,H));let bs=!1,gi=!1,ha=!1;const Re=mi.getUniforms(),Ai=Ut.uniforms;if(_t.useProgram(mi.program)&&(bs=!0,gi=!0,ha=!0),Y.id!==w&&(w=Y.id,gi=!0),bs||b!==C){_t.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Re.setValue(I,"projectionMatrix",C.projectionMatrix),Re.setValue(I,"viewMatrix",C.matrixWorldInverse);const ci=Re.map.cameraPosition;ci!==void 0&&ci.setValue(I,ct.setFromMatrixPosition(C.matrixWorld)),Bt.logarithmicDepthBuffer&&Re.setValue(I,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Re.setValue(I,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,gi=!0,ha=!0)}if(H.isSkinnedMesh){Re.setOptional(I,H,"bindMatrix"),Re.setOptional(I,H,"bindMatrixInverse");const ei=H.skeleton;ei&&(ei.boneTexture===null&&ei.computeBoneTexture(),Re.setValue(I,"boneTexture",ei.boneTexture,$t))}H.isBatchedMesh&&(Re.setOptional(I,H,"batchingTexture"),Re.setValue(I,"batchingTexture",H._matricesTexture,$t),Re.setOptional(I,H,"batchingIdTexture"),Re.setValue(I,"batchingIdTexture",H._indirectTexture,$t),Re.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&Re.setValue(I,"batchingColorTexture",H._colorsTexture,$t));const Ci=K.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&at.update(H,K,mi),(gi||Ut.receiveShadow!==H.receiveShadow)&&(Ut.receiveShadow=H.receiveShadow,Re.setValue(I,"receiveShadow",H.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Ai.envMap.value=vt,Ai.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&V.environment!==null&&(Ai.envMapIntensity.value=V.environmentIntensity),gi&&(Re.setValue(I,"toneMappingExposure",_.toneMappingExposure),Ut.needsLights&&hd(Ai,ha),st&&Y.fog===!0&&it.refreshFogUniforms(Ai,st),it.refreshMaterialUniforms(Ai,Y,U,z,f.state.transmissionRenderTarget[C.id]),to.upload(I,lc(Ut),Ai,$t)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(to.upload(I,lc(Ut),Ai,$t),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Re.setValue(I,"center",H.center),Re.setValue(I,"modelViewMatrix",H.modelViewMatrix),Re.setValue(I,"normalMatrix",H.normalMatrix),Re.setValue(I,"modelMatrix",H.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const ei=Y.uniformsGroups;for(let ci=0,uo=ei.length;ci<uo;ci++){const Vn=ei[ci];Yt.update(Vn,mi),Yt.bind(Vn,mi)}}return mi}function hd(C,V){C.ambientLightColor.needsUpdate=V,C.lightProbe.needsUpdate=V,C.directionalLights.needsUpdate=V,C.directionalLightShadows.needsUpdate=V,C.pointLights.needsUpdate=V,C.pointLightShadows.needsUpdate=V,C.spotLights.needsUpdate=V,C.spotLightShadows.needsUpdate=V,C.rectAreaLights.needsUpdate=V,C.hemisphereLights.needsUpdate=V}function ud(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(C,V,K){const Y=Tt.get(C);Y.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Tt.get(C.texture).__webglTexture=V,Tt.get(C.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:K,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,V){const K=Tt.get(C);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0};const dd=I.createFramebuffer();this.setRenderTarget=function(C,V=0,K=0){R=C,T=V,E=K;let Y=!0,H=null,st=!1,ft=!1;if(C){const vt=Tt.get(C);if(vt.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(vt.__webglFramebuffer===void 0)$t.setupRenderTarget(C);else if(vt.__hasExternalTextures)$t.rebindTextures(C,Tt.get(C.texture).__webglTexture,Tt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ft=C.depthTexture;if(vt.__boundDepthTexture!==Ft){if(Ft!==null&&Tt.has(Ft)&&(C.width!==Ft.image.width||C.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(C)}}const kt=C.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(ft=!0);const Vt=Tt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Vt[V])?H=Vt[V][K]:H=Vt[V],st=!0):C.samples>0&&$t.useMultisampledRTT(C)===!1?H=Tt.get(C).__webglMultisampledFramebuffer:Array.isArray(Vt)?H=Vt[K]:H=Vt,L.copy(C.viewport),P.copy(C.scissor),B=C.scissorTest}else L.copy(tt).multiplyScalar(U).floor(),P.copy(gt).multiplyScalar(U).floor(),B=Lt;if(K!==0&&(H=dd),_t.bindFramebuffer(I.FRAMEBUFFER,H)&&Y&&_t.drawBuffers(C,H),_t.viewport(L),_t.scissor(P),_t.setScissorTest(B),st){const vt=Tt.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+V,vt.__webglTexture,K)}else if(ft){const vt=V;for(let kt=0;kt<C.textures.length;kt++){const Vt=Tt.get(C.textures[kt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+kt,Vt.__webglTexture,K,vt)}}else if(C!==null&&K!==0){const vt=Tt.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,vt.__webglTexture,K)}w=-1},this.readRenderTargetPixels=function(C,V,K,Y,H,st,ft,yt=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Tt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ft!==void 0&&(vt=vt[ft]),vt){_t.bindFramebuffer(I.FRAMEBUFFER,vt);try{const kt=C.textures[yt],Vt=kt.format,Ft=kt.type;if(!Bt.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=C.width-Y&&K>=0&&K<=C.height-H&&(C.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+yt),I.readPixels(V,K,Y,H,Rt.convert(Vt),Rt.convert(Ft),st))}finally{const kt=R!==null?Tt.get(R).__webglFramebuffer:null;_t.bindFramebuffer(I.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(C,V,K,Y,H,st,ft,yt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Tt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ft!==void 0&&(vt=vt[ft]),vt)if(V>=0&&V<=C.width-Y&&K>=0&&K<=C.height-H){_t.bindFramebuffer(I.FRAMEBUFFER,vt);const kt=C.textures[yt],Vt=kt.format,Ft=kt.type;if(!Bt.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ie=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ie),I.bufferData(I.PIXEL_PACK_BUFFER,st.byteLength,I.STREAM_READ),C.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+yt),I.readPixels(V,K,Y,H,Rt.convert(Vt),Rt.convert(Ft),0);const fe=R!==null?Tt.get(R).__webglFramebuffer:null;_t.bindFramebuffer(I.FRAMEBUFFER,fe);const Le=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Dd(I,Le,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ie),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,st),I.deleteBuffer(ie),I.deleteSync(Le),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,V=null,K=0){const Y=Math.pow(2,-K),H=Math.floor(C.image.width*Y),st=Math.floor(C.image.height*Y),ft=V!==null?V.x:0,yt=V!==null?V.y:0;$t.setTexture2D(C,0),I.copyTexSubImage2D(I.TEXTURE_2D,K,0,0,ft,yt,H,st),_t.unbindTexture()};const fd=I.createFramebuffer(),pd=I.createFramebuffer();this.copyTextureToTexture=function(C,V,K=null,Y=null,H=0,st=null){st===null&&(H!==0?(Fa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),st=H,H=0):st=0);let ft,yt,vt,kt,Vt,Ft,ie,fe,Le;const Te=C.isCompressedTexture?C.mipmaps[st]:C.image;if(K!==null)ft=K.max.x-K.min.x,yt=K.max.y-K.min.y,vt=K.isBox3?K.max.z-K.min.z:1,kt=K.min.x,Vt=K.min.y,Ft=K.isBox3?K.min.z:0;else{const Ci=Math.pow(2,-H);ft=Math.floor(Te.width*Ci),yt=Math.floor(Te.height*Ci),C.isDataArrayTexture?vt=Te.depth:C.isData3DTexture?vt=Math.floor(Te.depth*Ci):vt=1,kt=0,Vt=0,Ft=0}Y!==null?(ie=Y.x,fe=Y.y,Le=Y.z):(ie=0,fe=0,Le=0);const _e=Rt.convert(V.format),Ut=Rt.convert(V.type);let Ce;V.isData3DTexture?($t.setTexture3D(V,0),Ce=I.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?($t.setTexture2DArray(V,0),Ce=I.TEXTURE_2D_ARRAY):($t.setTexture2D(V,0),Ce=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,V.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,V.unpackAlignment);const le=I.getParameter(I.UNPACK_ROW_LENGTH),mi=I.getParameter(I.UNPACK_IMAGE_HEIGHT),bs=I.getParameter(I.UNPACK_SKIP_PIXELS),gi=I.getParameter(I.UNPACK_SKIP_ROWS),ha=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Te.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Te.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,kt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Vt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ft);const Re=C.isDataArrayTexture||C.isData3DTexture,Ai=V.isDataArrayTexture||V.isData3DTexture;if(C.isDepthTexture){const Ci=Tt.get(C),ei=Tt.get(V),ci=Tt.get(Ci.__renderTarget),uo=Tt.get(ei.__renderTarget);_t.bindFramebuffer(I.READ_FRAMEBUFFER,ci.__webglFramebuffer),_t.bindFramebuffer(I.DRAW_FRAMEBUFFER,uo.__webglFramebuffer);for(let Vn=0;Vn<vt;Vn++)Re&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Tt.get(C).__webglTexture,H,Ft+Vn),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Tt.get(V).__webglTexture,st,Le+Vn)),I.blitFramebuffer(kt,Vt,ft,yt,ie,fe,ft,yt,I.DEPTH_BUFFER_BIT,I.NEAREST);_t.bindFramebuffer(I.READ_FRAMEBUFFER,null),_t.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||C.isRenderTargetTexture||Tt.has(C)){const Ci=Tt.get(C),ei=Tt.get(V);_t.bindFramebuffer(I.READ_FRAMEBUFFER,fd),_t.bindFramebuffer(I.DRAW_FRAMEBUFFER,pd);for(let ci=0;ci<vt;ci++)Re?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ci.__webglTexture,H,Ft+ci):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ci.__webglTexture,H),Ai?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ei.__webglTexture,st,Le+ci):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ei.__webglTexture,st),H!==0?I.blitFramebuffer(kt,Vt,ft,yt,ie,fe,ft,yt,I.COLOR_BUFFER_BIT,I.NEAREST):Ai?I.copyTexSubImage3D(Ce,st,ie,fe,Le+ci,kt,Vt,ft,yt):I.copyTexSubImage2D(Ce,st,ie,fe,kt,Vt,ft,yt);_t.bindFramebuffer(I.READ_FRAMEBUFFER,null),_t.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Ai?C.isDataTexture||C.isData3DTexture?I.texSubImage3D(Ce,st,ie,fe,Le,ft,yt,vt,_e,Ut,Te.data):V.isCompressedArrayTexture?I.compressedTexSubImage3D(Ce,st,ie,fe,Le,ft,yt,vt,_e,Te.data):I.texSubImage3D(Ce,st,ie,fe,Le,ft,yt,vt,_e,Ut,Te):C.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,st,ie,fe,ft,yt,_e,Ut,Te.data):C.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,st,ie,fe,Te.width,Te.height,_e,Te.data):I.texSubImage2D(I.TEXTURE_2D,st,ie,fe,ft,yt,_e,Ut,Te);I.pixelStorei(I.UNPACK_ROW_LENGTH,le),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,mi),I.pixelStorei(I.UNPACK_SKIP_PIXELS,bs),I.pixelStorei(I.UNPACK_SKIP_ROWS,gi),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ha),st===0&&V.generateMipmaps&&I.generateMipmap(Ce),_t.unbindTexture()},this.initRenderTarget=function(C){Tt.get(C).__webglFramebuffer===void 0&&$t.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?$t.setTextureCube(C,0):C.isData3DTexture?$t.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?$t.setTexture2DArray(C,0):$t.setTexture2D(C,0),_t.unbindTexture()},this.resetState=function(){T=0,E=0,R=null,_t.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}}const eh="dust-corridor.settings.v3",tc=[{renderScale:.72,shadowResolution:1024,shadowCascades:3,aoSamples:4,aoEnabled:!0,cloudSteps:12,particleDensity:.45,motionBlur:"off",bloom:!0,taa:!0,contactShadows:!1,decalBudget:96,maxRigidBodies:90,heatHaze:!1,sharpen:.3},{renderScale:.85,shadowResolution:1536,shadowCascades:4,aoSamples:6,aoEnabled:!0,cloudSteps:20,particleDensity:.7,motionBlur:"low",bloom:!0,taa:!0,contactShadows:!0,decalBudget:160,maxRigidBodies:140,heatHaze:!0,sharpen:.32},{renderScale:1,shadowResolution:2048,shadowCascades:4,aoSamples:9,aoEnabled:!0,cloudSteps:30,particleDensity:1,motionBlur:"low",bloom:!0,taa:!0,contactShadows:!0,decalBudget:256,maxRigidBodies:200,heatHaze:!0,sharpen:.32},{renderScale:1,shadowResolution:3072,shadowCascades:4,aoSamples:12,aoEnabled:!0,cloudSteps:44,particleDensity:1.35,motionBlur:"low",bloom:!0,taa:!0,contactShadows:!0,decalBudget:384,maxRigidBodies:260,heatHaze:!0,sharpen:.34},{renderScale:1.15,shadowResolution:3072,shadowCascades:4,aoSamples:14,aoEnabled:!0,cloudSteps:52,particleDensity:1.5,motionBlur:"low",bloom:!0,taa:!0,contactShadows:!0,decalBudget:448,maxRigidBodies:300,heatHaze:!0,sharpen:.36},{renderScale:1.3,shadowResolution:4096,shadowCascades:4,aoSamples:16,aoEnabled:!0,cloudSteps:64,particleDensity:1.6,motionBlur:"off",bloom:!0,taa:!0,contactShadows:!0,decalBudget:512,maxRigidBodies:340,heatHaze:!0,sharpen:.38},{renderScale:1.45,shadowResolution:4096,shadowCascades:4,aoSamples:18,aoEnabled:!0,cloudSteps:64,particleDensity:1.75,motionBlur:"off",bloom:!0,taa:!0,contactShadows:!0,decalBudget:576,maxRigidBodies:380,heatHaze:!0,sharpen:.4},{renderScale:1.6,shadowResolution:4096,shadowCascades:4,aoSamples:16,aoEnabled:!0,cloudSteps:64,particleDensity:1.8,motionBlur:"off",bloom:!0,taa:!0,contactShadows:!0,decalBudget:640,maxRigidBodies:420,heatHaze:!0,sharpen:.42},{renderScale:1.8,shadowResolution:4096,shadowCascades:5,aoSamples:20,aoEnabled:!0,cloudSteps:80,particleDensity:2,motionBlur:"off",bloom:!0,taa:!0,contactShadows:!0,decalBudget:704,maxRigidBodies:460,heatHaze:!0,sharpen:.44},{renderScale:2,shadowResolution:6144,shadowCascades:5,aoSamples:22,aoEnabled:!0,cloudSteps:88,particleDensity:2.2,motionBlur:"off",bloom:!0,taa:!0,contactShadows:!0,decalBudget:768,maxRigidBodies:500,heatHaze:!0,sharpen:.46}],jg={low:1,medium:2,high:3,ultra:4};function Zg(a){const t=typeof a=="number"?a:jg[a];return!t||Number.isNaN(t)?3:Math.min(tc.length,Math.max(1,Math.round(t)))}const or={quality:4,sensitivity:.9,adsMultiplier:.72,fov:90,viewmodelFov:78,invertY:!1,masterVolume:.85,musicless:!0,dynamicResolution:!0,filmGrain:.35,chromaticAberration:.4,vignette:.5,cameraShake:.85,showFps:!0,difficulty:"regular",timeOfDay:"day",captureShortcuts:!1,rawInput:!1,keybinds:{fire:"Mouse0",aim:"Mouse2",forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",jump:"Space",crouch:"KeyC",sprint:"ShiftLeft",slide:"KeyC",reload:"KeyR",inspect:"KeyF",fireMode:"KeyV",grenade:"KeyB",leanLeft:"KeyQ",leanRight:"KeyE",pause:"Escape",scoreboard:"Tab"},overrides:{}};function Vo(a){return JSON.parse(JSON.stringify(a))}class Jg{constructor(){this.data=Vo(or),this.listeners=new Set,this.load()}load(){try{const e=localStorage.getItem(eh);if(e){const i=JSON.parse(e);this.data={...Vo(or),...i,keybinds:{...or.keybinds,...i.keybinds||{}}},this._retireControlBinds()}}catch{}const t=new URLSearchParams(location.search);t.has("quality")&&(this.data.quality=t.get("quality")),t.has("grain")&&(this.data.filmGrain=parseFloat(t.get("grain"))),t.has("dynres")&&(this.data.dynamicResolution=t.get("dynres")!=="0")}_retireControlBinds(){if(this.data.captureShortcuts===!0)return;const t=new Set(["ControlLeft","ControlRight"]),e={crouch:"KeyC",forward:"KeyW",back:"KeyS",left:"KeyA",right:"KeyD",sprint:"ShiftLeft"};let i=!1;for(const[n,s]of Object.entries(e))t.has(this.data.keybinds[n])&&(this.data.keybinds[n]=s,i=!0);i&&this.save()}save(){try{localStorage.setItem(eh,JSON.stringify(this.data))}catch{}}get(t){return this.data[t]}set(t,e){this.data[t]=e,this.save();for(const i of this.listeners)i(t,e)}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}get qualityLevel(){return Zg(this.data.quality)}get preset(){return{...tc[this.qualityLevel-1],level:this.qualityLevel,...this.data.overrides}}reset(){this.data=Vo(or),this.save();for(const t of this.listeners)t("*",this.data)}}const Mt=new Jg,Qg=14e3,tv=150,ev=.04;class iv{constructor(t){this.canvas=t,this.keys=new Map,this.pressedThisFrame=new Set,this.releasedThisFrame=new Set,this._look={x:0,y:0},this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.buttons=[!1,!1,!1],this.buttonsPressed=[!1,!1,!1],this.locked=!1,this.enabled=!0,this.discardedLookSpikes=0,this._swallowNextMove=!1,this.onPointerLockChange=null,this.onPointerLockError=null,this.onPauseRequested=null,this._passThroughCodes=new Set(["F5","F11","F12"]),this._blockedCodes=new Set(["Tab","F1","F3"]),this._bind()}_bind(){const t=n=>{this.enabled&&((this.locked?!this._passThroughCodes.has(n.code):this._blockedCodes.has(n.code))&&n.preventDefault(),!n.repeat&&(this.keys.get(n.code)||this.pressedThisFrame.add(n.code),this.keys.set(n.code,!0),n.code==="Escape"&&this.onPauseRequested&&this.onPauseRequested()))},e=n=>{this.keys.set(n.code,!1),this.releasedThisFrame.add(n.code)};window.addEventListener("keydown",t,{passive:!1}),window.addEventListener("keyup",e);let i=0;window.addEventListener("mousemove",n=>{if(!this.locked||!this.enabled)return;const s=performance.now(),r=i?Math.min(ev,(s-i)/1e3):.016;if(i=s,this._swallowNextMove){this._swallowNextMove=!1;return}const o=n.movementX||0,l=n.movementY||0,c=Math.max(tv,Qg*r);if(Math.abs(o)>c||Math.abs(l)>c){this.discardedLookSpikes++;return}this.mouseDX+=o,this.mouseDY+=l}),this.canvas.addEventListener("mousedown",n=>{this.locked&&(n.preventDefault(),n.button<3&&(this.buttons[n.button]||(this.buttonsPressed[n.button]=!0),this.buttons[n.button]=!0))}),window.addEventListener("mouseup",n=>{n.button<3&&(this.buttons[n.button]=!1)}),window.addEventListener("wheel",n=>{this.locked&&(this.wheel+=Math.sign(n.deltaY))},{passive:!0}),this.canvas.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.canvas,this.locked?(this._swallowNextMove=!0,this._lockKeyboard()):(this._unwind(),this.keys.clear(),this.buttons=[!1,!1,!1]),this.onPointerLockChange&&this.onPointerLockChange(this.locked)}),window.addEventListener("blur",()=>{this.keys.clear(),this.buttons=[!1,!1,!1],this.releaseLock()}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.releaseLock()}),document.addEventListener("fullscreenchange",()=>{document.fullscreenElement||(this._enteredFullscreen=!1,this._unlockKeyboard())})}async requestLock(){if(this.locked||navigator.webdriver)return;if(Mt.data.captureShortcuts===!0&&!document.fullscreenElement)try{await document.documentElement.requestFullscreen({navigationUI:"hide"}),this._enteredFullscreen=!0}catch{}(Mt.data.rawInput===!0?await this._attemptLock({unadjustedMovement:!0})||await this._attemptLock():await this._attemptLock())||(this._unwind(),this.onPointerLockError?.())}_attemptLock(t){return new Promise(e=>{const i=()=>document.pointerLockElement===this.canvas;let n=!1;const s=c=>{n||(n=!0,document.removeEventListener("pointerlockchange",r),document.removeEventListener("pointerlockerror",o),clearTimeout(l),e(c))},r=()=>s(i()),o=()=>s(!1);document.addEventListener("pointerlockchange",r),document.addEventListener("pointerlockerror",o);const l=setTimeout(()=>s(i()),1500);try{const c=this.canvas.requestPointerLock(t);c&&typeof c.then=="function"&&c.then(()=>s(i()),()=>s(!1))}catch{s(!1)}})}releaseLock(){document.pointerLockElement?document.exitPointerLock():this._unwind()}_unwind(){this._unlockKeyboard(),this._enteredFullscreen&&document.fullscreenElement&&(this._enteredFullscreen=!1,document.exitFullscreen().catch(()=>{}))}_lockKeyboard(){!document.fullscreenElement||!navigator.keyboard?.lock||(navigator.keyboard.lock(["KeyW","KeyA","KeyS","KeyD","KeyR","KeyT","KeyN","KeyP"]).catch(()=>{}),this._keyboardLocked=!0)}_unlockKeyboard(){if(this._keyboardLocked){this._keyboardLocked=!1;try{navigator.keyboard.unlock()}catch{}}}inject({key:t,down:e,look:i,button:n}){t!==void 0&&(e&&!this.keys.get(t)&&this.pressedThisFrame.add(t),e||this.releasedThisFrame.add(t),this.keys.set(t,!!e)),i&&(this.mouseDX+=i.x||0,this.mouseDY+=i.y||0),n!==void 0&&(e&&!this.buttons[n]&&(this.buttonsPressed[n]=!0),this.buttons[n]=!!e)}action(t){const e=Mt.data.keybinds[t];if(!e)return!1;const i=ih(e);return i>=0?this.buttons[i]===!0:this.keys.get(e)===!0}actionPressed(t){const e=Mt.data.keybinds[t];if(!e)return!1;const i=ih(e);return i>=0?this.buttonsPressed[i]?(this.buttonsPressed[i]=!1,!0):!1:this.pressedThisFrame.delete(e)}consumeLook(){const t=Mt.data.sensitivity*.0022;return this._look.x=this.mouseDX*t,this._look.y=this.mouseDY*t*(Mt.data.invertY?-1:1),this.mouseDX=0,this.mouseDY=0,this._look}endFrame(){this.pressedThisFrame.clear(),this.releasedThisFrame.clear(),this.buttonsPressed[0]=this.buttonsPressed[1]=this.buttonsPressed[2]=!1,this.wheel=0}}function ih(a){return a.startsWith("Mouse")?Number(a.slice(5)):-1}class nv{constructor({fixedHz:t=120,maxSubSteps:e=6,update:i,render:n}){this.fixedDt=1/t,this.maxSubSteps=e,this.update=i,this.render=n,this.accumulator=0,this.elapsed=0,this.frame=0,this.running=!1,this._last=0,this._raf=0,this._tick=this._tick.bind(this),this.frameTimes=new Float32Array(240),this.frameTimeIndex=0,this.frameTimeCount=0,this.smoothedFrameMs=16.7}start(){this.running||(this.running=!0,this._last=performance.now(),this._raf=requestAnimationFrame(this._tick))}stop(){this.running=!1,cancelAnimationFrame(this._raf)}_tick(t){if(!this.running)return;this._raf=requestAnimationFrame(this._tick);let e=(t-this._last)/1e3;this._last=t,e>0||(e=1/60),e>.5&&(e=this.fixedDt),e=Math.min(e,.1),this.frameTimes[this.frameTimeIndex]=e*1e3,this.frameTimeIndex=(this.frameTimeIndex+1)%this.frameTimes.length,this.frameTimeCount=Math.min(this.frameTimeCount+1,this.frameTimes.length),this.smoothedFrameMs+=(e*1e3-this.smoothedFrameMs)*.08,this.accumulator+=e;let i=0;for(;this.accumulator>=this.fixedDt&&i<this.maxSubSteps;)this.update(this.fixedDt,this.elapsed),this.elapsed+=this.fixedDt,this.accumulator-=this.fixedDt,i++;i===this.maxSubSteps&&(this.accumulator=Math.min(this.accumulator,this.fixedDt));const n=this.accumulator/this.fixedDt;this.render(e,n,this.elapsed),this.frame++}stats(){const t=this.frameTimeCount;if(t<4)return{avg:16.7,p95:16.7,worst:16.7,fps:60};const e=Array.from(this.frameTimes.subarray(0,t)).sort((n,s)=>n-s),i=e.reduce((n,s)=>n+s,0)/t;return{avg:i,p95:e[Math.min(t-1,Math.floor(t*.95))],worst:e[t-1],median:e[t>>1],fps:1e3/i}}}class Ms{constructor(t=1337){this.reseed(t)}reseed(t){this._s0=t>>>0||1,this._s1=t*1103515245+12345>>>0||2,this._s2=(t^2654435769)>>>0||3,this._s3=t*2654435761>>>0||4;for(let e=0;e<12;e++)this.next();return this}next(){const t=Math.imul(this._s1*5,1)>>>0,e=((t<<7|t>>>25)>>>0)*9>>>0,i=this._s1<<9>>>0;return this._s2^=this._s0,this._s3^=this._s1,this._s1^=this._s2,this._s0^=this._s3,this._s2^=i,this._s3=(this._s3<<11|this._s3>>>21)>>>0,e/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1-1e-9))}bool(t=.5){return this.next()<t}sign(){return this.next()<.5?-1:1}pick(t){return t[Math.min(t.length-1,Math.floor(this.next()*t.length))]}gauss(t=0,e=1){if(this._spare!==void 0){const o=this._spare;return this._spare=void 0,t+e*o}let i=0,n=0,s=0;do i=this.next()*2-1,n=this.next()*2-1,s=i*i+n*n;while(s>=1||s===0);const r=Math.sqrt(-2*Math.log(s)/s);return this._spare=n*r,t+e*i*r}onUnitSphere(t){const e=this.range(-1,1),i=this.range(0,Math.PI*2),n=Math.sqrt(Math.max(0,1-e*e));return t.set(n*Math.cos(i),n*Math.sin(i),e),t}fork(t){return new Ms((Math.floor(this.next()*4294967295)^Math.imul(t|0,2654435761))>>>0)}}function sv(a){let t=Math.imul(a^668265261,374761393);return t^=t>>>15,t=Math.imul(t,625341585),t^=t>>>13,(t>>>0)/4294967296}function lr(a,t){return sv((Math.imul(a|0,73856093)^Math.imul(t|0,19349663))>>>0)}const zl=99537319,av=`
float hash11(float p){ p = fract(p*0.1031); p *= p+33.33; p *= p+p; return fract(p); }
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*0.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973)); p3 += dot(p3,p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
vec3 hash33(vec3 p){ p = fract(p*vec3(0.1031,0.1030,0.0973)); p += dot(p,p.yxz+33.33); return fract((p.xxy+p.yxx)*p.zyx); }
float hash13(vec3 p3){ p3 = fract(p3*0.1031); p3 += dot(p3,p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
`,Ei=`
${av}

float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash12(i), hash12(i+vec2(1,0)), u.x),
             mix(hash12(i+vec2(0,1)), hash12(i+vec2(1,1)), u.x), u.y);
}

float vnoise3(vec3 p){
  vec3 i = floor(p), f = fract(p);
  vec3 u = f*f*(3.0-2.0*f);
  float n000 = hash13(i), n100 = hash13(i+vec3(1,0,0));
  float n010 = hash13(i+vec3(0,1,0)), n110 = hash13(i+vec3(1,1,0));
  float n001 = hash13(i+vec3(0,0,1)), n101 = hash13(i+vec3(1,0,1));
  float n011 = hash13(i+vec3(0,1,1)), n111 = hash13(i+vec3(1,1,1));
  return mix(mix(mix(n000,n100,u.x), mix(n010,n110,u.x), u.y),
             mix(mix(n001,n101,u.x), mix(n011,n111,u.x), u.y), u.z);
}

// Tileable value noise over a period-P lattice.
float tnoise(vec2 p, float period){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  vec2 i0 = mod(i, period), i1 = mod(i+1.0, period);
  float a = hash12(i0);
  float b = hash12(vec2(i1.x, i0.y));
  float c = hash12(vec2(i0.x, i1.y));
  float d = hash12(i1);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

float tfbm(vec2 p, float period, int octaves, float gain){
  float s = 0.0, a = 0.5, per = period; float norm = 0.0;
  for(int i=0;i<8;i++){
    if(i>=octaves) break;
    s += a * tnoise(p, per);
    norm += a;
    a *= gain; p *= 2.0; per *= 2.0;
  }
  return s / max(norm, 1e-4);
}

float fbm(vec2 p, int octaves, float gain){
  float s=0.0, a=0.5, norm=0.0;
  for(int i=0;i<8;i++){
    if(i>=octaves) break;
    s += a*vnoise(p); norm += a; a*=gain; p = p*2.03 + 17.3;
  }
  return s/max(norm,1e-4);
}

float fbm3(vec3 p, int octaves, float gain){
  float s=0.0, a=0.5, norm=0.0;
  for(int i=0;i<8;i++){
    if(i>=octaves) break;
    s += a*vnoise3(p); norm += a; a*=gain; p = p*2.02 + 11.7;
  }
  return s/max(norm,1e-4);
}

// Tileable Worley (cellular) — returns (F1, F2, cellId)
vec3 tworley(vec2 p, float period){
  vec2 n = floor(p), f = fract(p);
  float f1 = 8.0, f2 = 8.0, id = 0.0;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g = vec2(float(i), float(j));
    vec2 cell = mod(n+g, period);
    vec2 o = hash22(cell);
    vec2 r = g + o - f;
    float d = dot(r,r);
    if(d < f1){ f2 = f1; f1 = d; id = hash12(cell); }
    else if(d < f2){ f2 = d; }
  }
  return vec3(sqrt(f1), sqrt(f2), id);
}

float ridge(vec2 p, float period, int oct){
  float s=0.0, a=0.5, per=period, norm=0.0;
  for(int i=0;i<6;i++){
    if(i>=oct) break;
    float n = 1.0 - abs(tnoise(p, per)*2.0-1.0);
    s += a*n*n; norm += a; a*=0.5; p*=2.0; per*=2.0;
  }
  return s/max(norm,1e-4);
}

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz)*6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float luma(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
`,ec=`
vec2 octEncode(vec3 n){
  n /= (abs(n.x)+abs(n.y)+abs(n.z));
  vec2 e = n.xy;
  if(n.z < 0.0) e = (1.0 - abs(n.yx)) * vec2(n.x>=0.0?1.0:-1.0, n.y>=0.0?1.0:-1.0);
  return e*0.5+0.5;
}
vec3 octDecode(vec2 e){
  e = e*2.0-1.0;
  vec3 n = vec3(e.xy, 1.0-abs(e.x)-abs(e.y));
  float t = max(-n.z, 0.0);
  n.x += n.x>=0.0 ? -t : t;
  n.y += n.y>=0.0 ? -t : t;
  return normalize(n);
}
`,rv=`
out vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,ic=new ti;ic.setAttribute("position",new Xt(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3));ic.setAttribute("uv",new Xt(new Float32Array([0,0,2,0,0,2]),2));const ed=new ao(-1,1,1,-1,0,1);class Ue{constructor(t,e={},i={}){this.material=new Ji({glslVersion:Ui,vertexShader:`precision highp float;
precision highp int;
in vec3 position;
in vec2 uv;
${rv}`,fragmentShader:`precision highp float;
precision highp int;
precision highp sampler2DArray;
precision highp sampler3D;
${t}`,uniforms:e,defines:i,depthTest:!1,depthWrite:!1}),this.mesh=new Ee(ic,this.material),this.mesh.frustumCulled=!1,this.scene=new so,this.scene.add(this.mesh)}get uniforms(){return this.material.uniforms}render(t,e=null,i=void 0){t.setRenderTarget(e,i),t.render(this.scene,ed)}dispose(){this.material.dispose()}}const ov=ed,ki=12,lv=4,ht={CONCRETE:0,PLASTER:1,BRICK:2,METAL:3,WOOD:4,GLASS:5,FABRIC:6,SAND:7,DIRT:8,TILE:9,RUBBER:10,SANDBAG:11},Bn=[{name:"concrete",hardness:1,penetrable:!1,ricochet:.55,dust:12169892},{name:"plaster",hardness:.45,penetrable:!0,ricochet:.15,dust:14077888},{name:"brick",hardness:.85,penetrable:!1,ricochet:.35,dust:10248007},{name:"metal",hardness:.95,penetrable:!0,ricochet:.8,dust:13159634},{name:"wood",hardness:.3,penetrable:!0,ricochet:.1,dust:10255439},{name:"glass",hardness:.2,penetrable:!0,ricochet:.05,dust:13624298},{name:"fabric",hardness:.1,penetrable:!0,ricochet:0,dust:11049088},{name:"sand",hardness:.35,penetrable:!1,ricochet:.05,dust:14206106},{name:"dirt",hardness:.4,penetrable:!1,ricochet:.08,dust:9402198},{name:"tile",hardness:.7,penetrable:!1,ricochet:.4,dust:13486528},{name:"rubber",hardness:.25,penetrable:!0,ricochet:0,dust:3815996},{name:"sandbag",hardness:.5,penetrable:!1,ricochet:0,dust:12167298}];class cv{constructor(t=4096){this.positions=new Float32Array(t*9),this.surfaces=new Uint8Array(t),this.count=0}_grow(t){if(t*9<=this.positions.length)return;let e=Math.max(1024,this.positions.length/9);for(;e<t;)e*=2;const i=new Float32Array(e*9);i.set(this.positions),this.positions=i;const n=new Uint8Array(e);n.set(this.surfaces),this.surfaces=n}addTriangle(t,e,i,n,s,r,o,l,c,h){this._grow(this.count+1);const u=this.count*9,d=this.positions;d[u]=t,d[u+1]=e,d[u+2]=i,d[u+3]=n,d[u+4]=s,d[u+5]=r,d[u+6]=o,d[u+7]=l,d[u+8]=c,this.surfaces[this.count]=h,this.count++}addGeometry(t,e,i){const n=t.attributes.position,s=t.index,r=s?s.count:n.count;this._grow(this.count+r/3);const o=e.elements,l=n.array,c=s?s.array:null;for(let h=0;h<r;h+=3){const u=this.count*9,d=this.positions;for(let g=0;g<3;g++){const m=(c?c[h+g]:h+g)*3,v=l[m],p=l[m+1],f=l[m+2];d[u+g*3]=o[0]*v+o[4]*p+o[8]*f+o[12],d[u+g*3+1]=o[1]*v+o[5]*p+o[9]*f+o[13],d[u+g*3+2]=o[2]*v+o[6]*p+o[10]*f+o[14]}this.surfaces[this.count]=i,this.count++}}addBox(t,e,i,n){nh.compose(t,i||dv,uv.set(1,1,1));const s=e.x*.5,r=e.y*.5,o=e.z*.5,l=hv;for(let c=0;c<8;c++)cr[c].set(l[c*3]*s,l[c*3+1]*r,l[c*3+2]*o).applyMatrix4(nh);for(let c=0;c<12;c++){const h=cr[Ho[c*3]],u=cr[Ho[c*3+1]],d=cr[Ho[c*3+2]];this.addTriangle(h.x,h.y,h.z,u.x,u.y,u.z,d.x,d.y,d.z,n)}}}const hv=[-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],Ho=[0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,7,6,3,6,2,1,2,6,1,6,5,0,4,7,0,7,3],cr=Array.from({length:8},()=>new y);new y;const uv=new y,nh=new Nt,dv=new Qe;class Xi{constructor(){this.hit=!1,this.t=1/0,this.point=new y,this.normal=new y,this.triIndex=-1,this.surface=0,this.backface=!1}reset(){return this.hit=!1,this.t=1/0,this.triIndex=-1,this.backface=!1,this}}class fv{constructor(t){this.soup=t;const e=t.count;this.triIndices=new Uint32Array(e);for(let s=0;s<e;s++)this.triIndices[s]=s;this.centroids=new Float32Array(e*3),this.triBounds=new Float32Array(e*6);const i=t.positions;for(let s=0;s<e;s++){const r=s*9,o=Math.min(i[r],i[r+3],i[r+6]),l=Math.min(i[r+1],i[r+4],i[r+7]),c=Math.min(i[r+2],i[r+5],i[r+8]),h=Math.max(i[r],i[r+3],i[r+6]),u=Math.max(i[r+1],i[r+4],i[r+7]),d=Math.max(i[r+2],i[r+5],i[r+8]);this.triBounds[s*6]=o,this.triBounds[s*6+1]=l,this.triBounds[s*6+2]=c,this.triBounds[s*6+3]=h,this.triBounds[s*6+4]=u,this.triBounds[s*6+5]=d,this.centroids[s*3]=(o+h)*.5,this.centroids[s*3+1]=(l+u)*.5,this.centroids[s*3+2]=(c+d)*.5}const n=Math.max(4,e*2);this.nodeBounds=new Float32Array(n*6),this.nodeLeft=new Int32Array(n),this.nodeCount=new Int32Array(n),this.nodesUsed=1,this._binBounds=new Float32Array(ki*6),this._binCount=new Int32Array(ki),this._leftArea=new Float32Array(ki),this._leftCount=new Int32Array(ki),this.nodeLeft[0]=0,this.nodeCount[0]=e,this._updateBounds(0),e>0&&this._subdivide(0,0),this._stack=new Int32Array(128),this.buildStats={triangles:e,nodes:this.nodesUsed}}_updateBounds(t){const e=this.nodeLeft[t],i=this.nodeCount[t];let n=1/0,s=1/0,r=1/0,o=-1/0,l=-1/0,c=-1/0;for(let u=0;u<i;u++){const d=this.triIndices[e+u]*6,g=this.triBounds;g[d]<n&&(n=g[d]),g[d+1]<s&&(s=g[d+1]),g[d+2]<r&&(r=g[d+2]),g[d+3]>o&&(o=g[d+3]),g[d+4]>l&&(l=g[d+4]),g[d+5]>c&&(c=g[d+5])}const h=t*6;this.nodeBounds[h]=n,this.nodeBounds[h+1]=s,this.nodeBounds[h+2]=r,this.nodeBounds[h+3]=o,this.nodeBounds[h+4]=l,this.nodeBounds[h+5]=c}_subdivide(t,e){const i=this.nodeCount[t];if(i<=lv||e>48)return;const n=this.nodeLeft[t],s=t*6;let r=-1,o=0,l=1/0;for(let v=0;v<3;v++){let p=1/0,f=-1/0;for(let z=0;z<i;z++){const U=this.centroids[this.triIndices[n+z]*3+v];U<p&&(p=U),U>f&&(f=U)}if(f-p<1e-6)continue;this._binCount.fill(0);for(let z=0;z<ki;z++){const U=z*6;this._binBounds[U]=this._binBounds[U+1]=this._binBounds[U+2]=1/0,this._binBounds[U+3]=this._binBounds[U+4]=this._binBounds[U+5]=-1/0}const S=ki/(f-p);for(let z=0;z<i;z++){const U=this.triIndices[n+z];let W=Math.floor((this.centroids[U*3+v]-p)*S);W>=ki&&(W=ki-1),W<0&&(W=0),this._binCount[W]++;const J=W*6,tt=U*6,gt=this.triBounds,Lt=this._binBounds;gt[tt]<Lt[J]&&(Lt[J]=gt[tt]),gt[tt+1]<Lt[J+1]&&(Lt[J+1]=gt[tt+1]),gt[tt+2]<Lt[J+2]&&(Lt[J+2]=gt[tt+2]),gt[tt+3]>Lt[J+3]&&(Lt[J+3]=gt[tt+3]),gt[tt+4]>Lt[J+4]&&(Lt[J+4]=gt[tt+4]),gt[tt+5]>Lt[J+5]&&(Lt[J+5]=gt[tt+5])}let x=1/0,_=1/0,M=1/0,T=-1/0,E=-1/0,R=-1/0,w=0;for(let z=0;z<ki-1;z++){const U=z*6,W=this._binBounds;this._binCount[z]>0&&(W[U]<x&&(x=W[U]),W[U+1]<_&&(_=W[U+1]),W[U+2]<M&&(M=W[U+2]),W[U+3]>T&&(T=W[U+3]),W[U+4]>E&&(E=W[U+4]),W[U+5]>R&&(R=W[U+5])),w+=this._binCount[z],this._leftCount[z]=w,this._leftArea[z]=w>0?Go(x,_,M,T,E,R):0}let b=1/0,L=1/0,P=1/0,B=-1/0,k=-1/0,F=-1/0,N=0;for(let z=ki-1;z>=1;z--){const U=z*6,W=this._binBounds;this._binCount[z]>0&&(W[U]<b&&(b=W[U]),W[U+1]<L&&(L=W[U+1]),W[U+2]<P&&(P=W[U+2]),W[U+3]>B&&(B=W[U+3]),W[U+4]>k&&(k=W[U+4]),W[U+5]>F&&(F=W[U+5])),N+=this._binCount[z];const J=N>0?Go(b,L,P,B,k,F):0,tt=this._leftCount[z-1]*this._leftArea[z-1]+N*J;tt>0&&tt<l&&this._leftCount[z-1]>0&&(l=tt,r=v,o=p+(f-p)*(z/ki))}}if(r<0)return;const c=Go(this.nodeBounds[s],this.nodeBounds[s+1],this.nodeBounds[s+2],this.nodeBounds[s+3],this.nodeBounds[s+4],this.nodeBounds[s+5]);if(l>=c*i)return;let h=n,u=n+i-1;for(;h<=u;)if(this.centroids[this.triIndices[h]*3+r]<o)h++;else{const v=this.triIndices[h];this.triIndices[h]=this.triIndices[u],this.triIndices[u]=v,u--}const d=h-n;if(d===0||d===i)return;const g=this.nodesUsed++,m=this.nodesUsed++;this.nodeLeft[g]=n,this.nodeCount[g]=d,this.nodeLeft[m]=h,this.nodeCount[m]=i-d,this.nodeLeft[t]=g,this.nodeCount[t]=0,this._updateBounds(g),this._updateBounds(m),this._subdivide(g,e+1),this._subdivide(m,e+1)}raycast(t,e,i,n=pv,s=!1){n.reset(),n.t=i;const r=t.x,o=t.y,l=t.z,c=e.x,h=e.y,u=e.z,d=1/(c||1e-20),g=1/(h||1e-20),m=1/(u||1e-20),v=this._stack;let p=0;v[p++]=0;const f=this.nodeBounds,S=this.soup.positions;let x=!1;for(;p>0;){const _=v[--p],M=_*6;let T=(f[M]-r)*d,E=(f[M+3]-r)*d,R=Math.min(T,E),w=Math.max(T,E);if(T=(f[M+1]-o)*g,E=(f[M+4]-o)*g,R=Math.max(R,Math.min(T,E)),w=Math.min(w,Math.max(T,E)),T=(f[M+2]-l)*m,E=(f[M+5]-l)*m,R=Math.max(R,Math.min(T,E)),w=Math.min(w,Math.max(T,E)),w<Math.max(R,0)||R>n.t)continue;const b=this.nodeCount[_];if(b===0){const P=this.nodeLeft[_];v[p++]=P,v[p++]=P+1;continue}const L=this.nodeLeft[_];for(let P=0;P<b;P++){const B=this.triIndices[L+P],k=B*9,F=S[k],N=S[k+1],z=S[k+2],U=S[k+3]-F,W=S[k+4]-N,J=S[k+5]-z,tt=S[k+6]-F,gt=S[k+7]-N,Lt=S[k+8]-z,se=h*Lt-u*gt,Jt=u*tt-c*Lt,j=c*gt-h*tt,et=U*se+W*Jt+J*j;if(et>-1e-9&&et<1e-9||s&&et<0)continue;const ct=1/et,Ot=r-F,bt=o-N,Qt=l-z,Be=(Ot*se+bt*Jt+Qt*j)*ct;if(Be<0||Be>1)continue;const I=bt*J-Qt*W,ve=Qt*U-Ot*J,Gt=Ot*W-bt*U,Bt=(c*I+h*ve+u*Gt)*ct;if(Bt<0||Be+Bt>1)continue;const _t=(tt*I+gt*ve+Lt*Gt)*ct;_t>1e-5&&_t<n.t&&(n.t=_t,n.triIndex=B,n.backface=et<0,x=!0)}}return x&&(n.hit=!0,n.point.set(r+c*n.t,o+h*n.t,l+u*n.t),this.triangleNormal(n.triIndex,n.normal),n.normal.x*c+n.normal.y*h+n.normal.z*u>0&&n.normal.multiplyScalar(-1),n.surface=this.soup.surfaces[n.triIndex]),n}occluded(t,e,i=.02){hr.subVectors(e,t);const n=hr.length();return n<1e-5?!1:(hr.multiplyScalar(1/n),this.raycast(t,hr,n-i,mv).hit)}triangleNormal(t,e){const i=this.soup.positions,n=t*9,s=i[n+3]-i[n],r=i[n+4]-i[n+1],o=i[n+5]-i[n+2],l=i[n+6]-i[n],c=i[n+7]-i[n+1],h=i[n+8]-i[n+2];return e.set(r*h-o*c,o*l-s*h,s*c-r*l).normalize(),e}overlapBox(t,e,i,n,s,r,o){const l=this._stack;let c=0;l[c++]=0;const h=this.nodeBounds;for(;c>0;){const u=l[--c],d=u*6;if(h[d]>n||h[d+3]<t||h[d+1]>s||h[d+4]<e||h[d+2]>r||h[d+5]<i)continue;const g=this.nodeCount[u];if(g===0){const v=this.nodeLeft[u];l[c++]=v,l[c++]=v+1;continue}const m=this.nodeLeft[u];for(let v=0;v<g;v++)o(this.triIndices[m+v])}}get bounds(){return{min:new y(this.nodeBounds[0],this.nodeBounds[1],this.nodeBounds[2]),max:new y(this.nodeBounds[3],this.nodeBounds[4],this.nodeBounds[5])}}}function Go(a,t,e,i,n,s){const r=i-a,o=n-t,l=s-e;return r<0||o<0||l<0?0:2*(r*o+o*l+l*r)}function mn(a,t,e,i,n,s){const r=a.positions,o=t*9,l=r[o],c=r[o+1],h=r[o+2],u=r[o+3],d=r[o+4],g=r[o+5],m=r[o+6],v=r[o+7],p=r[o+8],f=u-l,S=d-c,x=g-h,_=m-l,M=v-c,T=p-h,E=e-l,R=i-c,w=n-h,b=f*E+S*R+x*w,L=_*E+M*R+T*w;if(b<=0&&L<=0)return s.set(l,c,h),s;const P=e-u,B=i-d,k=n-g,F=f*P+S*B+x*k,N=_*P+M*B+T*k;if(F>=0&&N<=F)return s.set(u,d,g),s;const z=b*N-F*L;if(z<=0&&b>=0&&F<=0){const ct=b/(b-F);return s.set(l+f*ct,c+S*ct,h+x*ct),s}const U=e-m,W=i-v,J=n-p,tt=f*U+S*W+x*J,gt=_*U+M*W+T*J;if(gt>=0&&tt<=gt)return s.set(m,v,p),s;const Lt=tt*L-b*gt;if(Lt<=0&&L>=0&&gt<=0){const ct=L/(L-gt);return s.set(l+_*ct,c+M*ct,h+T*ct),s}const se=F*gt-tt*N;if(se<=0&&N-F>=0&&tt-gt>=0){const ct=(N-F)/(N-F+(tt-gt));return s.set(u+(m-u)*ct,d+(v-d)*ct,g+(p-g)*ct),s}const Jt=1/(se+Lt+z),j=Lt*Jt,et=z*Jt;return s.set(l+f*j+_*et,c+S*j+M*et,h+x*j+T*et),s}function Wo(a,t,e,i,n,s,r,o,l,c){const h=i-a,u=n-t,d=s-e,g=h*h+u*u+d*d;let m=g>1e-12?((r-a)*h+(o-t)*u+(l-e)*d)/g:0;return m=m<0?0:m>1?1:m,c.set(a+h*m,t+u*m,e+d*m),m}const pv=new Xi,mv=new Xi,hr=new y,X={PLASTER_BEIGE:0,PLASTER_WHITE:1,CONCRETE:2,BRICK:3,STUCCO_BLUE:4,STUCCO_TERRACOTTA:5,METAL_PAINTED:6,METAL_RUST:7,WOOD:8,ASPHALT:9,SAND:10,FABRIC:11,SANDBAG:12,TILE:13,GUNMETAL:14,GRAVEL:15,POLYMER:16,GEAR_CLOTH:17,PLASTER_PEACH:18,CORRUGATED:19},ks=20,qo=[ht.PLASTER,ht.PLASTER,ht.CONCRETE,ht.BRICK,ht.PLASTER,ht.PLASTER,ht.METAL,ht.METAL,ht.WOOD,ht.CONCRETE,ht.SAND,ht.FABRIC,ht.SANDBAG,ht.TILE,ht.METAL,ht.DIRT,ht.RUBBER,ht.FABRIC,ht.PLASTER,ht.METAL],gv=`
${Ei}

// Specialised per layer at build time. Keeping the layer as a uniform means one
// program has to contain all twenty materials, and an inlined twenty-way branch
// over this much noise is enough to hang a driver shader compiler for minutes.
#ifndef GEN_LAYER
#define GEN_LAYER 0
#endif
const int uLayer = GEN_LAYER;

uniform int uOutput;   // 0 albedo, 1 normal, 2 orm, 3 height
uniform float uPeriod;
uniform sampler2D uHeight;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

const float PI = 3.14159265;

// ---------------------------------------------------------------- helpers
float bricks(vec2 uv, float rows, float cols, out vec2 cellId, out vec2 cellUv, float offset){
  vec2 p = uv * vec2(cols, rows);
  float row = floor(p.y);
  p.x += mod(row, 2.0) * offset;
  cellId = vec2(floor(p.x), row);
  cellUv = fract(p);
  vec2 m = min(cellUv, 1.0-cellUv);
  return min(m.x * cols * 0.09, m.y * rows * 0.09);
}

float streaks(vec2 uv, float freq, float len){
  float s = tfbm(vec2(uv.x*freq, uv.y*freq*0.14), uPeriod*freq, 4, 0.55);
  return smoothstep(0.45, 0.9, s) * smoothstep(0.0, len, uv.y);
}

// Thin crack lines that only appear where the damage mask says so, otherwise
// the Worley net reads as flagstone paving instead of weathering.
float cracks(vec2 uv, float scale){
  vec3 w = tworley(uv*scale, uPeriod*scale);
  float edge = w.y - w.x;
  float line = 1.0 - smoothstep(0.0, 0.020, edge);
  float mask = smoothstep(0.44, 0.74, tfbm(uv*2.3, uPeriod*2.3, 3, 0.6));
  float branch = smoothstep(0.35, 0.62, tfbm(uv*11.0, uPeriod*11.0, 3, 0.55));
  return line * mask * branch;
}

float chips(vec2 uv, float scale, float thresh){
  vec3 w = tworley(uv*scale, uPeriod*scale);
  return step(w.z, thresh) * (1.0 - smoothstep(0.0, 0.28, w.x));
}

/**
 * Same spall pattern, but also reporting the shadowed lip around the break.
 * Without the lip an exposed patch reads as a splash of paint rather than a
 * piece of render that has fallen off the wall.
 */
float chips(vec2 uv, float scale, float thresh, out float rim){
  vec3 w = tworley(uv*scale, uPeriod*scale);
  float inside = step(w.z, thresh);
  rim = inside * smoothstep(0.20, 0.28, w.x) * (1.0 - smoothstep(0.28, 0.38, w.x));
  return inside * (1.0 - smoothstep(0.0, 0.28, w.x));
}

/**
 * Sand aggregate in the render coat. Shared between the height field and the
 * albedo so the relief that catches the sun also shows as tone — dust settles
 * in the pits while the raised grains scour lighter.
 */
float plasterGrain(vec2 uv){
  return tfbm(uv*104.0, uPeriod*104.0, 2, 0.5);
}

// ---------------------------------------------------------------- height
float heightFn(vec2 uv, int layer){
  if(layer == 0 || layer == 1 || layer == 4 || layer == 5 || layer == 18){
    // plaster / stucco: gentle undulation, patch edges, cracks, chipped corners
    float h = tfbm(uv*6.0, uPeriod*6.0, 5, 0.55)*0.5;
    // Float marks left by the trowel — stretched along the sweep direction, so
    // a wall catches the sun in bands rather than reading as flat paint.
    h += tfbm(vec2(uv.x*8.0, uv.y*21.0), uPeriod*21.0, 3, 0.5)*0.15;
    h += tfbm(uv*36.0, uPeriod*36.0, 3, 0.5)*0.14;
    // Sand aggregate. This is the micro relief that actually sells plaster at
    // the distance a player fights from; without it the normal map is flat.
    h += plasterGrain(uv)*0.115;
    h += (1.0 - smoothstep(0.0, 0.55, tworley(uv*150.0, uPeriod*150.0).x))*0.06;
    float patchMask = smoothstep(0.52,0.56, tfbm(uv*3.0, uPeriod*3.0, 3, 0.6));
    h -= patchMask*0.10;
    h -= cracks(uv, 9.0)*0.16;
    h -= chips(uv, 17.0, 0.14)*0.22;
    return h;
  }
  if(layer == 2){ // concrete
    float h = tfbm(uv*5.0, uPeriod*5.0, 5, 0.5)*0.5;
    h += tfbm(uv*40.0, uPeriod*40.0, 3, 0.5)*0.2;
    h += tfbm(uv*118.0, uPeriod*118.0, 2, 0.5)*0.1;   // cement grain
    h += (1.0 - smoothstep(0.0, 0.5, tworley(uv*180.0, uPeriod*180.0).x))*0.05; // pinholes
    vec3 w = tworley(uv*26.0, uPeriod*26.0);
    h += (1.0-smoothstep(0.0,0.35,w.x))*0.12*step(0.55, w.z); // aggregate
    h -= cracks(uv, 7.0)*0.12;
    // form-board seam
    h -= smoothstep(0.985, 1.0, abs(sin(uv.y*PI*2.0)))*0.1;
    return h;
  }
  if(layer == 3){ // brick
    vec2 id, cu;
    float mortar = bricks(uv, 16.0, 8.0, id, cu, 0.5);
    float h = smoothstep(0.0, 0.35, mortar)*0.75;
    h += tfbm(uv*40.0, uPeriod*40.0, 3, 0.5)*0.12;
    h -= chips(uv, 22.0, 0.1)*0.25;
    return h;
  }
  if(layer == 6 || layer == 7){ // metal
    float h = tfbm(uv*20.0, uPeriod*20.0, 4, 0.5)*0.18;
    float dent = smoothstep(0.6,0.95, tfbm(uv*7.0, uPeriod*7.0, 3, 0.6));
    h -= dent*0.2;
    if(layer==7) h -= (1.0-smoothstep(0.0,0.5,tworley(uv*14.0, uPeriod*14.0).x))*0.16;
    return h;
  }
  if(layer == 8){ // wood
    vec2 wp = vec2(uv.x*4.0, uv.y);
    float plank = floor(wp.x);
    float grain = tfbm(vec2(uv.x*10.0 + plank*7.3, uv.y*90.0), uPeriod*90.0, 4, 0.55);
    float h = grain*0.35 + 0.4;
    float gap = min(fract(wp.x), 1.0-fract(wp.x));
    h -= (1.0-smoothstep(0.0,0.035,gap))*0.6;
    h -= chips(uv, 25.0, 0.08)*0.3;
    return h;
  }
  if(layer == 9){ // asphalt
    float h = tfbm(uv*30.0, uPeriod*30.0, 4, 0.55)*0.4;
    vec3 w = tworley(uv*44.0, uPeriod*44.0);
    h += (1.0-smoothstep(0.0,0.3,w.x))*0.22;
    h -= cracks(uv, 5.0)*0.3;
    float pothole = smoothstep(0.72, 0.95, tfbm(uv*2.5, uPeriod*2.5, 3, 0.6));
    h -= pothole*0.35;
    return h;
  }
  if(layer == 10){ // sand
    float h = tfbm(uv*8.0, uPeriod*8.0, 5, 0.6)*0.5;
    h += tfbm(uv*55.0, uPeriod*55.0, 3, 0.5)*0.25;
    float ripple = sin(uv.x*PI*36.0 + tfbm(uv*4.0,uPeriod*4.0,3,0.5)*9.0)*0.5+0.5;
    h += ripple*0.09;
    return h;
  }
  if(layer == 11 || layer == 17){ // woven fabric
    float warp = sin(uv.x*PI*220.0)*0.5+0.5;
    float weft = sin(uv.y*PI*220.0)*0.5+0.5;
    float h = max(warp,weft)*0.3 + tfbm(uv*9.0, uPeriod*9.0, 4, 0.6)*0.45;
    return h;
  }
  if(layer == 12){ // sandbag burlap
    float warp = sin(uv.x*PI*130.0)*0.5+0.5;
    float weft = sin(uv.y*PI*130.0)*0.5+0.5;
    float h = (warp*weft)*0.35 + tfbm(uv*13.0, uPeriod*13.0, 4, 0.6)*0.5;
    return h;
  }
  if(layer == 13){ // tile
    vec2 id, cu;
    float grout = bricks(uv, 10.0, 10.0, id, cu, 0.0);
    return smoothstep(0.0,0.25,grout)*0.7 + tfbm(uv*30.0,uPeriod*30.0,3,0.5)*0.08;
  }
  if(layer == 14 || layer == 16){ // gunmetal / polymer
    float h = tfbm(uv*46.0, uPeriod*46.0, 4, 0.5)*0.2;
    if(layer==16){
      // Stippled grip texture. Moulded polymer stipple is barely a tenth of a
      // millimetre proud — at any real amplitude a magazine held 30cm from the
      // eye turns into a lump of gravel.
      vec3 w = tworley(uv*115.0, uPeriod*115.0);
      h += (1.0-smoothstep(0.0,0.5,w.x))*0.14;
    } else {
      h += sin(uv.y*PI*160.0)*0.02;
    }
    return h;
  }
  if(layer == 15){ // gravel / rubble
    vec3 w = tworley(uv*20.0, uPeriod*20.0);
    float h = (1.0-smoothstep(0.0,0.45,w.x))*0.8;
    h += tfbm(uv*50.0,uPeriod*50.0,3,0.5)*0.2;
    return h;
  }
  if(layer == 19){ // corrugated sheet
    float ribs = sin(uv.x*PI*24.0)*0.5+0.5;
    float h = pow(ribs, 0.7)*0.85;
    h += tfbm(uv*35.0,uPeriod*35.0,3,0.5)*0.1;
    h -= (1.0-smoothstep(0.0,0.5,tworley(uv*17.0,uPeriod*17.0).x))*0.12;
    return h;
  }
  return tfbm(uv*20.0, uPeriod*20.0, 4, 0.5);
}

// ---------------------------------------------------------------- albedo
vec3 albedoFn(vec2 uv, int layer, float h){
  if(layer == 0){ // sun-faded beige plaster
    vec3 base = vec3(0.74,0.66,0.53);
    float macro = tfbm(uv*2.2, uPeriod*2.2, 4, 0.6);
    // Low-frequency variation is kept gentle. Rendered plaster is close to an
    // even colour with damage on top; heavy blotching reads as camouflage.
    base *= 0.88 + macro*0.22;
    base *= 0.92 + plasterGrain(uv)*0.17;
    base = mix(base, vec3(0.66,0.60,0.50), smoothstep(0.5,0.58, tfbm(uv*3.0,uPeriod*3.0,3,0.6))*0.7);
    base = mix(base, vec3(0.45,0.42,0.38), cracks(uv,9.0)*0.6);
    float rim; float chip = chips(uv,17.0,0.14,rim);
    base = mix(base, vec3(0.56,0.49,0.41), chip*0.65);
    base = mix(base, vec3(0.34,0.30,0.26), rim*0.55);
    base *= 1.0 - streaks(uv, 5.0, 0.6)*0.24;
    return base;
  }
  if(layer == 1){ // chalky off-white
    vec3 base = vec3(0.86,0.845,0.80);
    base *= 0.85 + tfbm(uv*2.6,uPeriod*2.6,4,0.6)*0.3;
    base *= 0.92 + plasterGrain(uv)*0.17;
    base = mix(base, vec3(0.68,0.66,0.62), smoothstep(0.5,0.6,tfbm(uv*4.0,uPeriod*4.0,3,0.6))*0.6);
    base = mix(base, vec3(0.5,0.48,0.45), cracks(uv,9.0)*0.55);
    float rim; float chip = chips(uv,17.0,0.13,rim);
    base = mix(base, vec3(0.60,0.57,0.52), chip*0.6);
    base = mix(base, vec3(0.36,0.34,0.31), rim*0.55);
    base *= 1.0 - streaks(uv, 6.0, 0.5)*0.3;
    return base;
  }
  if(layer == 18){ // pale peach
    vec3 base = vec3(0.80,0.66,0.56);
    base *= 0.85 + tfbm(uv*2.4,uPeriod*2.4,4,0.6)*0.3;
    base *= 0.92 + plasterGrain(uv)*0.17;
    float rim; float chip = chips(uv,15.0,0.16,rim);
    base = mix(base, vec3(0.60,0.52,0.45), chip*0.7);
    base = mix(base, vec3(0.33,0.28,0.25), rim*0.55);
    base = mix(base, vec3(0.42,0.38,0.35), cracks(uv,8.0)*0.55);
    base *= 1.0 - streaks(uv,5.0,0.55)*0.22;
    return base;
  }
  if(layer == 4){ // dusty blue
    vec3 base = vec3(0.53,0.60,0.63);
    base *= 0.88 + tfbm(uv*2.5,uPeriod*2.5,4,0.6)*0.22;
    base *= 0.92 + plasterGrain(uv)*0.17;
    float rim; float chip = chips(uv,16.0,0.16,rim);
    base = mix(base, vec3(0.63,0.58,0.50), chip*0.66); // render under the paint
    base = mix(base, vec3(0.28,0.30,0.31), rim*0.6);
    base = mix(base, vec3(0.36,0.4,0.42), cracks(uv,8.0)*0.55);
    base *= 1.0 - streaks(uv,5.5,0.55)*0.27;
    return base;
  }
  if(layer == 5){ // muted terracotta
    vec3 base = vec3(0.62,0.40,0.30);
    base *= 0.88 + tfbm(uv*2.5,uPeriod*2.5,4,0.6)*0.22;
    base *= 0.92 + plasterGrain(uv)*0.17;
    float rim; float chip = chips(uv,16.0,0.15,rim);
    base = mix(base, vec3(0.55,0.45,0.37), chip*0.6);
    base = mix(base, vec3(0.26,0.18,0.15), rim*0.6);
    base = mix(base, vec3(0.34,0.24,0.2), cracks(uv,8.0)*0.55);
    base *= 1.0 - streaks(uv,5.0,0.5)*0.28;
    return base;
  }
  if(layer == 2){ // concrete
    vec3 base = vec3(0.58,0.575,0.55);
    base *= 0.8 + tfbm(uv*2.0,uPeriod*2.0,4,0.6)*0.35;
    vec3 w = tworley(uv*26.0, uPeriod*26.0);
    base = mix(base, vec3(0.48,0.46,0.44), (1.0-smoothstep(0.0,0.35,w.x))*step(0.55,w.z)*0.6);
    base = mix(base, vec3(0.34,0.33,0.32), cracks(uv,7.0)*0.6);
    base *= 1.0 - streaks(uv,4.0,0.7)*0.3;
    base = mix(base, vec3(0.42,0.40,0.36), smoothstep(0.6,0.85,tfbm(uv*5.0,uPeriod*5.0,3,0.6))*0.35);
    return base;
  }
  if(layer == 3){ // brick
    vec2 id, cu;
    float mortar = bricks(uv, 16.0, 8.0, id, cu, 0.5);
    float v = hash12(id*1.37);
    vec3 brick = mix(vec3(0.50,0.28,0.21), vec3(0.66,0.44,0.32), v);
    brick *= 0.85 + tfbm(uv*30.0,uPeriod*30.0,3,0.5)*0.3;
    vec3 mortarCol = vec3(0.66,0.63,0.58)*(0.85+tfbm(uv*40.0,uPeriod*40.0,3,0.5)*0.3);
    vec3 base = mix(mortarCol, brick, smoothstep(0.0,0.3,mortar));
    base = mix(base, vec3(0.72,0.68,0.62), chips(uv,22.0,0.1)*0.5);
    base *= 1.0 - streaks(uv,5.0,0.6)*0.2;
    return base;
  }
  if(layer == 6){ // painted steel
    float v = tfbm(uv*3.0,uPeriod*3.0,3,0.6);
    vec3 base = mix(vec3(0.30,0.34,0.33), vec3(0.40,0.44,0.42), v);
    float wear = smoothstep(0.55,0.85,tfbm(uv*11.0,uPeriod*11.0,4,0.55));
    base = mix(base, vec3(0.42,0.30,0.20), wear*0.65);
    base = mix(base, vec3(0.55,0.56,0.58), (1.0-smoothstep(0.4,0.7,h))*0.2);
    return base;
  }
  if(layer == 7){ // rusted metal
    float r = tfbm(uv*6.0,uPeriod*6.0,5,0.55);
    vec3 base = mix(vec3(0.33,0.34,0.35), vec3(0.46,0.24,0.12), smoothstep(0.35,0.7,r));
    base = mix(base, vec3(0.30,0.14,0.07), smoothstep(0.6,0.9,r)*0.8);
    base *= 0.85 + tfbm(uv*30.0,uPeriod*30.0,3,0.5)*0.3;
    return base;
  }
  if(layer == 8){ // weathered wood
    vec2 wp = vec2(uv.x*4.0, uv.y);
    float plank = floor(wp.x);
    float tint = hash11(plank*3.7);
    float grain = tfbm(vec2(uv.x*10.0 + plank*7.3, uv.y*90.0), uPeriod*90.0, 4, 0.55);
    vec3 base = mix(vec3(0.42,0.31,0.20), vec3(0.60,0.47,0.32), tint);
    base *= 0.7 + grain*0.55;
    float gap = min(fract(wp.x), 1.0-fract(wp.x));
    base = mix(base, vec3(0.10,0.08,0.06), 1.0-smoothstep(0.0,0.03,gap));
    base = mix(base, vec3(0.66,0.60,0.50), chips(uv,25.0,0.08)*0.5); // bare splinters
    return base;
  }
  if(layer == 9){ // asphalt
    vec3 base = vec3(0.20,0.20,0.205);
    base *= 0.75 + tfbm(uv*4.0,uPeriod*4.0,4,0.6)*0.5;
    vec3 w = tworley(uv*44.0, uPeriod*44.0);
    base = mix(base, vec3(0.38,0.36,0.33), (1.0-smoothstep(0.0,0.3,w.x))*0.7);
    base = mix(base, vec3(0.11,0.11,0.115), cracks(uv,5.0)*0.8);
    // sand blown over the road
    float sand = smoothstep(0.45,0.75, tfbm(uv*3.2,uPeriod*3.2,4,0.6));
    base = mix(base, vec3(0.62,0.54,0.40), sand*0.55);
    // patched repair
    float patchMask = smoothstep(0.70,0.74, tfbm(uv*2.0,uPeriod*2.0,3,0.6));
    base = mix(base, vec3(0.14,0.14,0.15), patchMask*0.6);
    return base;
  }
  if(layer == 10){ // sand
    vec3 base = vec3(0.72,0.62,0.44);
    base *= 0.85 + tfbm(uv*3.0,uPeriod*3.0,4,0.6)*0.3;
    base = mix(base, vec3(0.58,0.50,0.37), smoothstep(0.5,0.8,tfbm(uv*7.0,uPeriod*7.0,4,0.6))*0.5);
    vec3 w = tworley(uv*40.0,uPeriod*40.0);
    base = mix(base, vec3(0.5,0.45,0.38), (1.0-smoothstep(0.0,0.2,w.x))*0.35); // pebbles
    return base;
  }
  if(layer == 11){ // awning fabric — striped, sun-bleached
    float stripe = step(0.5, fract(uv.x*6.0));
    float v = hash12(vec2(floor(uv.x*6.0), 3.0));
    vec3 a = mix(vec3(0.72,0.66,0.52), vec3(0.78,0.72,0.60), v);
    vec3 b = mix(vec3(0.42,0.30,0.24), vec3(0.30,0.42,0.40), step(0.5,v));
    vec3 base = mix(a, b, stripe);
    base *= 0.82 + tfbm(uv*8.0,uPeriod*8.0,4,0.6)*0.32;
    base *= 0.9 + h*0.2;
    base = mix(base, vec3(0.48,0.44,0.38), smoothstep(0.55,0.85,tfbm(uv*5.0,uPeriod*5.0,4,0.6))*0.4);
    return base;
  }
  if(layer == 17){ // gear cloth
    vec3 base = vec3(0.36,0.345,0.30);
    base *= 0.8 + tfbm(uv*10.0,uPeriod*10.0,4,0.6)*0.35;
    base *= 0.9 + h*0.25;
    return base;
  }
  if(layer == 12){ // sandbag burlap
    vec3 base = vec3(0.58,0.50,0.35);
    base *= 0.78 + tfbm(uv*6.0,uPeriod*6.0,4,0.6)*0.4;
    base *= 0.85 + h*0.3;
    base = mix(base, vec3(0.42,0.37,0.28), smoothstep(0.5,0.8,tfbm(uv*3.0,uPeriod*3.0,3,0.6))*0.5);
    return base;
  }
  if(layer == 13){ // interior tile
    vec2 id, cu;
    float grout = bricks(uv, 10.0, 10.0, id, cu, 0.0);
    float v = hash12(id*2.13);
    vec3 tile = mix(vec3(0.62,0.60,0.55), vec3(0.74,0.72,0.66), v);
    vec3 base = mix(vec3(0.40,0.38,0.35), tile, smoothstep(0.0,0.2,grout));
    base *= 0.9 + tfbm(uv*20.0,uPeriod*20.0,3,0.5)*0.2;
    return base;
  }
  if(layer == 14){ // anodized/parkerized gun metal
    // A hard-anodized finish is a thin dielectric over alloy, not a mirror: it
    // needs a real diffuse term or the gun renders as a black silhouette.
    vec3 base = vec3(0.455,0.462,0.472);
    base *= 0.86 + tfbm(uv*24.0,uPeriod*24.0,4,0.55)*0.28;
    float wear = smoothstep(0.72,0.95,tfbm(uv*9.0,uPeriod*9.0,4,0.55));
    base = mix(base, vec3(0.68,0.68,0.70), wear*0.8);        // rubbed to bare alloy
    return base;
  }
  if(layer == 16){ // polymer furniture
    vec3 base = vec3(0.245,0.250,0.242);
    base *= 0.88 + tfbm(uv*18.0,uPeriod*18.0,3,0.5)*0.22;
    base += vec3(0.030)*(1.0-smoothstep(0.0,0.5,tworley(uv*115.0,uPeriod*115.0).x));
    return base;
  }
  if(layer == 15){ // gravel
    vec3 w = tworley(uv*20.0, uPeriod*20.0);
    vec3 base = mix(vec3(0.34,0.32,0.29), vec3(0.62,0.57,0.48), hash11(w.z*13.0));
    base *= 0.7 + (1.0-smoothstep(0.0,0.45,w.x))*0.6;
    base = mix(base, vec3(0.55,0.48,0.36), 0.3);
    return base;
  }
  if(layer == 19){ // corrugated steel
    float ribs = sin(uv.x*PI*24.0)*0.5+0.5;
    vec3 base = mix(vec3(0.36,0.37,0.38), vec3(0.52,0.53,0.54), ribs);
    float rust = smoothstep(0.55,0.85, tfbm(uv*7.0,uPeriod*7.0,4,0.55));
    base = mix(base, vec3(0.42,0.22,0.11), rust*0.7);
    base *= 0.9 + tfbm(uv*35.0,uPeriod*35.0,3,0.5)*0.2;
    return base;
  }
  return vec3(0.5);
}

// ---------------------------------------------------------------- ORM
vec3 ormFn(vec2 uv, int layer, float h){
  float ao = clamp(0.55 + h*0.55, 0.0, 1.0);
  float rough = 0.8;
  float metal = 0.0;
  if(layer == 0 || layer == 1 || layer == 18){ rough = 0.82 + tfbm(uv*12.0,uPeriod*12.0,3,0.5)*0.14; }
  else if(layer == 4 || layer == 5){ rough = 0.66 + tfbm(uv*12.0,uPeriod*12.0,3,0.5)*0.22; }
  else if(layer == 2){ rough = 0.86 + tfbm(uv*14.0,uPeriod*14.0,3,0.5)*0.12; }
  else if(layer == 3){ rough = 0.88; }
  else if(layer == 6){ metal = 0.35; rough = 0.42 + tfbm(uv*13.0,uPeriod*13.0,3,0.5)*0.3; }
  else if(layer == 7){ float r = tfbm(uv*6.0,uPeriod*6.0,5,0.55); metal = mix(0.9,0.1,smoothstep(0.35,0.7,r)); rough = mix(0.42, 0.95, smoothstep(0.3,0.75,r)); }
  else if(layer == 8){ rough = 0.72 + tfbm(uv*20.0,uPeriod*20.0,3,0.5)*0.2; }
  else if(layer == 9){ rough = 0.78 + tfbm(uv*16.0,uPeriod*16.0,3,0.5)*0.18; }
  else if(layer == 10){ rough = 0.93; }
  else if(layer == 11 || layer == 17){ rough = 0.88; }
  else if(layer == 12){ rough = 0.94; }
  else if(layer == 13){ vec2 id,cu; float g=bricks(uv,10.0,10.0,id,cu,0.0); rough = mix(0.9, 0.3, smoothstep(0.0,0.2,g)); }
  else if(layer == 14){ float wear = smoothstep(0.72,0.95,tfbm(uv*9.0,uPeriod*9.0,4,0.55)); metal = mix(0.38, 0.85, wear); rough = mix(0.52 + tfbm(uv*24.0,uPeriod*24.0,4,0.55)*0.18, 0.26, wear); }
  else if(layer == 16){ metal = 0.0; rough = 0.62 + (1.0-smoothstep(0.0,0.5,tworley(uv*115.0,uPeriod*115.0).x))*0.22; }
  else if(layer == 15){ rough = 0.9; }
  else if(layer == 19){ float rust = smoothstep(0.55,0.85, tfbm(uv*7.0,uPeriod*7.0,4,0.55)); metal = mix(0.85,0.1,rust); rough = mix(0.38,0.92,rust); }
  return vec3(ao, clamp(rough,0.04,1.0), metal);
}

void main(){
  vec2 uv = vUv;
  float texel = 1.0/\${TEX_SIZE}.0;

  // Height goes to a scratch buffer first and everything else reads it back.
  // Deriving the normal by re-evaluating heightFn at four neighbours inlines
  // the most expensive function in the file five times over, which costs both
  // shader size and five times the work per texel.
  if(uOutput == 3){
    outColor = vec4(heightFn(uv, uLayer), 0.0, 0.0, 1.0);
    return;
  }

  float h = texture(uHeight, uv).r;

  if(uOutput == 0){
    // Albedo swatches above are authored the way a colour picker reads them,
    // so they have to be linearised before the PBR pass ever sees them.
    vec3 srgb = clamp(albedoFn(uv, uLayer, h), 0.0, 1.0);
    vec3 lin = mix(srgb / 12.92, pow((srgb + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), srgb));
    outColor = vec4(lin, 1.0);
  } else if(uOutput == 1){
    // Central differences: a forward difference biases the relief a half texel
    // toward the light and makes fine grain look like it is lit from one side.
    // The height buffer wraps, so the tile stays seamless across the edge.
    float hx0 = texture(uHeight, uv - vec2(texel,0.0)).r;
    float hx1 = texture(uHeight, uv + vec2(texel,0.0)).r;
    float hy0 = texture(uHeight, uv - vec2(0.0,texel)).r;
    float hy1 = texture(uHeight, uv + vec2(0.0,texel)).r;
    // Scaled by texel count so the relief keeps the same slope if the atlas
    // resolution changes; the 0.5 accounts for the two-texel central span.
    float strength = 6.0 * 0.5 * 0.0025 / texel;
    vec3 n = normalize(vec3((hx0-hx1)*strength, (hy0-hy1)*strength, 1.0));
    outColor = vec4(n*0.5+0.5, h);
  } else {
    outColor = vec4(ormFn(uv, uLayer, h), 1.0);
  }
}
`;class vv{constructor(t,e=512,i=8){this.anisotropy=i,this.renderer=t,this.size=e,this.albedo=null,this.normal=null,this.orm=null}async compile(){const{renderer:t,size:e}=this,i={format:1023,type:1009,minFilter:1008,magFilter:1006,wrapS:1e3,wrapT:1e3,generateMipmaps:!0,depthBuffer:!1,stencilBuffer:!1};this._albedoRT=new Qr(e,e,ks,i),this._normalRT=new Qr(e,e,ks,i),this._ormRT=new Qr(e,e,ks,i);for(const r of[this._albedoRT,this._normalRT,this._ormRT])r.texture.wrapS=1e3,r.texture.wrapT=1e3,r.texture.minFilter=1008,r.texture.magFilter=1006,r.texture.generateMipmaps=!0,r.texture.anisotropy=Math.min(this.anisotropy,t.capabilities.getMaxAnisotropy());this.albedo=this._albedoRT.texture,this.normal=this._normalRT.texture,this.orm=this._ormRT.texture,this._heightRT=new ye(e,e,{format:1028,type:1015,minFilter:1003,magFilter:1003,wrapS:1e3,wrapT:1e3,generateMipmaps:!1,depthBuffer:!1,stencilBuffer:!1});const n=gv.replace("${TEX_SIZE}",String(e));this._passes=[];for(let r=0;r<ks;r++)this._passes.push(new Ue(n,{uOutput:{value:3},uPeriod:{value:1},uHeight:{value:null}},{GEN_LAYER:r}));const s=performance.now();return await Promise.all(this._passes.map(r=>t.compileAsync(r.scene,ov))),this.compileMs=Math.round(performance.now()-s),this}async draw(t){const{renderer:e}=this,i=[this._albedoRT,this._normalRT,this._ormRT],n=e.getRenderTarget(),s=performance.now();for(let r=0;r<ks;r++){const o=this._passes[r];o.render(e,this._heightRT),o.uniforms.uHeight.value=this._heightRT.texture;for(let l=0;l<3;l++)o.uniforms.uOutput.value=l,o.render(e,i[l],r);o.dispose(),t&&await t((r+1)/ks)}return this._passes=null,this.drawMs=Math.round(performance.now()-s),e.setRenderTarget(n),this._heightRT.dispose(),this._heightRT=null,this._forceMipmaps(i),this}_forceMipmaps(t){const e=this.renderer.getContext();for(const i of t){const n=this.renderer.properties.get(i.texture),s=n&&n.__webglTexture;s&&(e.bindTexture(e.TEXTURE_2D_ARRAY,s),e.generateMipmap(e.TEXTURE_2D_ARRAY),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.bindTexture(e.TEXTURE_2D_ARRAY,null))}}dispose(){this._albedoRT?.dispose(),this._normalRT?.dispose(),this._ormRT?.dispose()}}const lo=`
${ec}

uniform vec3 uSunDirection;
uniform vec3 uSunColor;
uniform vec3 uSkySH[9];
uniform vec3 uHorizonColor;
uniform vec3 uZenithColor;
uniform vec3 uGroundColor;
uniform float uCloudShadowStrength;
uniform vec2 uCloudShadowOffset;
uniform float uTime;

uniform highp sampler2DArray uShadowMap;
uniform mat4 uCascadeMatrix[4];
uniform vec4 uCascadeSplits;
uniform float uShadowTexel;
uniform int uCascadeCount;
uniform float uShadowStrength;

uniform vec4 uPointLights[8];   // xyz position, w radius
uniform vec4 uPointColors[8];   // rgb colour * intensity, w unused
uniform int uPointLightCount;

uniform vec3 uFogColor;
uniform float uFogDensity;
uniform vec3 uCameraPos;

const float PI = 3.141592653589793;

vec3 shIrradiance(vec3 n){
  vec3 r = uSkySH[0] * 0.886227;
  r += uSkySH[1] * (2.0*0.511664) * n.y;
  r += uSkySH[2] * (2.0*0.511664) * n.z;
  r += uSkySH[3] * (2.0*0.511664) * n.x;
  r += uSkySH[4] * (2.0*0.429043) * n.x * n.y;
  r += uSkySH[5] * (2.0*0.429043) * n.y * n.z;
  r += uSkySH[6] * (0.743125 * n.z * n.z - 0.247708);
  r += uSkySH[7] * (2.0*0.429043) * n.x * n.z;
  r += uSkySH[8] * (0.429043) * (n.x*n.x - n.y*n.y);
  return max(r, vec3(0.0)) / PI;
}

// Analytic sky colour along a direction — used for ambient specular.
vec3 skyProbe(vec3 d){
  float h = clamp(d.y*0.5+0.5, 0.0, 1.0);
  vec3 c = mix(uHorizonColor, uZenithColor, pow(h, 0.6));
  c = mix(uGroundColor, c, smoothstep(-0.14, 0.06, d.y));
  float sun = max(dot(d, uSunDirection), 0.0);
  c += uSunColor * pow(sun, 220.0) * 1.4;
  c += uSunColor * pow(sun, 8.0) * 0.045;
  return c;
}

float cloudShadow(vec3 worldPos){
  if(uCloudShadowStrength <= 0.001) return 1.0;
  vec2 p = worldPos.xz * 0.0072 + uCloudShadowOffset;
  float n = fbm(p, 4, 0.55);
  float s = smoothstep(0.42, 0.68, n);
  return mix(1.0, 1.0 - uCloudShadowStrength, s);
}

float sampleCascade(vec3 worldPos, int cascade, float ndl, vec3 normal){
  vec4 lp = uCascadeMatrix[cascade] * vec4(worldPos + normal * (0.035 + float(cascade)*0.055), 1.0);
  vec3 proj = lp.xyz / lp.w;
  proj = proj * 0.5 + 0.5;
  if(proj.x < 0.002 || proj.x > 0.998 || proj.y < 0.002 || proj.y > 0.998 || proj.z > 1.0) return 1.0;

  float slope = clamp(1.0 - ndl, 0.0, 1.0);
  float bias = (0.0009 + slope * 0.0032) * (1.0 + float(cascade)*1.6);
  float texel = uShadowTexel * (1.0 + float(cascade)*0.35);

  // rotated 3x3 optimised PCF
  float angle = hash12(floor(gl_FragCoord.xy)) * 6.2831853;
  float s = sin(angle), c = cos(angle);
  mat2 rot = mat2(c, -s, s, c);
  float sum = 0.0;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o = rot * vec2(float(x), float(y)) * texel;
      float d = texture(uShadowMap, vec3(proj.xy + o, float(cascade))).r;
      sum += (proj.z - bias <= d) ? 1.0 : 0.0;
    }
  }
  return sum / 9.0;
}

float sunShadow(vec3 worldPos, float viewDepth, float ndl, vec3 normal){
  if(uShadowStrength <= 0.001) return 1.0;
  int cascade = 3;
  if(viewDepth < uCascadeSplits.x) cascade = 0;
  else if(viewDepth < uCascadeSplits.y) cascade = 1;
  else if(viewDepth < uCascadeSplits.z) cascade = 2;
  if(cascade >= uCascadeCount) return 1.0;

  float s = sampleCascade(worldPos, cascade, ndl, normal);

  // blend into the next cascade over the last 12% of the range
  float splitEnd = cascade == 0 ? uCascadeSplits.x : cascade == 1 ? uCascadeSplits.y : cascade == 2 ? uCascadeSplits.z : uCascadeSplits.w;
  float splitStart = cascade == 0 ? 0.0 : cascade == 1 ? uCascadeSplits.x : cascade == 2 ? uCascadeSplits.y : uCascadeSplits.z;
  float t = (viewDepth - splitStart) / max(splitEnd - splitStart, 0.001);
  if(t > 0.86 && cascade + 1 < uCascadeCount){
    float s2 = sampleCascade(worldPos, cascade+1, ndl, normal);
    s = mix(s, s2, smoothstep(0.86, 1.0, t));
  }
  return mix(1.0, s, uShadowStrength);
}

vec3 fresnelSchlick(float cosTheta, vec3 f0){
  return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

float distributionGGX(float ndh, float rough){
  float a = rough*rough;
  float a2 = a*a;
  float d = ndh*ndh*(a2-1.0)+1.0;
  return a2 / max(PI*d*d, 1e-6);
}

float geometrySmith(float ndv, float ndl, float rough){
  float r = rough + 1.0;
  float k = (r*r)/8.0;
  float gv = ndv/(ndv*(1.0-k)+k);
  float gl = ndl/(ndl*(1.0-k)+k);
  return gv*gl;
}

// Split-sum environment BRDF approximation (Karis, mobile fit).
vec3 envBRDFApprox(vec3 f0, float rough, float ndv){
  const vec4 c0 = vec4(-1.0, -0.0275, -0.572, 0.022);
  const vec4 c1 = vec4(1.0, 0.0425, 1.04, -0.04);
  vec4 r = rough * c0 + c1;
  float a004 = min(r.x*r.x, exp2(-9.28*ndv)) * r.x + r.y;
  vec2 ab = vec2(-1.04, 1.04) * a004 + r.zw;
  return f0 * ab.x + ab.y;
}

struct SurfaceOut { vec3 direct; vec3 ambient; };

/**
 * shadowFloor keeps a surface from going fully unlit no matter what the shadow
 * map says. Only the first-person weapon uses it; see the light rig note in
 * the fragment shader below.
 */
SurfaceOut shadeSurface(vec3 worldPos, vec3 N, vec3 V, vec3 albedo, float rough, float metal, float ao, float viewDepth, float shadowScale, float shadowFloor){
  SurfaceOut o;
  rough = clamp(rough, 0.035, 1.0);
  vec3 f0 = mix(vec3(0.04), albedo, metal);
  vec3 diffuseAlbedo = albedo * (1.0 - metal);
  float ndv = max(dot(N, V), 1e-4);

  // --- sun
  vec3 L = uSunDirection;
  float ndl = max(dot(N, L), 0.0);
  vec3 direct = vec3(0.0);
  if(ndl > 0.0){
    float sh = sunShadow(worldPos, viewDepth, ndl, N) * shadowScale;
    sh *= cloudShadow(worldPos);
    sh = max(sh, shadowFloor);
    if(sh > 0.001){
      vec3 H = normalize(L + V);
      float ndh = max(dot(N,H), 0.0);
      float vdh = max(dot(V,H), 0.0);
      vec3 F = fresnelSchlick(vdh, f0);
      float D = distributionGGX(ndh, rough);
      float G = geometrySmith(ndv, ndl, rough);
      vec3 spec = (D*G*F) / max(4.0*ndv*ndl, 1e-5);
      vec3 kd = (vec3(1.0)-F);
      direct += (kd*diffuseAlbedo/PI + spec) * uSunColor * ndl * sh;
    }
  }

  // --- dynamic point lights (muzzle flash, explosions, sparks)
  for(int i=0;i<8;i++){
    if(i >= uPointLightCount) break;
    vec3 d = uPointLights[i].xyz - worldPos;
    float dist2 = dot(d,d);
    float radius = uPointLights[i].w;
    if(dist2 > radius*radius) continue;
    float dist = sqrt(dist2);
    vec3 Lp = d / max(dist, 1e-4);
    float pndl = max(dot(N, Lp), 0.0);
    if(pndl <= 0.0) continue;
    float att = clamp(1.0 - dist/radius, 0.0, 1.0);
    att = att*att / (1.0 + dist*dist*0.35);
    vec3 H = normalize(Lp + V);
    float ndh = max(dot(N,H), 0.0);
    vec3 F = fresnelSchlick(max(dot(V,H),0.0), f0);
    float D = distributionGGX(ndh, rough);
    float G = geometrySmith(ndv, pndl, rough);
    vec3 spec = (D*G*F)/max(4.0*ndv*pndl, 1e-5);
    direct += ((vec3(1.0)-F)*diffuseAlbedo/PI + spec) * uPointColors[i].rgb * pndl * att;
  }

  // --- sky / bounce ambient
  //
  // The sky probe is close to pure Rayleigh, and using it neat as the diffuse
  // fill paints every shadow the colour of the zenith: an alley floor in shade
  // came out teal, which is a thing no sunlit desert has ever done. Real
  // skylight reaching a street has been through aerosol and several bounces
  // off warm ground long before it lands, so it arrives far less saturated
  // than the sky it came from. Pulling it toward its own luminance with a
  // slight warm bias keeps the direction and the brightness of the fill and
  // takes away only the cast.
  vec3 irr = shIrradiance(N);
  float irrLum = dot(irr, vec3(0.2126, 0.7152, 0.0722));
  irr = mix(irr, vec3(irrLum) * vec3(1.05, 1.0, 0.93), 0.40);
  vec3 ambient = diffuseAlbedo * irr * ao;

  // --- warm bounce off the ground
  //
  // A sunlit sand street throws a great deal of light back up, and it is the
  // colour of the sand. With sky irradiance as the only fill, everything in
  // shadow instead took the sky's blue whole — which is why pale concrete
  // barriers read as flat blue-grey slabs with no material identity at all,
  // and why the shaded sides of every building sat cold against a warm scene.
  // Strongest on downward-facing surfaces and near the ground, gone by the
  // time it reaches a roofline.
  float downward = clamp(0.5 - N.y * 0.5, 0.0, 1.0);
  float nearGround = 1.0 - smoothstep(0.0, 7.0, worldPos.y);
  vec3 bounce = vec3(0.62, 0.50, 0.33) * uSunColor * 0.20
    * downward * (0.30 + nearGround * 0.70);
  ambient += diffuseAlbedo * bounce * ao;
  vec3 R = reflect(-V, N);
  vec3 envSpec = skyProbe(normalize(mix(R, N, rough*rough*0.75)));
  float horizonFade = clamp(1.0 + dot(R, N), 0.0, 1.0);
  ambient += envSpec * envBRDFApprox(f0, rough, ndv) * ao * horizonFade * mix(0.35, 1.0, metal);

  o.direct = direct;
  o.ambient = ambient;
  return o;
}

vec3 applyAerial(vec3 color, float dist, vec3 viewDir){
  float f = 1.0 - exp(-dist * uFogDensity);
  float sunAmount = max(dot(viewDir, uSunDirection), 0.0);
  vec3 fog = mix(uFogColor, uFogColor * 1.25 + uSunColor * 0.06, pow(sunAmount, 6.0));
  return mix(color, fog, clamp(f, 0.0, 1.0));
}
`,_v=`
precision highp float;
precision highp int;

in vec3 position;
in vec3 normal;
in vec2 uv;
in float aLayer;
in vec3 aTint;
in float aWear;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 uPrevViewProjection;
uniform mat4 uPrevModelMatrix;
uniform float uPrevModelValid;   // 0 for shared static materials, 1 for tracked dynamics
uniform vec4 uJitter;      // xy: current jitter, zw: previous jitter (clip space)

out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vUv;
out float vLayer;
out vec3 vTint;
out float vWear;
out vec4 vCurClip;
out vec4 vPrevClip;

void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  vLayer = aLayer;
  vTint = aTint;
  vWear = aWear;

  vec4 clip = projectionMatrix * viewMatrix * wp;
  vCurClip = clip;
  mat4 prevModel = uPrevModelValid > 0.5 ? uPrevModelMatrix : modelMatrix;
  vPrevClip = uPrevViewProjection * prevModel * vec4(position, 1.0);

  clip.xy += uJitter.xy * clip.w;
  gl_Position = clip;
}
`,xv=`
precision highp float;
precision highp int;
precision highp sampler2DArray;

${Ei}
${lo}

uniform sampler2DArray uAlbedoArray;
uniform sampler2DArray uNormalArray;
uniform sampler2DArray uOrmArray;
uniform mat4 viewMatrix;
uniform vec4 uJitter;
uniform float uDetailStrength;
uniform float uViewmodelLight;   // 0 for the world, 1 for the first-person weapon

in vec3 vWorldPos;
in vec3 vNormal;
in vec2 vUv;
in float vLayer;
in vec3 vTint;
in float vWear;
in vec4 vCurClip;
in vec4 vPrevClip;

layout(location = 0) out vec4 outDirect;
layout(location = 1) out vec4 outAmbient;
layout(location = 2) out vec4 outNormal;
layout(location = 3) out vec4 outVelocity;

/**
 * Stochastic tiling on a triangle lattice.
 *
 * A tileable texture stretched over a twenty metre facade repeats its crack
 * and chip pattern dozens of times, and the eye locks onto that grid instantly
 * — no amount of brightness variation hides it. So each cell of a lattice gets
 * its own random UV offset, which destroys the periodicity.
 *
 * The offset is discontinuous at cell borders, so the blend between cells has
 * to be exactly zero there or the seam shows as a hard edge. A triangle
 * lattice gives that for free: the barycentric weight of a vertex falls to
 * zero on the opposite edge, so every sample fades out before its own cell
 * ends. Weights are then sharpened, which keeps most pixels dominated by a
 * single tile — a plain linear blend of three samples averages away the
 * contrast the texture was authored with and leaves everything looking soft.
 *
 * Gradients come from the unoffset coordinate so the offsets do not tear the
 * mip chain at cell boundaries.
 */
vec2 tileOffset(vec2 cell){
  return vec2(hash12(cell), hash12(cell + 17.31));
}

struct TileBlend { vec2 uv1; vec2 uv2; vec2 uv3; vec3 w; vec2 dx; vec2 dy; };

TileBlend tileBlend(vec2 uv){
  TileBlend t;
  t.dx = dFdx(uv);
  t.dy = dFdy(uv);

  // Skew into a triangular lattice; 2*sqrt(3) makes cells roughly tile-sized.
  vec2 skewed = mat2(1.0, 0.0, -0.57735027, 1.15470054) * (uv * 3.4641016);
  vec2 base = floor(skewed);
  vec2 f = fract(skewed);

  vec2 v1, v2, v3;
  float rest = 1.0 - f.x - f.y;
  if(rest > 0.0){
    t.w = vec3(rest, f.y, f.x);
    v1 = base; v2 = base + vec2(0.0, 1.0); v3 = base + vec2(1.0, 0.0);
  } else {
    t.w = vec3(-rest, 1.0 - f.y, 1.0 - f.x);
    v1 = base + vec2(1.0, 1.0); v2 = base + vec2(1.0, 0.0); v3 = base + vec2(0.0, 1.0);
  }

  t.uv1 = uv + tileOffset(v1);
  t.uv2 = uv + tileOffset(v2);
  t.uv3 = uv + tileOffset(v3);

  vec3 w = t.w * t.w;      // sharpen toward a single dominant tile
  w *= w;
  t.w = w / max(w.x + w.y + w.z, 1e-5);
  return t;
}

vec4 tiled(sampler2DArray tex, TileBlend t, float layer){
  // Weights fall off fast enough that a tile under 2% contributes less than the
  // 8-bit textures can represent, so skipping it is free and most pixels end up
  // paying for one or two fetches rather than three.
  vec4 c = vec4(0.0);
  if(t.w.x > 0.02) c += t.w.x * textureGrad(tex, vec3(t.uv1, layer), t.dx, t.dy);
  if(t.w.y > 0.02) c += t.w.y * textureGrad(tex, vec3(t.uv2, layer), t.dx, t.dy);
  if(t.w.z > 0.02) c += t.w.z * textureGrad(tex, vec3(t.uv3, layer), t.dx, t.dy);
  return c / max(dot(t.w, step(vec3(0.02), t.w)), 1e-4);
}

vec3 perturbNormal(vec3 N, vec3 V, vec2 texcoord, vec3 mapN){
  vec3 q0 = dFdx(-V);
  vec3 q1 = dFdy(-V);
  vec2 st0 = dFdx(texcoord);
  vec2 st1 = dFdy(texcoord);
  vec3 T = normalize(q0 * st1.y - q1 * st0.y);
  vec3 B = normalize(-q0 * st1.x + q1 * st0.x);
  if(any(isnan(T)) || any(isnan(B))) return N;
  T = normalize(T - N * dot(N, T));
  B = cross(N, T);
  return normalize(mat3(T, B, N) * mapN);
}

void main(){
  float layer = vLayer;
  vec3 V = normalize(uCameraPos - vWorldPos);
  float viewDist = distance(uCameraPos, vWorldPos);

  TileBlend tb = tileBlend(vUv);
  vec4 alb = tiled(uAlbedoArray, tb, layer);
  vec4 nrm = tiled(uNormalArray, tb, layer);
  vec3 orm = tiled(uOrmArray, tb, layer).rgb;

  // meso-scale world-space break-up so tiling never reads as a grid
  float macro = fbm(vWorldPos.xz * 0.055 + vWorldPos.y * 0.021, 4, 0.55);
  float macro2 = fbm(vWorldPos.xz * 0.4 + 31.0, 3, 0.5);

  vec3 albedo = alb.rgb * vTint;
  albedo *= 0.86 + macro * 0.28;
  albedo *= 0.94 + macro2 * 0.12;

  // dust accumulation on upward faces, grime in crevices (linear reflectances)
  float up = clamp(vNormal.y, 0.0, 1.0);
  float dustMask = up * up * (0.35 + macro * 0.5) * (0.55 + vWear * 0.6);
  albedo = mix(albedo, vec3(0.255, 0.192, 0.108), clamp(dustMask * 0.42, 0.0, 0.5));

  float wear = clamp(vWear * (0.4 + macro * 1.2), 0.0, 1.0);
  albedo = mix(albedo, albedo * 0.72, wear * 0.4);

  // ---- weathering on vertical surfaces
  //
  // Every wall in the district met every floor on a razor-clean line, and no
  // facade carried a mark of any kind, so a street of them read as painted
  // card however much geometry was on it. Both are the same observation — real
  // walls are dirtiest where water and feet reach them — and both are cheap
  // here, because doing it in the shader weathers the whole map at once rather
  // than one prop at a time.
  float vertical = 1.0 - clamp(abs(vNormal.y) * 1.6, 0.0, 1.0);

  // Splash zone: the district floor sits near y=0, so height above it is a
  // good enough proxy for ground contact without sampling the terrain.
  float splash = (1.0 - smoothstep(0.0, 0.85, vWorldPos.y)) * vertical;
  splash *= 0.55 + macro2 * 0.7;
  albedo = mix(albedo, vec3(0.118, 0.094, 0.070), clamp(splash * 0.45, 0.0, 0.55));

  // Drip staining: vertical streaks that fade downward from wherever they
  // start, so sills, balconies and parapets all trail runs beneath them
  // without needing to know where any of them are.
  float streakNoise = fbm(vec2(vWorldPos.x + vWorldPos.z, vWorldPos.y * 0.06) * 2.4, 3, 0.55);
  float streak = smoothstep(0.62, 0.95, streakNoise) * vertical;
  streak *= smoothstep(0.0, 2.2, vWorldPos.y) * (0.35 + vWear * 0.8);
  albedo = mix(albedo, albedo * vec3(0.62, 0.60, 0.56), clamp(streak * 0.5, 0.0, 0.5));

  // Blown render: patches where the plaster has come off, exposing a coarser,
  // greyer substrate. Sparse on purpose — this is an accent, not a texture.
  // (Not named "patch": that is a reserved word in GLSL and compiles nowhere.)
  //
  // Thresholding one low-octave fbm gives evenly sized round blobs — the wall
  // ends up with polka dots rather than damage. Warping the lookup with a
  // second noise before thresholding tears the edges and varies the sizes,
  // which is the difference between a stain and a broken surface.
  vec2 blownUv = vWorldPos.xz * 0.32 + vWorldPos.y * 0.28 + 7.0;
  blownUv += (fbm(blownUv * 2.7 + 19.0, 2, 0.5) - 0.5) * 1.6;
  float blown = smoothstep(0.70, 0.88, fbm(blownUv, 4, 0.55));
  blown *= vertical * vWear;
  albedo = mix(albedo, vec3(0.40, 0.385, 0.355), clamp(blown * 0.55, 0.0, 0.55));

  // Dirt and exposed substrate are rougher than the render they sit on.
  float rough = clamp(orm.g * (0.9 + wear * 0.25) + dustMask * 0.16
    + splash * 0.22 + blown * 0.25, 0.04, 1.0);
  float metal = orm.b * (1.0 - dustMask * 0.5) * (1.0 - clamp(splash, 0.0, 1.0) * 0.6);
  float ao = orm.r;

  vec3 mapN = nrm.xyz * 2.0 - 1.0;
  mapN.xy *= uDetailStrength * mix(1.0, 0.35, clamp(viewDist / 60.0, 0.0, 1.0));
  vec3 N = perturbNormal(normalize(vNormal), V, vUv, normalize(mapN));

  float viewDepth = -(viewMatrix * vec4(vWorldPos, 1.0)).z;

  /**
   * Viewmodel light rig.
   *
   * A weapon carried through an alley spends most of a match in shade, and a
   * dark parkerised receiver lit only by the sky collapses into a black
   * silhouette against a sunlit street. That is technically correct and
   * completely unreadable — nobody's eye does that with an object 40cm from
   * their face. Shooters solve it with a light rig bolted to the view, and so
   * does this one: the sun keeps a floor so the gun holds its form, plus a
   * soft fill from over the player's shoulder. Both scale with the sky, so the
   * rig tracks the scene instead of looking pasted on.
   */
  float shadowFloor = uViewmodelLight * 0.55;
  SurfaceOut s = shadeSurface(vWorldPos, N, V, albedo, rough, metal, ao, viewDepth, 1.0, shadowFloor);

  vec3 direct = s.direct;
  vec3 ambient = s.ambient;

  if(uViewmodelLight > 0.0){
    // Wrapped key: the sun allowed partway round the form, added only where
    // the real sun cannot reach. The faces the player actually looks at point
    // at the camera, which is exactly where N.L gates the key light to zero —
    // without this the whole weapon is lit by nothing but sky.
    float ndlRaw = dot(N, uSunDirection);
    float wrapKey = max((ndlRaw + 0.6) / 1.6, 0.0) - max(ndlRaw, 0.0);
    direct += albedo * (1.0 - metal) / PI * uSunColor * wrapKey * 0.85;

    // Neutral fill from over the shoulder. Scaled by the sky's luminance so
    // it tracks exposure, but stripped of its colour: a fill carrying the
    // sky's blue is why a grey receiver kept rendering as navy.
    vec3 irrUp = shIrradiance(vec3(0.0, 1.0, 0.0));
    float fillLum = dot(irrUp, vec3(0.2126, 0.7152, 0.0722));
    float fill = max(dot(N, normalize(V + vec3(0.0, 0.55, 0.0))), 0.0);
    float wrap = 0.40 + 0.60 * fill;
    ambient += albedo * fillLum * (0.72 * uViewmodelLight * wrap);
  }

  // aerial perspective is applied to the combined result later; split it here
  float fogAmount = 1.0 - exp(-viewDist * uFogDensity);
  float sunAmount = max(dot(-V, uSunDirection), 0.0);
  vec3 fog = mix(uFogColor, uFogColor * 1.3 + uSunColor * 0.05, pow(sunAmount, 6.0));
  direct = mix(direct, vec3(0.0), clamp(fogAmount, 0.0, 1.0));
  ambient = mix(ambient, fog, clamp(fogAmount, 0.0, 1.0));

  outDirect = vec4(direct, 0.0);
  outAmbient = vec4(ambient, ao);
  outNormal = vec4(octEncode(N), rough, 0.25);

  vec2 curNdc = vCurClip.xy / max(vCurClip.w, 1e-6);
  vec2 prevNdc = vPrevClip.xy / max(vPrevClip.w, 1e-6);
  outVelocity = vec4((curNdc - prevNdc) * 0.5, 0.0, 1.0);
}
`,yv=`
precision highp float;
precision highp int;

in vec3 position;
in vec3 normal;
in vec2 uv;
in float aLayer;
in vec3 aTint;
in float aWear;
in float aBone;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 uBones[16];
uniform mat4 uPrevBones[16];
uniform mat4 uPrevViewProjection;
uniform vec4 uJitter;
uniform float uHitFlash;

out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vUv;
out float vLayer;
out vec3 vTint;
out float vWear;
out vec4 vCurClip;
out vec4 vPrevClip;

void main(){
  int b = int(aBone + 0.5);
  mat4 bone = uBones[b];
  vec4 wp = bone * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vNormal = normalize(mat3(bone) * normal);
  vUv = uv;
  vLayer = aLayer;
  vTint = aTint;
  vWear = aWear;

  vec4 clip = projectionMatrix * viewMatrix * wp;
  vCurClip = clip;
  vPrevClip = uPrevViewProjection * uPrevBones[b] * vec4(position, 1.0);

  clip.xy += uJitter.xy * clip.w;
  gl_Position = clip;
}
`,Sv=`
precision highp float;
precision highp int;
precision highp sampler2DArray;

${Ei}
${lo}

uniform sampler2DArray uAlbedoArray;
uniform sampler2DArray uNormalArray;
uniform sampler2DArray uOrmArray;
uniform mat4 viewMatrix;
uniform float uDetailStrength;
uniform float uHitFlash;

in vec3 vWorldPos;
in vec3 vNormal;
in vec2 vUv;
in float vLayer;
in vec3 vTint;
in float vWear;
in vec4 vCurClip;
in vec4 vPrevClip;

layout(location = 0) out vec4 outDirect;
layout(location = 1) out vec4 outAmbient;
layout(location = 2) out vec4 outNormal;
layout(location = 3) out vec4 outVelocity;

vec3 perturbNormal(vec3 N, vec3 V, vec2 texcoord, vec3 mapN){
  vec3 q0 = dFdx(-V);
  vec3 q1 = dFdy(-V);
  vec2 st0 = dFdx(texcoord);
  vec2 st1 = dFdy(texcoord);
  vec3 T = normalize(q0 * st1.y - q1 * st0.y);
  if(any(isnan(T))) return N;
  T = normalize(T - N * dot(N, T));
  vec3 B = cross(N, T);
  return normalize(mat3(T, B, N) * mapN);
}

void main(){
  vec3 V = normalize(uCameraPos - vWorldPos);
  float viewDist = distance(uCameraPos, vWorldPos);

  vec4 alb = texture(uAlbedoArray, vec3(vUv, vLayer));
  vec3 orm = texture(uOrmArray, vec3(vUv, vLayer)).rgb;
  vec3 nrmTex = texture(uNormalArray, vec3(vUv, vLayer)).xyz;

  vec3 albedo = alb.rgb * vTint;
  // field wear: dust settles low on the body and on upward-facing gear
  float up = clamp(vNormal.y, 0.0, 1.0);
  float dust = up * up * (0.3 + vWear * 0.5);
  albedo = mix(albedo, vec3(0.255, 0.192, 0.108), clamp(dust * 0.24, 0.0, 0.32));

  float rough = clamp(orm.g * (0.92 + vWear * 0.2), 0.06, 1.0);
  float metal = orm.b;

  vec3 mapN = nrmTex * 2.0 - 1.0;
  mapN.xy *= uDetailStrength * mix(1.0, 0.3, clamp(viewDist / 34.0, 0.0, 1.0));
  vec3 N = perturbNormal(normalize(vNormal), V, vUv, normalize(mapN));

  float viewDepth = -(viewMatrix * vec4(vWorldPos, 1.0)).z;
  SurfaceOut s = shadeSurface(vWorldPos, N, V, albedo, rough, metal, orm.r, viewDepth, 1.0, 0.0);

  vec3 direct = s.direct;
  vec3 ambient = s.ambient;
  // brief bright wash when a round lands, so hits read even in shadow
  direct += albedo * uHitFlash * 6.0;

  float fogAmount = 1.0 - exp(-viewDist * uFogDensity);
  direct = mix(direct, vec3(0.0), fogAmount);
  ambient = mix(ambient, uFogColor, fogAmount);

  outDirect = vec4(direct, 0.0);
  outAmbient = vec4(ambient, orm.r);
  outNormal = vec4(octEncode(N), rough, 0.25);

  vec2 curNdc = vCurClip.xy / max(vCurClip.w, 1e-6);
  vec2 prevNdc = vPrevClip.xy / max(vPrevClip.w, 1e-6);
  outVelocity = vec4((curNdc - prevNdc) * 0.5, 0.0, 1.0);
}
`;class wv{constructor(t,e){this.lightUniforms=t,this.lib=e,this.materials=[]}_baseUniforms(){return{...this.lightUniforms,uAlbedoArray:{value:this.lib.albedo},uNormalArray:{value:this.lib.normal},uOrmArray:{value:this.lib.orm},uPrevModelMatrix:{value:new Nt},uPrevModelValid:{value:0},uDetailStrength:{value:1},uViewmodelLight:{value:0}}}create({side:t=0,detailStrength:e=1,name:i="world"}={}){const n=new Ji({glslVersion:Ui,vertexShader:_v,fragmentShader:xv,uniforms:this._baseUniforms(),side:t,transparent:!1,depthTest:!0,depthWrite:!0});return n.uniforms.uDetailStrength.value=e,n.name=i,this.materials.push(n),n}createDynamic(t,e={}){const i=this.create({name:t,...e});return i.uniforms.uPrevModelValid.value=1,i.userData.dynamic=!0,i}createViewmodel(t,e,i={}){const n=this.createDynamic(t,i);return n.uniforms.uPrevViewProjection={value:e},n.uniforms.uViewmodelLight.value=1,n.userData.viewmodel=!0,n}createCharacter(t){const e=new Ji({glslVersion:Ui,vertexShader:yv,fragmentShader:Sv,uniforms:{...this.lightUniforms,uAlbedoArray:{value:this.lib.albedo},uNormalArray:{value:this.lib.normal},uOrmArray:{value:this.lib.orm},uDetailStrength:{value:1},uHitFlash:{value:0},uBones:{value:null},uPrevBones:{value:null},uPrevViewProjection:t?{value:t}:this.lightUniforms.uPrevViewProjection},side:0,transparent:!1,depthTest:!0,depthWrite:!0});return e.name="character",this.materials.push(e),e}dispose(){for(const t of this.materials)t.dispose();this.materials.length=0}}const Mv=`
precision highp float;
in vec3 position;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
void main(){
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`,bv=`
precision highp float;
in vec3 position;
in float aBone;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 uBones[16];
void main(){
  gl_Position = projectionMatrix * viewMatrix * uBones[int(aBone + 0.5)] * vec4(position, 1.0);
}
`,sh=`
precision highp float;
layout(location = 0) out vec4 outDepth;
void main(){
  outDepth = vec4(gl_FragCoord.z, 0.0, 0.0, 1.0);
}
`;class Tv{constructor(t,{resolution:e=2048,cascades:i=4,maxDistance:n=110,lambda:s=.82}={}){this.renderer=t,this.resolution=e,this.cascadeCount=i,this.maxDistance=n,this.lambda=s,this.target=new Qr(e,e,i,{format:1028,type:1016,minFilter:1006,magFilter:1006,depthBuffer:!0,generateMipmaps:!1}),this.target.texture.wrapS=1001,this.target.texture.wrapT=1001,this.material=new Ji({glslVersion:Ui,vertexShader:Mv,fragmentShader:sh,side:0}),this._swapped=[],this.cameras=[],this.matrices=[];for(let r=0;r<i;r++){const o=new ao(-1,1,1,-1,.1,400);o.matrixAutoUpdate=!1,this.cameras.push(o),this.matrices.push(new Nt)}this.splits=new be,this._lastSnap=[];for(let r=0;r<i;r++)this._lastSnap.push(new y);this.viewmodelTarget=new ye(1024,1024,{format:1028,type:1016,minFilter:1006,magFilter:1006,depthBuffer:!0}),this.viewmodelCamera=new ao(-.6,.6,.6,-.6,.05,6),this.viewmodelCamera.matrixAutoUpdate=!1,this.viewmodelMatrix=new Nt}setResolution(t){t!==this.resolution&&(this.resolution=t,this.target.setSize(t,t,this.cascadeCount),this._frame=0)}computeSplits(t,e){const i=Math.max(t,.1),n=Math.min(e,this.maxDistance),s=[];for(let r=1;r<=this.cascadeCount;r++){const o=r/this.cascadeCount,l=i*Math.pow(n/i,o),c=i+(n-i)*o;s.push(this.lambda*l+(1-this.lambda)*c)}return this.splits.set(s[0],s[1]??s[0],s[2]??s[1]??s[0],s[3]??s[2]??s[0]),s}_refreshes(t){return this._frame<3||t<2?!0:(this._frame&1)===(t&1)}update(t,e){this._frame=(this._frame|0)+1;const i=this.computeSplits(t.near,this.maxDistance),n=t.matrixWorld,s=Math.tan(Ht.degToRad(t.fov*.5)),r=s*t.aspect;let o=t.near;for(let l=0;l<this.cascadeCount;l++){const c=o,h=i[l];if(o=h,!this._refreshes(l))continue;const u=c*r,d=c*s,g=h*r,m=h*s;zi[0].set(-u,-d,-c),zi[1].set(u,-d,-c),zi[2].set(-u,d,-c),zi[3].set(u,d,-c),zi[4].set(-g,-m,-h),zi[5].set(g,-m,-h),zi[6].set(-g,m,-h),zi[7].set(g,m,-h),Yn.set(0,0,0);for(let S=0;S<8;S++)zi[S].applyMatrix4(n),Yn.add(zi[S]);Yn.multiplyScalar(1/8);let v=0;for(let S=0;S<8;S++)v=Math.max(v,Yn.distanceTo(zi[S]));v=Math.ceil(v*16)/16;const p=this.cameras[l],f=v*2/this.resolution;jn.copy(e).normalize(),Tn.set(0,1,0),Math.abs(jn.dot(Tn))>.98&&Tn.set(1,0,0),$n.copy(Yn).addScaledVector(jn,v+60),ur.lookAt($n,Yn,Tn),dr.setFromRotationMatrix(ur),ah.makeRotationFromQuaternion(dr).invert(),Zn.copy(Yn).applyMatrix4(ah),Zn.x=Math.floor(Zn.x/f)*f,Zn.y=Math.floor(Zn.y/f)*f,rh.makeRotationFromQuaternion(dr),Zn.applyMatrix4(rh),$n.copy(Zn).addScaledVector(jn,v+60),p.position.copy($n),p.quaternion.copy(dr),p.left=-v,p.right=v,p.top=v,p.bottom=-v,p.near=.5,p.far=v*2+140,p.updateProjectionMatrix(),p.updateMatrix(),p.matrixWorld.copy(p.matrix),p.matrixWorldInverse.copy(p.matrixWorld).invert(),this.matrices[l].multiplyMatrices(p.projectionMatrix,p.matrixWorldInverse)}}createSkinnedMaterial(t){return new Ji({glslVersion:Ui,vertexShader:bv,fragmentShader:sh,uniforms:{uBones:t},side:0})}_swapIn(t){this._swapped.length=0,t.traverse(e=>{if(!(!e.isMesh||!e.visible)){if(e.userData.noShadow){this._swapped.push([e,e.material,!0]),e.visible=!1;return}this._swapped.push([e,e.material,!1]),e.material=e.userData.shadowMaterial||this.material}})}_swapOut(){for(const[t,e,i]of this._swapped)t.material=e,i&&(t.visible=!0);this._swapped.length=0}render(t,e){const i=this.renderer,n=i.getRenderTarget(),s=i.autoClear;this._swapIn(t),i.autoClear=!0,i.setClearColor(16777215,1);for(let r=0;r<this.cascadeCount;r++)this._refreshes(r)&&(i.setRenderTarget(this.target,r),i.clear(!0,!0,!1),i.render(t,this.cameras[r]));this._swapOut(),i.autoClear=s,i.setRenderTarget(n)}renderViewmodel(t,e,i){const n=this.renderer;jn.copy(e).normalize(),Tn.set(0,1,0),Math.abs(jn.dot(Tn))>.98&&Tn.set(1,0,0),$n.copy(i).addScaledVector(jn,2),ur.lookAt($n,i,Tn);const s=this.viewmodelCamera;s.position.copy($n),s.quaternion.setFromRotationMatrix(ur),s.updateMatrix(),s.matrixWorld.copy(s.matrix),s.matrixWorldInverse.copy(s.matrixWorld).invert(),s.updateProjectionMatrix(),this.viewmodelMatrix.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);const r=n.getRenderTarget();this._swapIn(t),n.setClearColor(16777215,1),n.setRenderTarget(this.viewmodelTarget),n.clear(!0,!0,!1),n.render(t,s),this._swapOut(),n.setRenderTarget(r)}dispose(){this.target.dispose(),this.viewmodelTarget.dispose(),this.material.dispose()}}const zi=Array.from({length:8},()=>new y),Yn=new y,$n=new y,jn=new y,Tn=new y,ur=new Nt,dr=new Qe,ah=new Nt,rh=new Nt,Zn=new y,nc=`
uniform vec3 uSunDirection;
uniform float uSunIntensity;
uniform float uTurbidity;

const float R_EARTH = 6371000.0;
const float R_ATMOS = 6471000.0;
const vec3 BETA_R = vec3(5.802e-6, 13.558e-6, 33.1e-6);
const float BETA_M = 8.0e-6;
const float H_R = 8000.0;
const float H_M = 1200.0;

float rayleighPhase(float mu){ return 3.0/(16.0*3.14159265) * (1.0 + mu*mu); }
float miePhase(float mu, float g){
  float g2 = g*g;
  return 3.0/(8.0*3.14159265) * ((1.0-g2)*(1.0+mu*mu)) / ((2.0+g2)*pow(1.0+g2-2.0*g*mu, 1.5));
}

float raySphere(vec3 o, vec3 d, float r){
  float b = dot(o, d);
  float c = dot(o, o) - r*r;
  float disc = b*b - c;
  if(disc < 0.0) return -1.0;
  return -b + sqrt(disc);
}

vec3 atmosphere(vec3 dir, vec3 sunDir){
  vec3 origin = vec3(0.0, R_EARTH + 220.0, 0.0);
  float d = raySphere(origin, dir, R_ATMOS);
  if(d < 0.0) return vec3(0.0);

  const int STEPS = 12;
  const int LIGHT_STEPS = 4;
  float segment = d / float(STEPS);
  float mu = dot(dir, sunDir);
  float pr = rayleighPhase(mu);
  float pm = miePhase(mu, 0.76);

  vec3 sumR = vec3(0.0), sumM = vec3(0.0);
  float odR = 0.0, odM = 0.0;
  float mieScale = BETA_M * (0.7 + uTurbidity * 0.55);

  for(int i=0;i<STEPS;i++){
    vec3 p = origin + dir * (segment * (float(i) + 0.5));
    float h = length(p) - R_EARTH;
    float hr = exp(-h/H_R) * segment;
    float hm = exp(-h/H_M) * segment;
    odR += hr; odM += hm;

    float dl = raySphere(p, sunDir, R_ATMOS);
    float lSeg = dl / float(LIGHT_STEPS);
    float odLR = 0.0, odLM = 0.0;
    bool blocked = false;
    for(int j=0;j<LIGHT_STEPS;j++){
      vec3 lp = p + sunDir * (lSeg * (float(j) + 0.5));
      float lh = length(lp) - R_EARTH;
      if(lh < 0.0){ blocked = true; break; }
      odLR += exp(-lh/H_R) * lSeg;
      odLM += exp(-lh/H_M) * lSeg;
    }
    if(blocked) continue;
    vec3 tau = BETA_R * (odR + odLR) + vec3(mieScale * 1.1) * (odM + odLM);
    vec3 att = exp(-tau);
    sumR += hr * att;
    sumM += hm * att;
  }
  // Cheap multiple-scattering approximation: a contribution proportional to
  // the accumulated scattering. Without it a single-scattering sky reads far
  // too dark and too saturated near the horizon.
  //
  // The Rayleigh share really is close to isotropic after a few bounces, but
  // the Mie share is not, and it is the one carrying the warmth. Spreading it
  // evenly put a salmon band right around the horizon — so a street facing
  // ninety degrees away from a high midday sun ended in what looked like a
  // sunset, and the whole frame read as late afternoon. Aiming it at the sun
  // keeps the warm glow where the sun actually is.
  float mieAim = 0.22 * mix(0.20, 1.0, smoothstep(-0.25, 0.85, mu));
  vec3 ms = (sumR * BETA_R * 0.8 + sumM * vec3(mieScale) * mieAim) * 0.5 * max(sunDir.y, 0.0);
  return uSunIntensity * (sumR * BETA_R * pr + sumM * mieScale * pm + ms);
}
`,Ev=`
${Ei}
${nc}

uniform mat4 uInvViewProjection;
uniform vec3 uCameraPos;
uniform float uTime;
uniform float uCoverage;
uniform int uSteps;
uniform vec3 uSunColor;
uniform vec2 uWind;

in vec2 vUv;
layout(location = 0) out vec4 outColor;

const float CLOUD_BOTTOM = 900.0;
const float CLOUD_TOP = 3200.0;

float cloudShape(vec3 p){
  vec3 q = p * 0.00042;
  q.xz += uWind * uTime * 0.0016;
  // Cumulus gathers into distinct heaps with open blue between them. Without
  // the cluster mask the fbm covers the deck evenly and the sky reads as one
  // continuous overcast haze no matter where the density threshold sits.
  float mass = fbm3(q * 0.30 + 7.3, 2, 0.6);
  float base = fbm3(q, 4, 0.55) * smoothstep(0.40, 0.68, mass);
  float detail = fbm3(q * 4.2 + 13.7, 3, 0.5);
  float heightFrac = clamp((p.y - CLOUD_BOTTOM) / (CLOUD_TOP - CLOUD_BOTTOM), 0.0, 1.0);

  // Cumulus profile.
  //
  // The base is nearly flat, because it sits at the condensation level and the
  // whole field shares it — that shared horizontal cut is most of what makes a
  // sky read as cumulus rather than as fog. A soft 0.0-0.18 ramp gave every
  // cloud a rounded underside and the deck looked like floating cotton. The
  // top is the opposite: it billows, so the profile widens through the middle
  // before the anvil cuts it off.
  float flatBase = smoothstep(0.0, 0.045, heightFrac);
  float billow = 1.0 + 0.45 * smoothstep(0.15, 0.62, heightFrac);
  float anvil = 1.0 - smoothstep(0.70, 1.0, heightFrac);
  float profile = flatBase * anvil;
  float d = base * profile * billow;

  // A tighter band gives cumulus a defined edge instead of a haze gradient.
  d = smoothstep(uCoverage, uCoverage + 0.20, d);

  // Erode, rather than subtract.
  //
  // Subtracting the detail noise thinned the dense core as much as the edges,
  // which rounds everything off. Remapping against it instead eats into the
  // low-density fringe and leaves the core intact, which is what gives cumulus
  // their cauliflower edge — and the erosion strengthens with height so the
  // billowing top is broken up while the flat base stays clean.
  // Kept modest: the remap eats the whole deck long before it looks like
  // cauliflower, because it removes density everywhere the fringe reaches,
  // not only at the silhouette.
  float erosion = detail * mix(0.07, 0.26, heightFrac);
  d = clamp((d - erosion) / max(1.0 - erosion, 0.05), 0.0, 1.0);
  return d;
}

void main(){
  vec4 ndc = vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec4 world = uInvViewProjection * ndc;
  vec3 dir = normalize(world.xyz / world.w - uCameraPos);

  if(dir.y < 0.004){ outColor = vec4(0.0); return; }

  vec3 ro = vec3(uCameraPos.x, max(uCameraPos.y, 1.0), uCameraPos.z);
  float t0 = (CLOUD_BOTTOM - ro.y) / dir.y;
  float t1 = (CLOUD_TOP - ro.y) / dir.y;
  if(t1 < 0.0){ outColor = vec4(0.0); return; }
  t0 = max(t0, 0.0);

  float span = min(t1 - t0, 22000.0);
  int steps = uSteps;
  float dt = span / float(steps);

  float jitter = hash12(gl_FragCoord.xy + fract(uTime) * 37.0);
  float t = t0 + dt * jitter;

  vec3 scattered = vec3(0.0);
  float transmittance = 1.0;
  float mu = dot(dir, uSunDirection);
  float phase = mix(miePhase(mu, 0.62), miePhase(mu, -0.14), 0.35);

  for(int i=0;i<64;i++){
    if(i >= steps || transmittance < 0.02) break;
    vec3 p = ro + dir * t;
    float density = cloudShape(p);
    if(density > 0.001){
      // cheap 3-tap light march toward the sun
      float lightDensity = 0.0;
      for(int j=1;j<=3;j++){
        vec3 lp = p + uSunDirection * (float(j) * 130.0);
        lightDensity += cloudShape(lp) * 130.0;
      }
      float sunTrans = exp(-lightDensity * 0.0022);
      // powder / dark-edge term
      float powder = 1.0 - exp(-density * 6.0);
      // Cloud radiance has to be built from the same scale as the sun that lights
      // the ground, otherwise the deck renders darker than the sky behind it.
      // The constant floor stands in for multiple scattering inside the cloud.
      //
      // Water droplets scatter without a preference for wavelength, so the
      // cloud is lit with the sun's colour pulled most of the way to white —
      // feeding it the warm ground-light tint, with a heavy forward-phase
      // gain on top, sent every bright top through the tonemapper into
      // salmon and stained the entire deck with it.
      float lit = sunTrans * (phase * 1.6 + 0.42) * 0.62 + 0.075;
      vec3 cloudSun = mix(vec3(1.0), uSunColor, 0.3);
      vec3 lightCol = cloudSun * uSunIntensity * lit * mix(0.62, 1.0, powder);
      // Sky bounce into the cloud, weighted by height.
      //
      // A constant term lit the undersides as brightly as the tops, and a
      // cumulus with an evenly lit base is the single clearest tell that it is
      // a noise field rather than weather. Real bases are markedly darker and
      // cooler than the sunlit crowns, because almost nothing reaches them but
      // scattered skylight.
      float hFrac = clamp((p.y - CLOUD_BOTTOM) / (CLOUD_TOP - CLOUD_BOTTOM), 0.0, 1.0);
      lightCol += vec3(0.40, 0.50, 0.74) * mix(0.34, 1.25, hFrac);
      float extinct = exp(-density * dt * 0.0052);
      scattered += transmittance * (1.0 - extinct) * lightCol;
      transmittance *= extinct;
    }
    t += dt;
  }

  // fade the layer out toward the horizon so it never forms a hard band
  float horizonFade = smoothstep(0.004, 0.09, dir.y);
  float alpha = (1.0 - transmittance) * horizonFade;
  outColor = vec4(scattered * horizonFade, alpha);
}
`,Av=`
${Ei}
${nc}

uniform mat4 uInvViewProjection;
uniform mat4 uPrevViewProjection;
uniform vec3 uCameraPos;
uniform sampler2D uClouds;
uniform float uTime;
uniform vec3 uSunColor;

in vec2 vUv;
layout(location = 0) out vec4 outDirect;
layout(location = 1) out vec4 outAmbient;
layout(location = 2) out vec4 outNormal;
layout(location = 3) out vec4 outVelocity;

void main(){
  vec4 ndc = vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec4 world = uInvViewProjection * ndc;
  vec3 dir = normalize(world.xyz / world.w - uCameraPos);

  vec3 sky = atmosphere(dir, uSunDirection);

  // sun disk with limb darkening
  float cosAngle = dot(dir, uSunDirection);
  float sunAngular = 0.9995;
  if(cosAngle > sunAngular){
    float r = sqrt(max(0.0, 1.0 - pow((1.0-cosAngle)/(1.0-sunAngular), 2.0)));
    sky += uSunColor * 92.0 * mix(0.62, 1.0, r);
  }
  sky += uSunColor * pow(max(cosAngle, 0.0), 900.0) * 6.0;

  vec4 clouds = texture(uClouds, vUv);
  sky = sky * (1.0 - clouds.a) + clouds.rgb;

  // ground half-space so looking down past the map edge is not black
  float below = smoothstep(0.02, -0.06, dir.y);
  vec3 groundCol = vec3(0.30, 0.26, 0.20) * (0.35 + max(uSunDirection.y, 0.0) * 0.9);
  sky = mix(sky, groundCol, below);

  outDirect = vec4(sky, 0.0);
  outAmbient = vec4(0.0, 0.0, 0.0, 1.0);
  outNormal = vec4(0.5, 0.5, 1.0, 0.0);

  vec4 prev = uPrevViewProjection * vec4(uCameraPos + dir * 8000.0, 1.0);
  vec2 prevNdc = prev.xy / max(prev.w, 1e-6);
  outVelocity = vec4((ndc.xy - prevNdc) * 0.5, 0.0, 1.0);
}
`,Cv=`
${Ei}
${nc}

uniform vec3 uSunColor;
uniform float uCloudCoverage;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

void main(){
  float phi = (vUv.x * 2.0 - 1.0) * 3.14159265;
  float theta = (1.0 - vUv.y) * 3.14159265;
  vec3 dir = vec3(sin(theta)*sin(phi), cos(theta), sin(theta)*cos(phi));
  vec3 c = atmosphere(dir, uSunDirection);
  // Sunlit cumulus are brighter and far less blue than the sky they cover, so
  // the deck lifts and neutralises the upper hemisphere of the irradiance probe.
  // The lift is deliberately modest: a cloud top is a diffuse reflector, not a
  // second sun, and overstating it flattens every shadow in the scene.
  float up = clamp(dir.y, 0.0, 1.0);
  vec3 cloudCol = uSunColor * uSunIntensity * 0.045 + vec3(0.10, 0.13, 0.19);
  c = mix(c, cloudCol, up * uCloudCoverage * 0.45);
  if(dir.y < 0.0){
    c = vec3(0.30, 0.26, 0.20) * (0.35 + max(uSunDirection.y,0.0)*0.9) * 0.6;
  }
  outColor = vec4(c, 1.0);
}
`,Jn=64,zs=32,Xo={dawn:{azimuth:74,elevation:6.5,intensity:8.5,turbidity:4.4,clouds:.58,tint:[1,.8,.6],ev:-1.25},morning:{azimuth:96,elevation:28,intensity:16,turbidity:3.2,clouds:.5,tint:[1,.94,.86],ev:-.45},day:{azimuth:116,elevation:57,intensity:21,turbidity:2.6,clouds:.52,tint:[1,1,1],ev:0},sunset:{azimuth:252,elevation:7,intensity:9.5,turbidity:5.2,clouds:.62,tint:[1,.72,.46],ev:-1.35},night:{azimuth:288,elevation:34,intensity:.85,turbidity:2,clouds:.4,tint:[.62,.72,1],ev:-2.6}};class Rv{constructor(t,e){this.renderer=t,this.sunDirection=new y(.34,.66,-.67).normalize(),this.sunColor=new re(1,.955,.88),this.sunIntensity=21,this.turbidity=2.6,this.cloudCoverage=.52,this.wind=new It(1,.35),this.cloudShadowOffset=new It,this.sh=[];for(let n=0;n<9;n++)this.sh.push(new y);this.horizonColor=new re,this.zenithColor=new re,this.groundColor=new re,this.averageSky=new re;const i={uSunDirection:{value:this.sunDirection},uSunIntensity:{value:this.sunIntensity},uTurbidity:{value:this.turbidity},uSunColor:{value:new y(1,.955,.88)}};this.shared=i,this.cloudPass=new Ue(Ev,{...i,uInvViewProjection:{value:new Nt},uCameraPos:{value:new y},uTime:{value:0},uCoverage:{value:.52},uSteps:{value:e.cloudSteps},uWind:{value:this.wind}}),this.skyPass=new Ue(Av,{...i,uInvViewProjection:{value:new Nt},uPrevViewProjection:{value:new Nt},uCameraPos:{value:new y},uClouds:{value:null},uTime:{value:0}}),this.skyPass.material.depthTest=!1,this.skyPass.material.depthWrite=!1,this.capturePass=new Ue(Cv,{...i,uCloudCoverage:{value:this.cloudCoverage}}),this.captureTarget=new ye(Jn,zs,{type:1016,format:1023,minFilter:1006,magFilter:1006,depthBuffer:!1}),this._capturePixels=new Uint16Array(Jn*zs*4),this.cloudTarget=null,this._resize(1,1,e)}setQuality(t){this.cloudPass.uniforms.uSteps.value=t.cloudSteps,this._cloudScale=t.cloudSteps>=30?.5:.34}_resize(t,e,i){this._cloudScale=(i?.cloudSteps??30)>=30?.5:.34;const n=Math.max(2,Math.floor(t*this._cloudScale)),s=Math.max(2,Math.floor(e*this._cloudScale));this.cloudTarget&&this.cloudTarget.dispose(),this.cloudTarget=new ye(n,s,{type:1016,format:1023,minFilter:1006,magFilter:1006,depthBuffer:!1}),this.skyPass.uniforms.uClouds.value=this.cloudTarget.texture}resize(t,e,i){this._resize(t,e,i)}setSun(t,e){const i=t*Math.PI/180,n=e*Math.PI/180;this.sunDirection.set(Math.cos(n)*Math.sin(i),Math.sin(n),Math.cos(n)*Math.cos(i)).normalize();const s=Ht.clamp(1-this.sunDirection.y,0,1);this.sunColor.setRGB(1,.965-s*.13,.9-s*.28),this.shared.uSunColor.value.set(this.sunColor.r,this.sunColor.g,this.sunColor.b)}setTimeOfDay(t){const e=Xo[t]||Xo.day;return this.timeOfDay=t in Xo?t:"day",this.sunIntensity=e.intensity,this.turbidity=e.turbidity,this.cloudCoverage=e.clouds,this.shared.uSunIntensity.value=e.intensity,this.shared.uTurbidity.value=e.turbidity,this.exposureBias=e.ev??0,this.setSun(e.azimuth,e.elevation),this.sunColor.setRGB(this.sunColor.r*e.tint[0],this.sunColor.g*e.tint[1],this.sunColor.b*e.tint[2]),this.shared.uSunColor.value.set(this.sunColor.r,this.sunColor.g,this.sunColor.b),this.timeOfDay}update(t,e){this.cloudPass.uniforms.uTime.value=e,this.skyPass.uniforms.uTime.value=e,this.cloudPass.uniforms.uCoverage.value=.52-this.cloudCoverage*.42+Math.sin(e*.006)*.025,this.cloudShadowOffset.x+=this.wind.x*t*.0016,this.cloudShadowOffset.y+=this.wind.y*t*.0016}renderClouds(t,e=!1){this._cloudFrame=(this._cloudFrame??0)+1;const i=this._lastCloudQuat?t.quaternion.angleTo(this._lastCloudQuat)>.012:!0;!e&&!i&&this._cloudFrame&1||(this._lastCloudQuat=(this._lastCloudQuat??t.quaternion.clone()).copy(t.quaternion),this._renderClouds(t))}_renderClouds(t){fr.copy(t.projectionMatrix).multiply(t.matrixWorldInverse).invert(),this.cloudPass.uniforms.uInvViewProjection.value.copy(fr),this.cloudPass.uniforms.uCameraPos.value.copy(t.position),this.cloudPass.render(this.renderer,this.cloudTarget)}renderSky(t,e,i){fr.copy(t.projectionMatrix).multiply(t.matrixWorldInverse).invert(),this.skyPass.uniforms.uInvViewProjection.value.copy(fr),this.skyPass.uniforms.uPrevViewProjection.value.copy(e),this.skyPass.uniforms.uCameraPos.value.copy(t.position),this.skyPass.render(this.renderer,i)}bake(){const t=this.renderer;this.capturePass.uniforms.uCloudCoverage.value=this.cloudCoverage;const e=t.getRenderTarget();this.capturePass.render(t,this.captureTarget),t.readRenderTargetPixels(this.captureTarget,0,0,Jn,zs,this._capturePixels),t.setRenderTarget(e);for(let p=0;p<9;p++)this.sh[p].set(0,0,0);let i=0,n=0,s=0,r=0,o=0,l=0,c=0,h=0,u=0,d=0,g=0,m=0;for(let p=0;p<zs;p++){const S=(1-(p+.5)/zs)*Math.PI,x=Math.sin(S),_=2*Math.PI/Jn*(Math.PI/zs)*x;for(let M=0;M<Jn;M++){const E=((M+.5)/Jn*2-1)*Math.PI,R=x*Math.sin(E),w=Math.cos(S),b=x*Math.cos(E),L=(p*Jn+M)*4,P=Ko(this._capturePixels[L]),B=Ko(this._capturePixels[L+1]),k=Ko(this._capturePixels[L+2]);Pv(this.sh,R,w,b,P,B,k,_),i+=_,n+=P*_,s+=B*_,r+=k*_,w>-.12&&w<.12&&(o+=P,l+=B,c+=k,h++),w>.85&&(u+=P,d+=B,g+=k,m++)}}const v=1/Math.max(i,1e-6);return this.averageSky.setRGB(n*v,s*v,r*v),h&&this.horizonColor.setRGB(o/h,l/h,c/h),m&&this.zenithColor.setRGB(u/m,d/m,g/m),this.groundColor.copy(this.averageSky).multiplyScalar(.34),this.groundColor.r*=1.18,this.groundColor.g*=1.02,this.groundColor.b*=.78,this}dispose(){this.cloudPass.dispose(),this.skyPass.dispose(),this.capturePass.dispose(),this.cloudTarget?.dispose(),this.captureTarget.dispose()}}function Pv(a,t,e,i,n,s,r,o){const l=[.282095,.488603*e,.488603*i,.488603*t,1.092548*t*e,1.092548*e*i,.315392*(3*i*i-1),1.092548*t*i,.546274*(t*t-e*e)];for(let c=0;c<9;c++){const h=l[c]*o;a[c].x+=n*h,a[c].y+=s*h,a[c].z+=r*h}}function Ko(a){const t=(a&32768)>>15,e=(a&31744)>>10,i=a&1023;let n;return e===0?n=i/1024*Math.pow(2,-14):e===31?n=i?NaN:1/0:n=(1+i/1024)*Math.pow(2,e-15),t?-n:n}const fr=new Nt,xi=33;function Lv(){const a=new Uint8Array(xi*xi*xi*4);let t=0;for(let i=0;i<xi;i++)for(let n=0;n<xi;n++)for(let s=0;s<xi;s++){let r=s/(xi-1),o=n/(xi-1),l=i/(xi-1);const c=[.006,.008,.016],h=[1.012,1,.976];r=(r+c[0]*(1-r))*h[0],o=(o+c[1]*(1-o))*h[1],l=(l+c[2]*(1-l))*h[2];const u=.44,d=1.08;r=Yo(r,u,d),o=Yo(o,u,d),l=Yo(l,u,d);const g=.2126*r+.7152*o+.0722*l,m=$o(.35,.95,g);r+=m*.012,l-=m*.014;const v=1-$o(0,.35,g);l+=v*.018,r-=v*.006;const p=1.06-$o(.72,1,g)*.28;r=g+(r-g)*p,o=g+(o-g)*p,l=g+(l-g)*p,a[t++]=jo(r),a[t++]=jo(o),a[t++]=jo(l),a[t++]=255}const e=new ku(a,xi,xi,xi);return e.format=1023,e.type=1009,e.minFilter=1006,e.magFilter=1006,e.wrapS=1001,e.wrapT=1001,e.wrapR=1001,e.unpackAlignment=1,e.needsUpdate=!0,{texture:e,size:xi}}function Yo(a,t,e){const i=a-t;return t+i*e+i*i*i*.12}function $o(a,t,e){const i=Math.min(1,Math.max(0,(e-a)/(t-a)));return i*i*(3-2*i)}function jo(a){return Math.max(0,Math.min(255,Math.round(a*255)))}const id=`
uniform vec2 uProjParams;   // x: near, y: far
uniform mat4 uInvProjection;
uniform mat4 uProjection;
uniform vec2 uTexelSize;

float linearizeDepth(float d){
  float z = d * 2.0 - 1.0;
  return (2.0 * uProjParams.x * uProjParams.y) / (uProjParams.y + uProjParams.x - z * (uProjParams.y - uProjParams.x));
}

vec3 viewPosFromDepth(vec2 uv, float rawDepth){
  vec4 ndc = vec4(uv * 2.0 - 1.0, rawDepth * 2.0 - 1.0, 1.0);
  vec4 v = uInvProjection * ndc;
  return v.xyz / v.w;
}
`,Dv=`
uniform sampler2D uDirect;
uniform sampler2D uAmbient;
uniform sampler2D uAO;
uniform float uAOStrength;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

void main(){
  vec4 d = texture(uDirect, vUv);
  vec4 a = texture(uAmbient, vUv);
  float ao = texture(uAO, vUv).r;
  ao = mix(1.0, ao, uAOStrength);
  // AO only attenuates indirect light; direct sun keeps its contact definition
  vec3 c = d.rgb + a.rgb * ao;
  outColor = vec4(c, d.a);
}
`,Iv=`
${Ei}
${ec}
${id}

uniform sampler2D uDepth;
uniform sampler2D uNormal;
uniform sampler2D uVelocity;
uniform mat3 viewMatrix3;   // world -> view rotation
uniform float uRadius;
uniform float uIntensity;
uniform int uSamples;
uniform float uFrameIndex;
in vec2 vUv;
layout(location = 0) out vec4 outAO;

const float PI = 3.14159265;

void main(){
  float rawDepth = texture(uDepth, vUv).r;
  if(rawDepth >= 0.99999){ outAO = vec4(1.0, 1.0, 0.0, 1.0); return; }

  vec3 P = viewPosFromDepth(vUv, rawDepth);
  vec4 nrm = texture(uNormal, vUv);
  vec3 Nw = octDecode(nrm.rg);
  vec3 N = normalize((viewMatrix3 * Nw));
  vec3 V = normalize(-P);

  // Screen-space radius from the world radius at this depth.
  float projScale = uProjection[1][1] * 0.5;
  float radiusPixels = uRadius * projScale / max(-P.z, 0.05);
  radiusPixels = clamp(radiusPixels, 3.0 * uTexelSize.y, 0.12);

  // rotating pattern: spatial hash x temporal golden-ratio offset
  float noise = hash12(gl_FragCoord.xy + uFrameIndex * 13.7);
  float rotation = noise * PI * 2.0;
  float offset = fract(noise + uFrameIndex * 0.6180339887);

  // Horizon-based occlusion: per direction find the largest elevation angle
  // above the tangent plane, then integrate the uncovered hemisphere.
  float occlusion = 0.0;
  int directions = uSamples;
  int steps = 4;
  float invDir = 1.0 / float(directions);
  float bias = 0.12;
  float aspect = uTexelSize.y / uTexelSize.x;

  for(int d=0; d<12; d++){
    if(d >= directions) break;
    float angle = float(d) * PI * 2.0 * invDir + rotation;
    vec2 dir = vec2(cos(angle) / aspect, sin(angle));

    float tangentSin = -bias;
    float highestSin = tangentSin;
    float dirOcclusion = 0.0;

    for(int s=1; s<=8; s++){
      if(s > steps) break;
      float stepFrac = (float(s) - 1.0 + offset) / float(steps);
      vec2 uvS = vUv + dir * radiusPixels * stepFrac;
      if(uvS.x <= 0.0 || uvS.x >= 1.0 || uvS.y <= 0.0 || uvS.y >= 1.0) continue;
      float dep = texture(uDepth, uvS).r;
      if(dep >= 0.99999) continue;

      vec3 S = viewPosFromDepth(uvS, dep) - P;
      float len = length(S);
      if(len < 1e-4 || len > uRadius * 2.2) continue;
      float sinH = dot(S / len, N);
      if(sinH > highestSin){
        float falloff = 1.0 - clamp(len / (uRadius * 2.0), 0.0, 1.0);
        falloff *= falloff;
        dirOcclusion += (sinH - highestSin) * falloff;
        highestSin = sinH;
      }
    }
    occlusion += dirOcclusion;
  }

  float visibility = clamp(1.0 - occlusion * invDir * uIntensity, 0.0, 1.0);
  visibility = pow(visibility, 1.35);

  // suppress AO where the surface is moving fast (avoids smearing)
  vec2 vel = texture(uVelocity, vUv).rg;
  float velLen = length(vel) * 60.0;
  visibility = mix(visibility, 1.0, clamp(velLen*0.6, 0.0, 0.55));

  outAO = vec4(visibility, -P.z, 0.0, 1.0);
}
`,Fv=`
uniform sampler2D uAO;
uniform vec2 uDirection;
uniform vec2 uTexelSize;
in vec2 vUv;
layout(location = 0) out vec4 outAO;

void main(){
  vec4 c = texture(uAO, vUv);
  float centerDepth = c.g;
  float sum = c.r;
  float wsum = 1.0;
  for(int i=1;i<=4;i++){
    float w = exp(-float(i*i) * 0.16);
    vec2 o = uDirection * uTexelSize * float(i);
    vec4 a = texture(uAO, vUv + o);
    vec4 b = texture(uAO, vUv - o);
    float wa = w * exp(-abs(a.g - centerDepth) * 4.0);
    float wb = w * exp(-abs(b.g - centerDepth) * 4.0);
    sum += a.r*wa + b.r*wb;
    wsum += wa + wb;
  }
  outAO = vec4(sum/wsum, centerDepth, 0.0, 1.0);
}
`,Uv=`
uniform sampler2D uAO;
uniform sampler2D uHistory;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
in vec2 vUv;
layout(location = 0) out vec4 outAO;

void main(){
  vec4 cur = texture(uAO, vUv);
  vec2 vel = texture(uVelocity, vUv).rg;
  vec2 prevUv = vUv - vel;
  if(prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0){
    outAO = cur; return;
  }
  vec4 hist = texture(uHistory, prevUv);
  float depthDiff = abs(hist.g - cur.g) / max(cur.g, 0.1);
  float trust = exp(-depthDiff * 12.0) * (1.0 - clamp(length(vel)*40.0, 0.0, 1.0));

  // neighbourhood clamp keeps the history from leaking across silhouettes
  float mn = 1.0, mx = 0.0;
  for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
    float s = texture(uAO, vUv + vec2(float(x),float(y))*uTexelSize).r;
    mn = min(mn, s); mx = max(mx, s);
  }
  float h = clamp(hist.r, mn - 0.06, mx + 0.06);
  outAO = vec4(mix(cur.r, h, 0.86 * trust), cur.g, 0.0, 1.0);
}
`,Bv=`
${Ei}
uniform sampler2D uCurrent;
uniform sampler2D uHistory;
uniform sampler2D uVelocity;
uniform sampler2D uDepth;
uniform vec2 uTexelSize;
uniform float uBlend;
uniform float uFirstFrame;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

vec3 rgb2ycocg(vec3 c){
  return vec3(0.25*c.r + 0.5*c.g + 0.25*c.b, 0.5*c.r - 0.5*c.b, -0.25*c.r + 0.5*c.g - 0.25*c.b);
}
vec3 ycocg2rgb(vec3 c){
  return vec3(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z);
}

void main(){
  vec4 cur = texture(uCurrent, vUv);
  if(uFirstFrame > 0.5){ outColor = cur; return; }

  // closest-depth velocity dilation removes velocity gaps on silhouettes
  vec2 bestUv = vUv;
  float bestDepth = 1.0;
  for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
    vec2 uv = vUv + vec2(float(x),float(y))*uTexelSize;
    float d = texture(uDepth, uv).r;
    if(d < bestDepth){ bestDepth = d; bestUv = uv; }
  }
  vec2 vel = texture(uVelocity, bestUv).rg;
  vec2 prevUv = vUv - vel;

  if(prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0){
    outColor = cur; return;
  }

  // 3x3 variance clipping in YCoCg
  vec3 m1 = vec3(0.0), m2 = vec3(0.0);
  vec3 minC = vec3(1e9), maxC = vec3(-1e9);
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec3 s = rgb2ycocg(texture(uCurrent, vUv + vec2(float(x),float(y))*uTexelSize).rgb);
      m1 += s; m2 += s*s;
      minC = min(minC, s); maxC = max(maxC, s);
    }
  }
  vec3 mean = m1/9.0;
  vec3 sigma = sqrt(max(m2/9.0 - mean*mean, 0.0));
  float gamma = 1.35;
  vec3 lo = max(mean - gamma*sigma, minC);
  vec3 hi = min(mean + gamma*sigma, maxC);

  vec4 histSample = texture(uHistory, prevUv);
  vec3 hist = rgb2ycocg(histSample.rgb);
  vec3 clipped = clamp(hist, lo, hi);
  float clipAmount = length(clipped - hist);

  float reactive = cur.a;
  float velLen = length(vel / uTexelSize);
  float blend = uBlend;
  blend *= 1.0 - clamp(reactive, 0.0, 1.0);              // particles/flash keep the current frame
  // Fast pixels trust history less — and a flick has to be able to drop it
  // almost entirely. This capped at 0.6, so whipping the view left and right
  // still mixed 36% of a stale frame into every pixel, and the whole image
  // dragged behind the turn. That reads as the camera lagging rather than as
  // antialiasing. A turn moves hundreds of pixels per frame, so the ramp is
  // steeper too: by ~35px/frame the history is essentially gone.
  blend *= 1.0 - clamp(velLen * 0.028, 0.0, 0.97);
  blend *= 1.0 - clamp(clipAmount * 2.2, 0.0, 0.75);      // disocclusion

  vec3 result = mix(rgb2ycocg(cur.rgb), clipped, blend);
  outColor = vec4(max(ycocg2rgb(result), vec3(0.0)), cur.a);
}
`,Nv=`
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
uniform int uTileSize;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){
  vec2 best = vec2(0.0);
  float bestLen = 0.0;
  for(int y=0;y<16;y++){
    if(y >= uTileSize) break;
    for(int x=0;x<16;x++){
      if(x >= uTileSize) break;
      vec2 uv = vUv + (vec2(float(x), float(y)) - float(uTileSize)*0.5) * uTexelSize;
      vec2 v = texture(uVelocity, uv).rg;
      float l = dot(v,v);
      if(l > bestLen){ bestLen = l; best = v; }
    }
  }
  outColor = vec4(best, 0.0, 1.0);
}
`,Ov=`
uniform sampler2D uTiles;
uniform vec2 uTexelSize;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){
  vec2 best = vec2(0.0);
  float bestLen = 0.0;
  for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
    vec2 v = texture(uTiles, vUv + vec2(float(x),float(y))*uTexelSize).rg;
    float l = dot(v,v);
    if(l > bestLen){ bestLen = l; best = v; }
  }
  outColor = vec4(best, 0.0, 1.0);
}
`,kv=`
${Ei}
${id}
uniform sampler2D uColor;
uniform sampler2D uVelocity;
uniform sampler2D uNeighborMax;
uniform sampler2D uDepth;
uniform float uStrength;
uniform int uSamples;
uniform float uFrameIndex;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

// Longest streak any pixel may draw, as a fraction of the frame. Without a
// ceiling the blur length is whatever the velocity buffer says, and a fast
// sprint past near geometry produces vectors long enough to drag one part of
// the image across another — the frame reads as torn rather than blurred.
//
// Halved from 0.022, which was 42 pixels of streak at 1080p. Camera rotation
// is the worst case and the most objectionable, because it is continuous and
// player-driven: flicking the view left and right smeared the entire frame,
// which reads as the picture breaking rather than as motion.
const float MAX_BLUR = 0.011;

vec2 capBlur(vec2 v){
  float len = length(v);
  return len > MAX_BLUR ? v * (MAX_BLUR / len) : v;
}

void main(){
  vec4 center = texture(uColor, vUv);
  vec2 nMax = capBlur(texture(uNeighborMax, vUv).rg * uStrength);
  float nLen = length(nMax / uTexelSize);
  if(nLen < 1.2){ outColor = center; return; }

  vec2 vel = capBlur(texture(uVelocity, vUv).rg * uStrength);
  float centerDepth = linearizeDepth(texture(uDepth, vUv).r);
  float jitter = hash12(gl_FragCoord.xy + uFrameIndex*7.3) - 0.5;

  vec3 sum = center.rgb;
  float weight = 1.0;
  int samples = uSamples;
  for(int i=1;i<=16;i++){
    if(i > samples) break;
    float t = (float(i) + jitter) / float(samples);
    vec2 offA = mix(vel, nMax, 0.65) * (t - 0.5) * 2.0;
    vec2 uvA = vUv + offA;
    if(uvA.x < 0.0 || uvA.x > 1.0 || uvA.y < 0.0 || uvA.y > 1.0) continue;
    float dA = linearizeDepth(texture(uDepth, uvA).r);
    // depth-aware: only let closer-or-similar samples bleed in
    float w = (dA < centerDepth + 0.6) ? 1.0 : 0.25;
    w *= 1.0 - t*0.35;
    sum += texture(uColor, uvA).rgb * w;
    weight += w;
  }
  outColor = vec4(sum/weight, center.a);
}
`,zv=`
uniform sampler2D uColor;
uniform sampler2D uExposure;
uniform float uThreshold;
uniform float uSoftKnee;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){
  vec3 c = texture(uColor, vUv).rgb;
  float ev = texture(uExposure, vec2(0.5)).r;
  c *= ev;
  float br = max(c.r, max(c.g, c.b));
  float knee = uThreshold * uSoftKnee + 1e-5;
  float soft = clamp(br - uThreshold + knee, 0.0, 2.0*knee);
  soft = soft*soft/(4.0*knee);
  float contrib = max(soft, br - uThreshold) / max(br, 1e-5);
  outColor = vec4(c * contrib, 1.0);
}
`,Vv=`
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uKaris;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

float karisWeight(vec3 c){ return 1.0 / (1.0 + max(c.r, max(c.g, c.b))); }

void main(){
  vec2 t = uTexelSize;
  vec3 a = texture(uSource, vUv + vec2(-2,-2)*t).rgb;
  vec3 b = texture(uSource, vUv + vec2( 0,-2)*t).rgb;
  vec3 c = texture(uSource, vUv + vec2( 2,-2)*t).rgb;
  vec3 d = texture(uSource, vUv + vec2(-2, 0)*t).rgb;
  vec3 e = texture(uSource, vUv).rgb;
  vec3 f = texture(uSource, vUv + vec2( 2, 0)*t).rgb;
  vec3 g = texture(uSource, vUv + vec2(-2, 2)*t).rgb;
  vec3 h = texture(uSource, vUv + vec2( 0, 2)*t).rgb;
  vec3 i = texture(uSource, vUv + vec2( 2, 2)*t).rgb;
  vec3 j = texture(uSource, vUv + vec2(-1,-1)*t).rgb;
  vec3 k = texture(uSource, vUv + vec2( 1,-1)*t).rgb;
  vec3 l = texture(uSource, vUv + vec2(-1, 1)*t).rgb;
  vec3 m = texture(uSource, vUv + vec2( 1, 1)*t).rgb;

  vec3 g0 = (j+k+l+m) * 0.25;
  vec3 g1 = (a+b+d+e) * 0.25;
  vec3 g2 = (b+c+e+f) * 0.25;
  vec3 g3 = (d+e+g+h) * 0.25;
  vec3 g4 = (e+f+h+i) * 0.25;

  vec3 result;
  if(uKaris > 0.5){
    float w0 = karisWeight(g0)*0.5, w1 = karisWeight(g1)*0.125;
    float w2 = karisWeight(g2)*0.125, w3 = karisWeight(g3)*0.125, w4 = karisWeight(g4)*0.125;
    float wsum = w0+w1+w2+w3+w4;
    result = (g0*w0 + g1*w1 + g2*w2 + g3*w3 + g4*w4) / max(wsum, 1e-5);
  } else {
    result = g0*0.5 + (g1+g2+g3+g4)*0.125;
  }
  outColor = vec4(result, 1.0);
}
`,Hv=`
uniform sampler2D uSource;
uniform sampler2D uPrevious;
uniform vec2 uTexelSize;
uniform float uRadius;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){
  vec2 t = uTexelSize * uRadius;
  vec3 s = texture(uSource, vUv + vec2(-1,-1)*t).rgb * 1.0;
  s += texture(uSource, vUv + vec2( 0,-1)*t).rgb * 2.0;
  s += texture(uSource, vUv + vec2( 1,-1)*t).rgb * 1.0;
  s += texture(uSource, vUv + vec2(-1, 0)*t).rgb * 2.0;
  s += texture(uSource, vUv).rgb * 4.0;
  s += texture(uSource, vUv + vec2( 1, 0)*t).rgb * 2.0;
  s += texture(uSource, vUv + vec2(-1, 1)*t).rgb * 1.0;
  s += texture(uSource, vUv + vec2( 0, 1)*t).rgb * 2.0;
  s += texture(uSource, vUv + vec2( 1, 1)*t).rgb * 1.0;
  s /= 16.0;
  outColor = vec4(s + texture(uPrevious, vUv).rgb, 1.0);
}
`,Gv=`
uniform sampler2D uColor;
uniform vec2 uTexelSize;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){
  vec3 c = vec3(0.0);
  c += texture(uColor, vUv + vec2(-0.5,-0.5)*uTexelSize).rgb;
  c += texture(uColor, vUv + vec2( 0.5,-0.5)*uTexelSize).rgb;
  c += texture(uColor, vUv + vec2(-0.5, 0.5)*uTexelSize).rgb;
  c += texture(uColor, vUv + vec2( 0.5, 0.5)*uTexelSize).rgb;
  c *= 0.25;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  outColor = vec4(log2(max(l, 1e-4)), l, 0.0, 1.0);
}
`,Wv=`
uniform sampler2D uSource;
uniform vec2 uTexelSize;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){
  vec4 c = texture(uSource, vUv + vec2(-0.5,-0.5)*uTexelSize);
  c += texture(uSource, vUv + vec2( 0.5,-0.5)*uTexelSize);
  c += texture(uSource, vUv + vec2(-0.5, 0.5)*uTexelSize);
  c += texture(uSource, vUv + vec2( 0.5, 0.5)*uTexelSize);
  outColor = c * 0.25;
}
`,qv=`
uniform sampler2D uLuminance;
uniform sampler2D uPrevExposure;
uniform float uDeltaTime;
uniform float uBrightenSpeed;
uniform float uDarkenSpeed;
uniform float uCompensation;
uniform float uMinEV;
uniform float uMaxEV;
uniform float uReset;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

void main(){
  float logL = texture(uLuminance, vec2(0.5)).r;
  float avgL = exp2(logL);
  // Scene radiance is normalised so a fully sunlit white surface sits near 1.0.
  //
  // The key is what the average of the frame is mapped to. 18% is the textbook
  // answer and it is the wrong one here: this scene is a sunlit desert street,
  // so the average IS the sunlit ground, and keying it to middle grey made
  // sunlit sand render at middle grey. Measured, it landed around 118 sRGB
  // with nothing in the whole frame above 196 — no highlight anywhere, and a
  // midday street that photographed like an overcast afternoon. A bright scene
  // should key bright; AgX has the shoulder to take it.
  float ev = log2(max(avgL, 1e-5) / 0.38);
  ev = clamp(ev - uCompensation, uMinEV, uMaxEV);
  float targetExposure = exp2(-ev);

  float prev = texture(uPrevExposure, vec2(0.5)).r;
  if(uReset > 0.5 || prev <= 0.0){ outColor = vec4(targetExposure, ev, 0.0, 1.0); return; }

  float speed = targetExposure > prev ? uBrightenSpeed : uDarkenSpeed;
  float adapted = prev + (targetExposure - prev) * (1.0 - exp(-uDeltaTime * speed));
  outColor = vec4(adapted, ev, 0.0, 1.0);
}
`,Xv=`
${Ei}
uniform sampler2D uColor;
uniform sampler2D uBloom;
uniform sampler2D uExposure;
uniform sampler3D uLut;
uniform vec2 uResolution;
uniform float uTime;
uniform float uBloomStrength;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uSharpen;
uniform float uLutSize;
uniform float uDamageFlash;
uniform vec2 uDamageDir;
uniform float uCriticalHealth;
uniform float uExposureOverride;
uniform float uLensDirt;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

// AgX — Troy Sobotka's curve, log-encoded rotation + sigmoid + inverse rotation.
const mat3 AGX_IN = mat3(
  0.8424790, 0.0784336, 0.0792237,
  0.0423282, 0.8784686, 0.0791661,
  0.0423756, 0.0784336, 0.8791430
);
const mat3 AGX_OUT = mat3(
   1.1968790, -0.0980210, -0.0990297,
  -0.0528968,  1.1519107, -0.0989636,
  -0.0529716, -0.0980434,  1.1508920
);

vec3 agxDefaultContrast(vec3 x){
  vec3 x2 = x*x;
  vec3 x4 = x2*x2;
  return + 15.5*x4*x2 - 40.14*x4*x + 31.96*x4 - 6.868*x2*x + 0.4298*x2 + 0.1191*x - 0.00232;
}

vec3 agx(vec3 col){
  const float minEv = -12.47393;
  const float maxEv = 4.026069;
  col = AGX_IN * col;
  col = clamp(log2(max(col, 1e-10)), minEv, maxEv);
  col = (col - minEv) / (maxEv - minEv);
  col = agxDefaultContrast(col);
  // slight look: lift saturation back after the sigmoid flattens it
  col = AGX_OUT * col;
  float l = luma(col);
  col = mix(vec3(l), col, 1.06);
  return clamp(col, 0.0, 1.0);
}

void main(){
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float r2 = dot(centered, centered);

  float exposure = texture(uExposure, vec2(0.5)).r;
  if(uExposureOverride > 0.0) exposure = uExposureOverride;

  // Chromatic separation grows toward the frame edge — and only there.
  //
  // The constant term meant every pixel got separation, including the middle
  // of the frame, which is not something a lens does. On thin high-contrast
  // geometry at the sample rate — window grilles, railings, awning posts — it
  // pushed alternating bars to fully saturated red and blue, so a barred
  // window read as candy stripes rather than as dark metal. Quadratic from
  // zero at the centre, and weaker overall.
  // Halved again, and the offset is capped: at 0.020 the extreme corner still
  // separated the channels by over two pixels, which on one-pixel geometry —
  // window grilles, power lines, antennas — resolves as fully saturated orange
  // and cyan pixels rather than as a fringe on dark metal. A lens fringe you
  // can name the colour of is too strong.
  vec3 hdr;
  float ca = min(uChromatic * r2 * r2 * 0.010, 0.00035);
  if(ca > 1e-5){
    hdr.r = texture(uColor, uv + centered * ca).r;
    hdr.g = texture(uColor, uv).g;
    hdr.b = texture(uColor, uv - centered * ca).b;
  } else {
    hdr = texture(uColor, uv).rgb;
  }

  if(uSharpen > 0.001){
    vec2 t = 1.0/uResolution;
    vec3 blur = texture(uColor, uv + vec2(t.x,0)).rgb + texture(uColor, uv - vec2(t.x,0)).rgb
              + texture(uColor, uv + vec2(0,t.y)).rgb + texture(uColor, uv - vec2(0,t.y)).rgb;
    hdr += (hdr - blur*0.25) * uSharpen;
    hdr = max(hdr, vec3(0.0));
  }

  vec3 bloom = texture(uBloom, uv).rgb;
  float dirt = 0.55 + 0.45 * fbm(uv * vec2(7.0, 4.0), 3, 0.6);
  hdr = hdr * exposure + bloom * uBloomStrength * mix(1.0, dirt, uLensDirt);

  vec3 col = agx(hdr);

  // 33^3 procedural grading LUT
  float scale = (uLutSize - 1.0) / uLutSize;
  float offset = 1.0 / (2.0 * uLutSize);
  col = texture(uLut, clamp(col, 0.0, 1.0) * scale + offset).rgb;

  // critical health: desaturate + redden the periphery, keep the centre readable
  if(uCriticalHealth > 0.001){
    float edge = smoothstep(0.05, 0.42, r2);
    float l = luma(col);
    col = mix(col, vec3(l), uCriticalHealth * 0.55 * mix(0.4, 1.0, edge));
    col = mix(col, col * vec3(1.25, 0.42, 0.38), uCriticalHealth * edge * 0.85);
    col *= 1.0 - uCriticalHealth * edge * 0.35;
  }

  // directional damage flash
  if(uDamageFlash > 0.001){
    float d = dot(normalize(centered + vec2(1e-5)), uDamageDir);
    float arc = smoothstep(0.1, 1.0, d) * smoothstep(0.02, 0.3, r2);
    col = mix(col, vec3(0.78, 0.09, 0.07), clamp(uDamageFlash * (0.25 + arc*0.9), 0.0, 0.85));
  }

  float vig = 1.0 - uVignette * smoothstep(0.12, 0.78, r2);
  col *= vig;

  if(uGrain > 0.001){
    float n = hash12(gl_FragCoord.xy + fract(uTime)*311.7) - 0.5;
    col += n * uGrain * 0.035 * (1.0 - luma(col)*0.6);
  }

  // Output dither, immediately before the 8-bit write.
  //
  // The sky is a slow gradient across nine hundred pixels, so quantising it to
  // 8 bits laid down 40-60 pixel plateaus of a single value with 1-LSB steps
  // between them: visible banding across the whole upper field. Grain hides it
  // only when grain is on, and it is a setting. A triangular-PDF dither of one
  // LSB is the standard fix — the difference of two uniform samples gives the
  // triangular distribution, which decorrelates the error from the signal
  // instead of just adding noise to it. Below perception on its own, and TAA
  // averages what little is left.
  float d1 = hash12(gl_FragCoord.xy + fract(uTime) * 173.3);
  float d2 = hash12(gl_FragCoord.xy + 57.31 + fract(uTime) * 419.7);
  col += (d1 - d2) / 255.0;

  outColor = vec4(max(col, vec3(0.0)), 1.0);
}
`,Kv=`
${ec}
uniform sampler2D uColor;
uniform sampler2D uNormal;
uniform sampler2D uVelocity;
uniform sampler2D uAO;
uniform sampler2D uDepth;
uniform sampler2D uDirect;
uniform sampler2D uAmbient;
uniform sampler2D uBloom;
uniform highp sampler2DArray uShadowMap;
uniform int uMode;
uniform float uCascadeCount;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

void main(){
  vec3 c = vec3(0.0);
  if(uMode == 1){ c = octDecode(texture(uNormal, vUv).rg)*0.5+0.5; }
  else if(uMode == 2){ vec2 v = texture(uVelocity, vUv).rg; c = vec3(abs(v)*40.0, 0.0); }
  else if(uMode == 3){ c = vec3(texture(uAO, vUv).r); }
  else if(uMode == 4){ float d = texture(uDepth, vUv).r; c = vec3(pow(d, 40.0)); }
  else if(uMode == 5){ c = texture(uDirect, vUv).rgb; }
  else if(uMode == 6){ c = texture(uAmbient, vUv).rgb; }
  else if(uMode == 7){ c = texture(uBloom, vUv).rgb; }
  else if(uMode == 8){
    vec2 uv = fract(vUv * 2.0);
    float idx = floor(vUv.x*2.0) + floor(vUv.y*2.0)*2.0;
    c = vec3(texture(uShadowMap, vec3(uv, min(idx, uCascadeCount-1.0))).r);
    c = pow(c, vec3(24.0));
  }
  else if(uMode == 9){ c = vec3(texture(uNormal, vUv).b); }
  else { c = texture(uColor, vUv).rgb; }
  outColor = vec4(c, 1.0);
}
`,Yv=`
uniform sampler2D uSource;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
void main(){ outColor = texture(uSource, vUv); }
`,Vl=[];for(let a=1;a<=8;a++)Vl.push([oh(a,2)-.5,oh(a,3)-.5]);function oh(a,t){let e=1,i=0,n=a;for(;n>0;)e/=t,i+=e*(n%t),n=Math.floor(n/t);return i}const Vs=6,lh=-.9,$v=-2.5,jv=6.5,Zo=12,Zv=.46;class Jv{constructor(t,e){this.renderer=t,this.quality=e,this.width=1,this.height=1,this.renderWidth=1,this.renderHeight=1,this.renderScale=e.renderScale,this.frameIndex=0,this.debugView=0,this.stats={drawCalls:0,triangles:0},this.shadows=new Tv(t,{resolution:e.shadowResolution,cascades:e.shadowCascades}),this.sky=new Rv(t,e),this.prevViewProjection=new Nt,this.currViewProjection=new Nt,this.vmPrevViewProjection=new Nt,this.vmCurrViewProjection=new Nt,this._vmHistoryValid=!1,this.jitter=new be,this.lut=Lv(),this.lightUniforms={uSunDirection:{value:this.sky.sunDirection},uSunColor:{value:new y(1,1,1)},uSkySH:{value:Array.from({length:9},()=>new y)},uHorizonColor:{value:new y(.6,.7,.85)},uZenithColor:{value:new y(.25,.45,.85)},uGroundColor:{value:new y(.25,.22,.18)},uCloudShadowStrength:{value:.45},uCloudShadowOffset:{value:this.sky.cloudShadowOffset},uTime:{value:0},uShadowMap:{value:this.shadows.target.texture},uCascadeMatrix:{value:this.shadows.matrices},uCascadeSplits:{value:this.shadows.splits},uShadowTexel:{value:1/e.shadowResolution},uCascadeCount:{value:e.shadowCascades},uShadowStrength:{value:1},uPointLights:{value:Array.from({length:8},()=>new be)},uPointColors:{value:Array.from({length:8},()=>new be)},uPointLightCount:{value:0},uFogColor:{value:new y(.72,.76,.82)},uFogDensity:{value:9e-4},uCameraPos:{value:new y},uPrevViewProjection:{value:this.prevViewProjection},uJitter:{value:this.jitter}},this._buildPasses(),this._pointLightPool=[]}_buildPasses(){this.renderer,this.combinePass=new Ue(Dv,{uDirect:{value:null},uAmbient:{value:null},uAO:{value:null},uAOStrength:{value:1}}),this.gtaoPass=new Ue(Iv,{uDepth:{value:null},uNormal:{value:null},uVelocity:{value:null},viewMatrix3:{value:new qt},uRadius:{value:.9},uIntensity:{value:1.9},uSamples:{value:this.quality.aoSamples},uFrameIndex:{value:0},uProjParams:{value:new It(.05,500)},uInvProjection:{value:new Nt},uProjection:{value:new Nt},uTexelSize:{value:new It}}),this.aoBlurPass=new Ue(Fv,{uAO:{value:null},uDirection:{value:new It(1,0)},uTexelSize:{value:new It}}),this.aoTemporalPass=new Ue(Uv,{uAO:{value:null},uHistory:{value:null},uVelocity:{value:null},uTexelSize:{value:new It}}),this.taaPass=new Ue(Bv,{uCurrent:{value:null},uHistory:{value:null},uVelocity:{value:null},uDepth:{value:null},uTexelSize:{value:new It},uBlend:{value:.9},uFirstFrame:{value:1}}),this.tileMaxPass=new Ue(Nv,{uVelocity:{value:null},uTexelSize:{value:new It},uTileSize:{value:Zo}}),this.tileDilatePass=new Ue(Ov,{uTiles:{value:null},uTexelSize:{value:new It}}),this.motionBlurPass=new Ue(kv,{uColor:{value:null},uVelocity:{value:null},uNeighborMax:{value:null},uDepth:{value:null},uStrength:{value:1},uSamples:{value:8},uFrameIndex:{value:0},uProjParams:{value:new It(.05,500)},uInvProjection:{value:new Nt},uProjection:{value:new Nt},uTexelSize:{value:new It}}),this.bloomPrefilterPass=new Ue(zv,{uColor:{value:null},uExposure:{value:null},uThreshold:{value:1.05},uSoftKnee:{value:.6}}),this.bloomDownPass=new Ue(Vv,{uSource:{value:null},uTexelSize:{value:new It},uKaris:{value:1}}),this.bloomUpPass=new Ue(Hv,{uSource:{value:null},uPrevious:{value:null},uTexelSize:{value:new It},uRadius:{value:1.15}}),this.luminancePass=new Ue(Gv,{uColor:{value:null},uTexelSize:{value:new It}}),this.luminanceDownPass=new Ue(Wv,{uSource:{value:null},uTexelSize:{value:new It}}),this.exposurePass=new Ue(qv,{uLuminance:{value:null},uPrevExposure:{value:null},uDeltaTime:{value:.016},uBrightenSpeed:{value:2.6},uDarkenSpeed:{value:1.1},uCompensation:{value:lh},uMinEV:{value:-2.5},uMaxEV:{value:6.5},uReset:{value:1}}),this.compositePass=new Ue(Xv,{uColor:{value:null},uBloom:{value:null},uExposure:{value:null},uLut:{value:this.lut.texture},uResolution:{value:new It},uTime:{value:0},uBloomStrength:{value:.05},uVignette:{value:.5},uGrain:{value:.35},uChromatic:{value:.4},uSharpen:{value:.32},uLutSize:{value:this.lut.size},uDamageFlash:{value:0},uDamageDir:{value:new It(0,1)},uCriticalHealth:{value:0},uExposureOverride:{value:0},uLensDirt:{value:.35}}),this.blitPass=new Ue(Yv,{uSource:{value:null}}),this.debugPass=new Ue(Kv,{uColor:{value:null},uNormal:{value:null},uVelocity:{value:null},uAO:{value:null},uDepth:{value:null},uDirect:{value:null},uAmbient:{value:null},uBloom:{value:null},uShadowMap:{value:this.shadows.target.texture},uMode:{value:0},uCascadeCount:{value:this.quality.shadowCascades}})}setQuality(t){this.quality=t,this.shadows.setResolution(t.shadowResolution),this.shadows.cascadeCount=Math.min(t.shadowCascades,this.shadows.cameras.length),this.lightUniforms.uCascadeCount.value=this.shadows.cascadeCount,this.lightUniforms.uShadowTexel.value=1/t.shadowResolution,this.gtaoPass.uniforms.uSamples.value=t.aoSamples,this.sky.setQuality(t),this.renderScale=t.renderScale,this.resize(this.width,this.height,!0)}resize(t,e,i=!1){t=Math.max(2,Math.floor(t)),e=Math.max(2,Math.floor(e));const n=Math.max(2,Math.floor(t*this.renderScale)),s=Math.max(2,Math.floor(e*this.renderScale));if(!i&&n===this.renderWidth&&s===this.renderHeight&&t===this.width)return;this.width=t,this.height=e,this.renderWidth=n,this.renderHeight=s,this._disposeTargets();const r={type:1016,format:1023,minFilter:1006,magFilter:1006,depthBuffer:!1,generateMipmaps:!1};this.depthTexture=new Zl(n,s),this.depthTexture.format=1026,this.depthTexture.type=1014,this.depthTexture.minFilter=1003,this.depthTexture.magFilter=1003,this.gbuffer=new ye(n,s,{count:4,type:1016,format:1023,minFilter:1003,magFilter:1003,depthBuffer:!0,stencilBuffer:!1,generateMipmaps:!1,depthTexture:this.depthTexture}),this.gbuffer.textures[0].name="gDirect",this.gbuffer.textures[1].name="gAmbient",this.gbuffer.textures[2].name="gNormal",this.gbuffer.textures[3].name="gVelocity",this.gbuffer.textures[3].format=1030,this.gbuffer.textures[0].minFilter=this.gbuffer.textures[0].magFilter=1006,this.gbuffer.textures[1].minFilter=this.gbuffer.textures[1].magFilter=1006,this.hdrTarget=new ye(n,s,{...r,depthBuffer:!0,depthTexture:this.depthTexture}),this.taaTarget=new ye(n,s,r),this.taaHistory=new ye(n,s,r),this.blurTarget=new ye(n,s,r);const o=Math.min(n,t),l=Math.min(s,e),c=Math.max(2,Math.floor(o*.5)),h=Math.max(2,Math.floor(l*.5)),u={type:1016,format:1023,minFilter:1006,magFilter:1006,depthBuffer:!1};this.aoTarget=new ye(c,h,u),this.aoTargetB=new ye(c,h,u),this.aoHistory=new ye(c,h,u);const d=Math.max(2,Math.ceil(n/Zo)),g=Math.max(2,Math.ceil(s/Zo));this.tileTarget=new ye(d,g,u),this.tileDilated=new ye(d,g,u);const m=Math.min(n,t),v=Math.min(s,e);this.bloomTargets=[];let p=Math.max(2,m>>1),f=Math.max(2,v>>1);for(let _=0;_<Vs;_++)this.bloomTargets.push(new ye(p,f,r)),p=Math.max(2,p>>1),f=Math.max(2,f>>1);this.bloomUpTargets=[],p=Math.max(2,m>>1),f=Math.max(2,v>>1);for(let _=0;_<Vs;_++)this.bloomUpTargets.push(new ye(p,f,r)),p=Math.max(2,p>>1),f=Math.max(2,f>>1);this.lumTargets=[];let S=128;for(;S>=1&&(this.lumTargets.push(new ye(S,S,{type:1016,format:1023,minFilter:1006,magFilter:1006,depthBuffer:!1})),S!==1);)S=Math.max(1,S>>1);const x={type:1016,format:1023,minFilter:1003,magFilter:1003,depthBuffer:!1};this.exposureTargets=[new ye(1,1,x),new ye(1,1,x)],this.exposureIndex=0,this.exposurePass.uniforms.uReset.value=1,this.taaPass.uniforms.uFirstFrame.value=1,this.sky.resize(n,s,this.quality)}_disposeTargets(){const t=[this.gbuffer,this.hdrTarget,this.taaTarget,this.taaHistory,this.blurTarget,this.aoTarget,this.aoTargetB,this.aoHistory,this.tileTarget,this.tileDilated,...this.bloomTargets||[],...this.bloomUpTargets||[],...this.lumTargets||[],...this.exposureTargets||[]];for(const e of t)e&&e.dispose();this.depthTexture&&this.depthTexture.dispose()}setDynamicScale(t){t=Ht.clamp(t,.55,1),!(Math.abs(t-this.renderScale)<.02)&&(this.renderScale=t,this.resize(this.width,this.height,!0))}updateSkyUniforms(){const t=this.lightUniforms,e=this.sky,i=e.sunIntensity*.95;t.uSunColor.value.set(e.sunColor.r*i,e.sunColor.g*i,e.sunColor.b*i);for(let s=0;s<9;s++)t.uSkySH.value[s].copy(e.sh[s]).multiplyScalar(Zv);t.uHorizonColor.value.set(e.horizonColor.r,e.horizonColor.g,e.horizonColor.b),t.uZenithColor.value.set(e.zenithColor.r,e.zenithColor.g,e.zenithColor.b),t.uGroundColor.value.set(e.groundColor.r,e.groundColor.g,e.groundColor.b);const n=e.horizonColor;t.uFogColor.value.set(n.r*.55+e.averageSky.r*.4,n.g*.55+e.averageSky.g*.4,n.b*.55+e.averageSky.b*.45)}setPointLights(t){const e=this.lightUniforms,i=Math.min(8,t.length);for(let n=0;n<i;n++){const s=t[n];e.uPointLights.value[n].set(s.position.x,s.position.y,s.position.z,s.radius),e.uPointColors.value[n].set(s.color.x*s.intensity,s.color.y*s.intensity,s.color.z*s.intensity,0)}e.uPointLightCount.value=i}applyJitter(t){const[e,i]=Vl[this.frameIndex%Vl.length];this.jitter.set(e*2/this.renderWidth,i*2/this.renderHeight,this.jitter.x,this.jitter.y)}render(t,e,i,n,s={}){const r=this.renderer,o=this.lightUniforms,l=this.quality;r.info.autoReset=!1,r.info.reset(),o.uCameraPos.value.copy(t.position),o.uTime.value=s.time||0,this.currViewProjection.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),e&&(this.vmCurrViewProjection.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._vmHistoryValid||(this.vmPrevViewProjection.copy(this.vmCurrViewProjection),this._vmHistoryValid=!0)),this.applyJitter(t),this.sky.renderClouds(t),this.shadows.update(t,this.sky.sunDirection),this.shadows.render(i.world,this.sky.sunDirection),i.viewmodel&&i.viewmodel.visible&&(uh.setFromMatrixPosition(i.viewmodel.matrixWorld),this.shadows.renderViewmodel(i.viewmodel,this.sky.sunDirection,uh)),r.setRenderTarget(this.gbuffer),r.setClearColor(0,0),r.clear(!0,!0,!1),this.sky.renderSky(t,this.prevViewProjection,this.gbuffer),r.setRenderTarget(this.gbuffer),r.autoClear=!1,r.render(i.world,t),i.viewmodel&&i.viewmodel.visible&&(r.clearDepth(),r.render(i.viewmodel,e)),r.autoClear=!0;const c=t_.set(1/this.aoTarget.width,1/this.aoTarget.height);if(l.aoEnabled){const x=this.gtaoPass.uniforms;x.uDepth.value=this.depthTexture,x.uNormal.value=this.gbuffer.textures[2],x.uVelocity.value=this.gbuffer.textures[3],x.uFrameIndex.value=this.frameIndex,x.uProjParams.value.set(t.near,t.far),x.uInvProjection.value.copy(t.projectionMatrixInverse),x.uProjection.value.copy(t.projectionMatrix),x.uTexelSize.value.copy(c),hh.setFromMatrix4(t.matrixWorldInverse),x.viewMatrix3.value.copy(hh),this.gtaoPass.render(r,this.aoTarget);const _=this.aoBlurPass.uniforms;_.uTexelSize.value.copy(c),_.uAO.value=this.aoTarget.texture,_.uDirection.value.set(1,0),this.aoBlurPass.render(r,this.aoTargetB),_.uAO.value=this.aoTargetB.texture,_.uDirection.value.set(0,1),this.aoBlurPass.render(r,this.aoTarget);const M=this.aoTemporalPass.uniforms;M.uAO.value=this.aoTarget.texture,M.uHistory.value=this.aoHistory.texture,M.uVelocity.value=this.gbuffer.textures[3],M.uTexelSize.value.copy(c),this.aoTemporalPass.render(r,this.aoTargetB);const T=this.aoTarget;this.aoTarget=this.aoTargetB,this.aoTargetB=T,this.blitPass.uniforms.uSource.value=this.aoTarget.texture,this.blitPass.render(r,this.aoHistory)}const h=this.combinePass.uniforms;h.uDirect.value=this.gbuffer.textures[0],h.uAmbient.value=this.gbuffer.textures[1],h.uAO.value=l.aoEnabled?this.aoTarget.texture:Qv(),h.uAOStrength.value=l.aoEnabled?1:0,this.combinePass.render(r,this.hdrTarget),i.transparent&&i.transparent.children.length&&(r.setRenderTarget(this.hdrTarget),r.autoClear=!1,r.render(i.transparent,t),r.autoClear=!0),i.viewmodelTransparent&&i.viewmodelTransparent.children.length&&i.viewmodel.visible&&(r.setRenderTarget(this.hdrTarget),r.autoClear=!1,r.clearDepth(),r.render(i.viewmodelTransparent,e),r.autoClear=!0);let u=this.hdrTarget.texture;if(l.taa){const x=this.taaPass.uniforms;x.uCurrent.value=this.hdrTarget.texture,x.uHistory.value=this.taaHistory.texture,x.uVelocity.value=this.gbuffer.textures[3],x.uDepth.value=this.depthTexture,x.uTexelSize.value.set(1/this.renderWidth,1/this.renderHeight),x.uBlend.value=.9,this.taaPass.render(r,this.taaTarget),this.blitPass.uniforms.uSource.value=this.taaTarget.texture,this.blitPass.render(r,this.taaHistory),x.uFirstFrame.value=0,u=this.taaTarget.texture}if(l.motionBlur!=="off"){const x=l.motionBlur==="high"?.8:.45,_=this.tileMaxPass.uniforms;_.uVelocity.value=this.gbuffer.textures[3],_.uTexelSize.value.set(1/this.renderWidth,1/this.renderHeight),this.tileMaxPass.render(r,this.tileTarget);const M=this.tileDilatePass.uniforms;M.uTiles.value=this.tileTarget.texture,M.uTexelSize.value.set(1/this.tileTarget.width,1/this.tileTarget.height),this.tileDilatePass.render(r,this.tileDilated);const T=this.motionBlurPass.uniforms;T.uColor.value=u,T.uVelocity.value=this.gbuffer.textures[3],T.uNeighborMax.value=this.tileDilated.texture,T.uDepth.value=this.depthTexture,T.uStrength.value=x*(s.motionBlurScale??1),T.uSamples.value=l.motionBlur==="high"?12:7,T.uFrameIndex.value=this.frameIndex,T.uProjParams.value.set(t.near,t.far),T.uTexelSize.value.set(1/this.renderWidth,1/this.renderHeight),this.motionBlurPass.render(r,this.blurTarget),u=this.blurTarget.texture}const d=this.luminancePass.uniforms;d.uColor.value=u,d.uTexelSize.value.set(1/this.renderWidth,1/this.renderHeight),this.luminancePass.render(r,this.lumTargets[0]);for(let x=1;x<this.lumTargets.length;x++){const _=this.luminanceDownPass.uniforms;_.uSource.value=this.lumTargets[x-1].texture,_.uTexelSize.value.set(1/this.lumTargets[x-1].width,1/this.lumTargets[x-1].height),this.luminanceDownPass.render(r,this.lumTargets[x])}const g=this.exposureTargets[this.exposureIndex],m=this.exposureTargets[1-this.exposureIndex],v=this.exposurePass.uniforms;v.uLuminance.value=this.lumTargets[this.lumTargets.length-1].texture,v.uPrevExposure.value=g.texture,v.uDeltaTime.value=Math.min(n,.1);const p=this.sky.exposureBias??0;v.uCompensation.value=lh+p,v.uMinEV.value=$v-p,v.uMaxEV.value=jv-p,this.exposurePass.render(r,m),this.exposureIndex=1-this.exposureIndex,v.uReset.value=0;const f=m.texture;if(l.bloom){const x=this.bloomPrefilterPass.uniforms;x.uColor.value=u,x.uExposure.value=f,this.bloomPrefilterPass.render(r,this.bloomTargets[0]);for(let _=1;_<Vs;_++){const M=this.bloomDownPass.uniforms;M.uSource.value=this.bloomTargets[_-1].texture,M.uTexelSize.value.set(1/this.bloomTargets[_-1].width,1/this.bloomTargets[_-1].height),M.uKaris.value=_===1?1:0,this.bloomDownPass.render(r,this.bloomTargets[_])}this.blitPass.uniforms.uSource.value=this.bloomTargets[Vs-1].texture,this.blitPass.render(r,this.bloomUpTargets[Vs-1]);for(let _=Vs-2;_>=0;_--){const M=this.bloomUpPass.uniforms;M.uSource.value=this.bloomUpTargets[_+1].texture,M.uPrevious.value=this.bloomTargets[_].texture,M.uTexelSize.value.set(1/this.bloomUpTargets[_+1].width,1/this.bloomUpTargets[_+1].height),this.bloomUpPass.render(r,this.bloomUpTargets[_])}}const S=this.compositePass.uniforms;if(S.uColor.value=u,S.uBloom.value=l.bloom?this.bloomUpTargets[0].texture:ch(),S.uExposure.value=f,S.uResolution.value.set(this.renderWidth,this.renderHeight),S.uTime.value=s.time||0,S.uBloomStrength.value=l.bloom?.055:0,S.uDamageFlash.value=s.damageFlash||0,s.damageDir&&S.uDamageDir.value.copy(s.damageDir),S.uCriticalHealth.value=s.criticalHealth||0,r.setRenderTarget(null),r.setViewport(0,0,this.width,this.height),this.debugView>0){const x=this.debugPass.uniforms;x.uColor.value=u,x.uNormal.value=this.gbuffer.textures[2],x.uVelocity.value=this.gbuffer.textures[3],x.uAO.value=this.aoTarget.texture,x.uDepth.value=this.depthTexture,x.uDirect.value=this.gbuffer.textures[0],x.uAmbient.value=this.gbuffer.textures[1],x.uBloom.value=l.bloom?this.bloomUpTargets[0].texture:ch(),x.uMode.value=this.debugView,x.uCascadeCount.value=this.shadows.cascadeCount,this.debugPass.render(r,null)}else this.compositePass.render(r,null);this.stats.drawCalls=r.info.render.calls,this.stats.triangles=r.info.render.triangles,this.prevViewProjection.copy(this.currViewProjection),this.vmPrevViewProjection.copy(this.vmCurrViewProjection),this.frameIndex++}dispose(){this._disposeTargets(),this.shadows.dispose(),this.sky.dispose(),this.lut.texture.dispose();for(const t of[this.combinePass,this.gtaoPass,this.aoBlurPass,this.aoTemporalPass,this.taaPass,this.tileMaxPass,this.tileDilatePass,this.motionBlurPass,this.bloomPrefilterPass,this.bloomDownPass,this.bloomUpPass,this.luminancePass,this.luminanceDownPass,this.exposurePass,this.compositePass,this.blitPass,this.debugPass])t.dispose()}}let pr=null,mr=null;function Qv(){return pr||(pr=new jl(new Uint8Array([255,255,255,255]),1,1),pr.needsUpdate=!0),pr}function ch(){return mr||(mr=new jl(new Uint8Array([0,0,0,255]),1,1),mr.needsUpdate=!0),mr}const t_=new It,hh=new qt,uh=new y;class qi{constructor(t=null,e="batch"){this.soup=t,this.name=e,this.pos=[],this.nrm=[],this.uv=[],this.layer=[],this.tint=[],this.wear=[],this.index=[],this.vertexCount=0,this.triangleCount=0,this._xf=null,this._nxf=new qt,this._xfStack=[],this.bone=[],this.currentBone=-1}setBone(t){return this.currentBone=t,this}pushTransform(t){this._xfStack.push(this._xf?this._xf.clone():null);const e=this._xf?this._xf.clone().multiply(t):t.clone();return this._xf=e,this._nxf.setFromMatrix4(e).invert().transpose(),this}popTransform(){return this._xf=this._xfStack.pop()??null,this._xf&&this._nxf.setFromMatrix4(this._xf).invert().transpose(),this}_pushVertex(t,e,i,n,s,r,o,l,c,h,u){return this._xf&&(yr.set(t,e,i).applyMatrix4(this._xf),t=yr.x,e=yr.y,i=yr.z,Sr.set(n,s,r).applyMatrix3(this._nxf).normalize(),n=Sr.x,s=Sr.y,r=Sr.z),this.pos.push(t,e,i),this.nrm.push(n,s,r),this.uv.push(o,l),this.layer.push(c),this.tint.push(h[0],h[1],h[2]),this.wear.push(u),this.currentBone>=0&&this.bone.push(this.currentBone),this.vertexCount++}addQuad(t,e,i,n,s){const{layer:r=0,tint:o=Hs,wear:l=.4,uvScale:c=.5,collide:h=!1,surface:u=null,uvOffset:d=null,flip:g=!1}=s;dh.subVectors(e,t),fh.subVectors(n,t),Li.crossVectors(dh,fh).normalize(),g&&Li.multiplyScalar(-1);const m=Math.abs(Li.x),v=Math.abs(Li.y),p=Math.abs(Li.z);let f,S;v>=m&&v>=p?(f="x",S="z"):m>=p?(f="z",S="y"):(f="x",S="y");const x=d?d[0]:0,_=d?d[1]:0,M=g?[t,n,i,e]:[t,e,i,n],T=this.vertexCount;for(const E of M)this._pushVertex(E.x,E.y,E.z,Li.x,Li.y,Li.z,(E[f]+x)*c,(E[S]+_)*c,r,o,l);if(this.index.push(T,T+1,T+2,T,T+2,T+3),this.triangleCount+=2,h&&this.soup){const E=u??qo[r]??0,[R,w,b,L]=M;this._xf?(ts.copy(R).applyMatrix4(this._xf),wr.copy(w).applyMatrix4(this._xf),es.copy(b).applyMatrix4(this._xf),Mr.copy(L).applyMatrix4(this._xf),this.soup.addTriangle(ts.x,ts.y,ts.z,wr.x,wr.y,wr.z,es.x,es.y,es.z,E),this.soup.addTriangle(ts.x,ts.y,ts.z,es.x,es.y,es.z,Mr.x,Mr.y,Mr.z,E)):(this.soup.addTriangle(R.x,R.y,R.z,w.x,w.y,w.z,b.x,b.y,b.z,E),this.soup.addTriangle(R.x,R.y,R.z,b.x,b.y,b.z,L.x,L.y,L.z,E))}return this}addBox(t,e,i,n,s,r,o={}){const{rotY:l=0,layer:c=0,faces:h=null,tint:u=Hs,wear:d=.4,uvScale:g=.5,collide:m=!1,surface:v=null,skipFaces:p=null,inset:f=0}=o,S=n*.5-f,x=s*.5-f,_=r*.5-f,M=Math.cos(l),T=Math.sin(l),E=(w,b,L,P)=>P.set(t+w*M+L*T,e+b,i+(-w*T+L*M));E(-S,-x,-_,Pi[0]),E(S,-x,-_,Pi[1]),E(S,x,-_,Pi[2]),E(-S,x,-_,Pi[3]),E(-S,-x,_,Pi[4]),E(S,-x,_,Pi[5]),E(S,x,_,Pi[6]),E(-S,x,_,Pi[7]);const R=[[1,2,6,5,0],[4,7,3,0,1],[3,7,6,2,2],[4,0,1,5,3],[5,6,7,4,4],[0,3,2,1,5]];for(const[w,b,L,P,B]of R){if(p&&p.includes(B))continue;const k=h?h[B]:c;this.addQuad(Pi[w],Pi[b],Pi[L],Pi[P],{layer:k,tint:u,wear:d,uvScale:g,collide:m,surface:v})}return this}addCylinder(t,e,i,n,s,r,o,l={}){const{layer:c=0,tint:h=Hs,wear:u=.4,uvScale:d=.5,collide:g=!1,surface:m=null,caps:v=!0,rotY:p=0}=l,f=this.vertexCount;for(let S=0;S<=o;S++){const x=S/o,_=p+x*Math.PI*2,M=Math.cos(_),T=Math.sin(_),E=x*Math.PI*2*((n+s)*.5)*d;this._pushVertex(t+M*n,e,i+T*n,M,0,T,E,e*d,c,h,u),this._pushVertex(t+M*s,e+r,i+T*s,M,0,T,E,(e+r)*d,c,h,u)}for(let S=0;S<o;S++){const x=f+S*2;this.index.push(x,x+3,x+2,x,x+1,x+3),this.triangleCount+=2}if(v){const S=this.vertexCount;this._pushVertex(t,e+r,i,0,1,0,t*d,i*d,c,h,u);for(let x=0;x<=o;x++){const _=p+x/o*Math.PI*2,M=t+Math.cos(_)*s,T=i+Math.sin(_)*s;this._pushVertex(M,e+r,T,0,1,0,M*d,T*d,c,h,u)}for(let x=0;x<o;x++)this.index.push(S,S+2+x,S+1+x),this.triangleCount++}if(g&&this.soup){const S=Math.max(n,s)*.92;gr.set(t,e+r*.5,i),vr.set(S*2,r,S*2),this.soup.addBox(gr,vr,null,m??qo[c]??0)}return this}addCylinderBetween(t,e,i,n,s,r={}){Qn.subVectors(e,t);const o=Qn.length();return o<1e-6?this:(Qn.multiplyScalar(1/o),_r.setFromUnitVectors(ph,Qn),mh.compose(t,_r,e_),this.pushTransform(mh),this.addCylinder(0,0,0,i,n,o,s,r),this.popTransform(),this)}addBlob(t,e,i,n,s,r,o,l,c={}){const{layer:h=0,tint:u=Hs,wear:d=.5,uvScale:g=1,noise:m=0,seedFn:v=null}=c,p=this.vertexCount;for(let f=0;f<=l;f++){const S=f/l*Math.PI,x=Math.sin(S),_=Math.cos(S);for(let M=0;M<=o;M++){const T=M/o*Math.PI*2,E=Math.sin(T),R=Math.cos(T);let w=1;m>0&&(w=1+(v?v()-.5:0)*m);const b=x*R,L=_,P=x*E;this._pushVertex(t+b*n*w,e+L*s*w,i+P*r*w,b,L,P,M/o*g*2,f/l*g,h,u,d)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const x=p+f*(o+1)+S,_=x+o+1;this.index.push(x,x+1,_,x+1,_+1,_),this.triangleCount+=2}return this}addTube(t,e,i,n={}){const{layer:s=0,tint:r=Hs,wear:o=.4,uvScale:l=1}=n;if(t.length<2)return this;const c=this.vertexCount;for(let h=0;h<t.length;h++){const u=t[h],d=t[Math.min(h+1,t.length-1)],g=t[Math.max(h-1,0)];Qn.subVectors(d,g).normalize(),En.set(0,1,0).cross(Qn),En.lengthSq()<1e-6&&En.set(1,0,0),En.normalize(),xr.crossVectors(Qn,En).normalize();for(let m=0;m<=i;m++){const v=m/i*Math.PI*2,p=Math.cos(v),f=Math.sin(v),S=En.x*p+xr.x*f,x=En.y*p+xr.y*f,_=En.z*p+xr.z*f;this._pushVertex(u.x+S*e,u.y+x*e,u.z+_*e,S,x,_,h/t.length*l*8,m/i*l,s,r,o)}}for(let h=0;h<t.length-1;h++)for(let u=0;u<i;u++){const d=c+h*(i+1)+u,g=d+i+1;this.index.push(d,d+1,g,d+1,g+1,g),this.triangleCount+=2}return this}addGroundGrid(t,e,i,n,s,r,o={}){const{layer:l=0,tint:c=Hs,wear:h=.5,uvScale:u=.5,collide:d=!0,surface:g=null,layerFn:m=null,tintFn:v=null}=o,p=s,f=Math.max(1,Math.round(s*(n-e)/(i-t))),S=this.vertexCount;for(let x=0;x<=f;x++)for(let _=0;_<=p;_++){const M=t+(i-t)*(_/p),T=e+(n-e)*(x/f),E=r?r(M,T):0,R=.35,w=r?r(M+R,T)-r(M-R,T):0,b=r?r(M,T+R)-r(M,T-R):0;Li.set(-w/(2*R),1,-b/(2*R)).normalize();const L=m?m(M,T):l,P=v?v(M,T):c;this._pushVertex(M,E,T,Li.x,Li.y,Li.z,M*u,T*u,L,P,h)}for(let x=0;x<f;x++)for(let _=0;_<p;_++){const M=S+x*(p+1)+_,T=M+p+1;if(this.index.push(M,T,M+1,M+1,T,T+1),this.triangleCount+=2,d&&this.soup){const E=g??qo[l]??0,R=this.pos,w=M*3,b=T*3,L=(M+1)*3,P=(T+1)*3;this.soup.addTriangle(R[w],R[w+1],R[w+2],R[b],R[b+1],R[b+2],R[L],R[L+1],R[L+2],E),this.soup.addTriangle(R[L],R[L+1],R[L+2],R[b],R[b+1],R[b+2],R[P],R[P+1],R[P+2],E)}}return this}addCollisionBox(t,e,i,n,s,r,o=0,l=0){return this.soup?(gr.set(t,e,i),vr.set(n,s,r),_r.setFromAxisAngle(ph,l),this.soup.addBox(gr,vr,_r,o),this):this}isEmpty(){return this.index.length===0}build(){const t=new ti;return t.setAttribute("position",new Xt(new Float32Array(this.pos),3)),t.setAttribute("normal",new Xt(new Float32Array(this.nrm),3)),t.setAttribute("uv",new Xt(new Float32Array(this.uv),2)),t.setAttribute("aLayer",new Xt(new Float32Array(this.layer),1)),t.setAttribute("aTint",new Xt(new Float32Array(this.tint),3)),t.setAttribute("aWear",new Xt(new Float32Array(this.wear),1)),this.bone.length===this.vertexCount&&t.setAttribute("aBone",new Xt(new Float32Array(this.bone),1)),t.setIndex(new Xt(this.vertexCount>65535?new Uint32Array(this.index):new Uint16Array(this.index),1)),t.computeBoundingSphere(),t.computeBoundingBox(),t.name=this.name,t}}const Hs=[1,1,1],Pi=Array.from({length:8},()=>new y),dh=new y,fh=new y,Li=new y,gr=new y,vr=new y,_r=new Qe,ph=new y(0,1,0),Qn=new y,En=new y,xr=new y,yr=new y,Sr=new y,ts=new y,wr=new y,es=new y,Mr=new y,mh=new Nt,e_=new y(1,1,1),ds=[{layer:X.PLASTER_BEIGE,tint:[1,.98,.94]},{layer:X.PLASTER_BEIGE,tint:[.92,.88,.8]},{layer:X.PLASTER_WHITE,tint:[1,.99,.96]},{layer:X.PLASTER_WHITE,tint:[.9,.9,.88]},{layer:X.PLASTER_PEACH,tint:[1,.96,.92]},{layer:X.STUCCO_BLUE,tint:[.95,.98,1]},{layer:X.STUCCO_TERRACOTTA,tint:[.98,.94,.9]},{layer:X.CONCRETE,tint:[1,.99,.96]},{layer:X.CONCRETE,tint:[.88,.86,.82]},{layer:X.BRICK,tint:[.96,.94,.92]}],i_=[.09,.085,.08],nd=[[.42,.46,.48],[.55,.42,.3],[.35,.4,.42],[.6,.58,.52],[.3,.38,.36]];class n_{constructor(t,e,i,n,s,r){this.origin=t,this.right=e,this.up=i,this.normal=n,this.width=s,this.height=r}point(t,e,i,n){return n.copy(this.origin).addScaledVector(this.right,t).addScaledVector(this.up,e).addScaledVector(this.normal,i),n}}const Zt=Array.from({length:8},()=>new y);function xs(a,t,e,i,n,s,r,o){t.point(e,i,r,Zt[0]),t.point(e+n,i,r,Zt[1]),t.point(e+n,i+s,r,Zt[2]),t.point(e,i+s,r,Zt[3]),a.addQuad(Zt[0],Zt[1],Zt[2],Zt[3],o)}function Hl(a,t,e,i,n,s,r,o){const{backLayer:l=X.TILE,backTint:c=i_,revealLayer:h=o.layer,revealTint:u=o.tint,uvScale:d=.6,wear:g=.5}=o;xs(a,t,e,i,n,s,-r,{layer:l,tint:c,wear:.7,uvScale:.9});const m={layer:h,tint:u,wear:g,uvScale:d};t.point(e,i,0,Zt[0]),t.point(e+n,i,0,Zt[1]),t.point(e+n,i,-r,Zt[2]),t.point(e,i,-r,Zt[3]),a.addQuad(Zt[3],Zt[2],Zt[1],Zt[0],m),t.point(e,i+s,0,Zt[0]),t.point(e+n,i+s,0,Zt[1]),t.point(e+n,i+s,-r,Zt[2]),t.point(e,i+s,-r,Zt[3]),a.addQuad(Zt[0],Zt[1],Zt[2],Zt[3],m),t.point(e,i,0,Zt[0]),t.point(e,i+s,0,Zt[1]),t.point(e,i+s,-r,Zt[2]),t.point(e,i,-r,Zt[3]),a.addQuad(Zt[0],Zt[1],Zt[2],Zt[3],m),t.point(e+n,i,0,Zt[0]),t.point(e+n,i+s,0,Zt[1]),t.point(e+n,i+s,-r,Zt[2]),t.point(e+n,i,-r,Zt[3]),a.addQuad(Zt[3],Zt[2],Zt[1],Zt[0],m)}function de(a,t,e,i,n,s,r,o,l){const c=[];for(const[S,x,_]of[[e,i,r],[e+n,i,r],[e+n,i+s,r],[e,i+s,r],[e,i,o],[e+n,i,o],[e+n,i+s,o],[e,i+s,o]])c.push(t.point(S,x,_,new y));const[h,u,d,g,m,v,p,f]=c;a.addQuad(m,v,p,f,l),a.addQuad(g,d,u,h,l),a.addQuad(h,u,v,m,l),a.addQuad(f,p,d,g,l),a.addQuad(g,h,m,f,l),a.addQuad(u,d,p,v,l)}function s_(a,t,e,i,n,s,r,o,l){for(let c=0;c<o;c++){const h=i+s/o*c+.012;de(a,t,e,h,n,s/o-.024,r,r+.018,l)}}function a_(a,t,e,i,n,s,r,o,l){const c=Math.max(2,Math.round(n/.19));for(let h=1;h<c;h++){const u=e+n/c*h-.011;de(a,t,u,i+.02,.022,s-.04,r,r+.03,l)}o.bool(.5)&&de(a,t,e+.02,i+s*.5-.011,n-.04,.022,r,r+.03,l)}function r_(a,t,e){const{builder:i,rng:n,style:s,floors:r,floorHeight:o,groundHeight:l}=a,c={layer:s.layer,tint:s.tint,wear:a.wear,uvScale:.82,collide:!1},h=t.width,u=n.range(2.5,3.4),d=Math.max(1,Math.round(h/u)),g=h/d;xs(i,t,0,0,h,t.height,0,c),n.bool(.62)&&de(i,t,0,l-.14,h,.16,0,n.range(.05,.11),{layer:s.layer,tint:ms(s.tint,.94),wear:a.wear+.1,uvScale:.5});for(let m=0;m<d;m++){const v=m*g,p=n.next();if(p<.26&&a.allowDoors){const f=Math.min(1.25,g*.45),S=2.25,x=v+(g-f)*.5;Hl(i,t,x,.02,f,S,.42,{layer:s.layer,tint:s.tint,backTint:[.05,.05,.05],backLayer:X.TILE}),n.bool(.35)||xs(i,t,x+.05,.03,f-.1,S-.06,-.28,{layer:X.WOOD,tint:n.pick([[.55,.42,.28],[.35,.38,.4],[.42,.3,.24]]),wear:.7,uvScale:.9}),de(i,t,x-.1,S+.02,f+.2,.16,0,.07,{layer:X.CONCRETE,tint:[.9,.89,.86],wear:.5,uvScale:.7}),a.doorways.push({u:x+f*.5,side:e})}else if(p<.52&&a.allowShops){const f=g*n.range(.62,.86),S=n.range(2.1,2.5),x=v+(g-f)*.5;Hl(i,t,x,.05,f,S,.3,{layer:s.layer,tint:s.tint,backTint:[.04,.04,.045]});const _=n.range(0,1),M=S*(_<.4?1:_<.7?n.range(.35,.7):.14);de(i,t,x,.05+S-M,f,M,-.16,-.1,{layer:X.CORRUGATED,tint:n.pick(nd),wear:.75,uvScale:1.5}),de(i,t,x-.06,.05+S,f+.12,.18,0,.14,{layer:X.CONCRETE,tint:[.88,.87,.84],wear:.55,uvScale:.7})}else if(p<.72){const f=g*n.range(.4,.6),S=n.range(1,1.35),x=v+(g-f)*.5,_=n.range(.95,1.25);gh(a,t,x,_,f,S,e,!0)}else p<.8&&xs(i,t,v+g*.15,n.range(.3,1.4),g*.7,n.range(.8,1.6),.012,{layer:X.CONCRETE,tint:ms(s.tint,n.range(.82,.95)),wear:.85,uvScale:.55})}for(let m=1;m<r;m++){const v=l+(m-1)*o;for(let p=0;p<d;p++){const f=p*g;if(n.next()>.82)continue;const S=g*n.range(.36,.55),x=n.range(1.15,1.55),_=f+(g-S)*.5,M=v+n.range(.85,1.15),T=n.bool(.22)&&S>.8;if(gh(a,t,_,M,S,x,e,n.bool(.34),T),T&&o_(a,t,_-.35,v+.72,S+.7,e),n.bool(.22)){const E=f+g*(n.bool()?.12:.72),R=v+n.range(1.5,2.2);de(i,t,E,R,.62,.42,0,.34,{layer:X.METAL_PAINTED,tint:[.82,.82,.8],wear:.6,uvScale:1.4}),s_(i,t,E+.05,R+.04,.52,.34,.34,5,{layer:X.METAL_PAINTED,tint:[.62,.62,.6],wear:.7,uvScale:2}),de(i,t,E+.06,R-.14,.06,.16,0,.3,{layer:X.METAL_RUST,tint:[.8,.8,.8],wear:.9,uvScale:2}),de(i,t,E+.5,R-.14,.06,.16,0,.3,{layer:X.METAL_RUST,tint:[.8,.8,.8],wear:.9,uvScale:2})}}if(n.bool(.45)){const p=n.range(.3,Math.max(.4,h-.3));de(i,t,p,v,.07,o,0,.06,{layer:X.METAL_RUST,tint:[.7,.7,.7],wear:.8,uvScale:2.2})}}if(n.bool(.55)){const m=n.bool()?.22:h-.22;de(i,t,m-.055,0,.11,t.height-.2,.02,.13,{layer:X.METAL_RUST,tint:[.75,.74,.72],wear:.85,uvScale:1.6});for(let v=0;v<3;v++)de(i,t,m-.09,.9+v*1.6,.18,.06,.02,.16,{layer:X.METAL_RUST,tint:[.6,.6,.6],wear:.9,uvScale:2.4})}if(n.bool(.3)){const m=n.range(.6,Math.max(.7,h-.6));de(i,t,m,2.55,.16,.1,0,.22,{layer:X.METAL_PAINTED,tint:[.4,.4,.4],wear:.7,uvScale:2}),de(i,t,m-.04,2.4,.24,.16,.16,.3,{layer:X.METAL_PAINTED,tint:[.75,.72,.66],wear:.6,uvScale:2})}}function gh(a,t,e,i,n,s,r,o,l=!1){const{builder:c,rng:h,style:u}=a,d=h.next(),g=h.range(.16,.3);if(Hl(c,t,e,i,n,s,g,{layer:u.layer,tint:u.tint,backLayer:d<.2?X.WOOD:X.TILE,backTint:d<.2?[.3,.22,.15]:[.055,.055,.06]}),d<.34)xs(c,t,e+.03,i+.03,n-.06,s-.06,-g+.05,{layer:X.GUNMETAL,tint:[.42,.48,.55],wear:.25,uvScale:.8});else if(d<.46)for(let v=0;v<3;v++)xs(c,t,e+.02,i+.06+v*(s-.12)/3,n-.04,(s-.12)/3-.05,-g+.06,{layer:X.WOOD,tint:[.62,.52,.38],wear:.85,uvScale:1.1});else d<.58&&xs(c,t,e+.04,i+.04,n-.08,s-.08,-g+.04,{layer:X.FABRIC,tint:h.pick([[.55,.5,.42],[.4,.42,.45],[.6,.42,.35]]),wear:.7,uvScale:1.2});const m={layer:X.WOOD,tint:h.pick([[.45,.38,.28],[.55,.55,.52],[.3,.34,.36]]),wear:.7,uvScale:1.6};if(de(c,t,e-.045,i-.045,n+.09,.06,-.01,.045,m),de(c,t,e-.045,i+s-.015,n+.09,.06,-.01,.045,m),de(c,t,e-.045,i,.05,s,-.01,.045,m),de(c,t,e+n-.005,i,.05,s,-.01,.045,m),l||de(c,t,e-.1,i-.11,n+.2,.1,0,.12,{layer:X.CONCRETE,tint:[.9,.88,.85],wear:.6,uvScale:.9}),o)a_(c,t,e,i,n,s,.02,h,{layer:X.METAL_RUST,tint:[.7,.68,.66],wear:.85,uvScale:2.2});else if(h.bool(.3)){const v=h.pick(nd);h.next()<.5?(de(c,t,e-n*.5-.03,i,n*.5,s,.02,.07,{layer:X.WOOD,tint:v,wear:.75,uvScale:1.8}),de(c,t,e+n+.03,i,n*.5,s,.02,.07,{layer:X.WOOD,tint:v,wear:.75,uvScale:1.8})):(de(c,t,e,i,n*.5,s,.02,.07,{layer:X.WOOD,tint:v,wear:.75,uvScale:1.8}),de(c,t,e+n*.5,i,n*.5,s,.02,.07,{layer:X.WOOD,tint:v,wear:.75,uvScale:1.8}))}}function o_(a,t,e,i,n,s){const{builder:r,rng:o}=a,l=o.range(.75,1.05);de(r,t,e,i,n,.14,0,l,{layer:X.CONCRETE,tint:[.88,.86,.83],wear:.6,uvScale:.7});const c=o.range(.88,1.02),h={layer:X.METAL_RUST,tint:o.pick([[.4,.42,.44],[.55,.5,.42],[.32,.36,.38]]),wear:.8,uvScale:2};de(r,t,e,i+.14,.05,c,l-.06,l,h),de(r,t,e+n-.05,i+.14,.05,c,l-.06,l,h),de(r,t,e,i+.14+c-.05,n,.05,l-.06,l,h);const u=Math.max(3,Math.round(n/.16));for(let d=1;d<u;d++)de(r,t,e+n/u*d-.012,i+.14,.024,c-.05,l-.045,l-.02,h);if(o.bool(.4)){const d=e+o.range(.15,Math.max(.2,n-.4));de(r,t,d,i+.14,.26,.24,l-.4,l-.14,{layer:X.STUCCO_TERRACOTTA,tint:[.9,.6,.45],wear:.6,uvScale:1.6})}a.balconies.push({side:s,u:e+n*.5,v:i+.14,depth:l})}function ms(a,t){return[a[0]*t,a[1]*t,a[2]*t]}function l_(a){const{builder:t,detail:e,rng:i,lot:n,openSides:s,hollow:r=!1}=a,o=Math.min(n.x0,n.x1),l=Math.max(n.x0,n.x1),c=Math.min(n.z0,n.z1),h=Math.max(n.z0,n.z1),u=l-o,d=h-c,g=(o+l)*.5,m=(c+h)*.5,v=a.floors??i.int(2,3),p=i.range(3.3,3.9),f=i.range(2.95,3.35),S=p+(v-1)*f,x=i.range(.55,1.1),_=a.style??i.pick(ds),M=i.range(.35,.85),T={builder:e,rng:i,style:_,floors:v,floorHeight:f,groundHeight:p,wear:M,allowDoors:!0,allowShops:!0,doorways:[],balconies:[]},E=r&&u>6&&d>6;if(E){const F=S-p;t.addBox(g,p+F*.5,m,u,F,d,{layer:_.layer,tint:_.tint,wear:M,uvScale:.42,collide:!0,surface:ht.PLASTER})}else t.addBox(g,S*.5,m,u,S,d,{layer:_.layer,tint:_.tint,wear:M,uvScale:.42,collide:!0,surface:ht.PLASTER});const R=[.86,.84,.8];t.addBox(g,S+.06,m,u-.12,.12,d-.12,{layer:X.CONCRETE,tint:R,wear:.8,uvScale:.4,collide:!0,surface:ht.CONCRETE});const w=i.range(.16,.26);e.addBox(g,S+x*.5,c+w*.5,u,x,w,{layer:_.layer,tint:ms(_.tint,.97),wear:M,uvScale:.45}),e.addBox(g,S+x*.5,h-w*.5,u,x,w,{layer:_.layer,tint:ms(_.tint,.97),wear:M,uvScale:.45}),e.addBox(o+w*.5,S+x*.5,m,w,x,d-w*2,{layer:_.layer,tint:ms(_.tint,.97),wear:M,uvScale:.45}),e.addBox(l-w*.5,S+x*.5,m,w,x,d-w*2,{layer:_.layer,tint:ms(_.tint,.97),wear:M,uvScale:.45}),t.addCollisionBox(g,S+x*.5,c+w*.5,u,x,w,ht.PLASTER),t.addCollisionBox(g,S+x*.5,h-w*.5,u,x,w,ht.PLASTER),t.addCollisionBox(o+w*.5,S+x*.5,m,w,x,d,ht.PLASTER),t.addCollisionBox(l-w*.5,S+x*.5,m,w,x,d,ht.PLASTER);const b=[{n:new y(0,0,-1),o:new y(l,0,c),r:new y(-1,0,0),len:u},{n:new y(1,0,0),o:new y(l,0,h),r:new y(0,0,-1),len:d},{n:new y(0,0,1),o:new y(o,0,h),r:new y(1,0,0),len:u},{n:new y(-1,0,0),o:new y(o,0,c),r:new y(0,0,1),len:d}],L=new y(0,1,0);for(let F=0;F<4;F++){if(!s[F])continue;const N=b[F],z=N.o.clone().addScaledVector(N.n,.012),U=new n_(z,N.r,L,N.n,N.len,S);r_(T,U,F)}const P=[],B=i.int(4,8);for(let F=0;F<B;F++){const N=i.range(o+1.2,l-1.2),z=i.range(c+1.2,h-1.2),U=i.next();if(U<.32){const W=i.range(.5,.72),J=i.range(1.2,1.8),tt=i.range(.7,1.1);for(const[gt,Lt]of[[-W*.7,-W*.7],[W*.7,-W*.7],[W*.7,W*.7],[-W*.7,W*.7]])e.addBox(N+gt,S+tt*.5,z+Lt,.08,tt,.08,{layer:X.METAL_RUST,tint:[.52,.5,.47],wear:.9,uvScale:2});e.addBox(N,S+tt,z,W*1.7,.12,W*1.7,{layer:X.METAL_RUST,tint:[.6,.6,.6],wear:.9,uvScale:1.2}),e.addCylinder(N,S+tt+.12,z,W,W,J,12,{layer:X.METAL_PAINTED,tint:i.pick([[.3,.42,.55],[.65,.62,.55],[.35,.38,.36]]),wear:.7,uvScale:.8}),t.addCollisionBox(N,S+tt+.12+J*.5,z,W*1.8,J,W*1.8,ht.METAL)}else if(U<.52){const W=i.range(1.8,2.6),J=i.range(1.7,2.3),tt=i.range(2.4,3.1);e.addBox(N,S+tt*.5,z,W,tt,J,{layer:_.layer,tint:ms(_.tint,.95),wear:M,uvScale:.5}),t.addCollisionBox(N,S+tt*.5,z,W,tt,J,ht.PLASTER)}else if(U<.66){const W=i.range(1.1,1.8);e.addCylinder(N,S+.12,z,.05,.05,W,6,{layer:X.METAL_RUST,tint:[.6,.6,.6],wear:.8,uvScale:2}),e.addBlob(N+.22,S+.12+W,z,.42,.42,.12,12,6,{layer:X.METAL_PAINTED,tint:[.9,.89,.86],wear:.5,uvScale:1})}else if(U<.88){const W=i.range(3.2,5.6);e.addCylinder(N,S+.12,z,.045,.02,W,5,{layer:X.METAL_RUST,tint:[.55,.55,.55],wear:.85,uvScale:3});for(let J=0;J<3;J++){const tt=J/3*Math.PI*2+i.next();e.addTube([new y(N,S+.12+W*.8,z),new y(N+Math.cos(tt)*1.1,S+.14,z+Math.sin(tt)*1.1)],.012,3,{layer:X.METAL_RUST,tint:[.5,.5,.5],wear:.9,uvScale:4})}}else{const W=i.int(2,4);for(let J=0;J<W;J++){const tt=i.range(.4,.7);e.addBox(N+i.range(-.3,.3),S+.12+tt*.5+J*tt*.9,z+i.range(-.3,.3),tt,tt*.8,tt,{rotY:i.range(0,Math.PI),layer:X.WOOD,tint:[.85,.78,.66],wear:.85,uvScale:1.4})}}P.push({x:N,y:S+.12,z})}let k=null;return E&&(k=c_({builder:t,detail:e,rng:i,x0:o,z0:c,x1:l,z1:h,groundHeight:p,openSides:s,style:_,wear:M})),{cx:g,cz:m,x0:o,z0:c,x1:l,z1:h,width:u,depth:d,height:S,floors:v,style:_,doorways:T.doorways,balconies:T.balconies,rooftop:P,interior:k}}function c_({builder:a,detail:t,rng:e,x0:i,z0:n,x1:s,z1:r,groundHeight:o,openSides:l,style:c,wear:h}){const d=i+.44,g=s-.44,m=n+.44,v=r-.44,p=(i+s)*.5,f=(n+r)*.5,S=g-d,x=v-m,_=o;t.addBox(p,.06,f,S,.12,x,{layer:X.TILE,tint:[.78,.76,.72],wear:.8,uvScale:.9,collide:!0,surface:ht.TILE});const M={layer:c.layer,tint:c.tint,wear:h,uvScale:.42},T=[{px:p,pz:n+.44*.5,sx:s-i,sz:.44,side:0,axis:"x"},{px:s-.44*.5,pz:f,sx:.44,sz:r-n-.44*2,side:1,axis:"z"},{px:p,pz:r-.44*.5,sx:s-i,sz:.44,side:2,axis:"x"},{px:i+.44*.5,pz:f,sx:.44,sz:r-n-.44*2,side:3,axis:"z"}],E=[],R=[];for(let P=0;P<4;P++)l[P]&&R.push(P);const w=new Set;if(R.length&&(w.add(e.pick(R)),R.length>1&&e.bool(.55))){const P=e.pick(R);P!==void 0&&w.add(P)}for(const P of T){const B=P.axis==="x"?P.sx:P.sz;if(!w.has(P.side)||B<4){t.addBox(P.px,_*.5,P.pz,P.sx,_,P.sz,M),a.addCollisionBox(P.px,_*.5,P.pz,P.sx,_,P.sz,ht.PLASTER);continue}const k=1.75,F=(B-k)*.5;for(const W of[-1,1]){const J=W*(k*.5+F*.5),tt=P.axis==="x"?P.px+J:P.px,gt=P.axis==="x"?P.pz:P.pz+J,Lt=P.axis==="x"?F:P.sx,se=P.axis==="x"?P.sz:F;t.addBox(tt,_*.5,gt,Lt,_,se,M),a.addCollisionBox(tt,_*.5,gt,Lt,_,se,ht.PLASTER)}const N=_-2.25,z=P.axis==="x"?k:P.sx,U=P.axis==="x"?P.sz:k;t.addBox(P.px,_-N*.5,P.pz,z,N,U,M),a.addCollisionBox(P.px,_-N*.5,P.pz,z,N,U,ht.PLASTER),E.push({x:P.px,z:P.pz,side:P.side})}const b={layer:X.PLASTER_WHITE,tint:[.7,.68,.64],wear:.9,uvScale:.6};t.addBox(p,_*.5,m+.02,S,_,.04,b),t.addBox(p,_*.5,v-.02,S,_,.04,b),t.addBox(d+.02,_*.5,f,.04,_,x,b),t.addBox(g-.02,_*.5,f,.04,_,x,b),t.addBox(p,_-.03,f,S,.06,x,{layer:X.CONCRETE,tint:[.5,.49,.47],wear:.85,uvScale:.6});const L=e.int(2,4);for(let P=0;P<L;P++){const B=e.range(d+.7,g-.7),k=e.range(m+.7,v-.7),F=e.next();if(F<.4)for(let N=0;N<3;N++)t.addBox(B,.5+N*.62,k,1.5,.06,.42,{rotY:e.range(0,3.14),layer:X.WOOD,tint:[.6,.5,.38],wear:.8,uvScale:1.2});else F<.7?(t.addBox(B,.45,k,1.7,.9,.6,{rotY:e.range(0,3.14),layer:X.WOOD,tint:[.55,.45,.34],wear:.85,uvScale:1.1}),a.addCollisionBox(B,.45,k,1.7,.9,.7,ht.WOOD)):(t.addBox(B,.55,k,.7,1.1,.7,{rotY:e.range(0,3.14),layer:X.SANDBAG,tint:[.9,.85,.75],wear:.9,uvScale:1}),a.addCollisionBox(B,.55,k,.8,1.1,.8,ht.SANDBAG))}return{x0:d,z0:m,x1:g,z1:v,ceil:_,entrances:E,center:{x:p,z:f},walkable:!0}}const kn=[[.85,.78,.66],[.72,.62,.48],[.95,.88,.74],[.62,.55,.45]],Gl=[[1,.95,.85],[.85,.72,.58],[.62,.78,.8],[.92,.66,.52],[.72,.8,.68],[.88,.85,.78]],h_=[[.35,.45,.52],[.62,.35,.24],[.55,.56,.52],[.42,.52,.4]];function vh(a,t,e,i,n,s,r=2.4){const o=[.92+s.range(-.06,.06),.9,.87],l=s.range(.5,.95),c={rotY:n,layer:X.CONCRETE,tint:o,wear:l,uvScale:.55};return a.addBox(t,e+.16,i,r,.32,.62,{...c,collide:!0,surface:ht.CONCRETE}),a.addBox(t,e+.52,i,r,.42,.4,{...c,collide:!0,surface:ht.CONCRETE}),a.addBox(t,e+.86,i,r,.28,.28,{...c,collide:!0,surface:ht.CONCRETE}),s.bool(.5)&&a.addBox(t+Math.cos(n)*r*.42,e+1,i-Math.sin(n)*r*.42,.1,.1,.1,{rotY:s.range(0,3.14),layer:X.METAL_RUST,tint:[.7,.68,.64],wear:.9,uvScale:3}),{x:t,z:i,height:1,cover:"low"}}function Jo(a,t,e,i,n,s,r=2.2,o=3){const l=Math.cos(n),c=Math.sin(n),h=.46,u=.24,d=.32,g=Math.max(2,Math.round(r/h));for(let m=0;m<o;m++){const v=m%2*h*.5,p=g-m%2;for(let f=0;f<p;f++){const S=(f-(p-1)*.5)*h+v,x=t+l*S,_=i-c*S,M=s.range(-.03,.03);a.addBlob(x+M,e+u*.5+m*(u*.86),_+M,h*.52,u*.6,d*.55,7,4,{layer:X.SANDBAG,tint:[.92+s.range(-.12,.08),.88+s.range(-.1,.06),.78+s.range(-.1,.1)],wear:s.range(.5,.95),uvScale:1.1})}}return a.addCollisionBox(t,e+o*u*.43,i,r,o*u*.86,d,ht.SANDBAG,n),{x:t,z:i,height:o*u*.86,cover:"low"}}function _h(a,t,e,i,n,s,r,o=2.6,l=1.8){const c=Math.cos(s),h=Math.sin(s),u=r.range(2.1,2.45),d=r.bool(.4),g=d?X.METAL_PAINTED:X.WOOD,m=d?[.55,.56,.54]:r.pick(kn),v=r.range(.5,.9),p=[[-o/2,-l/2],[o/2,-l/2],[o/2,l/2],[-o/2,l/2]];for(const[M,T]of p){const E=e+M*c+T*h,R=n-M*h+T*c;a.addBox(E,i+u*.5,R,.09,u,.09,{rotY:s,layer:g,tint:m,wear:v,uvScale:2,collide:!0,surface:d?ht.METAL:ht.WOOD})}a.addBox(e,i+u,n,o+.1,.08,.08,{rotY:s,layer:g,tint:m,wear:v,uvScale:2}),a.addBox(e,i+u,n,.08,.08,l+.1,{rotY:s,layer:g,tint:m,wear:v,uvScale:2});const f=r.pick(Gl);t.push({type:"awning",center:new y(e,i+u+.06,n),width:o+r.range(.3,.7),depth:l+r.range(.2,.5),rotY:s,sag:r.range(.06,.18),tint:f,amplitude:r.range(.02,.06),phase:r.range(0,6.28)});const S=r.range(.78,.92);a.addBox(e,i+S,n,o*.92,.07,l*.7,{rotY:s,layer:X.WOOD,tint:r.pick(kn),wear:.8,uvScale:1.2,collide:!0,surface:ht.WOOD}),a.addBox(e,i+S*.5,n,o*.9,.05,.05,{rotY:s,layer:X.WOOD,tint:m,wear:.8,uvScale:2});const x=Math.max(4,Math.round(o*r.range(2,2.8)));for(let M=0;M<x;M++){const E=((M+r.range(.15,.85))/x-.5)*o*.86,R=r.range(-l*.26,l*.26),w=e+E*c+R*h,b=n-E*h+R*c,L=r.next();L<.4?(a.addBox(w,i+S+.09,b,r.range(.34,.5),.12,r.range(.24,.36),{rotY:s+r.range(-.3,.3),layer:X.WOOD,tint:r.pick(kn),wear:.85,uvScale:1.6}),a.addBlob(w,i+S+.17,b,.16,.06,.12,8,4,{layer:X.SAND,tint:r.pick([[1,.82,.42],[.85,.35,.28],[.6,.72,.35],[.9,.68,.3]]),wear:.4,uvScale:2})):L<.7?a.addCylinder(w,i+S+.04,b,.16,.2,.22,9,{layer:X.WOOD,tint:r.pick(kn),wear:.85,uvScale:1.8}):a.addBlob(w,i+S+.16,b,.19,.16,.15,8,5,{layer:X.SANDBAG,tint:[.9,.85,.72],wear:.8,uvScale:1.4})}const _=r.int(2,5);for(let M=0;M<_;M++){const T=((M+r.range(.2,.8))/_-.5)*o*.9,E=-l*.5+.06,R=e+T*c+E*h,w=n-T*h+E*c,b=r.range(.28,.62);a.addCylinder(R,i+u-b*.5,w,.008,.008,b,4,{layer:X.WOOD,tint:[.42,.38,.32],wear:.9,uvScale:4,caps:!1}),r.bool(.55)?a.addBlob(R,i+u-b-.11,w,.1,.14,.09,7,4,{layer:X.FABRIC,tint:r.pick(Gl),wear:.7,uvScale:3}):a.addCylinder(R,i+u-b-.09,w,.07,.055,.16,8,{layer:X.METAL_PAINTED,tint:r.pick([[.72,.58,.28],[.55,.53,.5],[.35,.3,.26]]),wear:.75,uvScale:2.5})}if(r.bool(.6)){const M=(r.bool()?1:-1)*o*.5,T=l*.5+.25,E=e+M*c+T*h,R=n-M*h+T*c;Wl(a,E,i,R,s+r.range(-.4,.4),r,r.int(1,3))}return{x:e,z:n,height:u,cover:"low"}}function Wl(a,t,e,i,n,s,r=2){let o=e;for(let l=0;l<r;l++){const c=s.range(.42,.62),h=c*s.range(.7,1),u=s.range(-.08,.08)*l,d=s.range(-.08,.08)*l;a.addBox(t+u,o+h*.5,i+d,c,h,c*s.range(.85,1.15),{rotY:n+s.range(-.25,.25)*l,layer:X.WOOD,tint:s.pick(kn),wear:s.range(.6,.95),uvScale:1.5,collide:!0,surface:ht.WOOD}),a.addBox(t+u,o+h*.5,i+d,c+.02,.04,c*1.16+.02,{rotY:n,layer:X.WOOD,tint:[.6,.5,.38],wear:.9,uvScale:2.2}),o+=h}return{x:t,z:i,height:o-e,cover:"low"}}function Qo(a,t,e,i,n,s=0){const l=n.pick(h_),c=n.bool(.45);a.addCylinder(t,e,i,.29,.29,.88,14,{layer:c?X.METAL_RUST:X.METAL_PAINTED,tint:l,wear:n.range(.6,.95),uvScale:1,collide:!0,surface:ht.METAL,rotY:s});for(const h of[.22,.5,.78])a.addCylinder(t,e+.88*h,i,.29+.02,.29+.02,.05,14,{layer:X.METAL_RUST,tint:[l[0]*.8,l[1]*.8,l[2]*.8],wear:.9,uvScale:2,caps:!1,rotY:s});return{x:t,z:i,height:.88,cover:"low"}}function u_(a,t,e,i,n){return a.addCylinder(t,e,i,.17,.17,.62,12,{layer:X.METAL_PAINTED,tint:n.pick([[.85,.72,.3],[.75,.3,.25],[.6,.62,.6]]),wear:n.range(.5,.9),uvScale:1.4,collide:!0,surface:ht.METAL}),a.addCylinder(t,e+.62,i,.06,.05,.1,8,{layer:X.METAL_RUST,tint:[.6,.6,.6],wear:.9,uvScale:3}),{x:t,z:i,height:.62}}function d_(a,t,e,i,n,s=3){for(let r=0;r<s;r++)a.addCylinder(t+n.range(-.05,.05),e+r*.2,i+n.range(-.05,.05),.34,.34,.19,12,{layer:X.POLYMER,tint:[.55,.55,.57],wear:.8,uvScale:1.6,caps:!1,rotY:n.range(0,3.14)}),a.addCylinder(t,e+r*.2+.01,i,.19,.19,.17,10,{layer:X.POLYMER,tint:[.4,.4,.42],wear:.7,uvScale:2,caps:!0});return a.addCollisionBox(t,e+s*.1,i,.68,s*.2,.68,ht.RUBBER),{x:t,z:i,height:s*.2}}function f_(a,t,e,i,n,s){const r=s.int(1,4);for(let o=0;o<r;o++){const l=e+o*.15;a.addBox(t,l+.03,i,1.15,.055,.9,{rotY:n,layer:X.WOOD,tint:s.pick(kn),wear:.9,uvScale:1.6});for(let c=0;c<3;c++)a.addBox(t+(c-1)*.42*Math.cos(n),l+.09,i-(c-1)*.42*Math.sin(n),.12,.075,.9,{rotY:n,layer:X.WOOD,tint:[.62,.52,.4],wear:.9,uvScale:2});a.addBox(t,l+.14,i,1.15,.05,.9,{rotY:n,layer:X.WOOD,tint:s.pick(kn),wear:.9,uvScale:1.6})}return a.addCollisionBox(t,e+r*.075,i,1.15,r*.15,.9,ht.WOOD,n),{x:t,z:i,height:r*.15}}function tl(a,t,e,i,n,s=1.2){const r=n.int(7,16);for(let o=0;o<r;o++){const l=n.range(0,Math.PI*2),c=Math.sqrt(n.next())*s,h=t+Math.cos(l)*c,u=i+Math.sin(l)*c,d=n.range(.12,.42)*(1-c/s*.5),g=n.bool(.6)?X.CONCRETE:X.BRICK;a.addBox(h,e+d*.35,u,d,d*n.range(.5,.9),d*n.range(.7,1.3),{rotY:n.range(0,Math.PI*2),layer:g,tint:[.92,.9,.86],wear:.95,uvScale:1.4})}return a.addCollisionBox(t,e+.18,i,s*1.5,.36,s*1.5,ht.CONCRETE),{x:t,z:i,height:.4}}function xh(a,t,e,i,n,s){const r=s.pick([[.72,.7,.66],[.45,.52,.58],[.62,.56,.42],[.35,.38,.4]]),o=s.range(.5,.9),l=s.range(4.3,5),c=1.85,h=.35,u={rotY:n,layer:X.METAL_PAINTED,tint:r,wear:o,uvScale:.9};a.addBox(t,e+h+.28,i,l,.5,c,{...u,collide:!0,surface:ht.METAL});const d=l*.16,g=t+Math.cos(n)*d,m=i-Math.sin(n)*d;a.addBox(g,e+h+.86,m,l*.38,.68,c*.94,{...u,collide:!0,surface:ht.METAL}),a.addBox(g,e+h+.94,m,l*.36,.42,c*.96,{rotY:n,layer:X.GUNMETAL,tint:[.35,.42,.48],wear:.4,uvScale:1.2});const v=-l*.24,p=t+Math.cos(n)*v,f=i-Math.sin(n)*v;a.addBox(p,e+h+.72,f,l*.44,.42,c,{...u,collide:!0,surface:ht.METAL}),a.addBox(p,e+h+.66,f,l*.4,.36,c-.28,{rotY:n,layer:X.METAL_RUST,tint:[.5,.45,.4],wear:.95,uvScale:1.2});for(const[x,_]of[[l*.32,c*.5],[l*.32,-c*.5],[-l*.3,c*.5],[-l*.3,-c*.5]]){const M=t+x*Math.cos(n)+_*Math.sin(n),T=i-x*Math.sin(n)+_*Math.cos(n);a.addCylinder(M,e+h,T,h,h,.24,12,{layer:X.POLYMER,tint:[.5,.5,.52],wear:.8,uvScale:1.6,caps:!0,rotY:n+Math.PI*.5})}const S=l*.5;return a.addBox(t+Math.cos(n)*S,e+h+.18,i-Math.sin(n)*S,.12,.22,c*.92,{rotY:n,layer:X.METAL_RUST,tint:[.62,.62,.6],wear:.9,uvScale:1.6}),a.addCollisionBox(t,e+h+.5,i,l,1.4,c+.2,ht.METAL,n),{x:t,z:i,height:1.7,cover:"medium"}}function p_(a,t,e,i,n,s){const r={rotY:n,layer:X.WOOD,tint:s.pick(kn),wear:.85,uvScale:1.2};a.addBox(t,e+.62,i,1.7,.09,1.05,{...r,collide:!0,surface:ht.WOOD}),a.addBox(t,e+.78,i,1.7,.26,.06,r);for(const l of[-1,1]){const c=t+Math.sin(n)*.52*l,h=i+Math.cos(n)*.52*l;a.addCylinder(c,e+.3,h,.3,.3,.08,12,{layer:X.METAL_RUST,tint:[.55,.5,.45],wear:.9,uvScale:1.6,rotY:n+Math.PI*.5})}const o=.95;return a.addBox(t+Math.cos(n)*o,e+.68,i-Math.sin(n)*o,.6,.07,.07,r),a.addCollisionBox(t,e+.45,i,1.8,.9,1.1,ht.WOOD,n),{x:t,z:i,height:.9,cover:"low"}}function yh(a,t,e,i,n,s){const r=s.range(4.5,7.5),o=s.range(-.12,.12),l=9,c=[];for(let u=0;u<=l;u++){const d=u/l;c.push(new y(e+o*d*d*r*.3,i+d*r,n+o*.4*d*d*r*.2))}for(let u=0;u<l;u++){const g=.24*(1-u/l*.42);a.addCylinder(c[u].x,c[u].y,c[u].z,g,g*.94,r/l,8,{layer:X.WOOD,tint:[.72,.64,.5],wear:.9,uvScale:1.2,caps:!1}),u%2===0&&a.addCylinder(c[u].x,c[u].y-.03,c[u].z,g+.045,g+.02,.1,8,{layer:X.WOOD,tint:[.6,.52,.4],wear:.95,uvScale:2,caps:!1})}a.addCollisionBox(e,i+r*.5,n,.5,r,.5,ht.WOOD);const h=c[l];return t.push({type:"palm",center:h.clone(),fronds:s.int(8,13),length:s.range(1.6,2.5),tint:[.42,.52,.3],amplitude:s.range(.05,.12),phase:s.range(0,6.28),seed:s.next()}),{x:e,z:n,height:r}}function el(a,t,e,i,n,s=1){const r=n.int(5,10),o=n.pick([[.48,.5,.32],[.58,.54,.34],[.4,.46,.28]]);for(let l=0;l<r;l++){const c=n.range(0,Math.PI*2),h=n.range(.02,.22)*s,u=n.range(.25,.62)*s;a.addBox(t+Math.cos(c)*h,e+u*.5,i+Math.sin(c)*h,.04*s,u,n.range(.16,.34)*s,{rotY:c,layer:X.FABRIC,tint:o,wear:.9,uvScale:2.2})}return{x:t,z:i,height:.5*s}}function m_(a,t,e,i,n,s){const r=s.pick([[.9,.85,.7],[.8,.5,.3]]),o={rotY:n,layer:X.WOOD,tint:r,wear:.85,uvScale:1.4};a.addBox(t,e+.82,i,2.2,.2,.08,o),a.addBox(t,e+.52,i,2.2,.2,.08,o);for(const l of[-1,1]){const c=t+Math.cos(n)*l*.95,h=i-Math.sin(n)*l*.95;a.addBox(c,e+.45,h,.09,.9,.5,{rotY:n,layer:X.WOOD,tint:[.6,.52,.4],wear:.9,uvScale:2})}return a.addCollisionBox(t,e+.45,i,2.2,.9,.4,ht.WOOD,n),{x:t,z:i,height:.92,cover:"low"}}function g_(a,t,e,i,n,s,r=11,o=8.5){const h=Math.cos(n),u=Math.sin(n),d=[.94,.9,.82],g={rotY:n,layer:X.CONCRETE,tint:d,wear:.7,uvScale:.35};for(const f of[-1,1]){const S=t+h*f*(r*.5),x=i-u*f*(r*.5);a.addBox(S,e+o*.42,x,2.3,o*.84,2.4,{...g,collide:!0,surface:ht.CONCRETE}),a.addBox(S,e+.3,x,2.3+.45,.6,2.4+.45,{...g,collide:!0,surface:ht.CONCRETE}),a.addBox(S,e+o*.84+.16,x,2.3+.35,.32,2.4+.35,{...g,collide:!0,surface:ht.CONCRETE}),a.addBox(S,e+o*.45,x-(2.4*.5+.01)*h,2.3*.6,o*.5,.06,{rotY:n,layer:X.PLASTER_BEIGE,tint:[.86,.82,.74],wear:.8,uvScale:.5})}const m=13,v=r*.5,p=e+o*.62;for(let f=0;f<=m;f++){const S=f/m,x=Math.PI*S,_=-Math.cos(x)*v,M=Math.sin(x)*v*.55,T=t+h*_,E=i-u*_;a.addBox(T,p+M,E,r/m*1.25,.85,2.4*.92,{rotY:n,layer:X.CONCRETE,tint:[d[0]*(.95+f%2*.06),d[1],d[2]],wear:.75,uvScale:.45,collide:!0,surface:ht.CONCRETE})}if(a.addBox(t,e+o+.5,i,r+2.3+1.4,1,2.4+.5,{...g,collide:!0,surface:ht.CONCRETE}),a.addBox(t,e+o+1.25,i,r+2.3+.9,.5,2.4+.2,{...g,collide:!0,surface:ht.CONCRETE}),s.bool(.8)){const f=s.bool()?1:-1;a.addBox(t+h*f*(r*.5+2.3*.4),e+o*.9,i-u*f*(r*.5+2.3*.4),1.1,1.3,1.1,{rotY:n+.6,layer:X.CONCRETE,tint:[.7,.68,.64],wear:1,uvScale:.7})}return{x:t,z:i,height:o}}function v_(a,t,e,i,n,s=0){const r=n.range(4.2,5.4);a.addCylinder(t,e,i,.13,.09,r,8,{layer:X.METAL_PAINTED,tint:[.42,.44,.42],wear:.8,uvScale:1,collide:!0,surface:ht.METAL}),a.addBox(t,e+.16,i,.34,.32,.34,{layer:X.CONCRETE,tint:[.85,.83,.8],wear:.85,uvScale:1.4});const o=.9;return a.addBox(t+Math.cos(s)*o*.5,e+r-.1,i-Math.sin(s)*o*.5,o,.08,.08,{rotY:s,layer:X.METAL_PAINTED,tint:[.42,.44,.42],wear:.8,uvScale:2}),a.addBox(t+Math.cos(s)*o,e+r-.18,i-Math.sin(s)*o,.5,.16,.26,{rotY:s,layer:X.METAL_PAINTED,tint:[.7,.68,.62],wear:.7,uvScale:1.6}),{x:t,z:i,height:r}}function __(a,t,e,i,n){const s=n.next();if(s<.3)a.addBox(t,e+.035,i,n.range(.18,.26),.07,n.range(.09,.13),{rotY:n.range(0,3.14),layer:X.BRICK,tint:[.95,.9,.86],wear:.95,uvScale:2.4});else if(s<.5)a.addBox(t,e+.02,i,n.range(.5,1.4),.035,n.range(.09,.16),{rotY:n.range(0,3.14),layer:X.WOOD,tint:[.68,.58,.44],wear:.95,uvScale:1.6});else if(s<.66)a.addCylinder(t,e,i,.035,.035,.11,7,{layer:X.METAL_PAINTED,tint:n.pick([[.7,.7,.72],[.8,.5,.3],[.4,.6,.7]]),wear:.9,uvScale:3,rotY:n.range(0,3.14)});else if(s<.84){const r=n.int(3,7);for(let o=0;o<r;o++){const l=n.range(.05,.13);a.addBox(t+n.range(-.4,.4),e+l*.4,i+n.range(-.4,.4),l,l*.7,l,{rotY:n.range(0,3.14),layer:X.GRAVEL,tint:[.95,.92,.88],wear:.95,uvScale:3})}}else a.addBox(t,e+.008,i,n.range(.14,.24),.012,n.range(.12,.2),{rotY:n.range(0,3.14),layer:X.FABRIC,tint:[1,.98,.94],wear:.7,uvScale:3})}const il={FABRIC_TINTS:Gl};function x_(a,t){const e=Math.floor(a),i=Math.floor(t),n=a-e,s=t-i,r=n*n*(3-2*n),o=s*s*(3-2*s),l=lr(e,i),c=lr(e+1,i),h=lr(e,i+1),u=lr(e+1,i+1);return(l*(1-r)+c*r)*(1-o)+(h*(1-r)+u*r)*o}function ys(a,t,e=4,i=.5){let n=0,s=.5,r=0;for(let o=0;o<e;o++)n+=s*x_(a,t),r+=s,s*=i,a=a*2.03+17.3,t=t*2.03-9.1;return n/r}function Si(a,t,e){const i=Math.min(1,Math.max(0,(e-a)/(t-a)));return i*i*(3-2*i)}const mt={innerRow:{x0:10,x1:24},alley:{x0:24,x1:28.6},outerRow:{x0:28.6,x1:43},boundary:48,zMin:-76,zMax:76,crossAlleys:[[-35,-29.5],[13.5,19]],plaza:{z0:35,z1:62},archZ:47,marketLane:[-19,12],spawnA:{z:-66},spawnB:{z:66}};function we(a,t){const e=Math.abs(a);let i=0;const n=1-Si(6.2,7.4,e);i+=.055*n*(1-Math.pow(Math.min(e,7)/7,2)),i-=.06*Si(5.9,7,e)*(1-Si(7,7.7,e)),i+=.155*Si(7.35,7.95,e)*(1-Si(9.8,10.4,e)),i+=.09*Si(23.4,24.4,e)*(1-Si(28.2,29.2,e));const s=Si(33,37,t)*(1-Si(60,64,t))*(1-Si(17,21,e));i+=s*(.1-.14*(1-Math.pow(Math.min(e,18)/18,2))),i+=(ys(a*.09,t*.09,4,.5)-.5)*.09,i+=(ys(a*.42+40,t*.42-12,3,.5)-.5)*.035;const r=Si(9.5,13,e)*(1-Si(20,24,e));return i+=r*ys(a*.2,t*.2,3,.6)*.09,i}function y_(a,t){const e=Math.abs(a),i=ys(a*.06+3,t*.06-7,3,.6);return e<7.2?i>.66?X.SAND:X.ASPHALT:e<10.3?X.CONCRETE:t>mt.plaza.z0&&t<mt.plaza.z1&&e<20?i>.58?X.SAND:X.CONCRETE:e>23.4&&e<29.2?i>.6?X.SAND:X.ASPHALT:i>.48?X.SAND:X.GRAVEL}function S_(a,t){const e=ys(a*.13-11,t*.13+5,3,.55),i=ys(a*.85+23,t*.85-17,2,.5);let n=.84+e*.3+(i-.5)*.11;const s=Math.abs(a),r=Math.exp(-Math.pow((s-3.4)/1.5,2)),o=(ys(t*.05,0,2,.5)-.5)*.5,l=r*(.75+o)*(1-Si(6.6,8,s));return n*=1-l*.17,[n,n*(.995-l*.012),n*(.97+l*.03)]}function w_(a,t,e,i,n=8.5,s=16){const r=[];let o=a;for(;o<t-3;){let l=i.range(n,s),c=Math.min(o+l,t),h=!1;for(const[u,d]of e)if(o<d&&c>u){if(o>=u-.01){o=d,h=!0;break}c=u}h||(c-o>=5.5&&r.push([o,c-i.range(.15,.5)]),o=c+i.range(.1,.4))}return r}function Sh(a,t){return[a[0]*t,a[1]*t,a[2]*t]}function M_(a,t,e,i,n){const s=r=>e.some(([o,l])=>Math.abs(r-o)<1.2||Math.abs(r-l)<1.2);return[s(a)||a<=i+1.5,!0,s(t)||t>=n-1.5,!0]}class b_{constructor(t=zl){this.seed=t,this.rng=new Ms(t)}generate(){const t=this.rng,e=new cv(6e4),i=new qi(e,"ground"),n=new qi(e,"structure"),s=new qi(null,"detail"),r=new qi(e,"props"),o=new qi(null,"clutter"),l=[],c=[],h=[],u=[],d=[],g=[];i.addGroundGrid(-52,mt.zMin-4,mt.boundary+4,mt.zMax+4,168,we,{uvScale:.5,wear:.7,collide:!0,surface:ht.CONCRETE,layerFn:y_,tintFn:S_});const m=t.fork(11),v=mt.crossAlleys,p=[];for(const M of[1,-1]){const T=M>0?mt.innerRow.x0:-24,E=M>0?mt.innerRow.x1:-10;p.push({x0:T,x1:E,z0:mt.zMin,z1:mt.plaza.z0,gaps:v,inner:!0,sign:M}),p.push({x0:T,x1:E,z0:mt.plaza.z1,z1:mt.zMax,gaps:[],inner:!0,sign:M});const R=M>0?mt.outerRow.x0:-43,w=M>0?mt.outerRow.x1:-28.6;p.push({x0:R,x1:w,z0:mt.zMin,z1:mt.zMax,gaps:v,inner:!1,sign:M})}let f=6;for(const M of p){const T=w_(M.z0,M.z1,M.gaps,m);for(const[E,R]of T){M.x1-M.x0;const w=M.inner?0:m.range(0,2.2),b=M.sign>0?{x0:M.x0+w,x1:M.x1,z0:E,z1:R}:{x0:M.x0,x1:M.x1-w,z0:E,z1:R},L=M_(E,R,M.gaps,M.z0,M.z1);M.sign>0?(L[3]=!0,L[1]=!0):(L[1]=!0,L[3]=!0);const P=M.inner&&f>0&&m.bool(.34)&&R-E>9;P&&f--;const B=l_({builder:n,detail:s,rng:m,lot:b,openSides:L,floors:m.next()<.42?2:3,hollow:P,style:ds[m.int(0,ds.length-1)]});u.push(B),B.interior&&d.push(B.interior),h.push({x:M.sign>0?b.x0-.9:b.x1+.9,z:E+.8,type:"corner",height:1.9},{x:M.sign>0?b.x0-.9:b.x1+.9,z:R-.8,type:"corner",height:1.9})}}this._buildBoundary(n,s,t.fork(21)),g_(n,0,we(0,mt.archZ),mt.archZ,0,t.fork(33),11.5,8.8),h.push({x:-6.2,z:mt.archZ,type:"pier",height:2.2},{x:6.2,z:mt.archZ,type:"pier",height:2.2}),this._dressStreet(r,o,l,c,h,g,t.fork(41),u),this._dressAlleys(r,o,l,h,t.fork(53)),this._dressPlaza(r,o,l,h,t.fork(67)),this._scatterGround(o,t.fork(79)),this._stringCables(c,l,t.fork(83),u);const S=t.fork(97),x=[],_=[];for(let M=0;M<8;M++){const T=S.range(-14,14);x.push(new y(T,we(T,mt.spawnA.z+S.range(-5,5))+.05,mt.spawnA.z+S.range(-5,5)));const E=S.range(-14,14);_.push(new y(E,we(E,mt.spawnB.z+S.range(-5,5))+.05,mt.spawnB.z+S.range(-5,5)))}for(const M of[-26.3,26.3])x.push(new y(M,we(M,-58)+.05,-58)),_.push(new y(M,we(M,58)+.05,58));return{soup:e,batches:[i,n,s,r,o].filter(M=>!M.isEmpty()),cloth:l,cables:c,coverPoints:h,buildings:u,interiors:d,ambientEmitters:g,spawns:{A:x,B:_},bounds:new _n(new y(-48,-2,mt.zMin),new y(mt.boundary,30,mt.zMax)),playBounds:{x0:-43,x1:mt.outerRow.x1,z0:mt.zMin+2,z1:mt.zMax-2},triangleCount:e.count}}_buildBoundary(t,e,i){const n=mt.boundary,s=mt.zMin,r=mt.zMax;for(const o of[1,-1]){let l=s;for(;l<r;){const c=i.range(11,20),h=Math.min(l+c,r),u=i.range(7.5,13.5),d=ds[i.int(0,ds.length-1)];t.addBox(o*(n+3),u*.5,(l+h)*.5,8,u,h-l-.3,{layer:d.layer,tint:d.tint,wear:i.range(.5,.9),uvScale:.4,collide:!0,surface:ht.PLASTER}),e.addBox(o*(n-.9),u*.5+.5,(l+h)*.5,.5,1,h-l-.3,{layer:X.CONCRETE,tint:[.86,.84,.8],wear:.85,uvScale:.5}),l=h}}for(const o of[1,-1]){const l=o>0?r+4:s-4;t.addBox(0,7,l,(n+8)*2,14,10,{layer:X.PLASTER_BEIGE,tint:[.88,.85,.79],wear:.8,uvScale:.4,collide:!0,surface:ht.PLASTER})}this._buildSkyline(e,i.fork(7)),t.addCollisionBox(0,34,0,(n+10)*2,1,r-s+20,ht.CONCRETE)}_buildSkyline(t,e){const i=mt.boundary,n=mt.zMin,s=mt.zMax;for(const r of[{off:14,hMin:9,hMax:17,step:[10,18]},{off:34,hMin:14,hMax:26,step:[14,26]}]){const o=n-r.off-20,l=s+r.off+20;for(const c of[1,-1]){let h=o;for(;h<l;){const u=e.range(r.step[0],r.step[1]);this._skylineBlock(t,e,c*(i+r.off),h+u*.5,u,r),h+=u+e.range(1,6)}}for(const c of[s+r.off,n-r.off]){let h=-i-r.off;for(;h<i+r.off;){const u=e.range(r.step[0],r.step[1]);this._skylineBlock(t,e,h+u*.5,c,u,r,!0),h+=u+e.range(1,6)}}}}_skylineBlock(t,e,i,n,s,r,o=!1){const l=e.range(r.hMin,r.hMax),c=e.range(7,12),h=ds[e.int(0,ds.length-1)],u=o?s:c,d=o?c:s;t.addBox(i,l*.5,n,u,l,d,{layer:h.layer,tint:Sh(h.tint,e.range(.82,1)),wear:e.range(.5,.95),uvScale:.35});const g=e.int(0,2);for(let m=0;m<g;m++){const v=e.range(1.5,3.2),p=e.range(1.4,2.8);t.addBox(i+e.range(-u*.3,u*.3),l+p*.5,n+e.range(-d*.3,d*.3),v,p,v*e.range(.7,1.2),{layer:h.layer,tint:Sh(h.tint,.92),wear:.8,uvScale:.5})}}_dressStreet(t,e,i,n,s,r,o,l){const[c,h]=mt.marketLane;for(const m of[1,-1]){let v=c;for(;v<h;){const p=o.range(3,4.6),f=m*o.range(4.4,6.3),S=we(f,v),x=_h(t,i,f,S,v,m>0?Math.PI*.5:-Math.PI*.5,o,o.range(2.3,3.2),o.range(1.5,2.1));s.push({x:x.x,z:x.z,type:"stall",height:1}),v+=p}for(let p=c;p<h;p+=o.range(4,6.2)){const f=o.range(2.45,2.95),S=m*o.range(7.8,8.6);i.push({type:"awning",center:new y(S,we(S,p)+f,p),width:o.range(3,4.2),depth:o.range(2.6,5.2),rotY:o.range(-.09,.09),sag:o.range(.22,.46),tint:o.pick(il.FABRIC_TINTS),amplitude:o.range(.03,.09),phase:o.range(0,6.28)});for(const x of[-1,1]){const _=o.bool(.45),M=m*o.range(9.3,9.9),T=p+x*o.range(1.3,1.9),E=f+o.range(-.12,.1);t.addBox(M,we(M,T)+E*.5,T,_?.11:.075,E,_?.11:.075,{rotY:o.range(-.05,.05),layer:_?X.WOOD:X.METAL_PAINTED,tint:_?[.62,.5,.36]:[.5,.5,.48],wear:o.range(.7,.95),uvScale:2,collide:!0,surface:_?ht.WOOD:ht.METAL})}o.bool(.6)&&n.push({a:new y(m*9.6,we(m*9.6,p)+f,p),b:new y(m*10.2,we(m*10.2,p)+f+o.range(.8,1.6),p+o.range(-.5,.5)),sag:o.range(.02,.08),amplitude:o.range(.004,.012),phase:o.range(0,6.28),radius:o.range(.008,.014)})}}const u=[[-62,-46],[-40,-24],[-14,4],[20,33],[40,58]];for(const[m,v]of u){const p=o.int(3,6);for(let f=0;f<p;f++){const S=f/Math.max(1,p-1),x=m+(v-m)*S+o.range(-1.5,1.5),_=o.range(-5.6,5.6),M=we(_,x),T=o.next();if(T<.42){const E=o.bool(.7)?o.range(-.25,.25):Math.PI*.5+o.range(-.3,.3),R=vh(t,_,M,x,E,o,o.range(2,2.8));s.push({...R,type:"barrier"})}else if(T<.6){const E=Jo(t,_,M,x,o.range(0,Math.PI),o,o.range(1.8,3),o.int(2,4));s.push({...E,type:"sandbags"})}else if(T<.74){const E=Wl(t,_,M,x,o.range(0,Math.PI),o,o.int(2,4));s.push({...E,type:"crates"})}else if(T<.86)Qo(t,_,M,x,o),o.bool(.6)&&Qo(t,_+o.range(.55,.8),M,x+o.range(-.4,.4),o),s.push({x:_,z:x,type:"drums",height:.9});else{const E=m_(t,_,M,x,o.range(0,Math.PI),o);s.push({...E,type:"barricade"})}}}const d=[-56,-38,-21,8,26,41,55];for(const m of d){if(o.bool(.25))continue;const v=o.bool()?1:-1,p=v*o.range(4.2,5.6),f=(v>0?-Math.PI*.5:Math.PI*.5)+o.range(-.18,.18),S=xh(t,p,we(p,m),m+o.range(-2,2),f,o);s.push({...S,type:"vehicle"})}for(let m=mt.zMin+12;m<mt.zMax-12;m+=o.range(16,26)){const v=o.bool()?1:-1,p=v*8.6;v_(t,p,we(p,m),m,o,v>0?Math.PI:0),r.push({type:"lamp",position:new y(p,we(p,m)+4.6,m)})}for(let m=0;m<8;m++){const p=(o.bool()?1:-1)*o.range(6.2,8.2),f=o.range(mt.zMin+14,mt.zMax-14);p_(t,p,we(p,f),f,o.range(0,Math.PI*2),o),s.push({x:p,z:f,type:"cart",height:.9})}for(let m=0;m<11;m++){const p=(o.bool()?1:-1)*o.range(8,9.6),f=o.range(mt.zMin+10,mt.zMax-10);f>mt.plaza.z0&&f<mt.plaza.z1||yh(t,i,p,we(p,f),f,o)}for(let m=0;m<46;m++){const v=o.range(-9.8,9.8),p=o.range(mt.zMin+6,mt.zMax-6);Math.abs(v)<7.2&&o.bool(.7)||el(e,v,we(v,p),p,o,o.range(.6,1.3))}const g=l.filter(m=>m.balconies.length>0);for(let m=0;m<Math.min(10,g.length);m++){const v=g[o.int(0,g.length-1)];v.balconies[o.int(0,v.balconies.length-1)];const p=o.range(v.z0+1,v.z1-1),f=o.range(4.2,7.5),S=v.cx>0?v.x0-.2:v.x1+.2,x=v.cx>0?Math.max(7.6,v.x0-o.range(3,6.5)):Math.min(-7.6,v.x1+o.range(3,6.5));i.push({type:"laundry",a:new y(S,f,p),b:new y(x,f-o.range(-.4,.6),p),items:o.int(3,7),tint:o.pick(il.FABRIC_TINTS),amplitude:o.range(.06,.16),phase:o.range(0,6.28),seed:o.next()})}}_dressAlleys(t,e,i,n,s){for(const r of[1,-1]){const o=r*(mt.alley.x0+mt.alley.x1)*.5;for(let l=mt.zMin+8;l<mt.zMax-8;l+=s.range(5,11)){const c=o+s.range(-1.4,1.4),h=we(c,l),u=s.next();if(u<.22)Qo(t,c,h,l,s),n.push({x:c,z:l,type:"drum",height:.9});else if(u<.4){const d=Wl(t,c,h,l,s.range(0,Math.PI),s,s.int(1,3));n.push({...d,type:"crates"})}else if(u<.54)f_(t,c,h,l,s.range(0,Math.PI),s);else if(u<.66)d_(t,c,h,l,s,s.int(2,4));else if(u<.76){const d=Jo(t,c,h,l,r>0?0:Math.PI,s,s.range(1.6,2.4),s.int(2,3));n.push({...d,type:"sandbags"})}else u<.86?(tl(t,c,h,l,s,s.range(.8,1.6)),n.push({x:c,z:l,type:"rubble",height:.5})):(u_(t,c,h,l,s),el(e,c+s.range(-.6,.6),h,l+s.range(-.6,.6),s,.8))}for(let l=mt.zMin+16;l<mt.zMax-16;l+=s.range(14,26))i.push({type:"laundry",a:new y(r*(mt.alley.x0+.4),s.range(3.6,6.4),l),b:new y(r*(mt.alley.x1-.4),s.range(3.6,6.4),l+s.range(-.6,.6)),items:s.int(2,5),tint:s.pick(il.FABRIC_TINTS),amplitude:s.range(.08,.2),phase:s.range(0,6.28),seed:s.next()})}}_dressPlaza(t,e,i,n,s){const{z0:r,z1:o}=mt.plaza;for(let h=0;h<16;h++){const u=h/16*Math.PI*2,d=14+s.range(-2.5,2.5),g=10+s.range(-2.5,2.5),m=Math.cos(u)*d,v=(r+o)*.5+Math.sin(u)*g;if(Math.abs(v-mt.archZ)<4&&Math.abs(m)<8)continue;const p=we(m,v),f=s.next();if(f<.35){const S=vh(t,m,p,v,u+Math.PI*.5,s,s.range(2,2.6));n.push({...S,type:"barrier"})}else if(f<.6)t.addBox(m,p+.42,v,s.range(1.2,2),.84,s.range(.7,1.1),{rotY:u,layer:X.CONCRETE,tint:[.92,.89,.84],wear:.85,uvScale:.7,collide:!0,surface:ht.CONCRETE}),el(e,m,p+.84,v,s,.9),n.push({x:m,z:v,type:"planter",height:.9});else if(f<.8){const S=Jo(t,m,p,v,u,s,s.range(2,3.2),s.int(2,4));n.push({...S,type:"sandbags"})}else tl(t,m,p,v,s,s.range(1,2))}for(let h=0;h<5;h++){const u=s.range(-16,16),d=s.range(r+4,o-4);Math.abs(d-mt.archZ)<5||(_h(t,i,u,we(u,d),d,s.range(0,Math.PI*2),s),n.push({x:u,z:d,type:"stall",height:1}))}for(let h=0;h<5;h++){const u=s.range(-17,17),d=s.range(r+3,o-3);Math.abs(d-mt.archZ)<4||yh(t,i,u,we(u,d),d,s)}const l=s.range(-10,10),c=s.range(r+6,mt.archZ-5);xh(t,l,we(l,c),c,s.range(0,Math.PI*2),s),tl(t,l+2.4,we(l+2.4,c),c+1.1,s,1.6),n.push({x:l,z:c,type:"vehicle",height:1.7})}_scatterGround(t,e){for(let i=0;i<620;i++){const n=e.range(-42,mt.boundary-6),s=e.range(mt.zMin+6,mt.zMax-6),r=Math.abs(n);r>10.4&&r<23.6||r>29.4&&r<43.2||r>43.5||__(t,n,we(n,s),s,e)}}_stringCables(t,e,i,n){for(let s=mt.zMin+10;s<mt.zMax-10;s+=i.range(9,17)){if(s>mt.plaza.z0-2&&s<mt.plaza.z1+2)continue;const r=i.int(2,4),o=i.range(5.4,8.4);for(let l=0;l<r;l++)t.push({a:new y(-10+i.range(-.5,.5),o+l*i.range(.35,.7),s+i.range(-.6,.6)),b:new y(10+i.range(-.5,.5),o+l*i.range(.3,.65)+i.range(-.5,.5),s+i.range(-.6,.6)),sag:i.range(.7,1.9),amplitude:i.range(.012,.045),phase:i.range(0,6.28),radius:i.range(.018,.035)})}for(const s of[1,-1])for(let r=mt.zMin+14;r<mt.zMax-14;r+=i.range(15,30))t.push({a:new y(s*(mt.alley.x0+.2),i.range(4.5,7),r),b:new y(s*(mt.alley.x1-.2),i.range(4.5,7),r+i.range(-1.5,1.5)),sag:i.range(.4,1),amplitude:i.range(.02,.05),phase:i.range(0,6.28),radius:i.range(.016,.03)})}}const ii=5;class T_{constructor(t,e){this.pieces=[],this.time=0,this.windStrength=1,this.gust=0;const i=[],n=[],s=[],r=[],o=[],l=[],c=[],h=[],u=[],d=[];let g=0;const m=(p,f,S,x,_,M,T,E,R,w,b,L,P,B,k,F)=>(i.push(p,f,S),n.push(x,_,M),s.push(T,E),r.push(R),o.push(w[0],w[1],w[2]),l.push(b),h.push(L),u.push(P),d.push(B,k,F),g++);for(const p of t)if(p.type==="awning"){const f=g,S=Math.cos(p.rotY),x=Math.sin(p.rotY);for(let _=0;_<=ii;_++)for(let M=0;M<=ii;M++){const T=M/ii-.5,E=_/ii-.5,R=T*p.width,w=E*p.depth,b=-p.sag*(1-T*T*4)*(1-E*E*4)*.9,L=p.center.x+R*S+w*x,P=p.center.z-R*x+w*S,B=p.center.y+b,k=Math.min(1,Math.min(.5-Math.abs(T),.5-Math.abs(E))*3.2);m(L,B,P,0,1,0,M/ii*p.width*.6,_/ii*p.depth*.6,X.FABRIC,p.tint,.7,p.phase+M*.4+_*.25,k*p.amplitude*8,0,1,0)}for(let _=0;_<ii;_++)for(let M=0;M<ii;M++){const T=f+_*(ii+1)+M,E=T+ii+1;c.push(T,E,T+1,T+1,E,E+1)}this.pieces.push({type:"awning",start:f,count:g-f})}else if(p.type==="laundry"){const f=new y().subVectors(p.b,p.a),S=f.length();f.normalize();const x=new y(-f.z,0,f.x).normalize();for(let T=0;T<p.items;T++){const E=(T+.5)/p.items,R=.34+T%3*.12,w=.5+(T*7+3)%5*.16,b=new y().copy(p.a).addScaledVector(f,S*E);b.y-=Math.sin(E*Math.PI)*.22;const L=g,P=2,B=3;for(let k=0;k<=B;k++)for(let F=0;F<=P;F++){const N=(F/P-.5)*R,z=-(k/B)*w,U=b.x+f.x*N,W=b.y+z,J=b.z+f.z*N;m(U,W,J,x.x,0,x.z,F/P*.5,k/B*.6,X.FABRIC,p.tint,.75,p.phase+T*1.7+F*.3,k/B*p.amplitude*12,x.x,.15,x.z)}for(let k=0;k<B;k++)for(let F=0;F<P;F++){const N=L+k*(P+1)+F,z=N+P+1;c.push(N,z,N+1,N+1,z,z+1)}}const _=g,M=8;for(let T=0;T<=M;T++){const E=T/M,R=new y().copy(p.a).addScaledVector(f,S*E);R.y-=Math.sin(E*Math.PI)*.22,m(R.x,R.y+.012,R.z,0,1,0,E*3,0,X.METAL_RUST,[.5,.5,.5],.9,p.phase,0,0,1,0),m(R.x+x.x*.014,R.y-.012,R.z+x.z*.014,0,1,0,E*3,.05,X.METAL_RUST,[.5,.5,.5],.9,p.phase,0,0,1,0)}for(let T=0;T<M;T++){const E=_+T*2;c.push(E,E+2,E+3,E,E+3,E+1)}}else if(p.type==="palm")for(let f=0;f<p.fronds;f++){const S=f/p.fronds*Math.PI*2+p.seed*6.28,x=.35+f*13%7/7*.5,_=p.length*(.75+f*5%4/4*.5),M=4,T=g,E=Math.cos(S),R=Math.sin(S);for(let w=0;w<=M;w++){const b=w/M,L=b*_,P=p.center.y+.15-x*b*b*_*.55,B=(.16+.1*Math.sin(b*Math.PI))*(1-b*.55),k=p.center.x+E*L,F=p.center.z+R*L,N=-R,z=E;m(k-N*B,P,F-z*B,0,1,0,b*2,0,X.FABRIC,p.tint,.8,p.phase+f*.9,b*b*p.amplitude*14,N*.4,1,z*.4),m(k+N*B,P,F+z*B,0,1,0,b*2,1,X.FABRIC,p.tint,.8,p.phase+f*.9+.2,b*b*p.amplitude*14,N*.4,1,z*.4)}for(let w=0;w<M;w++){const b=T+w*2;c.push(b,b+2,b+3,b,b+3,b+1)}}this.count=g,this.basePos=new Float32Array(i),this.phase=new Float32Array(h),this.weight=new Float32Array(u),this.axis=new Float32Array(d);const v=new ti;this.positionAttr=new Xt(new Float32Array(i),3),this.positionAttr.setUsage(35048),this.normalAttr=new Xt(new Float32Array(n),3),this.normalAttr.setUsage(35048),v.setAttribute("position",this.positionAttr),v.setAttribute("normal",this.normalAttr),v.setAttribute("uv",new Xt(new Float32Array(s),2)),v.setAttribute("aLayer",new Xt(new Float32Array(r),1)),v.setAttribute("aTint",new Xt(new Float32Array(o),3)),v.setAttribute("aWear",new Xt(new Float32Array(l),1)),v.setIndex(new Xt(g>65535?new Uint32Array(c):new Uint16Array(c),1)),v.computeBoundingSphere(),v.boundingSphere.radius*=1.2,this.geometry=v,this.mesh=new Ee(v,e),this.mesh.frustumCulled=!1,this.mesh.name="cloth",this._localImpulses=[]}addImpulse(t,e,i=3.5){this._localImpulses.push({p:t.clone(),s:e,r:i,life:.55}),this._localImpulses.length>8&&this._localImpulses.shift()}update(t,e){this.time=e;const i=this.basePos,n=this.positionAttr.array,s=this.phase,r=this.weight,o=this.axis;this.gust=Math.max(0,this.gust-t*.6),Math.sin(e*.19)>.985&&(this.gust=1.2);const l=.55+.45*Math.sin(e*.31),c=this.windStrength*(l+this.gust*.7);for(let h=this._localImpulses.length-1;h>=0;h--)this._localImpulses[h].life-=t,this._localImpulses[h].life<=0&&this._localImpulses.splice(h,1);for(let h=0;h<this.count;h++){const u=h*3,d=i[u],g=i[u+1],m=i[u+2],v=r[h];if(v<=1e-4){n[u]=d,n[u+1]=g,n[u+2]=m;continue}const p=s[h],S=(Math.sin(e*1.35+p+d*.22+m*.17)*.6+Math.sin(e*2.7+p*1.7-m*.35)*.28+Math.sin(e*5.1+p*.6+d*.9)*.12)*v*c*.035;let x=o[u]*S,_=o[u+1]*S*.55,M=o[u+2]*S;for(const T of this._localImpulses){const E=d-T.p.x,R=g-T.p.y,w=m-T.p.z,b=E*E+R*R+w*w;if(b>T.r*T.r)continue;const L=(1-Math.sqrt(b)/T.r)*T.s*T.life*v*.09,P=1/Math.max(Math.sqrt(b),.001);x+=E*P*L,_+=R*P*L*.4,M+=w*P*L}n[u]=d+x,n[u+1]=g+_,n[u+2]=m+M}this.positionAttr.needsUpdate=!0,this._refreshNormals()}_refreshNormals(){const t=this.positionAttr.array,e=this.normalAttr.array,i=ii+1;for(const n of this.pieces)if(n.type==="awning")for(let s=0;s<=ii;s++)for(let r=0;r<=ii;r++){const o=n.start+s*i+r,l=n.start+s*i+Math.min(r+1,ii),c=n.start+s*i+Math.max(r-1,0),h=n.start+Math.min(s+1,ii)*i+r,u=n.start+Math.max(s-1,0)*i+r,d=t[l*3]-t[c*3],g=t[l*3+1]-t[c*3+1],m=t[l*3+2]-t[c*3+2],v=t[h*3]-t[u*3],p=t[h*3+1]-t[u*3+1],f=t[h*3+2]-t[u*3+2];let S=g*f-m*p,x=m*v-d*f,_=d*p-g*v;const M=Math.hypot(S,x,_)||1;x<0&&(S=-S,x=-x,_=-_),e[o*3]=S/M,e[o*3+1]=x/M,e[o*3+2]=_/M}this.normalAttr.needsUpdate=!0}dispose(){this.geometry.dispose()}}const br=10,Yi=3;class E_{constructor(t,e){this.defs=t;const i=[],n=[],s=[],r=[],o=[],l=[],c=[];let h=0;for(const d of t){const g=d.b.x-d.a.x,m=d.b.y-d.a.y,v=d.b.z-d.a.z,p=Math.hypot(g,m,v)||1,f=g/p,S=m/p,x=v/p;let _=-x,M=0,T=f;const E=Math.hypot(_,M,T);E<1e-4?(_=1,M=0,T=0):(_/=E,M/=E,T/=E),d.frame={rx:_,ry:M,rz:T,ux:S*T-x*M,uy:x*_-f*T,uz:f*M-S*_};const R=h;for(let w=0;w<=br;w++)for(let b=0;b<Yi;b++)i.push(0,0,0),n.push(0,1,0),s.push(w*.5,b/Yi),r.push(X.POLYMER),o.push(.35,.34,.33),l.push(.9),h++;for(let w=0;w<br;w++)for(let b=0;b<Yi;b++){const L=R+w*Yi+b,P=R+w*Yi+(b+1)%Yi,B=L+Yi,k=P+Yi;c.push(L,k,B,L,P,k)}}const u=new ti;this.positionAttr=new Xt(new Float32Array(i),3),this.positionAttr.setUsage(35048),this.normalAttr=new Xt(new Float32Array(n),3),this.normalAttr.setUsage(35048),u.setAttribute("position",this.positionAttr),u.setAttribute("normal",this.normalAttr),u.setAttribute("uv",new Xt(new Float32Array(s),2)),u.setAttribute("aLayer",new Xt(new Float32Array(r),1)),u.setAttribute("aTint",new Xt(new Float32Array(o),3)),u.setAttribute("aWear",new Xt(new Float32Array(l),1)),u.setIndex(new Xt(h>65535?new Uint32Array(c):new Uint16Array(c),1)),this.geometry=u,this.mesh=new Ee(u,e),this.mesh.frustumCulled=!1,this.mesh.name="cables",this.update(0,0),u.computeBoundingSphere(),u.boundingSphere.radius*=1.4}update(t,e){const i=this.positionAttr.array,n=this.normalAttr.array;let s=0;for(const r of this.defs){const o=Math.sin(e*.62+r.phase)*r.amplitude+Math.sin(e*1.31+r.phase*1.7)*r.amplitude*.35;for(let l=0;l<=br;l++){const c=l/br,h=Math.sin(c*Math.PI)*r.sag,u=Math.sin(c*Math.PI)*o,d=r.a.x+(r.b.x-r.a.x)*c,g=r.a.y+(r.b.y-r.a.y)*c-h+u*.4,m=r.a.z+(r.b.z-r.a.z)*c+u,v=r.frame;for(let p=0;p<Yi;p++){const f=p/Yi*Math.PI*2,S=Math.cos(f),x=Math.sin(f),_=v.rx*S+v.ux*x,M=v.ry*S+v.uy*x,T=v.rz*S+v.uz*x;i[s*3]=d+_*r.radius,i[s*3+1]=g+M*r.radius,i[s*3+2]=m+T*r.radius,n[s*3]=_,n[s*3+1]=M,n[s*3+2]=T,s++}}}this.positionAttr.needsUpdate=!0,this.normalAttr.needsUpdate=!0}dispose(){this.geometry.dispose()}}class A_{constructor(t){this.factory=t,this.scene=new so,this.scene.matrixAutoUpdate=!1,this.meshes=[],this.time=0}build(t){const e=performance.now(),n=new b_(t).generate(),s=performance.now();this.data=n,this.soup=n.soup,this.bvh=new fv(n.soup);const r=performance.now(),o=this.factory.create({name:"world-static"});this.staticMaterial=o;for(const c of n.batches){const h=c.build(),u=new Ee(h,o);u.name=c.name,u.matrixAutoUpdate=!1,u.updateMatrix(),u.frustumCulled=!0,this.scene.add(u),this.meshes.push(u)}const l=this.factory.create({name:"world-cloth",side:2});return this.cloth=new T_(n.cloth,l),this.cables=new E_(n.cables,l),this.scene.add(this.cloth.mesh,this.cables.mesh),this.spawns=n.spawns,this.coverPoints=n.coverPoints,this.interiors=n.interiors,this.bounds=n.bounds,this.buildings=n.buildings,this.playBounds=n.playBounds,this.stats={triangles:n.triangleCount,drawBatches:this.meshes.length+2,vertices:this.meshes.reduce((c,h)=>c+h.geometry.attributes.position.count,0),genMs:s-e,bvhMs:r-s,cover:n.coverPoints.length,cloth:n.cloth.length,cables:n.cables.length},this}update(t,e){this.time=e,this.cloth.update(t,e),this.cables.update(t,e)}groundAt(t,e){return we(t,e)}dispose(){for(const t of this.meshes)t.geometry.dispose();this.cloth.dispose(),this.cables.dispose()}}const C_=-19.6,wh=.055,Mh=.35,R_=.55,nl=.9,_s={SPHERE:0,BOX:1};let P_=0;class L_{constructor(){this.id=P_++,this.shape=_s.SPHERE,this.half=new y(.05,.05,.05),this.radius=.05,this.position=new y,this.prevPosition=new y,this.quaternion=new Qe,this.prevQuaternion=new Qe,this.velocity=new y,this.angular=new y,this.invMass=1,this.invInertia=new y(1,1,1),this.restitution=.28,this.friction=.55,this.linearDamping=.02,this.angularDamping=.06,this.active=!1,this.sleeping=!1,this.sleepTimer=0,this.lifetime=0,this.maxLifetime=12,this.surface=ht.METAL,this.userData=null,this.onContact=null,this.ccd=!1,this.contactImpulse=0,this.group=0}setBox(t,e,i,n){this.shape=_s.BOX,this.half.set(t,e,i),this.radius=Math.sqrt(t*t+e*e+i*i),this.invMass=n>0?1/n:0;const s=n/3;return this.invInertia.set(1/(s*(e*e+i*i)),1/(s*(t*t+i*i)),1/(s*(t*t+e*e))),this}setSphere(t,e){this.shape=_s.SPHERE,this.radius=t,this.half.set(t,t,t),this.invMass=e>0?1/e:0;const i=1/(.4*e*t*t);return this.invInertia.set(i,i,i),this}wake(){this.sleeping=!1,this.sleepTimer=0}applyImpulse(t,e,i,n,s,r){this.velocity.x+=t*this.invMass,this.velocity.y+=e*this.invMass,this.velocity.z+=i*this.invMass,n!==void 0&&(gs.set(n-this.position.x,s-this.position.y,r-this.position.z),vs.set(t,e,i).cross(gs).multiplyScalar(-1),vs.applyQuaternion(sd.copy(this.quaternion).invert()),vs.multiply(this.invInertia),vs.applyQuaternion(this.quaternion),this.angular.add(vs)),this.wake()}}class D_{constructor(t,e=256){this.bvh=t,this.pool=[],this.bodies=[],this.maxBodies=e;for(let i=0;i<e;i++)this.pool.push(new L_);this.grid=new Map,this._tris=[],this._contacts=[],this._contactCount=0;for(let i=0;i<512;i++)this._contacts.push({a:null,b:null,nx:0,ny:0,nz:0,depth:0,px:0,py:0,pz:0,normalImpulse:0,tangentImpulse:0,friction:.5,restitution:.2,surface:0});this.stats={active:0,sleeping:0,contacts:0},this.onImpact=null}spawn(){const t=this.pool.pop();return t?(t.active=!0,t.sleeping=!1,t.sleepTimer=0,t.lifetime=0,t.contactImpulse=0,t.velocity.set(0,0,0),t.angular.set(0,0,0),t.quaternion.identity(),t.onContact=null,t.userData=null,t.ccd=!1,this.bodies.push(t),t):null}spawnOrRecycle(){let t=this.spawn();if(t)return t;let e=-1,i=-1;for(let s=0;s<this.bodies.length;s++){const r=this.bodies[s];if(r.group===1)continue;const o=r.lifetime+(r.sleeping?100:0);o>i&&(i=o,e=s)}if(e<0)return null;const n=this.bodies[e];return this.bodies.splice(e,1),this.pool.push(n),n.active=!1,this.spawn()}remove(t){const e=this.bodies.indexOf(t);e>=0&&(this.bodies.splice(e,1),t.active=!1,t.userData=null,this.pool.push(t))}clear(){for(;this.bodies.length;)this.remove(this.bodies[this.bodies.length-1])}step(t){const e=this.bodies;let i=0,n=0;for(let r=e.length-1;r>=0;r--){const o=e[r];if(o.lifetime+=t,o.maxLifetime>0&&o.lifetime>o.maxLifetime){this.remove(o);continue}if(o.prevPosition.copy(o.position),o.prevQuaternion.copy(o.quaternion),o.sleeping){n++;continue}if(i++,o.velocity.y+=C_*t,o.velocity.multiplyScalar(Math.max(0,1-o.linearDamping*t*60*.016)),o.angular.multiplyScalar(Math.max(0,1-o.angularDamping*t*60*.016)),o.ccd){const h=o.velocity.length()*t,u=o.radius*.8;if(h>u){const d=Math.min(6,Math.ceil(h/u)),g=t/d;for(let m=0;m<d;m++)o.position.addScaledVector(o.velocity,g),this._resolveStatic(o,g)}else o.position.addScaledVector(o.velocity,t)}else o.position.addScaledVector(o.velocity,t);const l=o.angular,c=l.length();c>1e-5&&(vs.copy(l).multiplyScalar(1/c),bh.setFromAxisAngle(vs,c*t),o.quaternion.premultiply(bh).normalize())}this._contactCount=0;for(const r of e)r.sleeping||this._resolveStatic(r,t);this._broadphase();const s=6;for(let r=0;r<s;r++)for(let o=0;o<this._contactCount;o++)this._solveContact(this._contacts[o],t,r===0);for(const r of e)r.sleeping||r.invMass===0||(r.velocity.lengthSq()<wh*wh&&r.angular.lengthSq()<Mh*Mh?(r.sleepTimer+=t,r.sleepTimer>R_&&(r.sleeping=!0,r.velocity.set(0,0,0),r.angular.set(0,0,0))):r.sleepTimer=0);this.stats.active=i,this.stats.sleeping=n,this.stats.contacts=this._contactCount}_resolveStatic(t,e){const i=this.bvh.soup,n=t.radius;let s=0;const r=this._tris;if(this.bvh.overlapBox(t.position.x-n,t.position.y-n,t.position.z-n,t.position.x+n,t.position.y+n,t.position.z+n,o=>{s<64&&(r[s++]=o)}),s!==0)for(let o=0;o<s;o++){const l=r[o];let c,h,u,d;t.shape===_s.SPHERE?(mn(i,l,t.position.x,t.position.y,t.position.z,Di),ee.subVectors(t.position,Di),d=t.radius,c=Di.x,h=Di.y,u=Di.z):(mn(i,l,t.position.x,t.position.y,t.position.z,Di),An.copy(Di).sub(t.position).applyQuaternion(sd.copy(t.quaternion).invert()),An.x=Ht.clamp(An.x,-t.half.x,t.half.x),An.y=Ht.clamp(An.y,-t.half.y,t.half.y),An.z=Ht.clamp(An.z,-t.half.z,t.half.z),xa.copy(An).applyQuaternion(t.quaternion).add(t.position),mn(i,l,xa.x,xa.y,xa.z,Di),ee.subVectors(xa,Di),d=.012,c=Di.x,h=Di.y,u=Di.z);let g=ee.length();if(g>d)continue;g<1e-6?this.bvh.triangleNormal(l,ee):ee.multiplyScalar(1/g),this.bvh.triangleNormal(l,Tr),ee.dot(Tr)<0&&Tr.multiplyScalar(-1),g<1e-6&&ee.copy(Tr);const m=d-g;if(m<=0)continue;t.position.addScaledVector(ee,m*.85),t.shape===_s.BOX&&(c+=ee.x*0),gs.set(c-t.position.x,h-t.position.y,u-t.position.z),rn.copy(t.angular).cross(gs).add(t.velocity);const v=rn.dot(ee);if(v<0){const p=v<-1.1?t.restitution:0,f=t.invMass+Gs(t,gs,ee);let S=-(1+p)*v/f;if(S>0){const x=Math.abs(v);t.contactImpulse=Math.max(t.contactImpulse,x),x>.7&&this.onImpact&&this.onImpact(t,c,h,u,x,i.surfaces[l]),t.applyImpulse(ee.x*S,ee.y*S,ee.z*S,c,h,u),rn.copy(t.angular).cross(gs).add(t.velocity),Ke.copy(rn).addScaledVector(ee,-rn.dot(ee));const _=Ke.length();if(_>1e-4){Ke.multiplyScalar(1/_);const M=t.invMass+Gs(t,gs,Ke);let T=-_/M;const E=S*t.friction;T=Ht.clamp(T,-E,E),t.applyImpulse(Ke.x*T,Ke.y*T,Ke.z*T,c,h,u)}}t.wake()}}}_broadphase(){this.grid.clear();const t=this.bodies;for(let e=0;e<t.length;e++){const i=t[e],n=Math.floor(i.position.x/nl),s=Math.floor(i.position.y/nl),r=Math.floor(i.position.z/nl),o=n*73856093^s*19349663^r*83492791;let l=this.grid.get(o);l||(l=[],this.grid.set(o,l)),l.push(e)}for(const e of this.grid.values())for(let i=0;i<e.length;i++)for(let n=i+1;n<e.length;n++){const s=t[e[i]],r=t[e[n]];s.sleeping&&r.sleeping||this._narrowphase(s,r)}}_narrowphase(t,e){if(this._contactCount>=this._contacts.length)return;const i=t.shape===_s.BOX?Math.min(t.half.x,t.half.y,t.half.z)*1.15:t.radius,n=e.shape===_s.BOX?Math.min(e.half.x,e.half.y,e.half.z)*1.15:e.radius;ee.subVectors(e.position,t.position);const s=ee.length(),r=i+n;if(s>=r||s<1e-6)return;ee.multiplyScalar(1/s);const o=this._contacts[this._contactCount++];o.a=t,o.b=e,o.nx=ee.x,o.ny=ee.y,o.nz=ee.z,o.depth=r-s,o.px=t.position.x+ee.x*i,o.py=t.position.y+ee.y*i,o.pz=t.position.z+ee.z*i,o.normalImpulse=0,o.tangentImpulse=0,o.friction=(t.friction+e.friction)*.5,o.restitution=Math.max(t.restitution,e.restitution)*.6,t.wake(),e.wake()}_solveContact(t,e,i){const n=t.a,s=t.b;ee.set(t.nx,t.ny,t.nz),va.set(t.px-n.position.x,t.py-n.position.y,t.pz-n.position.z),_a.set(t.px-s.position.x,t.py-s.position.y,t.pz-s.position.z),rn.copy(n.angular).cross(va).add(n.velocity),Er.copy(s.angular).cross(_a).add(s.velocity),ya.subVectors(Er,rn);const r=ya.dot(ee),o=n.invMass+s.invMass+Gs(n,va,ee)+Gs(s,_a,ee);if(o<1e-9)return;const l=i?Math.max(0,t.depth-.004)*.2/e:0;let h=(-(1+(r<-1?t.restitution:0))*r+l)/o;const u=t.normalImpulse;t.normalImpulse=Math.max(0,u+h),h=t.normalImpulse-u,n.applyImpulse(-ee.x*h,-ee.y*h,-ee.z*h,t.px,t.py,t.pz),s.applyImpulse(ee.x*h,ee.y*h,ee.z*h,t.px,t.py,t.pz),rn.copy(n.angular).cross(va).add(n.velocity),Er.copy(s.angular).cross(_a).add(s.velocity),ya.subVectors(Er,rn),Ke.copy(ya).addScaledVector(ee,-ya.dot(ee));const d=Ke.length();if(d>1e-5){Ke.multiplyScalar(1/d);const g=n.invMass+s.invMass+Gs(n,va,Ke)+Gs(s,_a,Ke);let m=-d/g;const v=t.normalImpulse*t.friction,p=t.tangentImpulse;t.tangentImpulse=Ht.clamp(p+m,-v,v),m=t.tangentImpulse-p,n.applyImpulse(-Ke.x*m,-Ke.y*m,-Ke.z*m,t.px,t.py,t.pz),s.applyImpulse(Ke.x*m,Ke.y*m,Ke.z*m,t.px,t.py,t.pz)}}}function Gs(a,t,e){return a.invMass===0?0:(Sa.copy(t).cross(e),Sa.applyQuaternion(I_.copy(a.quaternion).invert()),Sa.multiply(a.invInertia),Sa.applyQuaternion(a.quaternion),Th.copy(t).cross(e),Sa.dot(Th))}const Di=new y,ee=new y,Tr=new y,gs=new y,va=new y,_a=new y,Ke=new y,vs=new y,bh=new Qe,sd=new Qe,I_=new Qe,An=new y,xa=new y,rn=new y,Er=new y,ya=new y,Sa=new y,Th=new y,sl=.75,Eh=1.75,Ah=.34,Ar=.42,F_=Math.cos(50*Math.PI/180),Ch=2.45,U_=2.2,B_=8,N_=5.5,O_=8,k_=5,z_=new y(0,1,0),V_=(()=>{const a=[],t=Math.sin(.62),e=Math.cos(.62);for(let i=0;i<6;i++){const n=i/6*Math.PI*2;a.push(new y(Math.cos(n)*t,e,Math.sin(n)*t))}return a})();class H_{constructor(t,e,{buildings:i=[],playBounds:n=null}={}){this.bvh=t,this.min=new It(e.min.x,e.min.z),this.max=new It(e.max.x,e.max.z),this.cell=sl,this.w=Math.ceil((this.max.x-this.min.x)/sl),this.h=Math.ceil((this.max.y-this.min.y)/sl),this.buildings=i,this.playBounds=n;const s=this.w*this.h;this.walkable=new Uint8Array(s),this.height=new Float32Array(s),this.clearance=new Float32Array(s),this.cover=new Uint8Array(s),this.coverQuality=new Float32Array(s),this.indoor=new Uint8Array(s),this.spawnable=new Uint8Array(s),this._g=new Float32Array(s),this._f=new Float32Array(s),this._from=new Int32Array(s),this._state=new Uint8Array(s),this._stamp=new Uint16Array(s),this._generation=0,this._open=new G_(s)}index(t,e){return e*this.w+t}inBounds(t,e){return t>=0&&e>=0&&t<this.w&&e<this.h}cellX(t){return Math.floor((t-this.min.x)/this.cell)}cellZ(t){return Math.floor((t-this.min.y)/this.cell)}worldX(t){return this.min.x+(t+.5)*this.cell}worldZ(t){return this.min.y+(t+.5)*this.cell}bake(){const t=new Xi,e=new y,i=new y(0,-1,0);for(let n=0;n<this.h;n++)for(let s=0;s<this.w;s++){const r=this.index(s,n),o=this.worldX(s),l=this.worldZ(n);if(e.set(o,Ch,l),!this.bvh.raycast(e,i,Ch+40,t).hit||t.normal.y<F_||t.point.y>U_)continue;const h=t.point.y;this.height[r]=h,e.set(o,h+.12,l),!(this.bvh.raycast(e,W_,Eh,t).hit&&t.t<1.1)&&(this._inFootprint(o,l)?this.indoor[r]=1:(e.set(o,h+1.2,l),this.indoor[r]=this._enclosed(e,t)?1:0),!this._blocked(o,h,l)&&(this.walkable[r]=1))}return this._computeClearance(),this._keepLargestRegion(),this._computeCover(),this._computeSpawnable(),this}_computeSpawnable(){const t=this.playBounds;for(let e=0;e<this.h;e++)for(let i=0;i<this.w;i++){const n=this.index(i,e);if(!(!this.walkable[n]||this.indoor[n])){if(t){const s=this.worldX(i),r=this.worldZ(e);if(s<t.x0||s>t.x1||r<t.z0||r>t.z1)continue}this.spawnable[n]=1}}}_inFootprint(t,e){for(const i of this.buildings)if(t>i.x0-.5&&t<i.x1+.5&&e>i.z0-.5&&e<i.z1+.5)return!0;return!1}_enclosed(t,e){if(!this.bvh.raycast(t,z_,N_,e).hit)return!1;let i=0;for(const n of V_)this.bvh.raycast(t,n,O_,e).hit&&i++;return i>=k_}_blocked(t,e,i){const n=Ah,s=e+Ar+n,r=e+Eh-n;if(r<=s)return!1;const o=(s+r)*.5,l=n*n,c=this.bvh.soup;let h=!1;return this.bvh.overlapBox(t-n,s-n,i-n,t+n,r+n,i+n,u=>{if(!h)for(let d=0;d<3;d++){const g=d===0?s:d===1?o:r;mn(c,u,t,g,i,Cr);const m=Cr.x-t,v=Cr.y-g,p=Cr.z-i;if(m*m+v*v+p*p<l){h=!0;return}}}),h}_keepLargestRegion(){const t=this.walkable.length,e=new Int32Array(t).fill(-1),i=new Int32Array(t),n=[];for(let o=0;o<t;o++){if(!this.walkable[o]||e[o]>=0)continue;const l=n.length;let c=0,h=0,u=0;for(i[h++]=o,e[o]=l;c<h;){const d=i[c++];u++;const g=d%this.w,m=d/this.w|0;for(let v=0;v<4;v++){const p=g+al[v],f=m+rl[v];if(!this.inBounds(p,f))continue;const S=this.index(p,f);!this.walkable[S]||e[S]>=0||Math.abs(this.height[S]-this.height[d])>Ar||(e[S]=l,i[h++]=S)}}n.push(u)}let s=-1,r=0;for(let o=0;o<n.length;o++)n[o]>r&&(r=n[o],s=o);if(!(s<0)){for(let o=0;o<t;o++)this.walkable[o]&&e[o]!==s&&(this.walkable[o]=0);this.regionSize=r}}_computeClearance(){const{w:t,h:e,clearance:i,walkable:n}=this,s=1e4;for(let r=0;r<i.length;r++)i[r]=n[r]?s:0;for(let r=0;r<e;r++)for(let o=0;o<t;o++){const l=this.index(o,r);if(!n[l])continue;let c=i[l];o>0&&(c=Math.min(c,i[l-1]+1)),r>0&&(c=Math.min(c,i[l-t]+1)),o>0&&r>0&&(c=Math.min(c,i[l-t-1]+1.41)),o<t-1&&r>0&&(c=Math.min(c,i[l-t+1]+1.41)),i[l]=c}for(let r=e-1;r>=0;r--)for(let o=t-1;o>=0;o--){const l=this.index(o,r);if(!n[l])continue;let c=i[l];o<t-1&&(c=Math.min(c,i[l+1]+1)),r<e-1&&(c=Math.min(c,i[l+t]+1)),o<t-1&&r<e-1&&(c=Math.min(c,i[l+t+1]+1.41)),o>0&&r<e-1&&(c=Math.min(c,i[l+t-1]+1.41)),i[l]=c}for(let r=0;r<i.length;r++)i[r]*=this.cell;for(let r=0;r<i.length;r++)n[r]&&i[r]<Ah*.8&&(n[r]=0)}_computeCover(){const t=new Xi,e=new y,i=new y,n=1.5;for(let s=0;s<this.h;s++)for(let r=0;r<this.w;r++){const o=this.index(r,s);if(!this.walkable[o])continue;let l=0,c=0,h=0;for(let g=0;g<8;g++){const m=g/8*Math.PI*2;i.set(Math.cos(m),0,Math.sin(m)),e.set(this.worldX(r),this.height[o]+1.35,this.worldZ(s));const v=this.bvh.raycast(e,i,n,t).hit;e.y=this.height[o]+.65;const p=this.bvh.raycast(e,i,n,t).hit;v&&(l|=1<<g,c++),p&&h++}this.cover[o]=l;const u=Math.max(0,h-c)/8,d=c/8;this.coverQuality[o]=d>.8?0:d*.9+u*1.3}}isWalkableAt(t,e){const i=this.cellX(t),n=this.cellZ(e);return this.inBounds(i,n)&&this.walkable[this.index(i,n)]===1}heightAt(t,e){const i=this.cellX(t),n=this.cellZ(e);return this.inBounds(i,n)?this.height[this.index(i,n)]:0}nearestCell(t,e,i=12){const n=this.cellX(t),s=this.cellZ(e);if(this.inBounds(n,s)&&this.walkable[this.index(n,s)])return this.index(n,s);for(let r=1;r<=i;r++)for(let o=-r;o<=r;o++){const l=[[n+o,s-r],[n+o,s+r],[n-r,s+o],[n+r,s+o]];for(const[c,h]of l)if(this.inBounds(c,h)&&this.walkable[this.index(c,h)])return this.index(c,h)}return-1}findPath(t,e,i,n,s=[]){const r=this.nearestCell(t,e),o=this.nearestCell(i,n);if(s.length=0,r<0||o<0)return null;if(r===o)return s.push(new y(i,this.height[o],n)),s;const{w:l,_g:c,_f:h,_from:u,_state:d,_stamp:g}=this;this._generation=this._generation+1&65535,this._generation===0&&(g.fill(0),this._generation=1);const m=this._generation,v=this._open;v.clear();const p=o%l,f=o/l|0,S=w=>{const b=w%l,L=w/l|0,P=Math.abs(b-p),B=Math.abs(L-f);return P+B+(1.4142-2)*Math.min(P,B)};g[r]=m,c[r]=0,h[r]=S(r),u[r]=-1,d[r]=1,v.push(r,h[r]);let x=!1,_=0;const M=Math.min(this.walkable.length,6e4);for(;v.size>0&&_++<M;){const w=v.pop();if(w===o){x=!0;break}if(g[w]!==m||d[w]===2)continue;d[w]=2;const b=w%l,L=w/l|0;for(let P=0;P<8;P++){const B=b+al[P],k=L+rl[P];if(!this.inBounds(B,k))continue;const F=this.index(B,k);if(!this.walkable[F]||g[F]===m&&d[F]===2||P>=4&&(!this.walkable[this.index(b+al[P],L)]||!this.walkable[this.index(b,L+rl[P])]))continue;const N=this.height[F]-this.height[w];if(Math.abs(N)>Ar)continue;const z=(P>=4?1.4142:1)*(1+Math.abs(N)*1.2),U=Math.max(0,1.2-this.clearance[F])*1.8,W=c[w]+z+U;g[F]!==m&&(g[F]=m,d[F]=0,c[F]=1/0),W<c[F]&&(c[F]=W,u[F]=w,h[F]=W+S(F)*1.06,d[F]=1,v.push(F,h[F]))}}if(!x)return null;Cn.length=0;for(let w=o;w!==-1;w=u[w])Cn.push(w);Cn.reverse();const T=q_;T.length=0;let E=0;T.push(Cn[0]);for(let w=2;w<Cn.length;w++)this._walkLine(Cn[E],Cn[w])||(E=w-1,T.push(Cn[E]));const R=(w,b,L)=>{const P=s[s.length-1];if(P){const B=Math.hypot(w-P.x,L-P.z),k=Math.ceil(B/B_);for(let F=1;F<k;F++){const N=F/k;s.push(new y(P.x+(w-P.x)*N,P.y+(b-P.y)*N,P.z+(L-P.z)*N))}}s.push(new y(w,b,L))};for(const w of T)R(this.worldX(w%l),this.height[w],this.worldZ(w/l|0));return R(i,this.height[o],n),s}_walkLine(t,e){const i=this.w;let n=t%i,s=t/i|0;const r=e%i,o=e/i|0,l=Math.abs(r-n),c=Math.abs(o-s),h=n<r?1:-1,u=s<o?1:-1;let d=l-c,g=this.height[t],m=0;for(;m++<512;){const v=this.index(n,s);if(!this.walkable[v]||this.clearance[v]<.5||Math.abs(this.height[v]-g)>Ar)return!1;if(g=this.height[v],n===r&&s===o)return!0;const p=d*2;p>-c&&(d-=c,n+=h),p<l&&(d+=l,s+=u)}return!1}findCover(t,e,i,n,s){const r=this.cellX(t.x),o=this.cellZ(t.z),l=Math.ceil(i/this.cell);let c=-1,h=-1/0;const u=Math.min(90,(2*l+1)*(2*l+1)),d=new Xi;for(let g=0;g<u;g++){const m=r+Math.round((n.next()*2-1)*l),v=o+Math.round((n.next()*2-1)*l);if(!this.inBounds(m,v))continue;const p=this.index(m,v);if(!this.walkable[p]||this.coverQuality[p]<.15)continue;const f=this.worldX(m),S=this.worldZ(v);ol.set(f,this.height[p]+1.35,S),Rr.subVectors(e,ol);const x=Rr.length();if(x<3||(Rr.multiplyScalar(1/x),!this.bvh.raycast(ol,Rr,x-.4,d).hit))continue;const M=Math.hypot(f-t.x,S-t.z),T=this.coverQuality[p]*3-M*.22-Math.max(0,18-x)*.08+this.clearance[p]*.15;T>h&&(h=T,c=p)}return c<0?null:s.set(this.worldX(c%this.w),this.height[c],this.worldZ(c/this.w|0))}randomPoint(t,e,i=null,n=0){for(let s=0;s<64;s++){const r=t.next()*this.w|0,o=t.next()*this.h|0,l=this.index(r,o);if(!this.walkable[l]||this.clearance[l]<.8)continue;const c=this.worldX(r),h=this.worldZ(o);if(!(i&&Math.hypot(c-i.x,h-i.z)<n))return e.set(c,this.height[l],h)}return null}spawnPoint(t,e,{enemies:i=[],minEnemyDist:n=22,avoid:s=[],minAvoidDist:r=4,clearance:o=1,samples:l=96}={}){let c=-1,h=-1/0,u=0,d=0;for(let g=0;g<l;g++){const m=t.next()*this.w|0,v=t.next()*this.h|0,p=this.index(m,v);if(!this.spawnable[p]||this.clearance[p]<o)continue;const f=this.worldX(m),S=this.worldZ(v);let x=1/0;for(const T of i){if(!T||T.alive===!1)continue;const E=Math.hypot(f-T.position.x,S-T.position.z);E<x&&(x=E)}if(x<n)continue;let _=!1;for(const T of s)if(T&&Math.hypot(f-T.x,S-T.z)<r){_=!0;break}if(_)continue;const M=Math.min(x,n*2.2)+this.clearance[p]*1.4+t.next()*6;M>h&&(h=M,c=p,u=f,d=S)}return c<0?null:e.set(u,this.height[c],d)}stats(){let t=0,e=0;for(let i=0;i<this.walkable.length;i++)this.walkable[i]&&t++,this.coverQuality[i]>.3&&e++;return{cells:this.walkable.length,walkable:t,cover:e,w:this.w,h:this.h,region:this.regionSize??0}}}class G_{constructor(t){this.items=new Int32Array(t+1),this.keys=new Float32Array(t+1),this.size=0,this.capacity=t}clear(){this.size=0}push(t,e){if(this.size>=this.capacity)return;let i=this.size++;for(this.items[i]=t,this.keys[i]=e;i>0;){const n=i-1>>1;if(this.keys[n]<=this.keys[i])break;this._swap(i,n),i=n}}pop(){const t=this.items[0];if(this.size--,this.size>0){this.items[0]=this.items[this.size],this.keys[0]=this.keys[this.size];let e=0;for(;;){const i=e*2+1,n=i+1;let s=e;if(i<this.size&&this.keys[i]<this.keys[s]&&(s=i),n<this.size&&this.keys[n]<this.keys[s]&&(s=n),s===e)break;this._swap(e,s),e=s}}return t}_swap(t,e){const i=this.items[t];this.items[t]=this.items[e],this.items[e]=i;const n=this.keys[t];this.keys[t]=this.keys[e],this.keys[e]=n}}const al=[1,-1,0,0,1,1,-1,-1],rl=[0,0,1,-1,1,-1,1,-1],W_=new y(0,1,0),Cr=new y,Cn=[],q_=[],ol=new y,Rr=new y,X_=6,K_=.008;class ad{constructor(t,{radius:e=.34,height:i=1.78,crouchHeight:n=1.18,stepOffset:s=.42,slopeLimit:r=48}={}){this.bvh=t,this.radius=e,this.standHeight=i,this.crouchHeight=n,this.height=i,this.stepOffset=s,this.slopeLimitCos=Math.cos(r*Math.PI/180),this.position=new y,this.velocity=new y,this.grounded=!1,this.groundNormal=new y(0,1,0),this.groundSurface=0,this.lastGroundedTime=0,this.hitCeiling=!1,this.wallContact=0,this.wallNormal=new y,this.landingImpact=0,this.slideDirection=new y,this._contactTris=[],this._contactCount=0}setHeight(t){this.height=t}_segment(t,e,i,n){const s=this.radius;return n.a.set(t,e+s,i),n.b.set(t,e+this.height-s,i),n}_gather(t,e,i,n){const s=this.radius+n,r=t-s,o=t+s,l=e-n,c=e+this.height+n,h=i-s,u=i+s;this._contactCount=0;const d=this._contactTris;this.bvh.overlapBox(r,l,h,o,c,u,g=>{d[this._contactCount++]=g})}_depenetrate(t,e){const i=this.bvh.soup;let n=0,s=-1,r=0;this.hitCeiling=!1,this.wallNormal.set(0,0,0);for(let o=0;o<X_;o++){let l=!1;this._segment(t.x,t.y,t.z,De);for(let c=0;c<this._contactCount;c++){const h=this._contactTris[c];mn(i,h,t.x,t.y+this.height*.5,t.z,ni),Wo(De.a.x,De.a.y,De.a.z,De.b.x,De.b.y,De.b.z,ni.x,ni.y,ni.z,Vi),mn(i,h,Vi.x,Vi.y,Vi.z,ni),Wo(De.a.x,De.a.y,De.a.z,De.b.x,De.b.y,De.b.z,ni.x,ni.y,ni.z,Vi),ze.subVectors(Vi,ni);const u=ze.length(),d=this.radius+K_-u;if(d<=0)continue;u<1e-5?(this.bvh.triangleNormal(h,ze),ze.y<0&&ze.multiplyScalar(-1)):ze.multiplyScalar(1/u),t.addScaledVector(ze,d),De.a.addScaledVector(ze,d),De.b.addScaledVector(ze,d),l=!0,n++,d>r&&(r=d),ze.y>s&&ze.y>.1&&(s=ze.y,e&&ze.y>=this.slopeLimitCos&&(this.groundNormal.copy(ze),this.groundSurface=i.surfaces[h])),ze.y<-.5&&(this.hitCeiling=!0),Math.abs(ze.y)<.6&&this.wallNormal.add(ze);const g=this.velocity.dot(ze);g<0&&this.velocity.addScaledVector(ze,-g)}if(!l)break}return this.wallNormal.lengthSq()>1e-6&&this.wallNormal.normalize(),this.wallContact=Math.min(1,r/(this.radius*.5)),n}_probeGround(t,e){const i=this.radius*.72,n=e?.36:.06;let s=1/0,r=!1;qs.set(0,-1,0);for(let o=0;o<5;o++){const l=o/5*Math.PI*2,c=o===4?0:Math.cos(l)*i,h=o===4?0:Math.sin(l)*i;Ws.set(t.x+c,t.y+this.radius+.02,t.z+h);const u=this.bvh.raycast(Ws,qs,this.radius+n,ll);if(u.hit&&u.normal.y>=this.slopeLimitCos){const d=u.t-this.radius;d<s&&(s=d,r=!0,this.groundNormal.copy(u.normal),this.groundSurface=u.surface)}}return r&&s<n+.03?(e&&s>.001&&this.velocity.y<=.5&&(t.y-=Math.min(s,n)),!0):!1}canStand(){const t=this.height;this.height=this.standHeight,this._gather(this.position.x,this.position.y,this.position.z,.05),Ie.copy(this.position);const e=this._depenetrateProbeOnly(Ie);return this.height=t,e<.02}_depenetrateProbeOnly(t){const e=this.bvh.soup;let i=0;this._segment(t.x,t.y,t.z,De);for(let n=0;n<this._contactCount;n++){const s=this._contactTris[n];mn(e,s,t.x,t.y+this.height*.5,t.z,ni),Wo(De.a.x,De.a.y,De.a.z,De.b.x,De.b.y,De.b.z,ni.x,ni.y,ni.z,Vi),mn(e,s,Vi.x,Vi.y,Vi.z,ni);const r=Vi.distanceTo(ni),o=this.radius-r;o>i&&(i=o)}return i}move(t,e){const i=this.grounded,n=-this.velocity.y;this.landingImpact=0;const s=e.length(),r=this.radius*.35,o=Math.max(1,Math.min(8,Math.ceil(s/r)));on.copy(e).multiplyScalar(1/o);for(let c=0;c<o;c++)if(is.copy(this.position),this.position.add(on),this._gather(this.position.x,this.position.y,this.position.z,Math.max(.12,on.length()+.05)),this._depenetrate(this.position,!0)>0&&i&&Math.abs(on.y)<.2){const u=Math.abs(this.position.x-(is.x+on.x)),d=Math.abs(this.position.z-(is.z+on.z));if(u+d>on.length()*.25){Ie.copy(is),Ie.y+=this.stepOffset,Ie.x+=on.x,Ie.z+=on.z,this._gather(Ie.x,Ie.y,Ie.z,.1);const g=Y_.copy(this.velocity),m=this._depenetrate(Ie,!1);if(this.velocity.copy(g),m===0||Ie.distanceToSquared(is)>1e-6){Ws.set(Ie.x,Ie.y+this.radius,Ie.z),qs.set(0,-1,0);const v=this.bvh.raycast(Ws,qs,this.stepOffset+this.radius+.05,ll);if(v.hit&&v.normal.y>=this.slopeLimitCos){const p=v.point.y;p>is.y+.01&&p<is.y+this.stepOffset+.01&&(this.position.set(Ie.x,p,Ie.z),this._gather(this.position.x,this.position.y,this.position.z,.08),this._depenetrate(this.position,!0))}}}}const l=this.velocity.y<=.6;this.grounded=this._probeGround(this.position,l&&i),this.grounded&&(this.velocity.y<0&&(this.velocity.y=0),!i&&n>2&&(this.landingImpact=Math.min(1,(n-2)/9))),this.grounded&&this.groundNormal.y<this.slopeLimitCos&&(this.slideDirection.set(this.groundNormal.x,0,this.groundNormal.z).normalize(),this.velocity.addScaledVector(this.slideDirection,9*t),this.grounded=!1)}probeMantle(t,e=1.5){const i=this.radius;Ws.set(this.position.x,this.position.y+e+.4,this.position.z).addScaledVector(t,i+.42),qs.set(0,-1,0);const n=this.bvh.raycast(Ws,qs,e+.6,ll);if(!n.hit||n.normal.y<.7)return null;const s=n.point.y,r=s-this.position.y;if(r<this.stepOffset+.05||r>e)return null;Ie.set(n.point.x,s+.03,n.point.z);const o=this.height;this.height=this.standHeight,this._gather(Ie.x,Ie.y,Ie.z,.06);const l=this._depenetrateProbeOnly(Ie);return this.height=o,l>.06?null:Ie.clone()}}const De={a:new y,b:new y},ni=new y,Vi=new y,ze=new y,Ws=new y,qs=new y(0,-1,0),Ie=new y,is=new y,on=new y,Y_=new y,ll=new Xi;class Nn{constructor(t=0,e=12,i=1){this.value=t,this.velocity=0,this.target=t,this.frequency=e,this.damping=i}set(t){return this.value=t,this.target=t,this.velocity=0,this}nudge(t){return this.velocity+=t,this}update(t){const e=this.frequency,i=this.damping,n=1+2*t*i*e,s=e*e,r=t*s,o=t*r,l=1/(n+o),c=n*this.value+t*this.velocity+o*this.target,h=this.velocity+r*(this.target-this.value);return this.value=c*l,this.velocity=h*l,this.value}}class fs{constructor(t=12,e=1){this.value=new y,this.velocity=new y,this.target=new y,this.frequency=t,this.damping=e}set(t,e,i){return this.value.set(t,e,i),this.target.set(t,e,i),this.velocity.set(0,0,0),this}nudge(t,e,i){return this.velocity.x+=t,this.velocity.y+=e,this.velocity.z+=i,this}update(t){const e=this.frequency,i=this.damping,n=1+2*t*i*e,s=e*e,r=t*s,o=t*r,l=1/(n+o);for(const c of $_){const h=this.value[c],u=this.velocity[c],d=this.target[c];this.value[c]=(n*h+t*u+o*d)*l,this.velocity[c]=(u+r*(d-h))*l}return this.value}}const $_=["x","y","z"];function Je(a,t,e,i){return t+(a-t)*Math.exp(-e*i)}const Dt={IDLE:"idle",PATROL:"patrol",ADVANCE:"advance",ENGAGE:"engage",SEEK_COVER:"cover",RELOAD:"reload",INVESTIGATE:"investigate",FLANK:"flank",DEAD:"dead"},Xs={reactionTime:[.34,.16],aimSpeed:[5,11],aimError:[.055,.014],burstMin:[2,3],burstMax:[5,8],interBurst:[.55,.26]};function Ks(a,t){return a[0]+(a[1]-a[0])*t}const j_=Math.cos(1.65),Z_=95,Rh=60;class J_{constructor({character:t,nav:e,bvh:i,rng:n,skill:s=.55,squad:r=0}){this.character=t,this.nav=e,this.bvh=i,this.rng=n,this.skill=s,this.squad=r,this.state=Dt.IDLE,this.stateTime=0,this.controller=new ad(i,{radius:.34,height:1.75}),this.velocity=new y,this.desiredYaw=0,this.aimYaw=0,this.shotsFired=0,this.aimPitch=0,this.stance="stand",this.aiming=!1,this.target=null,this.targetVisible=!1,this.lastSeenPos=new y,this.lastSeenVel=new y,this.lastSeenTime=-999,this.awareness=0,this.reactionTimer=0,this.trackTime=0,this.suspicionPoint=new y,this.hasSuspicion=!1,this.path=[],this.pathIndex=0,this.pathTarget=new y,this.repathTimer=0,this.stuckTimer=0,this._lastPos=new y,this.ammo=30,this.magSize=30,this.reserve=210,this.fireTimer=0,this.burstLeft=0,this.burstCooldown=0,this.reloadTimer=0,this.aimOffset=new y,this.aimNoisePhase=n.next()*100,this.coverPoint=new y,this.hasCover=!1,this.peeking=!1,this.peekTimer=0,this.strafeDir=n.next()<.5?-1:1,this.strafeTimer=0,this.stress=0,this._grenadeThreat=new y,this._fleeingGrenade=!1,this.onFire=null,this.onReload=null,this.onVocal=null,this._hit=new Xi}spawn(t,e){this.controller.position.copy(t),this.controller.velocity.set(0,0,0),this.character.spawn(t,e),this.aimYaw=e,this.desiredYaw=e,this.aimPitch=0,this.state=Dt.PATROL,this.stateTime=0,this.target=null,this.awareness=0,this.ammo=this.magSize,this.reserve=210,this.path.length=0,this.hasCover=!1,this.hasSuspicion=!1}get position(){return this.controller.position}get alive(){return this.character.alive}canSee(t,e=Z_){ns.copy(this.controller.position),ns.y+=this.stance==="crouch"?1.15:1.62,ae.subVectors(t,ns);const i=ae.length();return i>e||(ae.multiplyScalar(1/i),cl(this.aimYaw,Ys),ae.x*Ys.x+ae.z*Ys.z<j_)?!1:!this.bvh.raycast(ns,ae,i-.25,this._hit).hit}sense(t,e){let i=null,n=-1/0,s=!1;for(const r of e){if(!r.alive||(r.getEyePosition(hl),ul.copy(r.position),ul.y=hl.y-.32,!(this.canSee(ul)||this.canSee(hl))))continue;const l=this.controller.position.distanceTo(r.position);cl(this.aimYaw,Ys),ae.subVectors(r.position,this.controller.position).normalize();const c=ae.x*Ys.x+ae.z*Ys.z,h=100-l*.8+c*24+(r===this.target?18:0);h>n&&(n=h,i=r)}if(i){s=!0;const r=i!==this.target;this.target=i,r&&(this.trackTime=0);const o=this.controller.position.distanceTo(i.position),c=(1.6+(i.velocity?i.velocity.length():0)*.16)*(1-Math.min(o/110,.7));this.awareness=Math.min(1,this.awareness+c*t),this.lastSeenPos.copy(i.position),i.velocity&&this.lastSeenVel.copy(i.velocity),this.lastSeenTime=0,this.trackTime+=t}else this.lastSeenTime+=t,this.trackTime=Math.max(0,this.trackTime-t*1.5),this.awareness=Math.max(0,this.awareness-t*.35),this.lastSeenTime>7&&(this.target=null);return this.targetVisible=s,s}hearSound(t,e){const i=this.controller.position.distanceTo(t);if(i>Rh*e)return;const n=(1-i/(Rh*e))*e;n<.06||(this.awareness=Math.min(1,this.awareness+n*.55),this.targetVisible||(this.suspicionPoint.copy(t),this.hasSuspicion=!0,(this.state===Dt.PATROL||this.state===Dt.IDLE)&&this._setState(Dt.INVESTIGATE)))}onDamaged(t){this.awareness=1,this.stress=Math.min(1,this.stress+.65),this.reactionTimer=Math.max(this.reactionTimer,.22+(1-this.skill)*.25),this.aimYaw+=(this.rng.next()-.5)*.3,this.aimPitch+=(this.rng.next()-.5)*.18,t?.point&&(this.suspicionPoint.copy(t.point),this.hasSuspicion=!0),t?.source&&t.source.alive&&(this.target=t.source,this.lastSeenPos.copy(t.source.position),this.lastSeenTime=0),this.character.health<45&&this.state!==Dt.SEEK_COVER&&this._setState(Dt.SEEK_COVER)}onNearMiss({intensity:t=1,source:e=null}={}){this.stress=Math.min(1,this.stress+.3*t),this.awareness=Math.min(1,this.awareness+.45*t),t>.45&&(this.reactionTimer=Math.max(this.reactionTimer,.12*t),this.aimYaw+=(this.rng.next()-.5)*.12*t),e?.alive&&!this.targetVisible&&(this.suspicionPoint.copy(e.position),this.hasSuspicion=!0,(this.state===Dt.PATROL||this.state===Dt.IDLE)&&this._setState(Dt.INVESTIGATE)),this.stress>.72&&!this.hasCover&&this.state!==Dt.SEEK_COVER&&this.state!==Dt.DEAD&&this._setState(Dt.SEEK_COVER)}_checkGrenades(t){if(this._fleeingGrenade=!1,!t||!t.length)return;const e=this.controller.position;let i=null,n=121;for(const s of t){const r=s.body?.position;if(!r)continue;const o=(r.x-e.x)*(r.x-e.x)+(r.z-e.z)*(r.z-e.z);o<n&&(n=o,i=r)}i&&(this._grenadeThreat.copy(i),this._fleeingGrenade=!0,this.stress=Math.min(1,this.stress+.4))}update(t,e){if(!this.character.alive){this.state!==Dt.DEAD&&this._setState(Dt.DEAD),this.character.update(t,tx);return}this.stateTime+=t,this.stress=Math.max(0,this.stress-t*.35),this._checkGrenades(e.grenades),this.sense(t,e.enemies),this._think(t,e),this._move(t),this._aimAndShoot(t,e),this.character.position.copy(this.controller.position),this.character.velocity.copy(this.controller.velocity),this.character.update(t,{yaw:this.aimYaw,pitch:this.aimPitch,stance:this.stance,aiming:this.aiming})}_setState(t){this.state!==t&&(this.state=t,this.stateTime=0,this.path.length=0,this.pathIndex=0,this.repathTimer=0)}_think(t,e){const i=this.target&&this.awareness>.5;switch(this.ammo<=0&&this.reloadTimer<=0&&this.state!==Dt.RELOAD&&(this._setState(Dt.RELOAD),this.reloadTimer=2.35,this.onReload?.(this)),this.state){case Dt.IDLE:case Dt.PATROL:{if(this.stance="stand",this.aiming=!1,i){this._engageOrCover();break}if(!this.path.length||this.pathIndex>=this.path.length){const s=this.nav.randomPoint(this.rng,$i,this.controller.position,14);s&&this._repath(s)}break}case Dt.INVESTIGATE:{if(this.aiming=!0,this.stance="stand",i){this._engageOrCover();break}this.hasSuspicion&&(!this.path.length||this.pathIndex>=this.path.length)?this.controller.position.distanceTo(this.suspicionPoint)<3.5||this.stateTime>12?(this.hasSuspicion=!1,this._setState(Dt.PATROL)):this._repath(this.suspicionPoint):this.hasSuspicion||this._setState(Dt.PATROL);break}case Dt.ENGAGE:{if(this.aiming=!0,!this.target||!this.target.alive){this._setState(Dt.PATROL);break}const s=this.controller.position.distanceTo(this.target.position);if(!this.targetVisible&&this.lastSeenTime>1.6){this._setState(Dt.ADVANCE);break}const r=26+this.skill*34;if(this.character.health<r&&this.rng.next()<t*(.5+this.skill*1.1)){this._setState(Dt.SEEK_COVER);break}if(this.stress>.55&&!this.hasCover&&this.rng.next()<t*this.stress*(.6+this.skill*1.4)){this._setState(Dt.SEEK_COVER);break}if(s>42&&this.stateTime>1.2){this._setState(Dt.ADVANCE);break}const o=6+this.skill*14;this.stance=this.hasCover&&s>o?"crouch":"stand",this._combatStrafe(t);break}case Dt.ADVANCE:{if(this.aiming=!0,this.stance="stand",this.targetVisible&&this.target&&this.controller.position.distanceTo(this.target.position)<38){this._setState(Dt.ENGAGE);break}if(!this.path.length||this.pathIndex>=this.path.length||this.repathTimer<=0){const s=this.target&&this.lastSeenTime<6?this.lastSeenPos:this.suspicionPoint;s&&this._repath(s),this.repathTimer=1.4}this.stateTime>14&&this._setState(Dt.PATROL);break}case Dt.SEEK_COVER:{if(this.aiming=!0,!this.hasCover){const r=this.target?this.target.position:this.lastSeenPos,o=this.nav.findCover(this.controller.position,r,16,this.rng,$i);if(o)this.coverPoint.copy(o),this.hasCover=!0,this._repath(o);else{this._setState(Dt.ENGAGE);break}}this.controller.position.distanceTo(this.coverPoint)<1.2?(this.stance="crouch",this.peekTimer-=t,this.peekTimer<=0&&(this.peeking=!this.peeking,this.peekTimer=this.peeking?.9+this.rng.next()*1.1:.7+this.rng.next()*1.3),this.stance=this.peeking?"stand":"crouch",this.character.health>65&&this.stateTime>5&&(this.hasCover=!1,this._setState(Dt.ENGAGE))):this.stateTime>8&&(this.hasCover=!1,this._setState(Dt.ENGAGE));break}case Dt.FLANK:{this.aiming=!0,this.stance="stand",(!this.path.length||this.pathIndex>=this.path.length)&&(this.targetVisible?this._setState(Dt.ENGAGE):this._setState(Dt.ADVANCE)),this.stateTime>16&&this._setState(Dt.ADVANCE);break}case Dt.RELOAD:{if(this.aiming=!1,this.reloadTimer-=t,this.target&&this.targetVisible&&!this.hasCover&&this.stateTime<.3){const s=this.target.position,r=this.nav.findCover(this.controller.position,s,12,this.rng,$i);r&&(this.coverPoint.copy(r),this.hasCover=!0,this._repath(r))}if(this.reloadTimer<=0){const s=Math.min(this.magSize,this.reserve);this.ammo=s,this.reserve-=s,this._setState(this.target?Dt.ENGAGE:Dt.PATROL)}break}}this.repathTimer-=t}_engageOrCover(){this.triggerReaction(),this.character.health<55&&this.rng.next()<.6?this._setState(Dt.SEEK_COVER):this.rng.next()<.22?(this._setState(Dt.FLANK),this._planFlank()):this._setState(Dt.ENGAGE)}_planFlank(){if(!this.target)return;ae.subVectors(this.target.position,this.controller.position),ae.y=0;const t=Math.max(6,ae.length());ae.normalize();const e=this.rng.next()<.5?1:-1;$i.copy(this.target.position).addScaledVector(ae,-t*.45).add(dl.set(-ae.z,0,ae.x).multiplyScalar(e*t*.7)),this._repath($i)}_repath(t){const e=this.nav.findPath(this.controller.position.x,this.controller.position.z,t.x,t.z,this.path);this.pathIndex=0,this.pathTarget.copy(t),e||(this.path.length=0)}_combatStrafe(t){if(this.strafeTimer-=t,this.strafeTimer<=0&&(this.strafeTimer=.8+this.rng.next()*1.6,this.rng.next()<.55&&(this.strafeDir*=-1)),!this.target)return;ae.subVectors(this.target.position,this.controller.position),ae.y=0;const e=ae.length();ae.normalize(),dl.set(-ae.z,0,ae.x).multiplyScalar(this.strafeDir);const i=e>24?.55:e<8?-.5:0;$i.copy(this.controller.position).addScaledVector(dl,2.6).addScaledVector(ae,i*3),this.nav.isWalkableAt($i.x,$i.z)?this._steerDirect($i):(this.strafeDir*=-1,this._desiredMove.set(0,0,0))}_steerDirect(t){this._desiredMove.subVectors(t,this.controller.position),this._desiredMove.y=0,this._desiredMove.lengthSq()>1e-6&&this._desiredMove.normalize()}_move(t){const e=this._desiredMove;if(this.path.length&&this.pathIndex<this.path.length){const o=this.path[this.pathIndex],l=o.x-this.controller.position.x,c=o.z-this.controller.position.z,h=l*l+c*c,u=this.pathIndex===this.path.length-1?.5:.9;if(h<u*u)this.pathIndex++;else{const d=1/Math.sqrt(h);e.set(l*d,0,c*d)}}let i=1.9;if(this.state===Dt.ADVANCE||this.state===Dt.FLANK?i=4.4:this.state===Dt.SEEK_COVER?i=5:this.state===Dt.ENGAGE?i=2.6:this.state===Dt.INVESTIGATE&&(i=2.8),this.stance==="crouch"&&(i*=.55),this._fleeingGrenade){const o=this.controller.position.x-this._grenadeThreat.x,l=this.controller.position.z-this._grenadeThreat.z,c=Math.hypot(o,l)||1e-4;e.set(o/c,0,l/c),this.stance="stand",i=5.6}this._separation.lengthSq()>1e-6&&(e.add(this._separation),e.lengthSq()>1e-6&&e.normalize(),this._separation.set(0,0,0));const n=this.controller;n.setHeight(this.stance==="crouch"?1.2:1.78);const s=ex.copy(e).multiplyScalar(i);n.velocity.x=Je(n.velocity.x,s.x,11,t),n.velocity.z=Je(n.velocity.z,s.z,11,t),n.velocity.y-=21*t,Dh.copy(n.velocity).multiplyScalar(t),n.move(t,Dh),n.grounded&&n.velocity.y<0&&(n.velocity.y=-1.2);const r=this._lastPos.distanceToSquared(n.position);if(this._lastPos.copy(n.position),e.lengthSq()>.1&&r<35e-5){if(this.stuckTimer+=t,this.stuckTimer>.55){this.stuckTimer=0,this.path.length=0,this.strafeDir*=-1;const o=this.nav.randomPoint(this.rng,$i,this.controller.position,4);o&&this._repath(o)}}else this.stuckTimer=0;e.set(0,0,0)}addSeparation(t,e){this._separation.x+=t,this._separation.z+=e}_aimAndShoot(t,e){const i=this.skill;let n=this.aimYaw,s=this.aimPitch;if(this.target&&this.lastSeenTime<4){const h=this.controller.position.distanceTo(this.lastSeenPos)/780;fl.copy(this.targetVisible?this.target.position:this.lastSeenPos).addScaledVector(this.lastSeenVel,h*(1.4-i*.5)),fl.y+=this.targetVisible?1.28:1.1,ns.copy(this.controller.position),ns.y+=this.stance==="crouch"?1.15:1.55,ae.subVectors(fl,ns);const u=ae.length();ae.multiplyScalar(1/u),n=Pr(ae.x,ae.z),s=Math.asin(Ht.clamp(ae.y,-1,1))}else if(this.hasSuspicion)ae.subVectors(this.suspicionPoint,this.controller.position),n=Pr(ae.x,ae.z),s*=.9;else if(this.path.length&&this.pathIndex<this.path.length){const h=this.path[this.pathIndex];n=Pr(h.x-this.controller.position.x,h.z-this.controller.position.z),s*=.9}const r=Ks(Xs.aimSpeed,i)*(this.targetVisible?1:.6);this.aimYaw=Ph(this.aimYaw,n,r*t),this.aimPitch=Ph(this.aimPitch,s,r*t),this.aimNoisePhase+=t;const o=1/(1+this.trackTime*2.4),l=Ks(Xs.aimError,i)*(.35+o)*(1+this.stress*1.5);if(this.aimYaw+=Math.sin(this.aimNoisePhase*2.7)*l*.5,this.aimPitch+=Math.sin(this.aimNoisePhase*3.9+1.3)*l*.35,this.fireTimer-=t,this.burstCooldown-=t,this.state===Dt.RELOAD||this.ammo<=0)return;if(!this.target||!this.targetVisible){this.burstLeft=0;return}if(this.awareness<.62)return;if(this.reactionTimer>0){this.reactionTimer-=t;return}if(this.state===Dt.SEEK_COVER&&!this.peeking||this._fleeingGrenade||this._friendlyInLine(e))return;const c=Q_(this.aimYaw,Pr(this.target.position.x-this.controller.position.x,this.target.position.z-this.controller.position.z));if(!(Math.abs(c)>.12)){if(this.burstLeft<=0){if(this.burstCooldown>0)return;const h=Math.round(Ks(Xs.burstMin,i)),u=Math.round(Ks(Xs.burstMax,i));this.burstLeft=h+Math.floor(this.rng.next()*(u-h+1))}this.fireTimer<=0&&(this._fire(e),this.fireTimer=.0857,this.burstLeft--,this.burstLeft<=0&&(this.burstCooldown=Ks(Xs.interBurst,i)*(.7+this.rng.next()*.6)))}}_fire(t){this.ammo--,this.shotsFired++,this.character.rig.addRecoil(.85),this.character.rig.getMuzzle(Lh,$s);const e=this.skill,i=this.controller.velocity.lengthSq()>1.2?1.6:1,n=(.01+.02*(1-e))*i/(1+this.trackTime);$s.x+=(this.rng.next()*2-1)*n,$s.y+=(this.rng.next()*2-1)*n*.8,$s.z+=(this.rng.next()*2-1)*n,$s.normalize(),this.onFire?.(Lh,$s,this),this.ammo<=0&&(this._setState(Dt.RELOAD),this.reloadTimer=2.35,this.onReload?.(this))}_friendlyInLine(t){if(!t.allies)return!1;cl(this.aimYaw,ae);const e=this.controller.position.distanceTo(this.target.position);for(const i of t.allies){if(i===this||!i.alive)continue;ss.subVectors(i.position,this.controller.position);const n=ss.x*ae.x+ss.z*ae.z;if(n<.5||n>e)continue;if(ss.x*ss.x+ss.z*ss.z-n*n<.9)return!0}return!1}triggerReaction(){this.reactionTimer=Ks(Xs.reactionTime,this.skill)*(.7+this.rng.next()*.7)}_desiredMove=new y;_separation=new y}function cl(a,t){return t.set(-Math.sin(a),0,-Math.cos(a))}function Pr(a,t){return Math.atan2(-a,-t)}function Ph(a,t,e){let i=t-a;for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return Math.abs(i)<=e?t:a+Math.sign(i)*e}function Q_(a,t){let e=t-a;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}const tx={yaw:0,pitch:0,stance:"stand",aiming:!1},ns=new y,ae=new y,Ys=new y,hl=new y,ul=new y,$i=new y,dl=new y,ex=new y,fl=new y,Lh=new y,$s=new y,ss=new y,Dh=new y,At={PELVIS:0,CHEST:1,HEAD:2,UPPERARM_L:3,FOREARM_L:4,HAND_L:5,UPPERARM_R:6,FOREARM_R:7,HAND_R:8,THIGH_L:9,SHIN_L:10,FOOT_L:11,THIGH_R:12,SHIN_R:13,FOOT_R:14,WEAPON:15},eo=16,wi={[At.PELVIS]:.36,[At.CHEST]:.2,[At.HEAD]:.16,[At.UPPERARM_L]:.28,[At.FOREARM_L]:.26,[At.HAND_L]:.1,[At.UPPERARM_R]:.28,[At.FOREARM_R]:.26,[At.HAND_R]:.1,[At.THIGH_L]:.42,[At.SHIN_L]:.42,[At.FOOT_L]:.1,[At.THIGH_R]:.42,[At.SHIN_R]:.42,[At.FOOT_R]:.1},Ih={A:{uniform:[.62,.57,.42],carrier:[.24,.24,.2],helmet:[.44,.42,.34],accent:[.24,.46,.7],gloves:[.18,.17,.15],skin:[.7,.51,.38]},B:{uniform:[.4,.37,.29],carrier:[.13,.13,.16],helmet:[.21,.22,.25],accent:[.68,.14,.1],gloves:[.1,.1,.11],skin:[.6,.42,.32]}},Fh=X.GEAR_CLOTH,pl=X.POLYMER,Uh=X.GUNMETAL,ml=X.FABRIC;function Lr(a,t,e,i,n,s=8){a.addCylinder(0,0,0,e,i,t,s,{...n,caps:!1}),a.addBlob(0,0,0,e*1.06,e*.9,e*1.06,s,4,n),a.addBlob(0,t,0,i*1.04,i*.85,i*1.04,s,4,n)}function gl(a,t,e,i,n,s,r,o){a.addBox(t,e,i,n,s,r,o),a.addBox(t,e+s*.5,i,n*.94,s*.16,r*1.08,{...o,tint:Oe(o.tint,.86)}),a.addBox(t,e-s*.42,i-r*.5,n*.3,s*.2,.006,{...o,tint:Oe(o.tint,.7)})}function Oe(a,t){return[a[0]*t,a[1]*t,a[2]*t]}function ix(a="A",t=0,e){const i=Ih[a]||Ih.A,n=(v,p)=>v.map(f=>f*(1+(e.next()-.5)*p)),s={layer:Fh,tint:n(i.uniform,.14),wear:.7,uvScale:5.5},r={layer:ml,tint:n(i.carrier,.1),wear:.65,uvScale:6.5},o={layer:pl,tint:n(i.helmet,.08),wear:.55,uvScale:7},l={layer:pl,tint:i.gloves,wear:.6,uvScale:12},c={layer:pl,tint:[.15,.13,.12],wear:.75,uvScale:8},h={layer:Fh,tint:i.skin,wear:.25,uvScale:14},u={layer:ml,tint:i.accent,wear:.6,uvScale:9},d={layer:Uh,tint:[1,1,1],wear:.6,uvScale:9},g={layer:ml,tint:i.accent,wear:.15,uvScale:3},m=new qi(null,`soldier-${a}`);m.setBone(At.PELVIS),m.addBox(0,.055,0,.3,.17,.2,s),m.addBox(0,.16,-.005,.315,.14,.205,s),m.addBox(0,.26,-.005,.325,.13,.2,s),m.addBox(0,.055,0,.315,.048,.212,{...r,tint:Oe(r.tint,.8)}),m.addBox(0,.055,-.108,.07,.04,.014,{...r,tint:[.6,.58,.5]}),m.addBox(.135,.005,.03,.055,.13,.075,{...r,tint:Oe(r.tint,.9)}),m.addBox(.135,.062,.03,.048,.03,.062,{...l}),m.addBox(-.148,.03,.02,.045,.11,.09,u),m.setBone(At.CHEST),m.addBox(0,.075,-.008,.34,.19,.21,s),m.addBox(0,.165,-.01,.375,.09,.205,s),m.addBox(0,.085,-.108,.285,.235,.036,r),m.addBox(0,.085,.104,.285,.235,.034,r),m.addBox(.152,.085,0,.03,.2,.2,{...r,tint:Oe(r.tint,.92)}),m.addBox(-.152,.085,0,.03,.2,.2,{...r,tint:Oe(r.tint,.92)}),m.addBox(.098,.185,-.01,.075,.045,.215,r),m.addBox(-.098,.185,-.01,.075,.045,.215,r);for(let v=0;v<3;v++)gl(m,-.088+v*.088,.048,-.14,.078,.115,.05,{...r,tint:Oe(r.tint,.95+v*.02)});gl(m,.108,.15,-.128,.07,.07,.042,u),m.addBox(-.118,.15,.106,.06,.1,.048,{...r,tint:[.16,.16,.17]}),m.addCylinder(-.118,.198,.106,.005,.004,.3,6,{...d,tint:[.12,.12,.12],caps:!1}),gl(m,.12,.02,.104,.06,.075,.048,r),m.addBox(0,.13,.132,.19,.18,.06,{...r,tint:Oe(r.tint,.85)}),m.addBox(.075,.19,-.1,.045,.04,.03,{...u,tint:Oe(u.tint,.8)}),m.addBox(-.075,.19,-.1,.045,.04,.03,{...u,tint:Oe(u.tint,.8)}),m.addBox(0,.176,-.122,.15,.052,.014,g),m.addBox(0,.176,.118,.15,.052,.014,g),m.setBone(At.HEAD),m.addCylinder(0,-.02,.005,.052,.055,.07,8,{...h,caps:!1}),m.addBlob(0,.085,.004,.087,.105,.098,12,8,h),m.addBox(0,.045,-.07,.115,.075,.045,{...r,tint:[.2,.2,.19]}),m.addBlob(0,.098,.002,.108,.108,.118,14,9,o),m.addBox(0,.055,.01,.215,.03,.23,{...o,tint:Oe(o.tint,.95)}),m.addBox(.104,.095,.004,.01,.02,.15,{...o,tint:[.2,.2,.2]}),m.addBox(-.104,.095,.004,.01,.02,.15,{...o,tint:[.2,.2,.2]}),m.addBox(0,.13,-.098,.045,.035,.03,{...o,tint:[.22,.22,.22]}),m.addBox(0,.14,-.115,.028,.018,.028,{...d,tint:[.3,.3,.3]}),m.addBox(0,.08,.108,.085,.055,.035,{...r,tint:[.2,.2,.2]}),m.addBox(0,.01,.03,.18,.012,.15,{...u,tint:Oe(u.tint,.7)}),m.addBox(0,.078,-.086,.15,.036,.02,{layer:Uh,tint:[.12,.14,.16],wear:.2,uvScale:14});for(const v of[-1,1]){const p=v<0?At.UPPERARM_L:At.UPPERARM_R,f=v<0?At.FOREARM_L:At.FOREARM_R,S=v<0?At.HAND_L:At.HAND_R;m.setBone(p),Lr(m,wi[p],.062,.052,s),m.addBlob(0,.01,0,.075,.07,.075,10,6,{...r,tint:Oe(r.tint,.95)}),m.addBox(v*.055,.06,0,.014,.055,.055,{...u,tint:Oe(u.tint,.75)}),m.setBone(f),Lr(m,wi[f],.052,.042,s),m.addBlob(0,.005,0,.058,.05,.058,9,5,{...l,tint:Oe(l.tint,1.4)}),m.addBox(0,wi[f]-.02,0,.092,.032,.092,{...s,tint:Oe(s.tint,.9)}),m.setBone(S),m.addBox(0,.032,0,.058,.08,.046,l),m.addBox(0,.07,-.006,.052,.03,.042,l),m.addBox(0,.03,-.026,.05,.055,.01,{...l,tint:Oe(l.tint,.7)})}for(const v of[-1,1]){const p=v<0?At.THIGH_L:At.THIGH_R,f=v<0?At.SHIN_L:At.SHIN_R,S=v<0?At.FOOT_L:At.FOOT_R;m.setBone(p),Lr(m,wi[p],.088,.07,s),m.addBox(v*.07,.19,.008,.028,.13,.115,{...s,tint:Oe(s.tint,.92)}),m.setBone(f),Lr(m,wi[f],.068,.052,s),m.addBox(0,.03,-.052,.105,.115,.03,{...l,tint:[.18,.17,.16]}),m.addBlob(0,.012,-.032,.072,.062,.062,10,6,{...l,tint:[.2,.19,.18]}),m.addBox(0,wi[f]-.045,0,.115,.075,.115,{...s,tint:Oe(s.tint,.95)}),m.setBone(S),m.addBox(0,.03,-.055,.106,.085,.19,c),m.addBox(0,-.008,-.062,.112,.03,.205,{...c,tint:[.1,.09,.08]}),m.addBox(0,.062,.01,.098,.05,.1,{...c,tint:Oe(c.tint,1.2)});for(let x=0;x<4;x++)m.addBox(0,.055-x*.014,-.07,.075,.005,.006,{...c,tint:[.3,.28,.25]})}return m.setBone(At.WEAPON),nx(m,d),m.build()}function nx(a,t,e){const i={layer:X.POLYMER,tint:[.9,.9,.9],wear:.55,uvScale:10};a.addBox(0,0,-.3,.04,.05,.19,t),a.addCylinder(0,0,-.62,.022,.022,.24,8,{...i,caps:!1,rotY:0}),a.pushTransform(new Nt().makeTranslation(0,0,-.66)),a.addCylinder(0,0,0,.009,.008,.1,8,{...t,caps:!1}),a.popTransform(),a.addCylinder(0,0,-.78,.013,.013,.03,10,t),a.addBox(0,.038,-.4,.02,.01,.36,t),a.addBox(0,.07,-.34,.032,.038,.055,t),a.addBox(0,.052,-.34,.026,.02,.048,t),a.addBox(0,-.085,-.3,.028,.13,.042,{...i,tint:[.85,.83,.8]}),a.addBox(0,-.062,-.16,.03,.085,.038,i),a.addBox(0,-.042,-.235,.008,.006,.055,t),a.addBox(0,.008,-.075,.038,.048,.11,i),a.addCylinder(0,.01,-.13,.015,.015,.06,8,{...t,caps:!1}),a.addBox(0,-.03,-.52,.022,.055,.028,{...i,tint:[1,.92,.74]})}const sx=-17.5,ax=6,Rn=.075,q={HEAD:0,NECK:1,CHEST:2,PELVIS:3,SHOULDER_L:4,ELBOW_L:5,HAND_L:6,SHOULDER_R:7,ELBOW_R:8,HAND_R:9,HIP_L:10,KNEE_L:11,FOOT_L:12,HIP_R:13,KNEE_R:14,FOOT_R:15},Hi=16,Bh=[[q.HEAD,q.NECK,.16],[q.NECK,q.CHEST,.2],[q.CHEST,q.PELVIS,.36],[q.CHEST,q.SHOULDER_L,.2],[q.SHOULDER_L,q.ELBOW_L,.28],[q.ELBOW_L,q.HAND_L,.26],[q.CHEST,q.SHOULDER_R,.2],[q.SHOULDER_R,q.ELBOW_R,.28],[q.ELBOW_R,q.HAND_R,.26],[q.PELVIS,q.HIP_L,.12],[q.HIP_L,q.KNEE_L,.42],[q.KNEE_L,q.FOOT_L,.42],[q.PELVIS,q.HIP_R,.12],[q.HIP_R,q.KNEE_R,.42],[q.KNEE_R,q.FOOT_R,.42]],Nh=[[q.SHOULDER_L,q.SHOULDER_R,.4,.85],[q.HIP_L,q.HIP_R,.24,.9],[q.SHOULDER_L,q.PELVIS,.52,.5],[q.SHOULDER_R,q.PELVIS,.52,.5],[q.NECK,q.HIP_L,.62,.25],[q.NECK,q.HIP_R,.62,.25],[q.HEAD,q.CHEST,.34,.6]],Oh=[[q.ELBOW_L,q.SHOULDER_L,q.CHEST,2.4],[q.ELBOW_R,q.SHOULDER_R,q.CHEST,2.4],[q.HAND_L,q.ELBOW_L,q.SHOULDER_L,2.2],[q.HAND_R,q.ELBOW_R,q.SHOULDER_R,2.2],[q.KNEE_L,q.HIP_L,q.PELVIS,2],[q.KNEE_R,q.HIP_R,q.PELVIS,2],[q.FOOT_L,q.KNEE_L,q.HIP_L,1.7],[q.FOOT_R,q.KNEE_R,q.HIP_R,1.7],[q.HEAD,q.NECK,q.CHEST,1]];class rx{constructor(t){this.bvh=t,this.pos=new Float32Array(Hi*3),this.prev=new Float32Array(Hi*3),this.vel=new Float32Array(Hi*3),this.invMass=new Float32Array(Hi).fill(1),this.invMass[q.PELVIS]=.55,this.invMass[q.CHEST]=.5,this.invMass[q.HEAD]=1.4,this.active=!1,this.sleeping=!1,this.sleepTimer=0,this.age=0,this.maxAge=16,this._tris=[],this.bounds=new _n,this.groundedTimer=0}activate(t,e,i,n){for(let s=0;s<Hi;s++)t(s,js),this.pos[s*3]=js.x,this.pos[s*3+1]=js.y,this.pos[s*3+2]=js.z,this.vel[s*3]=e.x,this.vel[s*3+1]=e.y,this.vel[s*3+2]=e.z;if(this.prev.set(this.pos),i&&n)for(let s=0;s<Hi;s++){const r=this.pos[s*3]-i.x,o=this.pos[s*3+1]-i.y,l=this.pos[s*3+2]-i.z,h=1/(1+(r*r+o*o+l*l)*9);this.vel[s*3]+=n.x*h,this.vel[s*3+1]+=n.y*h,this.vel[s*3+2]+=n.z*h}this.active=!0,this.sleeping=!1,this.sleepTimer=0,this.groundedTimer=0,this.age=0}deactivate(){this.active=!1}step(t){if(!this.active||this.sleeping)return;if(this.age+=t,this.age>this.maxAge){this.sleeping=!0;return}const e=this.pos,i=this.prev,n=this.vel,s=Math.max(0,1-.9*t);for(let l=0;l<Hi;l++){const c=l*3;i[c]=e[c],i[c+1]=e[c+1],i[c+2]=e[c+2],n[c+1]+=sx*t,n[c]*=s,n[c+1]*=s,n[c+2]*=s,e[c]+=n[c]*t,e[c+1]+=n[c+1]*t,e[c+2]+=n[c+2]*t}for(let l=0;l<ax;l++)this._solveDistance(),this._solveCones(),this._solveCollision();let r=0;const o=1/t;for(let l=0;l<Hi;l++){const c=l*3;n[c]=(e[c]-i[c])*o,n[c+1]=(e[c+1]-i[c+1])*o,n[c+2]=(e[c+2]-i[c+2])*o,r+=n[c]*n[c]+n[c+1]*n[c+1]+n[c+2]*n[c+2]}r/Hi<.09?(this.sleepTimer+=t,this.sleepTimer>.7&&(this.sleeping=!0)):this.sleepTimer=0}_solveDistance(){const t=this.pos,e=this.invMass;for(let i=0;i<Bh.length;i++){const[n,s,r]=Bh[i];kh(t,e,n,s,r,1)}for(let i=0;i<Nh.length;i++){const[n,s,r,o]=Nh[i];kh(t,e,n,s,r,o)}}_solveCones(){const t=this.pos,e=this.invMass;for(let i=0;i<Oh.length;i++){const[n,s,r,o]=Oh[i];wa.set(t[s*3]-t[r*3],t[s*3+1]-t[r*3+1],t[s*3+2]-t[r*3+2]),ln.set(t[n*3]-t[s*3],t[n*3+1]-t[s*3+1],t[n*3+2]-t[s*3+2]);const l=wa.length(),c=ln.length();if(l<1e-5||c<1e-5)continue;wa.multiplyScalar(1/l),ln.multiplyScalar(1/c);const h=Ht.clamp(wa.dot(ln),-1,1),u=Math.acos(h);if(u<=o||(Dr.crossVectors(wa,ln),Dr.lengthSq()<1e-10))continue;Dr.normalize(),zh.setFromAxisAngle(Dr,-(u-o)*.6),ln.applyQuaternion(zh).multiplyScalar(c);const d=t[s*3]+ln.x,g=t[s*3+1]+ln.y,m=t[s*3+2]+ln.z,v=e[n]/(e[n]+e[s]+1e-9);t[n*3]+=(d-t[n*3])*v,t[n*3+1]+=(g-t[n*3+1])*v,t[n*3+2]+=(m-t[n*3+2])*v}}_solveCollision(){const t=this.pos,e=this.bvh.soup;for(let i=0;i<Hi;i++){const n=i*3,s=t[n],r=t[n+1],o=t[n+2];let l=0;const c=this._tris;this.bvh.overlapBox(s-Rn,r-Rn,o-Rn,s+Rn,r+Rn,o+Rn,h=>{l<24&&(c[l++]=h)});for(let h=0;h<l;h++){mn(e,c[h],t[n],t[n+1],t[n+2],Ir),Pn.set(t[n]-Ir.x,t[n+1]-Ir.y,t[n+2]-Ir.z);const u=Pn.length();if(u>=Rn)continue;u<1e-6?this.bvh.triangleNormal(c[h],Pn):Pn.multiplyScalar(1/u);const d=Rn-u;t[n]+=Pn.x*d,t[n+1]+=Pn.y*d,t[n+2]+=Pn.z*d,Pn.y>.6&&(t[n]+=(this.prev[n]-t[n])*.35,t[n+2]+=(this.prev[n+2]-t[n+2])*.35)}}}getParticle(t,e){return e.set(this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]),e}computeBounds(){this.bounds.makeEmpty();for(let t=0;t<Hi;t++)js.set(this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]),this.bounds.expandByPoint(js);return this.bounds}}function kh(a,t,e,i,n,s){const r=e*3,o=i*3,l=a[o]-a[r],c=a[o+1]-a[r+1],h=a[o+2]-a[r+2],u=Math.sqrt(l*l+c*c+h*h);if(u<1e-6)return;const d=t[e]+t[i];if(d<1e-9)return;const g=(u-n)/u*s,m=t[e]/d*g,v=t[i]/d*g;a[r]+=l*m,a[r+1]+=c*m,a[r+2]+=h*m,a[o]-=l*v,a[o+1]-=c*v,a[o+2]-=h*v}const js=new y,wa=new y,ln=new y,Dr=new y,zh=new Qe,Ir=new y,Pn=new y,vl=16,Vh=[[At.PELVIS,q.PELVIS,q.CHEST],[At.CHEST,q.CHEST,q.NECK],[At.HEAD,q.NECK,q.HEAD],[At.UPPERARM_L,q.SHOULDER_L,q.ELBOW_L],[At.FOREARM_L,q.ELBOW_L,q.HAND_L],[At.UPPERARM_R,q.SHOULDER_R,q.ELBOW_R],[At.FOREARM_R,q.ELBOW_R,q.HAND_R],[At.THIGH_L,q.HIP_L,q.KNEE_L],[At.SHIN_L,q.KNEE_L,q.FOOT_L],[At.THIGH_R,q.HIP_R,q.KNEE_R],[At.SHIN_R,q.KNEE_R,q.FOOT_R]],Hh=.185,Fr=.105,_l={stand:.94,crouch:.6,prone:.3};function xl(a,t,e,i,n,s){He.subVectors(t,a);let r=He.length();const o=(e+i)*.999;r>o&&(r=o,He.setLength(o),t=lx.copy(a).add(He)),r<1e-4&&(r=1e-4,He.set(0,-1e-4,0)),He.multiplyScalar(1/r);const l=(e*e-i*i+r*r)/(2*r),c=e*e-l*l,h=c>0?Math.sqrt(c):0;return as.copy(n).addScaledVector(He,-n.dot(He)),as.lengthSq()<1e-8&&(as.set(He.z,0,-He.x),as.lengthSq()<1e-8&&as.set(1,0,0)),as.normalize(),s.copy(a).addScaledVector(He,l).addScaledVector(as,h),s}class ox{constructor(){this.joints=[];for(let t=0;t<vl;t++)this.joints.push(new y);this.matrices=[];for(let t=0;t<eo;t++)this.matrices.push(new Nt);this.root=new y,this.yaw=0,this.pitch=0,this.stanceHeight=_l.stand,this.cycle=0,this.speed=0,this.strideScale=0,this.lean=0,this.leanSide=0,this.bobY=0,this.torsoTwist=0,this.aimBlend=1,this.fireKick=0,this.reloadPhase=-1,this.hitLean=new y,this.footPlant=[0,0],this.groundL=0,this.groundR=0,this._weapon=new Nt,this._aimDir=new y(0,0,-1)}update(t,e){const i=e.velocity,n=Math.hypot(i.x,i.z);this.speed=Je(this.speed,n,12,t),this.yaw=e.yaw,this.pitch=Je(this.pitch,e.pitch,16,t);const s=_l[e.stance]??_l.stand;this.stanceHeight=Je(this.stanceHeight,s,9,t),this.aimBlend=Je(this.aimBlend,e.aiming?1:.35,8,t);const r=1.05+Math.min(n,7)*.14,o=n>.05?n/r:0;this.cycle=(this.cycle+o*t)%1,this.strideScale=Je(this.strideScale,Math.min(n/5.2,1),7,t);const l=-Math.sin(this.yaw),c=-Math.cos(this.yaw),h=i.x*l+i.z*c,u=i.x*-c+i.z*l;this.lean=Je(this.lean,Ht.clamp(h*.035,-.12,.22),6,t),this.leanSide=Je(this.leanSide,Ht.clamp(-u*.03,-.16,.16),6,t),this.fireKick=Math.max(0,this.fireKick-t*7),this.hitLean.multiplyScalar(Math.max(0,1-t*5)),this._solvePose(t),this._buildMatrices()}addRecoil(t=1){this.fireKick=Math.min(1,this.fireKick+t)}addHitReaction(t,e,i){this.hitLean.x+=t*i,this.hitLean.z+=e*i}_solvePose(t){const e=this.joints,i=this.yaw,n=Math.cos(i),s=Math.sin(i),r=cx.set(-s,0,-n),o=hx.set(n,0,-s),l=Gh.set(0,1,0),c=this.cycle*Math.PI*2,h=Math.sin(c*2)*.022*this.strideScale,u=Math.sin(c)*.02*this.strideScale;this.bobY=Je(this.bobY,h,20,t);const d=this.root.y+this.stanceHeight+this.bobY-this.fireKick*.012;Ma.copy(this.root).addScaledVector(o,u).setY(d),e[q.PELVIS].copy(Ma);const g=-Math.sin(c)*.2*this.strideScale;this.torsoTwist=Je(this.torsoTwist,g,12,t);const m=wi[At.PELVIS];ba.copy(Ma).addScaledVector(l,m*Math.cos(this.lean)).addScaledVector(r,m*Math.sin(this.lean)+this.hitLean.z*.1).addScaledVector(o,m*Math.sin(this.leanSide)+this.hitLean.x*.1),e[q.CHEST].copy(ba);const v=wi[At.CHEST];yl.copy(ba).addScaledVector(l,v*.94).addScaledVector(r,v*(.2+this.lean*.5)),e[q.NECK].copy(yl);const p=wi[At.HEAD],f=this.pitch*.55;e[q.HEAD].copy(yl).addScaledVector(l,p*Math.cos(f)).addScaledVector(r,-p*Math.sin(f)*.6+p*.1);const S=this.torsoTwist,x=-this.torsoTwist*.6;Ur(e[q.SHOULDER_L],ba,o,r,l,-Hh,.15,S),Ur(e[q.SHOULDER_R],ba,o,r,l,Hh,.15,S),Ur(e[q.HIP_L],Ma,o,r,l,-Fr,0,x),Ur(e[q.HIP_R],Ma,o,r,l,Fr,0,x);const _=wi[At.THIGH_L],M=wi[At.SHIN_L],T=.46*this.strideScale,E=.2*this.strideScale;for(let N=0;N<2;N++){const z=N===0?-1:1,U=N===0?e[q.HIP_L]:e[q.HIP_R],W=N===0?e[q.KNEE_L]:e[q.KNEE_R],J=N===0?e[q.FOOT_L]:e[q.FOOT_R],tt=c+(N===0?0:Math.PI),gt=Math.sin(tt),Lt=Math.max(0,Math.sin(tt+Math.PI*.5)),se=Math.pow(Lt,1.6)*E;this.footPlant[N]=1-Lt;const Jt=N===0?this.groundL:this.groundR;Sl.copy(this.root).addScaledVector(o,z*Fr*.92).addScaledVector(r,gt*T).setY(Math.max(Jt,this.root.y-.15)+se+.045),this.strideScale<.02&&Sl.copy(this.root).addScaledVector(o,z*Fr*(1.15+(1-this.stanceHeight)*.4)).addScaledVector(r,z*.045).setY(Jt+.045),J.copy(Sl),Zs.copy(r).addScaledVector(o,z*.25).normalize(),xl(U,J,_,M,Zs,W)}const R=ux.copy(e[q.SHOULDER_L]).add(e[q.SHOULDER_R]).multiplyScalar(.5),w=this.aimBlend,b=dx.copy(R).addScaledVector(o,Ht.lerp(.16,.035,w)).addScaledVector(l,Ht.lerp(-.16,-.055,w)).addScaledVector(r,Ht.lerp(.14,.22,w)-this.fireKick*.05),L=this.pitch*Ht.lerp(.55,1,w)-this.fireKick*.18;rs.copy(r).multiplyScalar(Math.cos(L)).addScaledVector(l,Math.sin(L)).normalize(),this._aimDir.copy(rs);const P=os.crossVectors(rs,l).normalize(),B=wl.crossVectors(P,rs).normalize();Xh.copy(b).addScaledVector(rs,.055).addScaledVector(B,-.085),qh.copy(b).addScaledVector(rs,.3).addScaledVector(B,-.055).addScaledVector(P,-.02),e[q.HAND_R].copy(Xh),e[q.HAND_L].copy(qh);const k=wi[At.UPPERARM_L],F=wi[At.FOREARM_L];Zs.copy(o).multiplyScalar(.9).addScaledVector(l,-1).normalize(),xl(e[q.SHOULDER_R],e[q.HAND_R],k,F,Zs,e[q.ELBOW_R]),Zs.copy(o).multiplyScalar(-.55).addScaledVector(l,-1).addScaledVector(r,-.2*w).normalize(),xl(e[q.SHOULDER_L],e[q.HAND_L],k,F,Zs,e[q.ELBOW_L]),this._weapon.makeBasis(P,B,Wh.copy(rs).negate()),this._weapon.setPosition(b)}setFromRagdoll(t){const e=t.pos;for(let i=0;i<vl;i++)this.joints[i].set(e[i*3],e[i*3+1],e[i*3+2]);He.subVectors(this.joints[q.HAND_R],this.joints[q.ELBOW_R]),He.lengthSq()<1e-8&&He.set(0,-1,0),He.normalize(),os.set(He.z,0,-He.x),os.lengthSq()<1e-6&&os.set(1,0,0),os.normalize(),wl.crossVectors(os,He).normalize(),this._weapon.makeBasis(os,wl,Wh.copy(He).negate()),this._weapon.setPosition(this.joints[q.HAND_R]),this._buildMatrices()}_buildMatrices(){const t=this.joints;for(let i=0;i<vl;i++){const n=t[i];(!Number.isFinite(n.x)||!Number.isFinite(n.y)||!Number.isFinite(n.z))&&(n.copy(this.root),n.y+=1)}const e=fx.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw));for(let i=0;i<Vh.length;i++){const[n,s,r]=Vh[i];Ln.subVectors(t[r],t[s]),Ln.lengthSq()<1e-10?Ln.set(0,1,0):Ln.normalize(),Dn.crossVectors(e,Ln),Dn.lengthSq()<1e-8&&Dn.crossVectors(Gh.set(0,1,0),Ln),Dn.lengthSq()<1e-8&&Dn.set(1,0,0),Dn.normalize(),Kh.crossVectors(Dn,Ln).normalize(),this.matrices[n].makeBasis(Dn,Ln,Kh),this.matrices[n].setPosition(t[s])}Br(this.matrices[At.HAND_L],this.matrices[At.FOREARM_L],t[q.HAND_L]),Br(this.matrices[At.HAND_R],this.matrices[At.FOREARM_R],t[q.HAND_R]),Br(this.matrices[At.FOOT_L],this.matrices[At.SHIN_L],t[q.FOOT_L]),Br(this.matrices[At.FOOT_R],this.matrices[At.SHIN_R],t[q.FOOT_R]),this.matrices[At.WEAPON].copy(this._weapon)}getMuzzle(t,e){return t.set(0,0,-.47).applyMatrix4(this._weapon),e.copy(this._aimDir),t}getJoint(t,e){return e.copy(this.joints[t])}}function Ur(a,t,e,i,n,s,r,o){const l=Math.cos(o),c=Math.sin(o),h=s*l,u=-s*c;a.copy(t).addScaledVector(e,h).addScaledVector(i,u).addScaledVector(n,r)}function Br(a,t,e){a.copy(t),a.setPosition(e)}const He=new y,as=new y,lx=new y,cx=new y,hx=new y,Gh=new y,Ma=new y,ba=new y,yl=new y,Sl=new y,Zs=new y,ux=new y,dx=new y,rs=new y,os=new y,wl=new y,Wh=new y,qh=new y,Xh=new y,fx=new y,Ln=new y,Dn=new y,Kh=new y,px=[{name:"head",zone:"head",a:q.NECK,b:q.HEAD,radius:.115,extend:.05},{name:"chest",zone:"body",a:q.CHEST,b:q.NECK,radius:.2},{name:"abdomen",zone:"body",a:q.PELVIS,b:q.CHEST,radius:.185},{name:"upperarm_l",zone:"limb",a:q.SHOULDER_L,b:q.ELBOW_L,radius:.075},{name:"forearm_l",zone:"limb",a:q.ELBOW_L,b:q.HAND_L,radius:.062},{name:"upperarm_r",zone:"limb",a:q.SHOULDER_R,b:q.ELBOW_R,radius:.075},{name:"forearm_r",zone:"limb",a:q.ELBOW_R,b:q.HAND_R,radius:.062},{name:"thigh_l",zone:"limb",a:q.HIP_L,b:q.KNEE_L,radius:.098},{name:"shin_l",zone:"limb",a:q.KNEE_L,b:q.FOOT_L,radius:.078},{name:"thigh_r",zone:"limb",a:q.HIP_R,b:q.KNEE_R,radius:.098},{name:"shin_r",zone:"limb",a:q.KNEE_R,b:q.FOOT_R,radius:.078}],Yh=new Map;function mx(a,t,e){const i=`${a}:${t}`;let n=Yh.get(i);return n||(n=ix(a,t,e),Yh.set(i,n)),n}class gx{constructor({id:t,team:e,variant:i,factory:n,bvh:s,rng:r,prevViewProjection:o,shadowSystem:l}){this.id=t,this.team=e,this.alive=!0,this.health=100,this.maxHealth=100,this.position=new y,this.velocity=new y,this.boundsCenter=new y,this.yaw=0,this.pitch=0,this.stance="stand",this.aiming=!0,this.boundsRadius=1.15,this.hitFlash=0,this.deathTime=-1,this.lastDamageFrom=null,this.rig=new ox,this.ragdoll=new rx(s),this.bvh=s,this.hitboxes=px.map(h=>({name:h.name,zone:h.zone,radius:h.radius,a:new y,b:new y,def:h}));const c=mx(e,i??0,r);this.material=n.createCharacter(o),this.mesh=new Ee(c,this.material),this.mesh.frustumCulled=!1,this.mesh.matrixAutoUpdate=!1,this.mesh.renderOrder=2,this._prevBones=[];for(let h=0;h<eo;h++)this._prevBones.push(new Nt);this.material.uniforms.uBones.value=this.rig.matrices,this.material.uniforms.uPrevBones.value=this._prevBones,l&&(this.shadowMaterial=l.createSkinnedMaterial(this.material.uniforms.uBones),this.mesh.userData.shadowMaterial=this.shadowMaterial)}spawn(t,e){this.position.copy(t),this.velocity.set(0,0,0),this.yaw=e,this.pitch=0,this.health=this.maxHealth,this.alive=!0,this.deathTime=-1,this.hitFlash=0,this.ragdoll.deactivate(),this.mesh.visible=!0,this.rig.root.copy(t),this.rig.yaw=e,this._poseHistory=!1}applyDamage(t,e){return this.alive?(this.health-=t,this.hitFlash=Math.min(1,this.hitFlash+.55),this.lastDamageFrom=e.source??null,this.onDamaged?.(t,e),e.direction&&this.rig.addHitReaction(e.direction.x,e.direction.z,Math.min(.35,t*.006)),this.health<=0?(this.kill(e),!0):!1):!1}kill(t){if(!this.alive)return;this.alive=!1,this.deathTime=0;const e=vx.set(0,0,0);t?.direction&&(e.copy(t.direction).multiplyScalar(t.impulse??8),e.y+=1.4),this.ragdoll.activate((i,n)=>this.rig.getJoint(i,n),this.velocity,t?.point??this.position,e),this.onKilled?.(t)}update(t,e){for(let i=0;i<eo;i++)this._prevBones[i].copy(this.rig.matrices[i]);if(this.hitFlash=Math.max(0,this.hitFlash-t*3.2),this.material.uniforms.uHitFlash.value=this.hitFlash*this.hitFlash,this.alive){this.yaw=e.yaw,this.pitch=e.pitch,this.stance=e.stance,this.aiming=e.aiming,this.rig.root.copy(this.position);const i=Math.cos(this.yaw),n=Math.sin(this.yaw);this.rig.groundL=this._groundAt(this.position.x-i*.11,this.position.z-n*.11),this.rig.groundR=this._groundAt(this.position.x+i*.11,this.position.z+n*.11),this.rig.update(t,{velocity:this.velocity,yaw:this.yaw,pitch:this.pitch,stance:this.stance,aiming:this.aiming})}else this.deathTime+=t,this.ragdoll.step(t),this.rig.setFromRagdoll(this.ragdoll),this.position.copy(this.rig.joints[q.PELVIS]),this.deathTime>45&&(this.mesh.visible=!1);if(this._poseHistory===!1){for(let i=0;i<eo;i++)this._prevBones[i].copy(this.rig.matrices[i]);this._poseHistory=!0}this._updateHitboxes()}_groundAt(t,e){$h.set(t,this.position.y+1,e);const i=this.bvh.raycast($h,_x,2.4,xx);return i.hit?i.point.y:this.position.y}_updateHitboxes(){const t=this.rig.joints;for(const e of this.hitboxes)e.a.copy(t[e.def.a]),e.b.copy(t[e.def.b]),e.def.extend&&(Ml.subVectors(e.b,e.a),Ml.lengthSq()>1e-8&&e.b.addScaledVector(Ml.normalize(),e.def.extend));Nr.set(1/0,1/0,1/0),Or.set(-1/0,-1/0,-1/0);for(const e of this.hitboxes)Nr.min(e.a).min(e.b),Or.max(e.a).max(e.b);this.boundsCenter.addVectors(Nr,Or).multiplyScalar(.5),this.boundsRadius=Or.distanceTo(Nr)*.5+.21}getEyePosition(t){return t.copy(this.rig.joints[q.HEAD])}dispose(){this.material.dispose(),this.shadowMaterial?.dispose()}}const vx=new y,$h=new y,_x=new y(0,-1,0),Ml=new y,Nr=new y,Or=new y,xx=new Xi;class yx{constructor({scene:t,nav:e,bvh:i,factory:n,rng:s,shadowSystem:r,prevViewProjection:o,combat:l,audio:c}){this.scene=t,this.nav=e,this.bvh=i,this.factory=n,this.rng=s,this.shadowSystem=r,this.prevViewProjection=o,this.combat=l,this.audio=c,this.agents=[],this.characters=[],this.teams={A:[],B:[]},this.player=null,this._senseCursor=0,this._respawnQueue=[],this.respawnDelay=5.5,this.spawnPoints={A:[],B:[]},this.onAgentKilled=null}setSpawnPoints(t,e){this.spawnPoints.A=t,this.spawnPoints.B=e}setPlayer(t){this.player=t}createAgent(t,e,i){const n=this.agents.length+1,s=this.rng.fork(n*977),r=new gx({id:n,team:t,variant:n%3,factory:this.factory,bvh:this.bvh,rng:s,prevViewProjection:this.prevViewProjection,shadowSystem:this.shadowSystem});this.scene.add(r.mesh),this.combat?.registerCharacter(r);const o=new J_({character:r,nav:this.nav,bvh:this.bvh,rng:s,skill:e,squad:i});return r.onDamaged=(l,c)=>{o.onDamaged(c),this._alertNearby(o,c?.point,26)},r.onNearMiss=l=>o.onNearMiss(l),r.onKilled=l=>{o._setState(Dt.DEAD),this._respawnQueue.push({agent:o,time:this.respawnDelay}),this.onAgentKilled?.(o,l)},o.onFire=(l,c,h)=>{this.combat?.fireBullet({origin:l,direction:c,owner:h.character,damage:jh.damage,muzzle:l,firstPerson:!1,spec:jh}),this.combat?.spawnMuzzleFlash(l,c,!1),this.combat?.ejectCasing(l,c,h.controller.velocity),this.audio?.playGunshot(l,{firstPerson:!1}),this._propagateSound(l,1,h)},o.onReload=l=>{this.audio?.playReload(l.character.position,.55)},this.agents.push(o),this.characters.push(r),this.teams[t].push(o),o}spawnTeam(t,e,i=[.4,.8]){for(let n=0;n<e;n++){const s=i[0]+this.rng.next()*(i[1]-i[0]),r=this.createAgent(t,s,n%2);this.respawn(r,!0)}}respawn(t,e=!1){const i=t.character.team,n=this._enemiesOf(i),s=[];for(const o of this.teams[i])o!==t&&o.character.alive&&s.push(o.controller.position);if(!(this.nav.spawnPoint(this.rng,cn,{enemies:n,avoid:s,minEnemyDist:26})??this.nav.spawnPoint(this.rng,cn,{enemies:n,avoid:s,minEnemyDist:14,samples:192})??this.nav.spawnPoint(this.rng,cn,{avoid:s,minEnemyDist:0,clearance:.7,samples:256}))){const o=this.spawnPoints[i];if(!o||!o.length)return;let l=null,c=-1/0;for(const h of o){if(!this.nav.isWalkableAt(h.x,h.z))continue;let u=1/0;for(const g of n)g.alive&&(u=Math.min(u,h.distanceToSquared(g.position)));const d=(u===1/0?400:Math.min(u,3600))+this.rng.next()*60;d>c&&(c=d,l=h)}if(!l)return;cn.copy(l),cn.y=this.nav.heightAt(cn.x,cn.z)}cn.y+=.05,t.spawn(cn,this.rng.next()*Math.PI*2),e&&(t.state=Dt.PATROL)}_enemiesOf(t){const e=[];for(const i of this.characters)i.team!==t&&e.push(i);return this.player&&this.player.team!==t&&e.push(this.player),e}_alliesOf(t){const e=[];for(const i of this.agents)i.character.team===t&&e.push(i);return e}_propagateSound(t,e,i){for(const n of this.agents)n===i||!n.alive||n.hearSound(t,e)}playerFired(t){this._propagateSound(t,1.15,null)}_alertNearby(t,e,i){if(e)for(const n of this._alliesOf(t.character.team))n===t||!n.alive||n.position.distanceTo(t.position)>i||(n.awareness=Math.max(n.awareness,.75),n.suspicionPoint.copy(e),n.hasSuspicion=!0)}update(t){for(let r=this._respawnQueue.length-1;r>=0;r--){const o=this._respawnQueue[r];o.time-=t,o.time<=0&&(this.respawn(o.agent),this._respawnQueue.splice(r,1))}for(let r=0;r<this.agents.length;r++){const o=this.agents[r];if(o.alive)for(let l=r+1;l<this.agents.length;l++){const c=this.agents[l];if(!c.alive)continue;const h=c.position.x-o.position.x,u=c.position.z-o.position.z,d=h*h+u*u;if(d>2.56||d<1e-5)continue;const g=Math.sqrt(d),m=(1.6-g)/1.6,v=h/g,p=u/g;o.addSeparation(-v*m,-p*m),c.addSeparation(v*m,p*m)}}const e=this._enemiesOf("A"),i=this._enemiesOf("B"),n=this._alliesOf("A"),s=this._alliesOf("B");for(const r of this.agents){const o=r.character.team;r.update(t,{enemies:o==="A"?e:i,allies:o==="A"?n:s,grenades:this.combat?.liveGrenades??Sx})}}aliveCount(t){let e=0;for(const i of this.agents)i.character.team===t&&i.alive&&e++;return e}dispose(){for(const t of this.characters)this.scene.remove(t.mesh),this.combat?.unregisterCharacter(t),t.dispose();this.agents.length=0,this.characters.length=0,this.teams.A.length=0,this.teams.B.length=0}}const jh={damage:22,headMultiplier:2.6,limbMultiplier:.72,falloffStart:30,falloffEnd:95,falloffMin:.55,penetration:.55,muzzleVelocity:780,maxRange:220},cn=new y,Sx=[],In={STAND:0,CROUCH:1},wx=Math.PI*2,Mx=16,Zh=.45,Ta=.15,kr=.46,bx=.21,Tx=.07,Jh=.22,Ex=[.12,-.02,-.34],Gi={walk:5.7,sprint:8.8,crouch:2.9,ads:3.3,air:2},hn={boost:1.22,minSpeed:.9,endSpeed:4.2,friction:2.4,duration:1.05,cooldown:.45,steer:2.6},bl={ground:14,air:11,friction:11.5},Qh=21.5,Ax=6.15;class Cx{constructor(t,e,i){this.world=t,this.input=e,this.audio=i,this.controller=new ad(t.bvh,{radius:.33,height:1.76,crouchHeight:.95,stepOffset:.44,slopeLimit:50}),this.yaw=0,this.pitch=0,this.stance=In.STAND,this.stanceBlend=0,this.sprinting=!1,this.wantsAds=!1,this.adsBlend=0,this.speed2D=0,this.moveInput=new It,this.wishDir=new y,this.health=100,this.maxHealth=100,this.armor=0,this.alive=!0,this.lastDamageTime=-99,this.regenDelay=5.5,this.regenRate=14,this.team="A",this.kills=0,this.deaths=0,this.eye=new y,this.eyeHeight=1.62,this.crouchEyeHeight=.86,this.bobPhase=0,this.bobAmount=new fs(26,1),this.leanSpring=new Nn(0,15,.85),this.pitchKick=new Nn(0,26,.62),this.yawKick=new Nn(0,24,.66),this.rollKick=new Nn(0,18,.7),this.heightSpring=new Nn(this.eyeHeight,17,1),this.landDip=new Nn(0,19,.72),this.breath=0,this.leanInput=0,this.lean=0,this.leanBlend=0,this.viewRecoil=new It,this.recoilRecovery=new It,this.footstepDistance=0,this.lastSurface=0,this.airTime=0,this.timeSinceFire=99,this._prevPosition=new y,this._renderPosition=new y,this._eyeY=null,this.airborneFor=0,this.sliding=!1,this.slideTime=0,this.slideCooldown=0,this.slideDir=new y,this.velocity=this.controller.velocity,this.spawnProtect=0}get position(){return this.controller.position}get crouched(){return this.stance===In.CROUCH}spawn(t){this.controller.position.copy(t),this.controller.velocity.set(0,0,0),this._prevPosition.copy(t),this._eyeY=null,this.airborneFor=0,this.sliding=!1,this.slideTime=0,this.slideCooldown=0,this.health=this.maxHealth,this.alive=!0,this.stance=In.STAND,this.stanceBlend=0,this.heightSpring.set(this.eyeHeight),this.viewRecoil.set(0,0),this.lean=this.leanBlend=this.leanInput=0,this.spawnProtect=1.25,this.controller.setHeight(this.controller.standHeight)}look(t,e){if(!this.alive)return;const i=1-this.adsBlend*(1-Mt.data.adsMultiplier);this.yaw-=t*i,this.pitch-=e*i;const n=Math.PI*.5-.015;this.pitch=Math.max(-n,Math.min(n,this.pitch)),this.yaw>Math.PI&&(this.yaw-=Math.PI*2),this.yaw<-Math.PI&&(this.yaw+=Math.PI*2)}addRecoil(t,e,i=.72){this.pitch+=t,this.yaw+=e,this.viewRecoil.x+=t*i,this.viewRecoil.y+=e*i;const n=Math.PI*.5-.015;this.pitch=Math.min(n,this.pitch)}update(t,e){if(this._prevPosition.copy(this.controller.position),this.timeSinceFire+=t,this.spawnProtect=Math.max(0,this.spawnProtect-t),!this.alive){this.controller.velocity.y-=Qh*t,zr.copy(this.controller.velocity).multiplyScalar(t),this.controller.move(t,zr);return}const i=this.input,n=(i.action("forward")?1:0)-(i.action("back")?1:0),s=(i.action("right")?1:0)-(i.action("left")?1:0);if(this.moveInput.set(s,n),this.moveInput.lengthSq()>1&&this.moveInput.normalize(),this.slideCooldown=Math.max(0,this.slideCooldown-t),i.action("slide")&&!this.sliding&&this.slideCooldown===0&&!this.crouched&&i.action("sprint")&&this.airborneFor<Ta&&this.speed2D>Gi.walk*hn.minSpeed){this.sliding=!0,this.slideTime=0;const x=Math.hypot(this.controller.velocity.x,this.controller.velocity.z)||1;this.slideDir.set(this.controller.velocity.x/x,0,this.controller.velocity.z/x);const _=Math.min(x*hn.boost,Gi.sprint*hn.boost);this.controller.velocity.x=this.slideDir.x*_,this.controller.velocity.z=this.slideDir.z*_,this.audio?.playFootstep(this.controller.position,this.controller.groundSurface,1),this.onSlide?.()}if(this.sliding){this.slideTime+=t;const x=Math.hypot(this.controller.velocity.x,this.controller.velocity.z);(!i.action("slide")||this.slideTime>hn.duration||x<hn.endSpeed||this.airborneFor>Ta)&&(this.sliding=!1,this.slideCooldown=hn.cooldown)}const o=i.action("crouch")||i.action("slide")||this.sliding;o&&this.stance!==In.CROUCH?this.stance=In.CROUCH:!o&&this.stance===In.CROUCH&&(this.controller.setHeight(this.controller.crouchHeight),this.controller.canStand()&&(this.stance=In.STAND));const l=this.stance===In.CROUCH?1:0;this.stanceBlend=Je(this.stanceBlend,l,13,t),this.controller.setHeight(Ht.lerp(this.controller.standHeight,this.controller.crouchHeight,this.stanceBlend)),this.leanInput=(i.action("leanRight")?1:0)-(i.action("leanLeft")?1:0);const c=n>.1&&Math.abs(s)<.9;this.sprinting=i.action("sprint")&&c&&!this.crouched&&this.airborneFor<Ta&&!this.wantsAds&&this.timeSinceFire>.16;const h=this.wantsAds&&!this.sprinting?1:0;this.adsBlend=Je(this.adsBlend,h,h>.5?17:14,t),this.lean=this.sprinting?0:this._allowedLean(this.leanInput);const u=Math.cos(this.yaw),d=Math.sin(this.yaw);this.wishDir.set(this.moveInput.x*u-this.moveInput.y*d,0,-this.moveInput.x*d-this.moveInput.y*u);let g=Gi.walk;this.crouched?g=Gi.crouch:this.sprinting&&(g=Gi.sprint),this.adsBlend>.05&&(g=Math.min(g,Ht.lerp(g,Gi.ads,this.adsBlend)));const m=this.controller.velocity,v=this.controller.grounded;if(v&&this.sliding){const x=Math.hypot(m.x,m.z);if(x>.001){const _=x*hn.friction*t,M=Math.max(0,x-_)/x;m.x*=M,m.z*=M}m.x+=this.wishDir.x*hn.steer*t,m.z+=this.wishDir.z*hn.steer*t,this.airTime=0}else if(v){const x=Math.hypot(m.x,m.z);if(x>.001){const T=Math.max(x,2.4)*bl.friction*t,E=Math.max(0,x-T)/x;m.x*=E,m.z*=E}const _=m.x*this.wishDir.x+m.z*this.wishDir.z,M=g-_;if(M>0){const T=Math.min(bl.ground*g*t,M);m.x+=this.wishDir.x*T,m.z+=this.wishDir.z*T}this.airTime=0}else{const x=Math.min(g,Gi.air+2.5),_=m.x*this.wishDir.x+m.z*this.wishDir.z,M=Math.min(x-_,bl.air*t*g/Gi.walk);M>0&&(m.x+=this.wishDir.x*M,m.z+=this.wishDir.z*M),this.airTime+=t}if(i.action("jump")&&v&&this.controller.velocity.y<=.4&&(m.y=Ax*(this.crouched?.82:1),this.controller.grounded=!1,this.audio?.playJump(this.controller.position,this.controller.groundSurface)),m.y-=Qh*t,m.y=Math.max(m.y,-58),zr.copy(m).multiplyScalar(t),this.controller.move(t,zr),this.speed2D=Math.hypot(m.x,m.z),this.airborneFor=this.controller.grounded?0:this.airborneFor+t,this.controller.landingImpact>0){const x=this.controller.landingImpact;this.landDip.nudge(-x*3.4),this.pitchKick.nudge(x*.42),this.audio?.playLand(this.controller.position,this.controller.groundSurface,x),x>.72&&this.applyDamage((x-.72)*130,null,"fall")}if(v&&this.speed2D>.6){this.footstepDistance+=this.speed2D*t;const x=this.crouched?1.9:this.sprinting?2.75:2.35;if(this.footstepDistance>=x){this.footstepDistance-=x;const _=this.sprinting?1:this.crouched?.35:.68;this.audio?.playFootstep(this.controller.position,this.controller.groundSurface,_),this.onFootstep?.(_,this.controller.groundSurface)}}else v||(this.footstepDistance=1.2);const p=1-Math.exp(-8.5*t),f=this.viewRecoil.x*p,S=this.viewRecoil.y*p;this.pitch-=f,this.yaw-=S,this.viewRecoil.x-=f,this.viewRecoil.y-=S,this.alive&&e-this.lastDamageTime>this.regenDelay&&this.health<this.maxHealth&&(this.health=Math.min(this.maxHealth,this.health+this.regenRate*t)),this.lastSurface=this.controller.groundSurface}_allowedLean(t){if(t===0)return 0;const e=Ht.lerp(this.eyeHeight,this.crouchEyeHeight,this.stanceBlend),i=Math.cos(this.yaw),n=Math.sin(this.yaw);tu.set(i*t,0,-n*t);const s=kr+Jh;let r=kr;for(const o of Ex){Tl.copy(this.controller.position),Tl.y+=e+o;const l=this.world.bvh.raycast(Tl,tu,s);l.hit&&(r=Math.min(r,Math.max(0,l.t-Jh)))}return t*(r/kr)}get speedNorm(){return Ht.clamp(this.speed2D/Gi.walk,0,1.6)}get sprintNorm(){const t=Gi.sprint/Gi.walk-1;return Ht.clamp((this.speedNorm-1)/t,0,1)}get bobStrength(){const t=this.speedNorm;return t<=1?t:1+(t-1)*.3}updateView(t,e,i){const n=this.controller;this._renderPosition.lerpVectors(this._prevPosition,n.position,e);const s=Ht.lerp(this.eyeHeight,this.crouchEyeHeight,this.stanceBlend);this.heightSpring.target=s,this.heightSpring.update(t);const r=this.speedNorm,o=n.grounded,l=Ht.lerp(Ht.lerp(8.4,6.2,this.stanceBlend),10.4,this.sprintNorm);this.airborneFor<Ta&&(this.bobPhase=(this.bobPhase+t*l*Math.min(r,1.4))%wx);const c=1-Ht.clamp(this.airborneFor/Ta,0,1),h=this.bobStrength*c*(1-this.adsBlend*.78)*Mt.data.cameraShake;this.bobAmount.target.set(Math.sin(this.bobPhase)*.026*h,Math.cos(this.bobPhase*2)*-.012*h,0),this.bobAmount.update(t);const u=-this.moveInput.x*(this.sprinting?.055:.034)*(1-this.adsBlend*.85);this.leanSpring.target=u,this.leanSpring.update(t),this.landDip.target=0,this.landDip.update(t),this.pitchKick.target=0,this.pitchKick.update(t),this.yawKick.target=0,this.yawKick.update(t),this.rollKick.target=0,this.rollKick.update(t),this.breath+=t*(this.sprinting?2.4:1.05);const d=(.0016+(1-Ht.clamp(this.health/100,0,1))*.0035)*(1-this.adsBlend*.6);this.leanBlend=Je(this.leanBlend,this.lean,11,t);const g=this._renderPosition.y+this.heightSpring.value+this.landDip.value*.055-Math.abs(this.leanBlend)*Tx;this._eyeY===null||!o?this._eyeY=g:(this._eyeY+=(g-this._eyeY)*(1-Math.exp(-t*Mx)),this._eyeY=Ht.clamp(this._eyeY,g-Zh,g+Zh)),this.eye.copy(this._renderPosition),this.eye.y=this._eyeY;const m=Math.cos(this.yaw),v=Math.sin(this.yaw),p=this.bobAmount.value,f=p.x+this.leanBlend*kr;this.eye.x+=f*m,this.eye.z+=-f*v,this.eye.y+=p.y,this.viewPitch=this.pitch+this.pitchKick.value+Math.sin(this.breath*1.7)*d,this.viewYaw=this.yaw+this.yawKick.value+Math.sin(this.breath*.9+1.2)*d*1.4,this.viewRoll=this.leanSpring.value+this.rollKick.value-this.leanBlend*bx+Math.sin(this.bobPhase+1.1)*.012*h}applyToCamera(t){t.position.copy(this.eye),t.quaternion.setFromEuler(Rx.set(this.viewPitch,this.viewYaw,this.viewRoll,"YXZ")),t.updateMatrixWorld()}forward(t=new y){const e=Math.cos(this.pitch);return t.set(-Math.sin(this.yaw)*e,Math.sin(this.pitch),-Math.cos(this.yaw)*e)}aimOrigin(t=new y){return t.copy(this.eye)}applyDamage(t,e,i="bullet"){return!this.alive||this.spawnProtect>0?!1:(this.health-=t,this.lastDamage={amount:t,source:e,kind:i,time:performance.now()/1e3},this.health<=0?(this.health=0,this.alive=!1,this.deaths++,this.onDeath?.(e),!0):!1)}surfaceName(){return Bn[this.lastSurface]?.name??"concrete"}}const zr=new y,Rx=new oe,tu=new y,Tl=new y;class Px{constructor(t){this.player=t,this.team=t.team,this.name="YOU",this.isLocal=!0,this.position=new y,this.velocity=t.controller.velocity,this.boundsRadius=1.1,this.hitboxes=[{name:"head",zone:"head",radius:.115,a:new y,b:new y},{name:"torso",zone:"body",radius:.21,a:new y,b:new y},{name:"legs",zone:"limb",radius:.19,a:new y,b:new y}],this.onDamaged=null}get alive(){return this.player.alive}get health(){return this.player.health}sync(){const t=this.player.controller.position,e=this.player.controller.height;this.position.copy(t),this.position.y+=e*.5;const i=this.hitboxes[0];i.a.set(t.x,t.y+e-.16,t.z),i.b.set(t.x,t.y+e-.02,t.z);const n=this.hitboxes[1];n.a.set(t.x,t.y+e*.46,t.z),n.b.set(t.x,t.y+e-.24,t.z);const s=this.hitboxes[2];s.a.set(t.x,t.y+.22,t.z),s.b.set(t.x,t.y+e*.46,t.z)}getEyePosition(t){return t.copy(this.player.eye)}applyDamage(t,e){const i=this.player.applyDamage(t,e.source,"bullet");return this.onDamaged?.(t,e),i}}const Lx=["HAWK","VIPER","ATLAS","RONIN","CIPHER","ORACLE","BISHOP","NOMAD"],Dx=["JACKAL","SPECTRE","KILO","ONYX","HAVOC","WRAITH","TALON","ZEALOT"];class eu{constructor({scoreLimit:t=40,timeLimit:e=600,respawnDelay:i=3}={}){this.scoreLimit=t,this.timeLimit=e,this.respawnDelay=i,this.reset(),this.onEnd=null,this.onKill=null}reset(){this.scores={A:0,B:0},this.timeLeft=this.timeLimit,this.running=!1,this.ended=!1,this.winner=null,this.endReason="",this.players=new Map,this.events=[],this.elapsed=0}registerPlayer(t,{name:e,team:i,isLocal:n=!1}){return this.players.set(t,{id:t,name:e,team:i,isLocal:n,kills:0,deaths:0,headshots:0,shots:0,hits:0,streak:0,bestStreak:0}),this.players.get(t)}static callsign(t,e){const i=t==="A"?Lx:Dx;return`${i[e%i.length]}-${1+Math.floor(e/i.length)}`}start(){this.running=!0,this.ended=!1,this.timeLeft=this.timeLimit,this.elapsed=0}update(t){!this.running||this.ended||(this.timeLeft-=t,this.elapsed+=t,this.timeLeft<=0&&(this.timeLeft=0,this._end(this.scores.A===this.scores.B?null:this.scores.A>this.scores.B?"A":"B","Time expired")))}registerKill(t,e,{headshot:i=!1}={}){if(this.ended)return null;const n=this.players.get(e),s=t!==null?this.players.get(t):null;if(!n)return null;n.deaths++,n.streak=0;let r=null;s&&s.team!==n.team?(s.kills++,s.streak++,s.bestStreak=Math.max(s.bestStreak,s.streak),i&&s.headshots++,r=s.team):(s&&s.team===n.team&&s.kills--,r=n.team==="A"?"B":"A"),r&&this.scores[r]++;const o={killer:s?s.name:"THE WORLD",killerTeam:s?s.team:n.team==="A"?"b":"a",victim:n.name,victimTeam:n.team,headshot:i,streak:s?s.streak:0,involvesPlayer:s?.isLocal?"killer":n.isLocal?"victim":null};return this.events.push(o),this.onKill?.(o),this.scores[r]>=this.scoreLimit&&this._end(r,"Score limit reached"),o}registerShot(t,e=!1){const i=this.players.get(t);i&&(i.shots++,e&&i.hits++)}_end(t,e){this.ended=!0,this.running=!1,this.winner=t,this.endReason=e,this.onEnd?.(t,e)}scoreboard(){const t=[...this.players.values()].map(e=>({name:e.name,team:e.team,kills:e.kills,deaths:e.deaths,headshots:e.headshots,accuracy:e.shots>0?e.hits/e.shots:null,self:e.isLocal}));return t.sort((e,i)=>e.team===i.team?i.kills-e.kills:e.team<i.team?-1:1),t}localPlayer(){for(const t of this.players.values())if(t.isLocal)return t;return null}}const xe=[.4,.42,.47],Da=[1.15,.94,.66],dn=[.21,.21,.23],te=(a,t)=>[a[0]*t,a[1]*t,a[2]*t],fn={muzzle:new y(0,0,-.452),ejectionPort:new y(.026,.02,.012),sightWindow:new y(0,.0855,-.055),sightAxisOffsetY:.0855,magazine:new y(0,-.075,-.012),chargingHandle:new y(0,.03,.128),boltCarrier:new y(0,.02,.02),triggerPivot:new y(0,-.02,.052),gripTop:new y(0,-.03,.07),foregrip:new y(0,-.032,-.255),selector:new y(-.021,-.006,.062)},Ix=new y,Fx=new y;let Ux=0;function Wt(a,t,e){return(Ux++&1?Fx:Ix).set(a,t,e)}function ke(a,t,e){const i=new Nt;return i.compose(a||Gx,t?qx.setFromEuler(t):Xx,Wx),i}function iu(a,t,e,i,n,s,r,o){const l=Math.min(n,s,r)*(o.bevel??.18);a.addBox(t,e,i,n,s-l*2,r-l*2,o),a.addBox(t,e,i,n-l*2,s,r-l*2,o),a.addBox(t,e,i,n-l*2,s-l*2,r,o)}function Bx(a,t,e,i,n,s){const r=i-e,o=.0102,l=.0053,c=Math.max(1,Math.floor(r/o));a.addBox(0,t-.004,(e+i)*.5,n*.78,.005,r,s);for(let h=0;h<c;h++){const u=e+(h+.5)*o,d=o-l;a.addBox(0,t,u,n,.0042,d,s),a.addBox(0,t-.0035,u,n*.86,.004,d*1.02,s)}}function El(a,t,e,i,n,s,r){const l=Math.floor((s-n)/.0245);for(let c=0;c<l;c++){const h=n+(c+.5)*.0245,u=e==="x"?i*r:0,d=e==="y"?i*r:0;a.addBox(u,d,h,e==="x"?.004:.0075,e==="y"?.004:.0075,.0175,{...t,tint:te(xe,.62)})}}function Nx(a,t={}){const e={layer:X.GUNMETAL,tint:xe,wear:t.wear??.55,uvScale:9},i={layer:X.POLYMER,tint:dn,wear:t.wear??.5,uvScale:11},n={layer:X.POLYMER,tint:Da,wear:.6,uvScale:11};a.addCylinderBetween(Wt(0,0,-.1),Wt(0,0,-.4),.0105,.0082,12,{...e,caps:!1}),a.addBox(0,0,-.318,.024,.026,.036,e),a.addCylinderBetween(Wt(0,.011,-.318),Wt(0,.011,-.4),.0055,.0055,8,{...e,caps:!1}),a.addCylinderBetween(Wt(0,0,-.4),Wt(0,0,-.428),.0112,.0125,14,{...e,caps:!1}),a.addCylinderBetween(Wt(0,0,-.428),Wt(0,0,-.466),.0125,.0118,14,{...e,caps:!1});for(let l=0;l<5;l++){const c=Math.PI*.5+(l-2)*.52;a.addBox(Math.cos(c)*.0118,Math.sin(c)*.0118,-.446,.005,.005,.018,{...e,tint:te(xe,.88)})}a.addCylinderBetween(Wt(0,0,-.466),Wt(0,0,-.469),.0118,.0092,14,e),a.addCylinderBetween(Wt(0,0,-.464),Wt(0,0,-.474),.0042,.0042,12,{layer:X.GUNMETAL,tint:te(dn,.18),wear:.2,uvScale:20});const s=-.352,r=-.098,o=.0245;{for(let c=0;c<8;c++){const h=c/8*Math.PI*2+Math.PI/8,u=Math.cos(h)*o,d=Math.sin(h)*o;a.pushTransform(ke(new y(u,d,(s+r)*.5),new oe(0,0,h+Math.PI/2))),a.addBox(0,0,0,.0195,.005,r-s,n),a.popTransform()}a.addCylinderBetween(Wt(0,0,r),Wt(0,0,r-.016),o*1.07,o*1.07,10,{...e,caps:!1}),a.addCylinderBetween(Wt(0,0,s+.01),Wt(0,0,s),o*.96,o*.9,10,{...n,caps:!1}),El(a,n,"x",1,s+.03,r-.03,o-.001),El(a,n,"x",-1,s+.03,r-.03,o-.001),El(a,n,"y",-1,s+.03,r-.03,o-.001)}iu(a,0,.014,-.002,.0385,.055,.196,{...e,bevel:.12}),a.addBox(0,.03,.104,.032,.03,.026,e),a.addBox(.0198,.019,.01,.004,.03,.062,{...e,tint:te(xe,1.2),wear:.75}),a.addBox(.0208,.019,.01,.003,.026,.056,{...e,tint:te(xe,.55)}),a.addCylinderBetween(Wt(.021,.004,-.021),Wt(.021,.004,.041),.0022,.0022,6,{...e,caps:!1}),a.addBox(.019,.03,.049,.01,.018,.026,e),a.addCylinderBetween(Wt(.017,.019,.048),Wt(.032,.019,.048),.0062,.0058,8,e),Bx(a,.0455,-.348,.108,.021,e),iu(a,0,-.02,.036,.0345,.05,.128,{...e,bevel:.16}),a.pushTransform(ke(new y(0,-.048,-.008),new oe(.075,0,0))),a.addBox(0,0,0,.0345,.06,.052,e),a.addBox(0,.028,0,.0375,.01,.056,e),a.popTransform(),a.pushTransform(ke(new y(0,-.104,-.006),new oe(.1,0,0)));for(let l=0;l<5;l++){const c=l/4,h=c*c*.016;a.addBox(0,-c*.052-.006,h,.0268-c*.001,.016,.0405+c*.001,{...i,tint:te(Da,.8)})}a.addBox(0,.02,-.002,.0292,.014,.0432,i),a.addBox(0,-.238,.062,.0292,.014,.0432,{...i,tint:te(dn,1.3)});for(let l=0;l<4;l++)a.addBox(.0138,-.032-l*.04,.004+l*.004,.003,.01,.012,{...i,tint:te(dn,.8)});a.popTransform(),a.addBox(0,-.0455,.055,.0075,.005,.05,{...e,tint:te(xe,1.4)}),a.addBox(0,-.032,.0805,.0075,.03,.005,{...e,tint:te(xe,1.4)}),a.pushTransform(ke(new y(0,-.03,.0575),new oe(.3,0,0))),a.addBox(0,0,0,.0062,.021,.005,{...e,tint:te(xe,1.05)}),a.popTransform(),a.addCylinderBetween(Wt(-.0195,-.006,.0605),Wt(-.0245,-.006,.0605),.0068,.0068,8,e),a.pushTransform(ke(new y(-.0235,-.006,.062),new oe(0,0,-.5))),a.addBox(0,0,0,.006,.0165,.0075,{...e,tint:te(xe,.88)}),a.popTransform(),a.addBox(.0192,-.014,.0075,.006,.011,.011,{...e,tint:te(xe,1)}),a.addBox(-.0192,-.01,.006,.005,.009,.028,{...e,tint:te(xe,.88)}),a.addCylinderBetween(Wt(.0178,-.01,-.03),Wt(.0208,-.01,-.03),.0042,.0042,8,{...e,tint:te(xe,1.15)}),a.addCylinderBetween(Wt(.0178,-.014,.0885),Wt(.0208,-.014,.0885),.0042,.0042,8,{...e,tint:te(xe,1.15)}),a.pushTransform(ke(new y(0,-.072,.098),new oe(.42,0,0))),a.addBox(0,0,0,.0295,.086,.038,n),a.addBox(0,-.048,.002,.0315,.012,.04,n),a.addBox(0,.035,-.01,.031,.022,.03,n);for(let l=0;l<7;l++){const c={...n,tint:[n.tint[0]*.78,n.tint[1]*.78,n.tint[2]*.78]};a.addBox(0,.03-l*.0125,-.0192,.026,.0055,.004,c),a.addBox(0,.03-l*.0125,.0192,.026,.0055,.004,c)}a.popTransform(),a.addCylinderBetween(Wt(0,.014,.098),Wt(0,.014,.118),.0165,.0165,12,{...e,caps:!1}),a.addCylinderBetween(Wt(0,.014,.118),Wt(0,.014,.314),.0148,.0148,12,{...e,caps:!1}),a.addCylinderBetween(Wt(0,.014,.108),Wt(0,.014,.118),.0185,.0185,10,{...e,tint:te(dn,1.3)}),a.pushTransform(ke(new y(0,.012,.214),new oe(0,0,0))),a.addBox(0,.006,0,.04,.048,.098,n),a.addBox(0,.03,.006,.03,.02,.086,n),a.addBox(0,-.022,-.028,.034,.02,.04,n),a.addBox(0,-.03,-.03,.014,.014,.03,{...i,tint:te(xe,1.05)}),a.popTransform(),a.pushTransform(ke(new y(0,.01,.272),new oe(-.13,0,0))),a.addBox(0,0,0,.042,.088,.016,{...i,tint:te(xe,1)}),a.addBox(0,-.036,.004,.04,.02,.012,{...i,tint:te(dn,1.05)}),a.popTransform(),a.addBox(.021,.006,.176,.006,.02,.01,e),a.addBox(0,.054,-.055,.03,.018,.052,{...e,tint:te(xe,1.45)}),a.addBox(.017,.05,-.055,.008,.014,.048,{...e,tint:te(dn,1.3)}),a.addCylinderBetween(Wt(.021,.05,-.07),Wt(.021,.05,-.04),.0055,.0055,8,e);{const m={...e,tint:te(xe,1.35)};a.addBox(0,.0855+.02-.0038*.5,-.055,.01725*2,.0038,.06,m),a.addBox(0,.0855-.02+.0038*.5,-.055,.01725*2,.0038,.06,m),a.addBox(-.01725+.0038*.5,.0855,-.055,.0038,(.02-.0038)*2,.06,m),a.addBox(.01725-.0038*.5,.0855,-.055,.0038,(.02-.0038)*2,.06,m),a.addBox(0,.0855+.02+.004,-.055-.008,.0365,.005,.05,{...e,tint:te(xe,1.2)})}a.addCylinderBetween(Wt(-.019,.0855,-.062),Wt(-.027,.0855,-.062),.0085,.0085,10,{...e,tint:te(dn,1.3)});for(let l=0;l<8;l++){const c=l/8*Math.PI*2;a.addBox(-.0235,.0855+Math.sin(c)*.0085,-.062+Math.cos(c)*.0085,.003,.003,.003,{...e,tint:te(xe,1)})}a.addCylinder(0,.104,-.048,.0092,.0092,.007,10,{...e,tint:te(xe,1.15)}),a.addBox(0,.053,-.3,.014,.014,.016,{...e,tint:te(xe,1.05)}),a.addBox(0,.053,.078,.016,.013,.018,{...e,tint:te(xe,1.05)}),a.pushTransform(ke(new y(0,-.04,-.248),new oe(.48,0,0))),a.addBox(0,-.03,0,.024,.062,.03,n),a.addBox(0,-.062,.002,.028,.01,.034,n);for(let l=0;l<4;l++)a.addBox(0,-.016-l*.013,-.0155,.02,.006,.004,{...n,tint:te(Da,.72)});return a.popTransform(),a.addCylinderBetween(Wt(-.02,-.016,-.12),Wt(-.026,-.016,-.12),.005,.005,8,{...e,tint:te(xe,1.05)}),fn}function Ox(a){const t={layer:X.GEAR_CLOTH,tint:[1.02,.83,.63],wear:.7,uvScale:14},e={layer:X.POLYMER,tint:[2.05,1.72,1.32],wear:.6,uvScale:16},i={layer:X.GEAR_CLOTH,tint:[1.08,.98,.74],wear:.75,uvScale:7};a.pushTransform(ke(new y(.005,-.075,.102),new oe(.42,.06,0))),a.addBox(0,-.004,0,.05,.085,.05,t),a.addBox(0,.03,-.004,.046,.026,.048,t),a.addBox(0,.014,-.029,.044,.048,.008,e);for(let n=0;n<4;n++){const s=.02-n*.0195,r=.04-Math.abs(n-1.2)*.003;a.pushTransform(ke(new y(0,s,-.028),new oe(0,0,0))),a.addBox(0,0,-r*.5,.04,.0165,r,t),a.addBox(0,-.002,-r-.008,.036,.015,.02,t),a.popTransform()}a.pushTransform(ke(new y(-.022,.02,-.006),new oe(.2,0,-.55))),a.addBox(0,0,-.02,.017,.019,.048,t),a.addBox(0,.006,-.048,.015,.017,.02,t),a.popTransform(),a.pushTransform(ke(new y(.012,-.04,.05),new oe(.62,.16,0))),a.addBox(0,0,.02,.05,.048,.05,t),a.addBox(0,0,.052,.056,.054,.026,{...e,tint:[.42,.4,.36]}),ql(a,.07,.062,.155,i),a.popTransform(),a.popTransform(),a.pushTransform(ke(new y(.002,-.026,-.222),new oe(.26,-.06,.1))),a.addBox(0,-.014,.004,.052,.062,.076,t),a.addBox(0,.018,.004,.046,.03,.07,t),a.addBox(0,.006,-.04,.046,.046,.01,e);for(let n=0;n<4;n++){const s=-.026+n*.0205;a.pushTransform(ke(new y(.004,.03,s),new oe(0,0,-1.15))),a.addBox(0,-.02,0,.017,.046,.019,t),a.addBox(.004,-.046,0,.015,.02,.017,t),a.popTransform()}a.pushTransform(ke(new y(-.02,-.026,-.01),new oe(0,.4,.3))),a.addBox(0,0,.022,.018,.019,.048,t),a.popTransform(),a.pushTransform(ke(new y(-.012,-.052,.05),new oe(.54,-.42,.22))),a.addBox(0,0,.026,.052,.05,.052,t),a.addBox(0,0,.058,.058,.056,.024,{...e,tint:[.42,.4,.36]}),ql(a,.072,.064,.17,i),a.popTransform(),a.popTransform()}function kx(a){const t={layer:X.GEAR_CLOTH,tint:[1.02,.83,.63],wear:.7,uvScale:14},e={layer:X.POLYMER,tint:[2.05,1.72,1.32],wear:.6,uvScale:16},i={layer:X.GEAR_CLOTH,tint:[1.08,.98,.74],wear:.75,uvScale:7},n={layer:X.GUNMETAL,tint:[.46,.52,.44],wear:.5,uvScale:20},s={layer:X.GUNMETAL,tint:te(xe,1.3),wear:.35,uvScale:22};a.addBlob(0,0,0,.032,.041,.032,10,8,n),a.addCylinderBetween(Wt(0,.04,0),Wt(0,.056,0),.011,.013,10,s),a.addBox(.027,.026,0,.006,.056,.014,s),a.addCylinderBetween(Wt(.028,.054,.014),Wt(.028,.054,.02),.01,.01,8,s);for(let r=0;r<4;r++){const o=.026-r*.019;a.pushTransform(ke(new y(.03,o,.004),new oe(0,0,-.18))),a.addBox(0,0,-.014,.019,.0165,.046,t),a.addBox(-.004,-.002,-.04,.017,.015,.019,t),a.popTransform()}a.pushTransform(ke(new y(.016,.03,.026),new oe(-.5,0,-.3))),a.addBox(0,0,-.018,.018,.018,.044,t),a.popTransform(),a.addBox(.044,-.004,.006,.03,.078,.062,t),a.addBox(.052,.02,.006,.026,.03,.056,e),a.pushTransform(ke(new y(.062,-.048,.03),new oe(.7,.3,-.22))),a.addBox(0,0,.022,.05,.048,.05,t),a.addBox(0,0,.054,.056,.054,.026,{...e,tint:[.42,.4,.36]}),ql(a,.07,.062,.165,i),a.popTransform()}function ql(a,t,e,i,n){for(let r=0;r<4;r++){const o=r/3,l=.076+o*i,c=1+o*.16,h=i/4+.014;a.addBox(0,-o*.004,l,t*c,e*c,h,n)}a.addBox(0,0,.074,t*1.05,e*1.05,.012,{...n,tint:[n.tint[0]*.82,n.tint[1]*.82,n.tint[2]*.82]})}function zx(a){const t={layer:X.GUNMETAL,tint:te(xe,1.22),wear:.4,uvScale:12};a.addBox(0,0,0,.026,.024,.06,t),a.addCylinderBetween(Wt(0,0,-.03),Wt(0,0,-.046),.0092,.0092,10,t),a.addBox(.011,.006,.008,.008,.008,.026,{...t,tint:te(xe,1.05)})}function Vx(a){const t={layer:X.GUNMETAL,tint:te(xe,1.05),wear:.6,uvScale:12};a.addBox(0,0,0,.03,.01,.048,t),a.addBox(-.02,0,.02,.02,.012,.01,t),a.addBox(.02,0,.02,.02,.012,.01,t),a.addBox(0,0,-.036,.014,.008,.036,t)}function Hx(a){const t={layer:X.POLYMER,tint:te(Da,.8),wear:.6,uvScale:11},e=9;for(let i=0;i<e;i++){const n=i/(e-1),s=n*n*.024;a.addBox(0,-n*.185-.008,s,.0268-n*.001,.026,.0405,{...t,tint:te(Da,.8-n*.02)})}a.addBox(0,.02,-.002,.0292,.014,.0432,t),a.addBox(0,-.2,.024,.03,.016,.045,{...t,tint:te(dn,1.3)}),a.addBox(0,.03,-.004,.02,.008,.036,{layer:X.GUNMETAL,tint:[.8,.75,.4],wear:.3,uvScale:20})}const Gx=new y(0,0,0),Wx=new y(1,1,1),qx=new Qe,Xx=new Qe,nu=`
precision highp float;
in vec3 position;
in vec2 uv;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec4 uJitter;
out vec3 vWorldPos;
out vec2 vUv;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vUv = uv;
  vec4 clip = projectionMatrix * viewMatrix * wp;
  gl_Position = clip;
}
`,Kx=`
precision highp float;
uniform vec3 uSightOrigin;
uniform vec3 uSightAxis;
uniform vec3 uSightRight;
uniform vec3 uSightUp;
uniform vec3 uCameraPos;
uniform vec3 uColor;
uniform float uBrightness;
uniform float uDotAngle;
uniform float uWindowRadius;
in vec3 vWorldPos;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

void main(){
  // circular window with a soft edge; outside it the emitter is masked by the tube
  vec2 c = vUv * 2.0 - 1.0;
  float rWin = length(c);
  if(rWin > 1.0) discard;
  float windowMask = 1.0 - smoothstep(0.86, 1.0, rWin);

  vec3 ray = normalize(vWorldPos - uCameraPos);
  // angular offset of this eye ray from the optical axis, split into the
  // sight's own right/up basis so the reticle can be non-radial if wanted
  float ax = dot(ray, uSightRight);
  float ay = dot(ray, uSightUp);
  float az = max(dot(ray, uSightAxis), 1e-4);
  vec2 ang = vec2(ax, ay) / az;
  float a = length(ang);

  // A crisp core with a short falloff, plus the small amount of scatter a real
  // emitter throws into the coating. The halo is kept deliberately weak: an
  // over-generous glow plus bloom turns a 3 MOA dot into a fist-sized smear
  // that covers the target it is supposed to help you hit.
  float dot1 = 1.0 - smoothstep(uDotAngle * 0.70, uDotAngle * 1.45, a);
  float glow = exp(-a / (uDotAngle * 1.7)) * 0.20;
  float halo = exp(-a / (uDotAngle * 6.0)) * 0.025;

  float intensity = (dot1 + glow + halo) * uBrightness * windowMask;
  if(intensity < 0.002) discard;

  // the emitter is a genuinely bright LED; let it drive a little bloom
  vec3 col = uColor * intensity * 9.0;
  outColor = vec4(col, 1.0);
}
`,Yx=`
precision highp float;
uniform vec3 uCameraPos;
uniform vec3 uSightAxis;
uniform vec3 uSightOrigin;
uniform vec3 uTint;
uniform float uWindowRadius;
in vec3 vWorldPos;
in vec2 vUv;
layout(location = 0) out vec4 outColor;

void main(){
  vec2 c = vUv * 2.0 - 1.0;
  float r = length(c);
  if(r > 1.0) discard;

  vec3 ray = normalize(vWorldPos - uCameraPos);
  float grazing = 1.0 - abs(dot(ray, uSightAxis));

  // dielectric coating: blue-green off-axis reflection, near-clear on axis
  float coat = pow(clamp(grazing, 0.0, 1.0), 1.6);
  float edge = smoothstep(0.72, 1.0, r);

  vec3 tint = uTint * (0.35 + coat * 1.5);
  float alpha = clamp(0.10 + coat * 0.55 + edge * 0.45, 0.0, 0.92);

  // faint concentric wipe marks so the lens is not perfectly clean
  float smudge = sin(r * 28.0 + c.x * 6.0) * 0.5 + 0.5;
  tint += vec3(0.05) * smudge * coat;

  outColor = vec4(tint, alpha);
}
`,$x=.86,jx=Math.PI*2,ce={hip:{p:[.104,-.118,-.52],r:[.02,-.058,.032]},ads:{p:[0,-.07353,-.4],r:[0,0,0]},sprint:{p:[.146,-.186,-.43],r:[.32,-.52,.46]},low:{p:[.126,-.226,-.47],r:[.62,-.18,.13]},crouch:{p:[.098,-.106,-.53],r:[.01,-.05,.028]},stow:{p:[.15,-.33,-.43],r:[.88,-.3,.22]}},Al={down:{p:[.3,-.52,-.36],r:[.9,-.3,.1]},ready:{p:[.235,-.18,-.395],r:[.16,-.34,.05]},wound:{p:[.315,-.12,-.25],r:[-.3,-.6,.28]},release:{p:[.055,.055,-.62],r:[-.55,.1,-.22]}};class Zx{constructor(t,e){this.factory=t,this.root=new pn,this.root.name="viewmodel",this.root.matrixAutoUpdate=!1,this.transparent=new pn,this.transparent.matrixAutoUpdate=!1;const i=c=>t.createViewmodel(c,e,{detailStrength:1.6});this.bodyMaterial=i("vm-body");const n=new qi(null,"vm-body");Nx(n,{wear:.55}),Ox(n),this.bodyMesh=new Ee(n.build(),this.bodyMaterial),this.bodyMesh.frustumCulled=!1;const s=new qi(null,"vm-ch");Vx(s),this.chargingHandle=new Ee(s.build(),i("vm-ch")),this.chargingHandle.position.copy(fn.chargingHandle),this.chargingHandle.frustumCulled=!1;const r=new qi(null,"vm-bolt");zx(r),this.bolt=new Ee(r.build(),i("vm-bolt")),this.bolt.position.copy(fn.boltCarrier),this.bolt.frustumCulled=!1;const o=new qi(null,"vm-mag");Hx(o),this.spareMag=new Ee(o.build(),i("vm-mag")),this.spareMag.visible=!1,this.spareMag.frustumCulled=!1;const l=new qi(null,"vm-grenade");kx(l),this.grenadeMesh=new Ee(l.build(),i("vm-grenade")),this.grenadeMesh.frustumCulled=!1,this.grenadeMesh.visible=!1,this.grenadeArm=new pn,this.grenadeArm.add(this.grenadeMesh),this.root.add(this.grenadeArm),this._velocityMeshes=[this.bodyMesh,this.chargingHandle,this.bolt,this.spareMag,this.grenadeMesh],this._prevWorld=this._velocityMeshes.map(()=>new Nt),this._historyValid=!1,this.weapon=new pn,this.weapon.add(this.bodyMesh,this.chargingHandle,this.bolt,this.spareMag),this.weapon.scale.setScalar($x),this.root.add(this.weapon),this._buildOptic(),this.posSpring=new fs(30,.9),this.rotSpring=new fs(26,.92),this.swaySpring=new fs(13,.62),this.recoilPos=new fs(34,.52),this.recoilRot=new fs(30,.48),this.boltSpring=new Nn(0,90,.9),this.chSpring=new Nn(0,55,.85),this.magDrop=new fs(24,.8),this.adsBlend=0,this.lowerBlend=0,this.sprintBlend=0,this.grenadeBlend=0,this.bobPhase=0,this.time=0,this.action=null,this.actionTime=0,this.muzzleWorld=new y,this.ejectWorld=new y,this.ejectDirWorld=new y,this.sightAxis=new y,this._prevLook=new It,this.posSpring.set(ce.hip.p[0],ce.hip.p[1],ce.hip.p[2]),this.rotSpring.set(ce.hip.r[0],ce.hip.r[1],ce.hip.r[2])}_buildOptic(){const t=fn.sightWindow,e=new la(.0265,.0265);this.reticleMaterial=new Ji({glslVersion:Ui,vertexShader:nu,fragmentShader:Kx,uniforms:{uSightOrigin:{value:new y},uSightAxis:{value:new y(0,0,-1)},uSightRight:{value:new y(1,0,0)},uSightUp:{value:new y(0,1,0)},uCameraPos:{value:new y},uColor:{value:new y(1,.16,.1)},uBrightness:{value:1},uDotAngle:{value:87e-5},uWindowRadius:{value:.0132}},transparent:!0,depthWrite:!1,depthTest:!0,blending:2,side:2}),this.glassMaterial=new Ji({glslVersion:Ui,vertexShader:nu,fragmentShader:Yx,uniforms:{uCameraPos:{value:new y},uSightAxis:{value:new y(0,0,-1)},uTint:{value:new y(.24,.34,.46)},uWindowRadius:{value:.0142},uSightOrigin:{value:new y}},transparent:!0,depthWrite:!1,depthTest:!0,blending:1,side:2}),this.glass=new Ee(e,this.glassMaterial),this.glass.position.set(t.x,t.y,t.z-.028),this.glass.frustumCulled=!1,this.reticle=new Ee(e,this.reticleMaterial),this.reticle.position.set(t.x,t.y,t.z-.0265),this.reticle.frustumCulled=!1,this.opticGroup=new pn,this.opticGroup.matrixAutoUpdate=!1,this.opticGroup.add(this.glass,this.reticle),this.transparent.add(this.opticGroup)}applyRecoil({back:t=.03,rise:e=.11,yaw:i=.02,roll:n=.03,lateral:s=.004}={}){const r=1-this.adsBlend*.42;this.recoilPos.nudge(s*r,t*.3*r,t*18*r),this.recoilRot.nudge(-e*16*r,i*10*r,n*12*r),this.boltSpring.value=1,this.boltSpring.velocity=0}startAction(t,e,i){this.action={name:t,duration:e,steps:i},this.actionTime=0}cancelAction(){this.action=null}get busy(){return this.action!==null}_poseGrenadeArm(t,e,i,n){const s=t?t.raiseBlend:0;if(this.grenadeMesh.visible=s>.001,!this.grenadeMesh.visible)return;const r=(c,h,u)=>c.set(Al[h][u][0],Al[h][u][1],Al[h][u][2]);r(Ii,"down","p"),r(hi,"down","r"),r(ui,"ready","p"),r(di,"ready","r"),Ii.lerp(ui,s),hi.lerp(di,s);const o=t.charge;o>0&&(r(ui,"wound","p"),r(di,"wound","r"),Ii.lerp(ui,o),hi.lerp(di,o));const l=t.throwBlend;if(l>0){const c=Math.sin(Math.min(1,l*1.9)*Math.PI*.5)*(1-Math.max(0,l-.55)/.45);r(ui,"release","p"),r(di,"release","r"),Ii.lerp(ui,c),hi.lerp(di,c)}this.grenadeArm.position.copy(Ii),this.grenadeArm.position.x+=this.swaySpring.value.x*.7+e*1.3+n,this.grenadeArm.position.y+=this.swaySpring.value.y*.7+i*1.3,Vr.set(hi.x,hi.y,hi.z,"YXZ"),this.grenadeArm.quaternion.setFromEuler(Vr)}update(t,e){this.time+=t;const{camera:i,player:n,weapon:s,lookDelta:r,wallProximity:o,grenade:l}=e;this.adsBlend=n.adsBlend;const c=n.sprintNorm*(1-n.adsBlend);this.sprintBlend=Je(this.sprintBlend,c,12,t),this.lowerBlend=Je(this.lowerBlend,o,16,t);const h=n.crouched?ce.crouch:ce.hip;if(Ii.set(h.p[0],h.p[1],h.p[2]),hi.set(h.r[0],h.r[1],h.r[2]),ui.set(ce.ads.p[0],ce.ads.p[1],ce.ads.p[2]),di.set(ce.ads.r[0],ce.ads.r[1],ce.ads.r[2]),Ii.lerp(ui,this.adsBlend),hi.lerp(di,this.adsBlend),ui.set(ce.sprint.p[0],ce.sprint.p[1],ce.sprint.p[2]),di.set(ce.sprint.r[0],ce.sprint.r[1],ce.sprint.r[2]),Ii.lerp(ui,this.sprintBlend),hi.lerp(di,this.sprintBlend),ui.set(ce.low.p[0],ce.low.p[1],ce.low.p[2]),di.set(ce.low.r[0],ce.low.r[1],ce.low.r[2]),Ii.lerp(ui,this.lowerBlend),hi.lerp(di,this.lowerBlend),this.grenadeBlend=l?l.raiseBlend:0,ui.set(ce.stow.p[0],ce.stow.p[1],ce.stow.p[2]),di.set(ce.stow.r[0],ce.stow.r[1],ce.stow.r[2]),Ii.lerp(ui,this.grenadeBlend),hi.lerp(di,this.grenadeBlend),this.action){this.actionTime+=t;const z=Math.min(1,this.actionTime/this.action.duration);this.action.steps(z,Ii,hi,this),this.actionTime>=this.action.duration&&(this.action.onComplete?.(),this.action=null)}this.posSpring.target.copy(Ii),this.rotSpring.target.copy(hi),this.posSpring.update(t),this.rotSpring.update(t);const u=(1-this.adsBlend*.72)*Mt.data.cameraShake,d=Ht.clamp(-r.x*2.6,-.09,.09),g=Ht.clamp(r.y*2.2,-.075,.075);this.swaySpring.target.set(d*u,g*u,0),this.swaySpring.update(t);const m=n.speedNorm,v=1-Ht.clamp(n.airborneFor/.15,0,1),p=Ht.lerp(Ht.lerp(8.4,6.2,n.stanceBlend),10.4,n.sprintNorm);v>0&&(this.bobPhase=(this.bobPhase+t*p*Math.min(m,1.4))%jx);const f=n.bobStrength*v*(1-this.adsBlend*.82)*Mt.data.cameraShake,S=Math.sin(this.bobPhase)*.0155*f,x=Math.cos(this.bobPhase*2)*-.0068*f,_=Math.sin(this.bobPhase+.6)*.03*f,M=Math.sin(this.bobPhase*2)*.018*f,T=(1-Math.min(m,1))*(1-this.adsBlend*.55),E=Math.sin(this.time*.9)*.0022*T,R=Math.sin(this.time*1.35+.7)*.0026*T,w=Math.sin(this.time*.72+1.9)*.008*T,b=Ht.clamp(-n.velocity.y*.0045,-.03,.03)*(1-v),L=n.leanBlend*(1-this.adsBlend),P=-L*.014,B=L*.062;this.recoilPos.target.set(0,0,0),this.recoilRot.target.set(0,0,0),this.recoilPos.update(t),this.recoilRot.update(t);const k=this.weapon.position;k.copy(this.posSpring.value),k.x+=this.swaySpring.value.x+S+E+P+this.recoilPos.value.x,k.y+=this.swaySpring.value.y+x+R+b+this.recoilPos.value.y,k.z+=this.recoilPos.value.z*.02,Vr.set(this.rotSpring.value.x+M+this.recoilRot.value.x*.02+w*.5-r.y*.9,this.rotSpring.value.y+this.recoilRot.value.y*.02+w-r.x*1.1,this.rotSpring.value.z+_+B+this.recoilRot.value.z*.02,"YXZ"),this.weapon.quaternion.setFromEuler(Vr),this._poseGrenadeArm(l,S,x,P),this.boltSpring.target=s?.boltLocked?1:0,this.boltSpring.update(t),this.chSpring.target=0,this.chSpring.update(t),this.bolt.position.z=fn.boltCarrier.z+this.boltSpring.value*.052,this.chargingHandle.position.z=fn.chargingHandle.z+this.chSpring.value*.07,this.magDrop.update(t),this.magVisible?(this.spareMag.visible=!0,this.spareMag.position.copy(this.magDrop.value)):this.spareMag.visible=!1,this.root.matrix.copy(i.matrixWorld),this.root.matrixWorldNeedsUpdate=!0,this.root.updateMatrixWorld(!0),this.opticGroup.matrix.copy(this.weapon.matrixWorld),this.transparent.updateMatrixWorld(!0);for(let z=0;z<this._velocityMeshes.length;z++){const U=this._velocityMeshes[z],W=this._prevWorld[z];this._historyValid||W.copy(U.matrixWorld),U.material.uniforms.uPrevModelMatrix.value.copy(W),W.copy(U.matrixWorld)}this._historyValid=!0,this.muzzleWorld.copy(fn.muzzle).applyMatrix4(this.weapon.matrixWorld),this.ejectWorld.copy(fn.ejectionPort).applyMatrix4(this.weapon.matrixWorld),su.set(1,.45,.12).normalize(),this.ejectDirWorld.copy(su).transformDirection(this.weapon.matrixWorld);const F=this.reticleMaterial.uniforms,N=this.glassMaterial.uniforms;Cl.copy(fn.sightWindow).applyMatrix4(this.weapon.matrixWorld),Hr.set(0,0,-1).transformDirection(this.weapon.matrixWorld),this.sightAxis.copy(Hr),F.uSightOrigin.value.copy(Cl),F.uSightAxis.value.copy(Hr),F.uSightRight.value.set(1,0,0).transformDirection(this.weapon.matrixWorld),F.uSightUp.value.set(0,1,0).transformDirection(this.weapon.matrixWorld),F.uCameraPos.value.copy(i.position),F.uBrightness.value=.85+this.adsBlend*.55,N.uCameraPos.value.copy(i.position),N.uSightAxis.value.copy(Hr),N.uSightOrigin.value.copy(Cl)}dispose(){this.bodyMesh.geometry.dispose(),this.chargingHandle.geometry.dispose(),this.bolt.geometry.dispose(),this.spareMag.geometry.dispose(),this.glass.geometry.dispose(),this.reticleMaterial.dispose(),this.glassMaterial.dispose()}}const Ii=new y,hi=new y,ui=new y,di=new y,su=new y,Vr=new oe,Cl=new y,Hr=new y,Gr={AUTO:0,BURST:1,SEMI:2},au=["AUTO","BURST","SEMI"],Jx={name:"MK18 CARBINE",caliber:"5.56x45",rpm:780,magSize:30,reserve:210,damage:27,headMultiplier:2.35,limbMultiplier:.82,muzzleVelocity:860,falloffStart:34,falloffEnd:96,falloffFloor:.58,penetration:.85,reloadTactical:2.05,reloadEmpty:2.95,drawTime:.62,adsTime:.19,spreadBase:6e-4,spreadAds:22e-5,spreadMove:.0125,spreadAir:.03,spreadCrouch:.72,spreadPerShot:85e-5,spreadDecay:5.6,spreadMax:.026};function Qx(a,t){const e=new Ms(a),i=[];let n=0,s=0;for(let r=0;r<t;r++){const o=r/(t-1),l=.009*(1-Math.exp(-r*.55))+.0016+o*.001;r%4===0&&(s=(e.next()*2-1)*.0034+(r>8?.0016:0)),n=n*.62+s*.38;const c=n+Math.sin(r*.42)*9e-4*Math.min(1,r/5);i.push([l,c])}return i}class ty{constructor({audio:t,viewModel:e,player:i,combat:n,seed:s=7946}){this.spec=Jx,this.audio=t,this.vm=e,this.player=i,this.combat=n,this.pattern=Qx(s,this.spec.magSize+4),this.rng=new Ms(s^119),this.ammo=this.spec.magSize,this.reserve=this.spec.reserve,this.chambered=!0,this.fireMode=Gr.AUTO,this.shotIndex=0,this.fireTimer=0,this.triggerHeld=!1,this.triggerPulled=!1,this.burstRemaining=0,this.reloading=!1,this.reloadTimer=0,this.reloadType=null,this.spread=0,this.lastShotTime=-99,this.boltLocked=!1,this.heat=0,this.totalShots=0,this.hits=0}get magEmpty(){return this.ammo<=0}get shotInterval(){return 60/this.spec.rpm}cycleFireMode(){return this.fireMode=(this.fireMode+1)%3,this.audio?.playSelector(this.player.eye),au[this.fireMode]}setTrigger(t){t&&!this.triggerHeld&&(this.triggerPulled=!0),this.triggerHeld=t}canFire(){return!this.reloading&&this.ammo>0&&this.fireTimer<=0&&!this.player.sprinting&&this.player.alive}startReload(){return this.reloading||this.ammo>=this.spec.magSize||this.reserve<=0?!1:(this.reloading=!0,this.reloadType=this.ammo<=0?"empty":"tactical",this.reloadTimer=this.reloadType==="empty"?this.spec.reloadEmpty:this.spec.reloadTactical,this._reloadTotal=this.reloadTimer,this._magOut=!1,this._magIn=!1,this._charged=this.reloadType!=="empty",this.audio?.playReloadStart(this.player.eye,this.reloadType),this._playReloadAnim(),!0)}_playReloadAnim(){const t=this.reloadType==="empty",e=this._reloadTotal;this.vm.startAction("reload",e,(i,n,s,r)=>{const o=Math.sin(Math.min(i*3.6,Math.PI))*1,l=Math.sin(Math.min(i*3,Math.PI))*1;if(n.x+=.052*o,n.y+=-.078*o,n.z+=.03*o,s.x+=.3*o,s.y+=-.42*l,s.z+=.55*l,t){const c=Ht.clamp((i-.74)/.16,0,1);r.chSpring.value=Math.sin(c*Math.PI),i>.86&&(r.boltSpring.target=0);const h=Math.exp(-Math.pow((i-.8)*22,2));n.x-=.02*h,s.z+=.1*h}})}update(t,e){if(this.fireTimer-=t,this.spread=Math.max(0,this.spread-this.spec.spreadDecay*this.spread*t),this.heat=Math.max(0,this.heat-t*.45),this.reloading){this.reloadTimer-=t;const n=1-this.reloadTimer/this._reloadTotal;!this._magOut&&n>.26&&(this._magOut=!0,this.audio?.playMagOut(this.player.eye),this.combat?.dropMagazine(this.vm)),!this._magIn&&n>.62&&(this._magIn=!0,this.audio?.playMagIn(this.player.eye)),!this._charged&&n>.84&&(this._charged=!0,this.audio?.playChargingHandle(this.player.eye)),this.reloadTimer<=0&&this._finishReload();return}if(this.player.sprinting){this.triggerPulled=!1,this.burstRemaining=0;return}let i=!1;this.fireMode===Gr.AUTO?i=this.triggerHeld:this.fireMode===Gr.SEMI?i=this.triggerPulled:(this.triggerPulled&&this.burstRemaining===0&&(this.burstRemaining=3),i=this.burstRemaining>0),this.triggerPulled=!1,i&&this.canFire()?(this.fire(e),this.fireMode===Gr.BURST&&this.burstRemaining--):i&&this.ammo<=0&&this.fireTimer<=0&&!this.reloading&&(this.fireTimer=.22,this.audio?.playDryFire(this.player.eye),this.boltLocked=!0,this.burstRemaining=0)}_finishReload(){const t=this.spec.magSize-this.ammo,e=Math.min(t+(this.reloadType==="empty",0),this.reserve);this.ammo+=e,this.reserve-=e,this.reloading=!1,this.boltLocked=!1,this.shotIndex=0,this.spread=0}fire(t){this.ammo--,this.totalShots++,this.fireTimer=this.shotInterval,this.lastShotTime=t,this.player.timeSinceFire=0,this.heat=Math.min(1,this.heat+.055),this.ammo<=0&&(this.boltLocked=!0);const e=Math.min(this.shotIndex,this.pattern.length-1),[i,n]=this.pattern[e];this.shotIndex++;const s=1-this.player.adsBlend*.3,r=this.player.crouched?.82:1,o=1+Math.min(this.player.speedNorm,1)*.28,l=s*r*o;this.player.addRecoil(i*l,n*l,.68),this.player.pitchKick.nudge(i*l*5.5),this.player.yawKick.nudge(n*l*4),this.player.rollKick.nudge(-n*l*8),this.vm.applyRecoil({back:.03*l,rise:.11*l,yaw:n*1.6,roll:.03*l,lateral:-n*.9}),this.spread=Math.min(this.spec.spreadMax,this.spread+this.spec.spreadPerShot);const c=this._shotDirection();this.combat.fireBullet({origin:this.player.aimOrigin(ey),direction:c,owner:this.player,team:this.player.team,damage:this.spec.damage,spec:this.spec,muzzle:this.vm.muzzleWorld,viewModel:this.vm,firstPerson:!0}),this.audio?.playShot(this.player.eye,{heat:this.heat,indoors:this.combat.indoorFactor}),this.combat.spawnMuzzleFlash(this.vm.muzzleWorld,this.vm.sightAxis,!0),this.combat.ejectCasing(this.vm.ejectWorld,this.vm.ejectDirWorld,this.player.velocity),this.onFire?.()}currentSpread(){const t=this.player;let e=Ht.lerp(this.spec.spreadBase,this.spec.spreadAds,t.adsBlend);return e+=this.spec.spreadMove*t.speedNorm*(1-t.adsBlend*.55),t.controller.grounded||(e+=this.spec.spreadAir*(1-t.adsBlend*.35)),t.crouched&&(e*=this.spec.spreadCrouch),e+=this.spread*(1-t.adsBlend*.35),Math.min(e,this.spec.spreadMax*2)}_shotDirection(){const t=this.player.forward(iy),e=this.currentSpread();if(e>1e-5){const i=this.rng.next()*Math.PI*2,n=Math.sqrt(this.rng.next())*e;Js.set(t.z,0,-t.x),Js.lengthSq()<1e-6&&Js.set(1,0,0),Js.normalize(),ru.crossVectors(Js,t).normalize(),t.addScaledVector(Js,Math.cos(i)*n),t.addScaledVector(ru,Math.sin(i)*n),t.normalize()}return t}hudState(){return{name:this.spec.name,ammo:this.ammo,magSize:this.spec.magSize,reserve:this.reserve,mode:au[this.fireMode],reloading:this.reloading,reloadProgress:this.reloading?1-this.reloadTimer/this._reloadTotal:0,spread:this.currentSpread()}}}const ey=new y,iy=new y,Js=new y,ru=new y,ny=`
precision highp float;
in vec3 position;
in vec2 uv;

in vec3 iPosition;
in vec3 iVelocity;
in vec4 iParams;     // x size, y rotation, z stretch, w kind
in vec4 iColor;      // rgb tint, a opacity

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 uCameraPos;
uniform vec4 uJitter;

out vec2 vUv;
out vec4 vColor;
out float vKind;
out vec3 vWorldPos;
out float vSeed;
out float vStretch;

void main(){
  vec3 toCam = uCameraPos - iPosition;
  vec3 fwd = normalize(toCam);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  if(dot(right, right) < 0.5) right = vec3(1.0, 0.0, 0.0);
  vec3 up = cross(fwd, right);

  float size = iParams.x;
  float rot = iParams.y;
  float stretch = iParams.z;

  vec2 q = position.xy;
  if(stretch > 0.001){
    // align the quad with the velocity vector projected into the billboard plane
    vec3 v = iVelocity;
    float vl = length(v);
    if(vl > 0.0001){
      vec3 vd = v / vl;
      vec3 sr = normalize(cross(fwd, vd));
      vec3 su = cross(sr, fwd);
      right = sr;
      up = su;
    }
    vec3 offset = right * (q.x * size) + up * (q.y * size * (1.0 + stretch));
    vWorldPos = iPosition + offset;
  } else {
    float c = cos(rot), s = sin(rot);
    vec2 r2 = vec2(q.x * c - q.y * s, q.x * s + q.y * c);
    vWorldPos = iPosition + right * (r2.x * size) + up * (r2.y * size);
  }

  vUv = uv;
  vColor = iColor;
  vKind = iParams.w;
  vStretch = stretch;
  vSeed = fract(iPosition.x * 0.731 + iPosition.z * 0.517 + iParams.y * 0.113);

  vec4 clip = projectionMatrix * viewMatrix * vec4(vWorldPos, 1.0);
  clip.xy += uJitter.xy * clip.w;
  gl_Position = clip;
}
`,sy=`
precision highp float;
${Ei}

uniform vec3 uSunColor;
uniform vec3 uSunDirection;
uniform vec3 uAmbient;
uniform float uTime;

in vec2 vUv;
in vec4 vColor;
in float vKind;
in vec3 vWorldPos;
in float vSeed;
in float vStretch;

layout(location = 0) out vec4 outColor;

// 0 dust  1 smoke  2 spark  3 blood  4 tracer  5 flash  6 debris
void main(){
  vec2 c = vUv * 2.0 - 1.0;
  float r = length(c);
  int kind = int(vKind + 0.5);

  vec3 col = vColor.rgb;
  float alpha = vColor.a;

  if(kind == 0 || kind == 1){
    // billowing puff: radial falloff broken up with rotating value noise
    float n = fbm(c * 1.7 + vec2(vSeed * 31.0, uTime * 0.25), 4, 0.55);
    float edge = r + (n - 0.5) * 0.85;
    float mask = 1.0 - smoothstep(0.35, 1.0, edge);
    if(mask <= 0.002) discard;
    // cheap self-shading: the side facing the sun is brighter
    float lift = clamp(0.45 + 0.55 * (0.5 - c.y), 0.0, 1.0);
    vec3 lit = uAmbient * 0.85 + uSunColor * 0.055 * lift;
    col *= lit;
    alpha *= mask * (kind == 1 ? 0.85 : 1.0);
  } else if(kind == 2){
    // spark: hot core along the streak axis, cooling toward the tail
    float axial = abs(c.x);
    float along = c.y * 0.5 + 0.5;
    float mask = (1.0 - smoothstep(0.0, 0.75, axial)) * (1.0 - smoothstep(0.25, 1.0, abs(c.y)));
    if(mask <= 0.002) discard;
    vec3 hot = mix(vec3(1.0, 0.45, 0.10), vec3(1.0, 0.95, 0.72), pow(along, 2.0));
    col = hot * (2.0 + 22.0 * pow(mask, 3.0));
    alpha = mask * vColor.a;
  } else if(kind == 3){
    float n = fbm(c * 2.6 + vSeed * 17.0, 3, 0.6);
    float mask = 1.0 - smoothstep(0.4, 1.0, r + (n - 0.5) * 0.7);
    if(mask <= 0.002) discard;
    col *= uAmbient * 1.1 + uSunColor * 0.02;
    alpha *= mask;
  } else if(kind == 4){
    // tracer: thin bright rod with a soft halo, brighter at the head
    float axial = abs(c.x);
    float core = 1.0 - smoothstep(0.0, 0.30, axial);
    float halo = 1.0 - smoothstep(0.0, 1.0, axial);
    float head = smoothstep(-1.0, 1.0, c.y);
    float mask = core + halo * 0.22;
    if(mask <= 0.002) discard;
    col = vColor.rgb * (1.5 + 12.0 * core) * mix(0.35, 1.0, head);
    alpha = clamp(mask, 0.0, 1.0) * vColor.a;
  } else if(kind == 5){
    // muzzle flash: four-point star plus a hot centre
    float star = max(1.0 - smoothstep(0.0, 0.16, abs(c.x)), 1.0 - smoothstep(0.0, 0.16, abs(c.y)));
    star *= 1.0 - smoothstep(0.2, 1.0, r);
    float core = 1.0 - smoothstep(0.0, 0.45, r);
    float petal = 1.0 - smoothstep(0.0, 0.9, r + (hash12(vec2(atan(c.y, c.x) * 3.0, vSeed)) - 0.5) * 0.5);
    float mask = clamp(core * 1.4 + star * 0.7 + petal * 0.35, 0.0, 3.0);
    if(mask <= 0.004) discard;
    col = mix(vec3(1.0, 0.62, 0.22), vec3(1.0, 0.94, 0.78), core) * mask * 26.0;
    alpha = clamp(mask, 0.0, 1.0) * vColor.a;
  } else {
    // debris chip: hard-edged, lit like a solid
    float mask = 1.0 - step(0.86, max(abs(c.x), abs(c.y)));
    if(mask <= 0.002) discard;
    col *= uAmbient + uSunColor * 0.05;
    alpha *= mask;
  }

  outColor = vec4(col * alpha, alpha);
}
`,Ve={DUST:0,SMOKE:1,SPARK:2,BLOOD:3,TRACER:4,FLASH:5,DEBRIS:6};class ay{constructor(t,e){this.capacity=t,this.count=0,this.quality=e,this.pos=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.params=new Float32Array(t*4),this.color=new Float32Array(t*4),this.age=new Float32Array(t),this.life=new Float32Array(t),this.drag=new Float32Array(t),this.gravity=new Float32Array(t),this.growth=new Float32Array(t),this.spin=new Float32Array(t),this.baseAlpha=new Float32Array(t),this.baseSize=new Float32Array(t),this.fade=new Uint8Array(t);const i=new la(1,1),n=new h0;n.index=i.index,n.setAttribute("position",i.attributes.position),n.setAttribute("uv",i.attributes.uv),this.aPos=new On(this.pos,3).setUsage(35048),this.aVel=new On(this.vel,3).setUsage(35048),this.aParams=new On(this.params,4).setUsage(35048),this.aColor=new On(this.color,4).setUsage(35048),n.setAttribute("iPosition",this.aPos),n.setAttribute("iVelocity",this.aVel),n.setAttribute("iParams",this.aParams),n.setAttribute("iColor",this.aColor),n.instanceCount=0,n.boundingSphere=new Ss(new y,1e6),this.geometry=n,i.dispose(),this.material=new Ji({glslVersion:Ui,vertexShader:ny,fragmentShader:sy,uniforms:{uCameraPos:{value:new y},uSunColor:{value:new y(1,1,1)},uSunDirection:{value:new y(0,1,0)},uAmbient:{value:new y(.4,.45,.55)},uTime:{value:0},uJitter:{value:new be}},transparent:!0,depthWrite:!1,depthTest:!0,blending:5,blendSrc:201,blendDst:205,side:2}),this.mesh=new Ee(n,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=10,this.wind=new y(.55,0,.2)}_alloc(){if(this.count<this.capacity)return this.count++;let t=0,e=1/0;for(let i=0;i<12;i++){const n=Math.random()*this.count|0,s=this.life[n]-this.age[n];s<e&&(e=s,t=n)}return t}spawn(t){const e=this._alloc(),i=e*3,n=e*4,s=t.position,r=t.velocity;this.pos[i]=s.x,this.pos[i+1]=s.y,this.pos[i+2]=s.z,this.vel[i]=r?r.x:0,this.vel[i+1]=r?r.y:0,this.vel[i+2]=r?r.z:0;const o=t.size??.2;this.params[n]=o,this.params[n+1]=t.rotation??Math.random()*Math.PI*2,this.params[n+2]=t.stretch??0,this.params[n+3]=t.kind??Ve.DUST;const l=t.color??ry;return this.color[n]=l[0],this.color[n+1]=l[1],this.color[n+2]=l[2],this.color[n+3]=t.alpha??1,this.age[e]=0,this.life[e]=t.life??1,this.drag[e]=t.drag??1.4,this.gravity[e]=t.gravity??0,this.growth[e]=t.growth??0,this.spin[e]=t.spin??0,this.baseAlpha[e]=t.alpha??1,this.baseSize[e]=o,this.fade[e]=t.fade??0,e}update(t,e){const i=this.count,n=this.pos,s=this.vel,r=this.params,o=this.color;let l=0;for(let c=0;c<i;c++){this.age[c]+=t;const h=this.age[c]/this.life[c];if(h>=1)continue;const u=c*3,d=c*4,g=r[d+3],m=Math.exp(-this.drag[c]*t);s[u]*=m,s[u+1]*=m,s[u+2]*=m,s[u+1]-=this.gravity[c]*t,(g===Ve.SMOKE||g===Ve.DUST)&&(s[u]+=this.wind.x*t*.5,s[u+2]+=this.wind.z*t*.5),n[u]+=s[u]*t,n[u+1]+=s[u+1]*t,n[u+2]+=s[u+2]*t,r[d]=this.baseSize[c]*(1+this.growth[c]*h),r[d+1]+=this.spin[c]*t;let v;this.fade[c]===1?v=(1-h)*(1-h):this.fade[c]===2?v=Math.pow(1-h,4):v=1-h,v*=Math.min(1,h/.08),o[d+3]=this.baseAlpha[c]*v,l!==c&&this._move(c,l),l++}this.count=l,this.geometry.instanceCount=l,l>0&&(this.aPos.needsUpdate=!0,this.aVel.needsUpdate=!0,this.aParams.needsUpdate=!0,this.aColor.needsUpdate=!0),this.material.uniforms.uTime.value=e}_move(t,e){const i=t*3,n=e*3,s=t*4,r=e*4;for(let o=0;o<3;o++)this.pos[n+o]=this.pos[i+o],this.vel[n+o]=this.vel[i+o];for(let o=0;o<4;o++)this.params[r+o]=this.params[s+o],this.color[r+o]=this.color[s+o];this.age[e]=this.age[t],this.life[e]=this.life[t],this.drag[e]=this.drag[t],this.gravity[e]=this.gravity[t],this.growth[e]=this.growth[t],this.spin[e]=this.spin[t],this.baseAlpha[e]=this.baseAlpha[t],this.baseSize[e]=this.baseSize[t],this.fade[e]=this.fade[t]}setLighting(t,e,i){this.material.uniforms.uSunColor.value.copy(t),this.material.uniforms.uSunDirection.value.copy(e),this.material.uniforms.uAmbient.value.copy(i)}clear(){this.count=0,this.geometry.instanceCount=0}dispose(){this.geometry.dispose(),this.material.dispose()}}const ry=[1,1,1],$e={HOLE_HARD:0,HOLE_SOFT:1,HOLE_METAL:2,HOLE_GLASS:3,SCORCH:4,BLOOD:5},oy=`
precision highp float;
in vec3 position;
in vec3 normal;
in vec2 uv;
in vec4 aDecal;      // x kind, y seed, z age-normalised fade, w scale
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec4 uJitter;
out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vUv;
out vec4 vDecal;
void main(){
  vWorldPos = position;
  vNormal = normal;
  vUv = uv;
  vDecal = aDecal;
  vec4 clip = projectionMatrix * viewMatrix * vec4(position, 1.0);
  clip.xy += uJitter.xy * clip.w;
  gl_Position = clip;
}
`,ly=`
precision highp float;
precision highp sampler2DArray;
${Ei}
${lo}

in vec3 vWorldPos;
in vec3 vNormal;
in vec2 vUv;
in vec4 vDecal;
uniform mat4 viewMatrix;
layout(location = 0) out vec4 outColor;

void main(){
  vec2 c = vUv * 2.0 - 1.0;
  float r = length(c);
  int kind = int(vDecal.x + 0.5);
  float seed = vDecal.y;
  float fade = vDecal.z;

  vec3 albedo = vec3(0.1);
  float alpha = 0.0;
  float rough = 0.85;
  float crater = 0.0;

  if(kind <= 3){
    // impact crater: a dark punched hole ringed by spalled, brighter material
    float wobble = fbm(c * 3.1 + seed * 41.0, 3, 0.6) - 0.5;
    float rr = r + wobble * 0.34;
    float hole = 1.0 - smoothstep(0.16, 0.34, rr);
    float ring = (1.0 - smoothstep(0.30, 0.92, rr)) * (1.0 - hole);
    float spall = (1.0 - smoothstep(0.55, 1.0, rr)) * 0.55;
    crater = hole;

    if(kind == 0){        // concrete / plaster / brick
      albedo = mix(vec3(0.62, 0.60, 0.56), vec3(0.030, 0.028, 0.026), hole);
      alpha = clamp(hole * 1.0 + ring * 0.85 + spall * 0.45, 0.0, 1.0);
    } else if(kind == 1){ // wood / fabric / sandbag
      albedo = mix(vec3(0.30, 0.21, 0.13), vec3(0.020, 0.015, 0.010), hole);
      alpha = clamp(hole * 1.0 + ring * 0.7 + spall * 0.3, 0.0, 1.0);
    } else if(kind == 2){ // metal: bright bare-metal scar, no dust ring
      albedo = mix(vec3(0.52, 0.53, 0.55), vec3(0.05, 0.05, 0.055), hole * 0.8);
      rough = mix(0.30, 0.7, hole);
      alpha = clamp(hole * 0.95 + ring * 0.75, 0.0, 1.0);
    } else {              // glass
      float shards = 0.0;
      for(int i = 0; i < 7; i++){
        float a = hash11(seed * 13.0 + float(i)) * 6.2831853;
        vec2 d = vec2(cos(a), sin(a));
        float line = abs(dot(c, vec2(-d.y, d.x)));
        shards = max(shards, (1.0 - smoothstep(0.0, 0.035, line)) * (1.0 - smoothstep(0.1, 1.0, r)));
      }
      albedo = vec3(0.78, 0.82, 0.86);
      alpha = clamp(hole * 0.9 + shards * 0.8, 0.0, 1.0);
      rough = 0.15;
    }
  } else if(kind == 4){
    float n = fbm(c * 2.2 + seed * 17.0, 4, 0.55);
    float mask = 1.0 - smoothstep(0.25, 1.0, r + (n - 0.5) * 0.6);
    albedo = vec3(0.020, 0.018, 0.016);
    alpha = mask * 0.8;
    rough = 0.95;
  } else {
    // blood: dense core, feathered edge, a few thrown droplets
    float n = fbm(c * 2.8 + seed * 23.0, 4, 0.6);
    float core = 1.0 - smoothstep(0.15, 0.62, r + (n - 0.5) * 0.55);
    float spatter = 0.0;
    for(int i = 0; i < 6; i++){
      float a = hash11(seed * 7.0 + float(i) * 3.1) * 6.2831853;
      float d = 0.45 + hash11(seed * 11.0 + float(i)) * 0.5;
      vec2 p = vec2(cos(a), sin(a)) * d;
      spatter = max(spatter, 1.0 - smoothstep(0.0, 0.10 + hash11(float(i) + seed) * 0.07, length(c - p)));
    }
    albedo = mix(vec3(0.115, 0.010, 0.008), vec3(0.045, 0.004, 0.004), core);
    alpha = clamp(core + spatter * 0.85, 0.0, 1.0);
    rough = mix(0.45, 0.25, core);
  }

  alpha *= fade;
  if(alpha < 0.004) discard;

  vec3 V = normalize(uCameraPos - vWorldPos);
  vec3 N = normalize(vNormal);
  // craters read as depth by tilting the normal inward
  N = normalize(N - normalize(vec3(c.x, 0.0, c.y)) * crater * 0.0);
  float viewDepth = -(viewMatrix * vec4(vWorldPos, 1.0)).z;
  SurfaceOut s = shadeSurface(vWorldPos, N, V, albedo, rough, kind == 2 ? 0.85 : 0.0, 1.0, viewDepth, 1.0, 0.0);
  vec3 col = s.direct + s.ambient;

  float dist = distance(uCameraPos, vWorldPos);
  float fogAmount = 1.0 - exp(-dist * uFogDensity);
  col = mix(col, uFogColor, clamp(fogAmount, 0.0, 1.0));

  outColor = vec4(col, alpha);
}
`;class cy{constructor(t,e=256){this.budget=e,this.capacity=e,this.next=0,this.count=0;const i=e*4;this.positions=new Float32Array(i*3),this.normals=new Float32Array(i*3),this.uvs=new Float32Array(i*2),this.decal=new Float32Array(i*4);const n=new Uint32Array(e*6);for(let r=0;r<e;r++){const o=r*4,l=r*6;n[l]=o,n[l+1]=o+1,n[l+2]=o+2,n[l+3]=o,n[l+4]=o+2,n[l+5]=o+3}for(let r=0;r<e;r++){const o=r*8;this.uvs[o]=0,this.uvs[o+1]=0,this.uvs[o+2]=1,this.uvs[o+3]=0,this.uvs[o+4]=1,this.uvs[o+5]=1,this.uvs[o+6]=0,this.uvs[o+7]=1}const s=new ti;this.aPos=new Xt(this.positions,3).setUsage(35048),this.aNrm=new Xt(this.normals,3).setUsage(35048),this.aDecal=new Xt(this.decal,4).setUsage(35048),s.setAttribute("position",this.aPos),s.setAttribute("normal",this.aNrm),s.setAttribute("uv",new Xt(this.uvs,2)),s.setAttribute("aDecal",this.aDecal),s.setIndex(new Xt(n,1)),s.setDrawRange(0,0),s.boundingSphere=new Ss(new y,1e6),this.geometry=s,this.material=new Ji({glslVersion:Ui,vertexShader:oy,fragmentShader:ly,uniforms:{...t,viewMatrix:{value:new Nt}},transparent:!0,depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-6,side:2}),delete this.material.uniforms.viewMatrix,this.mesh=new Ee(s,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=5,this.ages=new Float32Array(e),this.lifetimes=new Float32Array(e),this.active=new Uint8Array(e)}add(t,e,i,n,{seed:s=Math.random(),life:r=46,tangentHint:o=null}={}){const l=this.next;this.next=(this.next+1)%this.budget,this.count=Math.min(this.count+1,this.budget),fi.copy(e).normalize(),o?(pi.copy(o).sub(fi.clone().multiplyScalar(o.dot(fi))),pi.lengthSq()<1e-6&&pi.set(1,0,0)):(pi.set(fi.z,fi.x,fi.y),pi.sub(fi.clone().multiplyScalar(pi.dot(fi))),pi.lengthSq()<1e-6&&pi.set(1,0,0)),pi.normalize();const c=s*Math.PI*2;pi.applyAxisAngle(fi,c),Wr.crossVectors(fi,pi).normalize();const h=n*.5,u=l*4;qr.copy(t).addScaledVector(fi,.006);const d=[[-h,-h],[h,-h],[h,h],[-h,h]];for(let g=0;g<4;g++){const[m,v]=d[g],p=(u+g)*3;this.positions[p]=qr.x+pi.x*m+Wr.x*v,this.positions[p+1]=qr.y+pi.y*m+Wr.y*v,this.positions[p+2]=qr.z+pi.z*m+Wr.z*v,this.normals[p]=fi.x,this.normals[p+1]=fi.y,this.normals[p+2]=fi.z;const f=(u+g)*4;this.decal[f]=i,this.decal[f+1]=s,this.decal[f+2]=1,this.decal[f+3]=n}return this.ages[l]=0,this.lifetimes[l]=r,this.active[l]=1,this.aPos.needsUpdate=!0,this.aNrm.needsUpdate=!0,this.aDecal.needsUpdate=!0,this.geometry.setDrawRange(0,this.count*6===0?0:this.budget*6),l}update(t){let e=!1;for(let i=0;i<this.budget;i++){if(!this.active[i])continue;this.ages[i]+=t;const n=this.ages[i]/this.lifetimes[i];if(n>=1){this.active[i]=0;for(let r=0;r<4;r++)this.decal[(i*4+r)*4+2]=0;e=!0;continue}const s=n<.75?1:1-(n-.75)/.25;for(let r=0;r<4;r++)this.decal[(i*4+r)*4+2]=s;e=!0}e&&(this.aDecal.needsUpdate=!0)}clear(){this.active.fill(0),this.decal.fill(0),this.count=0,this.next=0,this.geometry.setDrawRange(0,0),this.aDecal.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}const fi=new y,pi=new y,Wr=new y,qr=new y,hy=`
precision highp float;
in vec3 position;
in vec3 normal;
in vec2 uv;
in mat4 instanceMatrix;
in vec3 iTint;
in float iVisible;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 uPrevViewProjection;
uniform vec4 uJitter;

out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vUv;
out vec3 vTint;
out vec4 vCurClip;
out vec4 vPrevClip;

void main(){
  vec4 wp = instanceMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vNormal = normalize(mat3(instanceMatrix) * normal);
  vUv = uv;
  vTint = iTint;
  vec4 clip = projectionMatrix * viewMatrix * wp;
  if(iVisible < 0.5) clip = vec4(2.0, 2.0, 2.0, 1.0);
  vCurClip = clip;
  vPrevClip = uPrevViewProjection * wp;
  clip.xy += uJitter.xy * clip.w;
  gl_Position = clip;
}
`,uy=`
precision highp float;
precision highp sampler2DArray;
${Ei}
${lo}

uniform mat4 viewMatrix;
uniform float uRoughness;
uniform float uMetal;

in vec3 vWorldPos;
in vec3 vNormal;
in vec2 vUv;
in vec3 vTint;
in vec4 vCurClip;
in vec4 vPrevClip;

layout(location = 0) out vec4 outDirect;
layout(location = 1) out vec4 outAmbient;
layout(location = 2) out vec4 outNormal;
layout(location = 3) out vec4 outVelocity;

void main(){
  vec3 V = normalize(uCameraPos - vWorldPos);
  vec3 N = normalize(vNormal);
  float viewDepth = -(viewMatrix * vec4(vWorldPos, 1.0)).z;
  SurfaceOut s = shadeSurface(vWorldPos, N, V, vTint, uRoughness, uMetal, 1.0, viewDepth, 1.0, 0.0);

  float dist = distance(uCameraPos, vWorldPos);
  float fogAmount = 1.0 - exp(-dist * uFogDensity);
  outDirect = vec4(mix(s.direct, vec3(0.0), fogAmount), 0.0);
  outAmbient = vec4(mix(s.ambient, uFogColor, fogAmount), 1.0);
  outNormal = vec4(octEncode(N), uRoughness, 0.25);

  vec2 curNdc = vCurClip.xy / max(vCurClip.w, 1e-6);
  vec2 prevNdc = vPrevClip.xy / max(vPrevClip.w, 1e-6);
  outVelocity = vec4((curNdc - prevNdc) * 0.5, 0.0, 1.0);
}
`;class Rl{constructor(t,e,i,{roughness:n=.35,metal:s=.9}={}){this.capacity=i,this.mesh=new s0(t,null,i),this.mesh.frustumCulled=!1,this.mesh.count=i,this.mesh.instanceMatrix.setUsage(35048),this.tints=new Float32Array(i*3).fill(1),this.visible=new Float32Array(i),t.setAttribute("iTint",new On(this.tints,3).setUsage(35048)),t.setAttribute("iVisible",new On(this.visible,1).setUsage(35048)),this.aTint=t.getAttribute("iTint"),this.aVisible=t.getAttribute("iVisible"),this.material=new Ji({glslVersion:Ui,vertexShader:hy,fragmentShader:uy,uniforms:{...e,uRoughness:{value:n},uMetal:{value:s}}}),this.mesh.material=this.material,this.slots=[];for(let r=0;r<i;r++)this.slots.push(r);this._m=new Nt,this._s=new y(1,1,1)}acquire(t){const e=this.slots.pop();return e===void 0?-1:(this.visible[e]=1,t&&(this.tints[e*3]=t[0],this.tints[e*3+1]=t[1],this.tints[e*3+2]=t[2]),this.aTint.needsUpdate=!0,e)}release(t){t<0||(this.visible[t]=0,this.slots.push(t),this.aVisible.needsUpdate=!0)}setTransform(t,e,i,n=null){this._m.compose(e,i,n||this._s),this.mesh.setMatrixAt(t,this._m)}flush(){this.mesh.instanceMatrix.needsUpdate=!0,this.aVisible.needsUpdate=!0}clear(){this.slots.length=0;for(let t=0;t<this.capacity;t++)this.slots.push(t),this.visible[t]=0;this.aVisible.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}function dy(){const a=new Ua(.0046,.005,.0455,8,1,!0),t=new Ua(.0055,.0055,.004,8);t.translate(0,-.0245,0);const e=rd([a,t]);return e.rotateZ(Math.PI*.5),e}function fy(){return new ws(.028,.185,.042)}function py(){const a=new Jl(.031,12,9);a.scale(1,1.28,1);const t=new Ua(.01,.012,.018,8);t.translate(0,.043,0);const e=new ws(.008,.052,.004);return e.translate(.026,.026,0),rd([a,t,e])}function rd(a){let t=0,e=0;for(const h of a)t+=h.attributes.position.count,e+=h.index?h.index.count:h.attributes.position.count;const i=new Float32Array(t*3),n=new Float32Array(t*3),s=new Float32Array(t*2),r=new Uint16Array(e);let o=0,l=0;for(const h of a){const u=h.attributes.position.array,d=h.attributes.normal.array,g=h.attributes.uv.array;i.set(u,o*3),n.set(d,o*3),s.set(g,o*2);const m=h.index?h.index.array:null,v=h.attributes.position.count;if(m){for(let p=0;p<m.length;p++)r[l+p]=m[p]+o;l+=m.length}else{for(let p=0;p<v;p++)r[l+p]=p+o;l+=v}o+=v,h.dispose()}const c=new ti;return c.setAttribute("position",new Xt(i,3)),c.setAttribute("normal",new Xt(n,3)),c.setAttribute("uv",new Xt(s,2)),c.setIndex(new Xt(r,1)),c}const Pl=3,ou=384,lu=1.6,cu={headMultiplier:2,limbMultiplier:.85,penetration:.6,falloffStart:34,falloffEnd:96,falloffFloor:.6},Zi={fuse:2.7,radius:7,damage:165,minSpeed:7.5,maxSpeed:22,chargeTime:1.05,carried:3},hu=[$e.HOLE_HARD,$e.HOLE_HARD,$e.HOLE_HARD,$e.HOLE_METAL,$e.HOLE_SOFT,$e.HOLE_GLASS,$e.HOLE_SOFT,$e.HOLE_SOFT,$e.HOLE_SOFT,$e.HOLE_HARD,$e.HOLE_SOFT,$e.HOLE_SOFT];class my{constructor({world:t,rigidWorld:e,lightUniforms:i,quality:n,audio:s,seed:r=45057}){this.world=t,this.bvh=t.bvh,this.rigid=e,this.audio=s,this.quality=n,this.rng=new Ms(r),this.indoorFactor=0,this.particles=new ay(2300,n),this.decals=new cy(i,ou),this.decals.budget=Math.min(ou,n.decalBudget),this.casings=new Rl(dy(),i,96,{roughness:.28,metal:.95}),this.mags=new Rl(fy(),i,8,{roughness:.62,metal:0}),this.grenadeBatch=new Rl(py(),i,12,{roughness:.55,metal:.35}),this.scene=new so,this.scene.add(this.casings.mesh,this.mags.mesh,this.grenadeBatch.mesh),this.transparentScene=new so,this.transparentScene.add(this.decals.mesh,this.particles.mesh),this.tracers=[],this.lights=[],this.characters=[],this.hit=new Xi,this.onHitConfirm=null,this.onKill=null,this.onImpactSound=null,this.shotsFired=0,this._casingBodies=[],this._magBodies=[],this._grenades=[],this.onExplosion=null}setQuality(t){this.quality=t,this.decals.budget=Math.min(this.decals.capacity,t.decalBudget),this.rigid.maxBodies=Math.min(this.rigid.pool.length,t.maxRigidBodies)}registerCharacter(t){this.characters.push(t)}unregisterCharacter(t){const e=this.characters.indexOf(t);e>=0&&this.characters.splice(e,1)}fireBullet(t){this.shotsFired++;const e=Ea.copy(t.direction).normalize(),i=Ll.copy(t.origin),n=t.spec?{...cu,...t.spec}:cu;let s=1,r=0,o=t.damage;const l=320,c=[];let h=!1;for(let u=0;u<=Pl;u++){const d=this._raycastCharacters(i,e,l-r,t.owner),g=this.bvh.raycast(i,e,l-r,this.hit),m=d?d.t:1/0,v=g.hit?g.t:1/0;if(m===1/0&&v===1/0){uu.copy(i).addScaledVector(e,l-r),c.push([i.clone(),uu.clone()]);break}if(m<v){Ye.copy(i).addScaledVector(e,m),c.push([i.clone(),Ye.clone()]),r+=m,h=!0;const T=this._falloff(r,n),E=d.zone==="head"?n.headMultiplier:d.zone==="limb"?n.limbMultiplier:1,R=o*T*E*s,w=d.character.applyDamage(R,{source:t.owner,point:Ye,direction:e,zone:d.zone,impulse:9.5*s,part:d.part});if(this._bloodImpact(Ye,e,d.zone),this.audio?.playFleshImpact(Ye,d.zone),t.firstPerson&&this.onHitConfirm?.({zone:d.zone,damage:R,killed:w,position:Ye.clone()}),w&&this.onKill?.(t.owner,d.character,d.zone),s*=d.zone==="head"?.25:.42,o*=.55,s<.16)break;i.copy(Ye).addScaledVector(e,.22);continue}const p=g.t;Ye.copy(i).addScaledVector(e,p),c.push([i.clone(),Ye.clone()]),r+=p,h=!0;const f=g.surface,S=Bn[f]||Bn[0];Kr.copy(g.normal);const x=Math.abs(e.dot(Kr));this._surfaceImpact(Ye,Kr,e,f,s),this.audio?.playImpact(Ye,S.name,s),this.onImpactSound?.(Ye,S.name,s);const _=S.ricochet*(1-x)*(1-x);if(u<Pl&&this.rng.next()<_&&s>.3){s*=.45+S.ricochet*.2,o*=.5,e.reflect(Kr),e.x+=(this.rng.next()-.5)*.22,e.y+=(this.rng.next()-.5)*.22,e.z+=(this.rng.next()-.5)*.22,e.normalize(),this._ricochetSparks(Ye,e),this.audio?.playRicochet(Ye),i.copy(Ye).addScaledVector(e,.02);continue}if(S.penetrable&&s>.3&&u<Pl){const T=n.penetration/Math.max(S.hardness,.05)*.16,E=this._findExit(Ye,e,T);if(E){const R=E.thickness/T*.75+S.hardness*.22;if(s*=Math.max(0,1-R),o*=Math.max(0,1-R*1.15),s>.16){this._exitSpall(E.point,E.normal,e,f,s*.6),i.copy(E.point).addScaledVector(e,.01),r+=E.thickness;continue}}}break}return c.length&&this._spawnTracer(t.muzzle||c[0][0],c,n.muzzleVelocity,t.firstPerson),this._reportNearMisses(c,t.owner),h}_reportNearMisses(t,e){if(t.length)for(const i of this.characters){if(!i.alive||i===e||!i.onNearMiss)continue;let n=1/0;for(const[s,r]of t){const o=xy(i.rig.joints[q.CHEST],s,r);o<n&&(n=o)}n>lu||i.onNearMiss({distance:n,intensity:1-n/lu,source:e??null})}}_falloff(t,e){if(t<=e.falloffStart)return 1;const i=Ht.clamp((t-e.falloffStart)/(e.falloffEnd-e.falloffStart),0,1);return Ht.lerp(1,e.falloffFloor,i*i)}_findExit(t,e,i){const n=Math.min(i,.5);du.copy(t).addScaledVector(e,n),fu.copy(e).multiplyScalar(-1);const s=this.bvh.raycast(du,fu,n,Fl);if(!s.hit)return null;const r=n-s.t;return r<=.001||r>i?null:{point:s.point.clone(),normal:s.normal.clone().multiplyScalar(-1),thickness:r}}_raycastCharacters(t,e,i,n){let s=null;for(const r of this.characters)if(!(!r.alive||r===n||r.hitboxes===void 0)){if(r.boundsRadius!==void 0){Il.subVectors(r.boundsCenter??r.position,t);const o=Il.dot(e);if(o<-r.boundsRadius||o>i+r.boundsRadius||Il.lengthSq()-o*o>r.boundsRadius*r.boundsRadius)continue}for(const o of r.hitboxes){const l=gy(t,e,o.a,o.b,o.radius,i);l!==null&&(!s||l<s.t)&&(s={t:l,zone:o.zone,character:r,part:o.name})}}return s}_surfaceImpact(t,e,i,n,s){const r=Bn[n]||Bn[0],o=pu.setHex(r.dust),l=this.quality.particleDensity;this.decals.add(t,e,hu[n]??$e.HOLE_HARD,.085+this.rng.next()*.055,{seed:this.rng.next(),tangentHint:i}),Dl.copy(i).reflect(e);const c=Math.max(2,Math.round(5*l*s));for(let h=0;h<c;h++)wt.copy(e).multiplyScalar(1.4+this.rng.next()*1.6),wt.addScaledVector(Dl,.7),wt.x+=(this.rng.next()-.5)*1.7,wt.y+=(this.rng.next()-.5)*1.2,wt.z+=(this.rng.next()-.5)*1.7,this.particles.spawn({position:t,velocity:wt,kind:Ve.DUST,size:.055+this.rng.next()*.13,color:[o.r*1.05,o.g*1.02,o.b],alpha:.55+this.rng.next()*.3,life:.5+this.rng.next()*.85,drag:3.1,gravity:1.6,growth:3.4,spin:(this.rng.next()-.5)*3,fade:1});if(l>.5&&this.particles.spawn({position:t,velocity:wt.copy(e).multiplyScalar(.35),kind:Ve.SMOKE,size:.16,color:[o.r,o.g,o.b],alpha:.24,life:1.5+this.rng.next(),drag:1.5,gravity:-.25,growth:4.5,spin:(this.rng.next()-.5)*.7,fade:1}),r.hardness>.22){const h=Math.max(1,Math.round(3*l*(.5+r.hardness)));for(let u=0;u<h;u++)wt.copy(e).multiplyScalar(2.5+this.rng.next()*3.5),wt.x+=(this.rng.next()-.5)*3,wt.y+=(this.rng.next()-.5)*2,wt.z+=(this.rng.next()-.5)*3,this.particles.spawn({position:t,velocity:wt,kind:Ve.DEBRIS,size:.008+this.rng.next()*.014,color:[o.r*.8,o.g*.78,o.b*.75],alpha:1,life:.7+this.rng.next()*.6,drag:.4,gravity:13,spin:(this.rng.next()-.5)*20,fade:0})}if(n===ht.METAL&&this._ricochetSparks(t,Dl),n===ht.GLASS)for(let h=0;h<Math.round(6*l);h++)wt.copy(e).multiplyScalar(1.5+this.rng.next()*2),wt.x+=(this.rng.next()-.5)*2.6,wt.y+=(this.rng.next()-.5)*2,wt.z+=(this.rng.next()-.5)*2.6,this.particles.spawn({position:t,velocity:wt,kind:Ve.DEBRIS,size:.006+this.rng.next()*.01,color:[.75,.86,.9],alpha:.9,life:.9,drag:.3,gravity:14,spin:(this.rng.next()-.5)*25,fade:0})}_exitSpall(t,e,i,n,s){const r=Bn[n]||Bn[0],o=pu.setHex(r.dust),l=this.quality.particleDensity;this.decals.add(t,e,hu[n]??$e.HOLE_HARD,.11+this.rng.next()*.08,{seed:this.rng.next(),tangentHint:i});const c=Math.max(3,Math.round(8*l*s));for(let u=0;u<c;u++)wt.copy(i).multiplyScalar(2.2+this.rng.next()*2.4),wt.addScaledVector(e,.6),wt.x+=(this.rng.next()-.5)*2.2,wt.y+=(this.rng.next()-.5)*1.6,wt.z+=(this.rng.next()-.5)*2.2,this.particles.spawn({position:t,velocity:wt,kind:Ve.DUST,size:.07+this.rng.next()*.16,color:[o.r*1.05,o.g*1.02,o.b],alpha:.6+this.rng.next()*.3,life:.7+this.rng.next()*1,drag:2.6,gravity:1.3,growth:4.2,spin:(this.rng.next()-.5)*3,fade:1});const h=Math.max(2,Math.round(6*l*s));for(let u=0;u<h;u++)wt.copy(i).multiplyScalar(4.5+this.rng.next()*5.5),wt.x+=(this.rng.next()-.5)*3.4,wt.y+=(this.rng.next()-.5)*2.6,wt.z+=(this.rng.next()-.5)*3.4,this.particles.spawn({position:t,velocity:wt,kind:Ve.DEBRIS,size:(r.hardness<.5?.014:.009)+this.rng.next()*.016,color:[o.r*.82,o.g*.8,o.b*.76],alpha:1,life:.9+this.rng.next()*.7,drag:.35,gravity:12,spin:(this.rng.next()-.5)*22,fade:0});this.particles.spawn({position:t,velocity:wt.copy(i).multiplyScalar(.8),kind:Ve.SMOKE,size:.22,color:[o.r,o.g,o.b],alpha:.34,life:2.2+this.rng.next()*1.2,drag:1.2,gravity:-.18,growth:5.5,spin:(this.rng.next()-.5)*.6,fade:1}),n===ht.METAL&&this._ricochetSparks(t,i)}_ricochetSparks(t,e){const i=Math.max(3,Math.round(9*this.quality.particleDensity));for(let n=0;n<i;n++)wt.copy(e).multiplyScalar(5+this.rng.next()*11),wt.x+=(this.rng.next()-.5)*7,wt.y+=(this.rng.next()-.5)*5,wt.z+=(this.rng.next()-.5)*7,this.particles.spawn({position:t,velocity:wt,kind:Ve.SPARK,size:.012+this.rng.next()*.012,stretch:2.2+this.rng.next()*3.5,color:[1,.7,.35],alpha:1,life:.28+this.rng.next()*.5,drag:1.4,gravity:11,fade:2})}_bloodImpact(t,e,i){const n=this.quality.particleDensity,s=i==="head",r=s?1.55:i==="limb"?.72:1,o=Math.round((s?9:5)*n);for(let h=0;h<o;h++){wt.copy(e).multiplyScalar((.8+this.rng.next()*2.2)*r),wt.x+=(this.rng.next()-.5)*1.5,wt.y+=(this.rng.next()-.5)*1.2+.35,wt.z+=(this.rng.next()-.5)*1.5;const u=.85+this.rng.next()*.45;this.particles.spawn({position:t,velocity:wt,kind:Ve.BLOOD,size:(.045+this.rng.next()*.09)*r,color:[.42*u,.055*u,.04*u],alpha:.3+this.rng.next()*.22,life:.55+this.rng.next()*.7,drag:5.2,gravity:1.1,growth:3.2,fade:1})}const l=Math.round((s?11:7)*n);for(let h=0;h<l;h++){wt.copy(e).multiplyScalar((2.2+this.rng.next()*5)*r),wt.x+=(this.rng.next()-.5)*3,wt.y+=(this.rng.next()-.5)*2.4+.9,wt.z+=(this.rng.next()-.5)*3;const u=.8+this.rng.next()*.5;this.particles.spawn({position:t,velocity:wt,kind:Ve.BLOOD,size:(.012+Math.pow(this.rng.next(),3)*.075)*r,color:[.34*u,.026*u,.021*u],alpha:.95,life:.5+this.rng.next()*.75,drag:1.4,gravity:11.5,growth:1,fade:1})}const c=this.bvh.raycast(t,e,3.6,Fl);if(c.hit&&(this.decals.add(c.point,c.normal,$e.BLOOD,(.3+this.rng.next()*.45)*r,{seed:this.rng.next(),life:26}),(s||this.rng.bool(.3))&&(wt.copy(c.point).addScaledVector(yy,this.rng.next()*.35-.1),this.decals.add(wt,c.normal,$e.BLOOD,(.14+this.rng.next()*.22)*r,{seed:this.rng.next(),life:26}))),this.rng.bool(.45)){const h=this.bvh.raycast(t,Sy,2.6,Fl);h.hit&&this.decals.add(h.point,h.normal,$e.BLOOD,(.22+this.rng.next()*.3)*r,{seed:this.rng.next(),life:30})}}spawnMuzzleFlash(t,e,i){const n=i?1:.75;this.particles.spawn({position:t,velocity:wt.copy(e).multiplyScalar(1.2),kind:Ve.FLASH,size:(.2+this.rng.next()*.09)*n,color:[1,.85,.6],alpha:1,life:.045,drag:8,fade:2,rotation:this.rng.next()*Math.PI*2}),this.particles.spawn({position:t,velocity:wt.copy(e).multiplyScalar(3.4),kind:Ve.SMOKE,size:.085*n,color:[.62,.6,.56],alpha:.3,life:.55,drag:4.2,gravity:-.6,growth:5.5,fade:1,spin:(this.rng.next()-.5)*2});for(let s=0;s<Math.round(4*this.quality.particleDensity);s++)wt.copy(e).multiplyScalar(7+this.rng.next()*9),wt.x+=(this.rng.next()-.5)*3.2,wt.y+=(this.rng.next()-.5)*3.2,wt.z+=(this.rng.next()-.5)*3.2,this.particles.spawn({position:t,velocity:wt,kind:Ve.SPARK,size:.009,stretch:2.5,color:[1,.6,.25],alpha:1,life:.14,drag:3,gravity:8,fade:2});this.lights.push({position:t.clone(),color:new y(1,.78,.45),intensity:i?26:16,radius:9,life:.055,age:0})}_spawnTracer(t,e,i,n){if(!n&&this.rng.next()>.34||n&&this.rng.next()>.42)return;const s=[t.clone()];for(const[,r]of e)s.push(r.clone());this.tracers.push({path:s,speed:i,t:0,index:0,total:vy(s),travelled:0,particle:-1})}ejectCasing(t,e,i){const n=this.rigid.spawnOrRecycle();if(!n)return;n.setBox(.0055,.0055,.023,.012),n.position.copy(t),n.quaternion.setFromEuler(mu.set(this.rng.next()*6.28,this.rng.next()*6.28,this.rng.next()*6.28)),n.velocity.copy(e).multiplyScalar(2.9+this.rng.next()*1.5),i&&n.velocity.add(i),n.velocity.y+=1.4,n.angular.set((this.rng.next()-.5)*40,(this.rng.next()-.5)*40,(this.rng.next()-.5)*40),n.restitution=.34,n.friction=.42,n.maxLifetime=9,n.surface=ht.METAL;const s=this.casings.acquire([.72,.55,.22]);if(s<0){this.rigid.remove(n);return}n.userData={batch:this.casings,slot:s,kind:"casing"},n.onContact=r=>{r>.006&&this.audio?.playCasingBounce(n.position,Math.min(1,r*60))},this._casingBodies.push(n)}dropMagazine(t){const e=this.rigid.spawnOrRecycle();if(!e)return;e.setBox(.014,.092,.021,.18),Fn.set(0,-.1,-.02).applyMatrix4(t.weapon.matrixWorld),e.position.copy(Fn),e.quaternion.setFromRotationMatrix(t.weapon.matrixWorld),e.velocity.set((this.rng.next()-.5)*.4,-1.2,(this.rng.next()-.5)*.4),e.angular.set((this.rng.next()-.5)*6,(this.rng.next()-.5)*6,(this.rng.next()-.5)*6),e.restitution=.18,e.friction=.7,e.maxLifetime=14;const i=this.mags.acquire([.2,.19,.17]);if(i<0){this.rigid.remove(e);return}e.userData={batch:this.mags,slot:i,kind:"mag"},e.onContact=n=>{n>.05&&this.audio?.playMagDrop(e.position)},this._magBodies.push(e)}throwGrenade({position:t,velocity:e,owner:i,team:n,spin:s}){const r=this.rigid.spawnOrRecycle();if(!r)return null;r.setBox(.031,.04,.031,.4),r.position.copy(t),r.quaternion.setFromEuler(mu.set(this.rng.next()*6.28,this.rng.next()*6.28,0)),r.velocity.copy(e),r.angular.copy(s??wt.set((this.rng.next()-.5)*12,(this.rng.next()-.5)*12,(this.rng.next()-.5)*12)),r.restitution=.34,r.friction=.68,r.maxLifetime=Zi.fuse+2,r.surface=ht.METAL;const o=this.grenadeBatch.acquire([.2,.23,.18]);if(o<0)return this.rigid.remove(r),null;r.userData={batch:this.grenadeBatch,slot:o,kind:"grenade"},r.onContact=c=>{c>.02&&this.audio?.playCasingBounce(r.position,Math.min(1,c*12))};const l={body:r,fuse:Zi.fuse,owner:i,team:n};return this._grenades.push(l),l}get liveGrenades(){return this._grenades}detonate(t,e,i){const n=this.quality.particleDensity;for(const r of this.characters){if(!r.alive)continue;const o=r.position.distanceTo(t);if(o>Zi.radius||(Fn.copy(r.position),Fn.y+=.1,this.bvh.occluded(t,Fn)))continue;const l=1-(o/Zi.radius)**1.6;r.applyDamage(Zi.damage*l,{source:e,point:t,direction:Ea.subVectors(Fn,t).normalize(),zone:"body",kind:"explosion"})}this.lights.push({position:t.clone(),color:[1,.62,.26],intensity:26,radius:14,life:.42,age:0});for(let r=0;r<Math.max(8,Math.round(26*n));r++)wt.set(this.rng.next()-.5,this.rng.next()*.8,this.rng.next()-.5).normalize().multiplyScalar(4+this.rng.next()*14),this.particles.spawn({position:t,velocity:wt,kind:Ve.SPARK,size:.03+this.rng.next()*.05,stretch:3+this.rng.next()*5,color:[1,.72,.34],alpha:1,life:.22+this.rng.next()*.4,drag:2.4,gravity:6,fade:1});for(let r=0;r<Math.max(6,Math.round(18*n));r++)wt.set(this.rng.next()-.5,this.rng.next()*.7+.1,this.rng.next()-.5).normalize().multiplyScalar(1.5+this.rng.next()*4),this.particles.spawn({position:t,velocity:wt,kind:Ve.SMOKE,size:.35+this.rng.next()*.5,color:[.3,.28,.26],alpha:.5,life:1.6+this.rng.next()*1.8,drag:1.3,gravity:-.4,growth:5.5,spin:(this.rng.next()-.5)*1.2,fade:1});Ll.copy(t),Ea.set(0,-1,0);const s=this.bvh.raycast(Ll,Ea,3,this.hit);s.hit&&(Ye.copy(t).addScaledVector(Ea,s.t),this.decals.add(Ye,s.normal,$e.SCORCH,1.5+this.rng.next()*.5,{seed:this.rng.next()})),this.audio?.playExplosion?.(t),this.onExplosion?.(t,e,i)}update(t,e,i){this.particles.update(t,e),this.decals.update(t);for(let n=this.tracers.length-1;n>=0;n--){const s=this.tracers[n];if(s.travelled+=s.speed*t,s.travelled>=s.total){this.tracers.splice(n,1);continue}_y(s.path,s.travelled,Fn,wt),this.particles.spawn({position:Fn,velocity:wt,kind:Ve.TRACER,size:.026,stretch:8.5+s.speed*.008,color:[1,.55,.22],alpha:.9,life:.055,drag:0,gravity:0,fade:0})}for(let n=this.lights.length-1;n>=0;n--){const s=this.lights[n];s.age+=t,s.age>=s.life?this.lights.splice(n,1):s.currentIntensity=s.intensity*(1-s.age/s.life)}for(let n=this._grenades.length-1;n>=0;n--){const s=this._grenades[n];s.fuse-=t,!(s.fuse>0&&s.body.active)&&(s.body.active&&this.detonate(s.body.position,s.owner,s.team),this.grenadeBatch.release(s.body.userData?.slot??-1),this.rigid.remove(s.body),this._grenades.splice(n,1))}this._syncBodies(this._casingBodies,this.casings),this._syncBodies(this._magBodies,this.mags);for(const n of this._grenades)this.grenadeBatch.setTransform(n.body.userData.slot,n.body.position,n.body.quaternion);this.grenadeBatch.flush(),i&&this.particles.material.uniforms.uCameraPos.value.copy(i.position)}_syncBodies(t,e){for(let i=t.length-1;i>=0;i--){const n=t[i];if(!n.active){e.release(n.userData?.slot??-1),t.splice(i,1);continue}e.setTransform(n.userData.slot,n.position,n.quaternion)}e.flush()}activeLights(){const t=[];for(const e of this.lights)if(t.push({position:e.position,color:e.color,intensity:e.currentIntensity??e.intensity,radius:e.radius}),t.length>=8)break;return t}clear(){this.particles.clear(),this.decals.clear(),this.tracers.length=0,this.lights.length=0;for(const t of this._casingBodies)this.rigid.remove(t);for(const t of this._magBodies)this.rigid.remove(t);for(const t of this._grenades)this.rigid.remove(t.body);this._casingBodies.length=0,this._magBodies.length=0,this._grenades.length=0,this.casings.clear(),this.mags.clear(),this.grenadeBatch.clear()}dispose(){this.particles.dispose(),this.decals.dispose(),this.casings.dispose(),this.mags.dispose(),this.grenadeBatch.dispose()}}function gy(a,t,e,i,n,s){Qs.subVectors(i,e),ls.subVectors(a,e);const r=Qs.dot(Qs),o=Qs.dot(t),l=Qs.dot(ls),c=t.dot(ls),h=ls.dot(ls);let u=r-o*o,d=r*c-l*o,g=r*h-l*l-n*n*r,m=d*d-u*g;if(m>=0){const v=(-d-Math.sqrt(m))/u,p=l+v*o;if(p>0&&p<r)return v>=0&&v<=s?v:null;if(Yr.copy(p<=0?ls:ls.clone().sub(Qs)),d=t.dot(Yr),g=Yr.dot(Yr)-n*n,m=d*d-g,m>0){const f=-d-Math.sqrt(m);return f>=0&&f<=s?f:null}}return null}function vy(a){let t=0;for(let e=1;e<a.length;e++)t+=a[e].distanceTo(a[e-1]);return t}function _y(a,t,e,i){let n=0;for(let s=1;s<a.length;s++){const r=a[s].distanceTo(a[s-1]);if(n+r>=t){const o=(t-n)/Math.max(r,1e-5);e.lerpVectors(a[s-1],a[s],o),i.subVectors(a[s],a[s-1]).normalize();return}n+=r}e.copy(a[a.length-1]),i.subVectors(a[a.length-1],a[Math.max(0,a.length-2)]).normalize()}function xy(a,t,e){Xr.subVectors(e,t);const i=Xr.lengthSq();if(i<1e-9)return a.distanceTo(t);const n=Ht.clamp(wy.subVectors(a,t).dot(Xr)/i,0,1);return a.distanceTo(My.copy(t).addScaledVector(Xr,n))}const yy=new y(0,1,0),Sy=new y(0,-1,0),Xr=new y,wy=new y,My=new y,Ea=new y,Ll=new y,Ye=new y,Kr=new y,uu=new y,Dl=new y,wt=new y,Fn=new y,du=new y,fu=new y,Il=new y,Qs=new y,ls=new y,Yr=new y,pu=new re,mu=new oe,Fl=new Xi,pe={STOWED:"stowed",RAISING:"raising",READY:"ready",CHARGING:"charging",THROWING:"throwing",LOWERING:"lowering"},gu=.34,vu=.26,_u=.42,by=.17,Ty=.13;class Ey{constructor({player:t,audio:e,onThrow:i}){this.player=t,this.audio=e,this.onThrow=i,this.count=Zi.carried,this.state=pe.STOWED,this.stateTime=0,this.charge=0,this._released=!1,this._wasFiring=!1}get equipped(){return this.state!==pe.STOWED}get blocksWeapon(){return this.equipped}get raiseBlend(){return this.state===pe.RAISING?Math.min(1,this.stateTime/gu):this.state===pe.LOWERING?1-Math.min(1,this.stateTime/vu):this.state===pe.STOWED?0:1}get throwBlend(){return this.state===pe.THROWING?Math.min(1,this.stateTime/_u):0}reset(){this.count=Zi.carried,this.state=pe.STOWED,this.stateTime=0,this.charge=0,this._released=!1}toggle(){if(!(this.state===pe.THROWING||this.state===pe.LOWERING))if(this.state===pe.STOWED){if(this.count<=0||!this.player.alive)return;this.state=pe.RAISING,this.stateTime=0,this.audio?.playGrenadePin()}else this.state=pe.LOWERING,this.stateTime=0,this.charge=0}stow(){this.state===pe.STOWED||this.state===pe.THROWING||(this.state=pe.LOWERING,this.stateTime=0,this.charge=0)}update(t,{firing:e}){if(this.stateTime+=t,!this.player.alive&&this.state!==pe.STOWED){this.state=pe.STOWED,this.charge=0;return}switch(this.state){case pe.RAISING:this.stateTime>=gu&&(this.state=pe.READY,this.stateTime=0,this._wasFiring=e);break;case pe.READY:e&&!this._wasFiring&&(this.state=pe.CHARGING,this.stateTime=0,this.charge=0);break;case pe.CHARGING:this.charge=Math.min(1,this.charge+t/Zi.chargeTime),e||this._release();break;case pe.THROWING:!this._released&&this.stateTime>=by&&this._spawn(),this.stateTime>=_u&&(this.state=pe.LOWERING,this.stateTime=0,this.charge=0);break;case pe.LOWERING:this.stateTime>=vu&&(this.state=pe.STOWED,this.stateTime=0);break}this._wasFiring=e}_release(){this.state=pe.THROWING,this.stateTime=0,this._released=!1,this.audio?.playGrenadeThrow()}_spawn(){if(this._released=!0,this.count<=0)return;this.count--;const t=this.player,e=Ht.lerp(Zi.minSpeed,Zi.maxSpeed,this.charge);Ul.set(0,0,-1).applyEuler(yu.set(t.viewPitch+Ty,t.viewYaw,0,"YXZ")),xu.set(1,0,0).applyEuler(yu.set(0,t.viewYaw,0,"YXZ")),Bl.copy(t.eye).addScaledVector(xu,.16).addScaledVector(Ul,.3),Bl.y-=.08,$r.copy(Ul).multiplyScalar(e),$r.x+=t.controller.velocity.x*.6,$r.z+=t.controller.velocity.z*.6,this.onThrow?.(Bl,$r)}hudState(){return{count:this.count,equipped:this.equipped,charging:this.state===pe.CHARGING,charge:this.charge}}}const Ul=new y,xu=new y,Bl=new y,$r=new y,yu=new oe,un=48e3;class Ay{constructor(){this.ctx=null,this.ready=!1,this.master=null,this.buffers={},this.listenerPos=new y,Object.defineProperty(this,"bufferCount",{get:()=>Object.keys(this.buffers).length}),this.listenerFwd=new y(0,0,-1),this.listenerUp=new y(0,1,0),this.masterVolume=.8,this.sfxVolume=1,this.muffle=0,this._voices=0,this._maxVoices=48,this._lastShot=0,this._rrIndex=0}async init(){if(this.ctx)return this;const t=window.AudioContext||window.webkitAudioContext;return this.ctx=new t({sampleRate:un,latencyHint:"interactive"}),this.master=this.ctx.createGain(),this.master.gain.value=this.masterVolume,this.limiter=this.ctx.createDynamicsCompressor(),this.limiter.threshold.value=-8,this.limiter.knee.value=6,this.limiter.ratio.value=9,this.limiter.attack.value=.002,this.limiter.release.value=.18,this.muffleFilter=this.ctx.createBiquadFilter(),this.muffleFilter.type="lowpass",this.muffleFilter.frequency.value=2e4,this.sfxBus=this.ctx.createGain(),this.sfxBus.gain.value=this.sfxVolume,this.reverbNear=this.ctx.createConvolver(),this.reverbFar=this.ctx.createConvolver(),this.reverbNear.buffer=this._impulseResponse(.55,2.6,3600),this.reverbFar.buffer=this._impulseResponse(1.9,1.7,1800),this.sendNear=this.ctx.createGain(),this.sendFar=this.ctx.createGain(),this.sendNear.gain.value=.3,this.sendFar.gain.value=.18,this.sfxBus.connect(this.muffleFilter),this.sfxBus.connect(this.sendNear),this.sfxBus.connect(this.sendFar),this.sendNear.connect(this.reverbNear),this.sendFar.connect(this.reverbFar),this.reverbNear.connect(this.muffleFilter),this.reverbFar.connect(this.muffleFilter),this.muffleFilter.connect(this.limiter),this.limiter.connect(this.master),this.master.connect(this.ctx.destination),await this._renderBuffers(),this.ready=!0,this}resume(){this.ctx?.state==="suspended"&&this.ctx.resume()}suspend(){this.ctx?.state==="running"&&this.ctx.suspend()}setVolumes({master:t,sfx:e}){t!==void 0&&(this.masterVolume=t,this.master&&(this.master.gain.value=t)),e!==void 0&&(this.sfxVolume=e,this.sfxBus&&(this.sfxBus.gain.value=e))}setListener(t,e,i){if(this.listenerPos.copy(t),this.listenerFwd.copy(e),this.listenerUp.copy(i),!this.ctx)return;const n=this.ctx.listener,s=this.ctx.currentTime;n.positionX?(n.positionX.setTargetAtTime(t.x,s,.01),n.positionY.setTargetAtTime(t.y,s,.01),n.positionZ.setTargetAtTime(t.z,s,.01),n.forwardX.setTargetAtTime(e.x,s,.01),n.forwardY.setTargetAtTime(e.y,s,.01),n.forwardZ.setTargetAtTime(e.z,s,.01),n.upX.setTargetAtTime(i.x,s,.01),n.upY.setTargetAtTime(i.y,s,.01),n.upZ.setTargetAtTime(i.z,s,.01)):(n.setPosition(t.x,t.y,t.z),n.setOrientation(e.x,e.y,e.z,i.x,i.y,i.z))}setMuffle(t){if(this.muffle=t,!this.muffleFilter)return;const e=2e4*Math.pow(.045,t);this.muffleFilter.frequency.setTargetAtTime(e,this.ctx.currentTime,.05)}_buffer(t,e=1){return this.ctx.createBuffer(e,Math.max(1,Math.ceil(t*un)),un)}_impulseResponse(t,e,i){const n=this._buffer(t,2);for(let s=0;s<2;s++){const r=n.getChannelData(s);let o=0;const l=Math.exp(-2*Math.PI*i/un);for(let c=0;c<r.length;c++){const h=c/r.length;let u=(Math.random()*2-1)*Math.pow(1-h,e);c<un*.06&&Math.random()<.004&&(u+=(Math.random()*2-1)*.8),o=l*o+(1-l)*u,r[c]=o*1.6}}return n}async _renderBuffers(){const t=[["shot",.62,i=>this._buildGunshot(i,1)],["shotAlt",.62,i=>this._buildGunshot(i,1.06)],["shotDistant",.9,i=>this._buildDistantShot(i)],["tail",1.5,i=>this._buildTail(i)],["supersonic",.16,i=>this._buildCrack(i)],["explosion",2.6,i=>this._buildExplosion(i)],["grenadePin",.2,i=>this._buildPin(i)],["casing",.55,i=>this._buildCasing(i)],["magOut",.35,i=>this._buildMagOut(i)],["magIn",.4,i=>this._buildMagIn(i)],["boltBack",.24,i=>this._buildBolt(i,!0)],["boltForward",.22,i=>this._buildBolt(i,!1)],["dryFire",.12,i=>this._buildDryFire(i)],["selector",.09,i=>this._buildSelector(i)],["fleshBody",.28,i=>this._buildFlesh(i,!1)],["fleshHead",.3,i=>this._buildFlesh(i,!0)],["impactConcrete",.36,i=>this._buildImpact(i,"concrete")],["impactMetal",.5,i=>this._buildImpact(i,"metal")],["impactWood",.32,i=>this._buildImpact(i,"wood")],["impactGlass",.6,i=>this._buildImpact(i,"glass")],["impactSand",.28,i=>this._buildImpact(i,"sand")],["ricochet",.5,i=>this._buildRicochet(i)],["hitmarker",.09,i=>this._buildHitmarker(i,!1)],["hitmarkerKill",.22,i=>this._buildHitmarker(i,!0)],["hurt",.4,i=>this._buildHurt(i)],["uiClick",.07,i=>this._buildUI(i,780)],["uiHover",.05,i=>this._buildUI(i,1350)],["uiBack",.09,i=>this._buildUI(i,420)],["matchStart",1.4,i=>this._buildStinger(i,!1)],["matchEnd",1.8,i=>this._buildStinger(i,!0)]];for(const i of["stone","sand","gravel","wood","metal"])for(let n=0;n<4;n++)t.push([`step_${i}_${n}`,.24,s=>this._buildFootstep(s,i,n)]);const e=await Promise.all(t.map(async([i,n,s])=>{const r=window.OfflineAudioContext||window.webkitOfflineAudioContext,o=new r(1,Math.ceil(n*un),un);s(o);const l=await o.startRendering();return[i,l]}));for(const[i,n]of e)this.buffers[i]=n}_noise(t,e,i=0){const n=Math.ceil(e*un),s=t.createBuffer(1,n,un),r=s.getChannelData(0);let o=0;for(let c=0;c<n;c++){const h=Math.random()*2-1;o=o*(.5-i*.45)+h*(.5+i*.45),r[c]=i<0?o:h*(1+i)-o*i}const l=t.createBufferSource();return l.buffer=s,l}_env(t,e,i,n,s,r,o="exp"){const l=t.createGain();return l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(n,i+s),o==="exp"?l.gain.exponentialRampToValueAtTime(1e-4,i+s+r):l.gain.linearRampToValueAtTime(0,i+s+r),e.connect(l),l}_buildGunshot(t,e){const i=t.destination,n=0,s=this._noise(t,.1,.6),r=t.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(2400*e,n),r.frequency.exponentialRampToValueAtTime(700*e,n+.06),r.Q.value=.9;const o=this._env(t,r,n,1,6e-4,.075);s.connect(r),o.connect(i),s.start(n);const l=t.createOscillator();l.type="sine",l.frequency.setValueAtTime(320*e,n),l.frequency.exponentialRampToValueAtTime(58,n+.11),this._env(t,l,n,.85,.001,.13).connect(i),l.start(n),l.stop(n+.2);const h=t.createOscillator();h.type="triangle",h.frequency.setValueAtTime(150*e,n),h.frequency.exponentialRampToValueAtTime(44,n+.16),this._env(t,h,n,.5,.002,.18).connect(i),h.start(n),h.stop(n+.25);const d=this._noise(t,.09,.9),g=t.createBiquadFilter();g.type="highpass",g.frequency.value=2600;const m=this._env(t,g,n+.008,.22,.001,.07);d.connect(g),m.connect(i),d.start(n+.008);const v=this._noise(t,.42,-.2),p=t.createBiquadFilter();p.type="bandpass",p.frequency.value=900,p.Q.value=.7;const f=this._env(t,p,n+.02,.3,.01,.4);v.connect(p),f.connect(i),v.start(n+.02)}_buildDistantShot(t){const e=t.destination,i=t.createOscillator();i.type="sine",i.frequency.setValueAtTime(180,0),i.frequency.exponentialRampToValueAtTime(52,.14),this._env(t,i,0,.7,.004,.2).connect(e),i.start(0),i.stop(.3);const n=this._noise(t,.85,-.5),s=t.createBiquadFilter();s.type="lowpass",s.frequency.setValueAtTime(1100,0),s.frequency.exponentialRampToValueAtTime(320,.7);const r=this._env(t,s,.006,.45,.02,.72);n.connect(s),r.connect(e),n.start(0)}_buildTail(t){const e=t.destination,i=this._noise(t,1.45,-.35),n=t.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(760,0),n.frequency.exponentialRampToValueAtTime(240,1.2),n.Q.value=.5;const s=this._env(t,n,.03,.34,.05,1.25);i.connect(n),s.connect(e),i.start(0)}_buildExplosion(t){const e=t.destination,i=this._noise(t,.14,.85),n=t.createBiquadFilter();n.type="highpass",n.frequency.setValueAtTime(1800,0),n.frequency.exponentialRampToValueAtTime(600,.12),i.connect(n),this._env(t,n,0,.9,.0015,.11).connect(e),i.start(0);const s=t.createOscillator();s.type="sine",s.frequency.setValueAtTime(155,0),s.frequency.exponentialRampToValueAtTime(24,.55),this._env(t,s,0,1,.003,.75).connect(e),s.start(0),s.stop(.9);const r=t.createOscillator();r.type="sine",r.frequency.setValueAtTime(64,0),r.frequency.exponentialRampToValueAtTime(19,.7),this._env(t,r,.004,.72,.01,.95).connect(e),r.start(0),r.stop(1.1);const o=this._noise(t,1.1,-.1),l=t.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(9e3,0),l.frequency.exponentialRampToValueAtTime(300,.75),o.connect(l),this._env(t,l,.001,.85,.004,.8).connect(e),o.start(0);for(let u=0;u<9;u++){const d=.09+Math.pow(Math.random(),1.7)*1.05,g=this._noise(t,.09,.4),m=t.createBiquadFilter();m.type="bandpass",m.frequency.value=900+Math.random()*3400,m.Q.value=1.6+Math.random()*2.5,g.connect(m),this._env(t,m,d,.09+Math.random()*.13,.001,.05+Math.random()*.07).connect(e),g.start(0)}const c=this._noise(t,2.2,-.55),h=t.createBiquadFilter();h.type="bandpass",h.frequency.setValueAtTime(430,0),h.frequency.exponentialRampToValueAtTime(110,2),h.Q.value=.35,c.connect(h),this._env(t,h,.04,.4,.1,2.1).connect(e),c.start(0)}_buildPin(t){const e=t.destination;for(const[i,n,s]of[[2400,0,.35],[3100,.055,.22]]){const r=t.createOscillator();r.type="square",r.frequency.setValueAtTime(i,0),r.frequency.exponentialRampToValueAtTime(i*.55,n+.05),this._env(t,r,n,s,.001,.06).connect(e),r.start(0),r.stop(n+.1)}}_buildCrack(t){const e=t.destination,i=this._noise(t,.1,1),n=t.createBiquadFilter();n.type="highpass",n.frequency.value=1800;const s=t.createBiquadFilter();s.type="peaking",s.frequency.value=4200,s.gain.value=9,s.Q.value=1.4;const r=this._env(t,s,0,.9,4e-4,.028);i.connect(n),n.connect(s),r.connect(e),i.start(0)}_buildCasing(t){const e=t.destination;for(let i=0;i<3;i++){const n=i*(.055+Math.random()*.07),s=Math.pow(.55,i);for(const c of[3100,4700,6900,9400]){const h=t.createOscillator();h.type="sine",h.frequency.value=c*(.92+Math.random()*.16),this._env(t,h,n,.1*s*(3100/c),5e-4,.09+Math.random()*.06).connect(e),h.start(n),h.stop(n+.2)}const r=this._noise(t,.03,1),o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;const l=this._env(t,o,n,.09*s,4e-4,.02);r.connect(o),l.connect(e),r.start(n)}}_buildMagOut(t){const e=t.destination;this._click(t,e,0,2600,.16,.012);const i=this._noise(t,.2,.2),n=t.createBiquadFilter();n.type="bandpass",n.frequency.value=1500,n.Q.value=.6;const s=this._env(t,n,.03,.1,.02,.18);i.connect(n),s.connect(e),i.start(.03),this._click(t,e,.2,900,.14,.03)}_buildMagIn(t){const e=t.destination,i=this._noise(t,.14,0),n=t.createBiquadFilter();n.type="bandpass",n.frequency.value=1100,n.Q.value=.5;const s=this._env(t,n,0,.09,.02,.13);i.connect(n),s.connect(e),i.start(0);const r=t.createOscillator();r.type="triangle",r.frequency.setValueAtTime(420,.19),r.frequency.exponentialRampToValueAtTime(140,.27),this._env(t,r,.19,.42,.001,.1).connect(e),r.start(.19),r.stop(.32),this._click(t,e,.2,3400,.2,.014),this._click(t,e,.235,2100,.1,.02)}_buildBolt(t,e){const i=t.destination,n=0,s=this._noise(t,.09,.5),r=t.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(e?1800:2600,n),r.frequency.exponentialRampToValueAtTime(e?3200:1400,n+.07),r.Q.value=.8;const o=this._env(t,r,n,.24,.002,.075);if(s.connect(r),o.connect(i),s.start(n),this._click(t,i,n+(e?.075:.055),e?2400:1500,.42,.03),!e){const l=t.createOscillator();l.type="sine",l.frequency.value=5200,this._env(t,l,n+.056,.05,5e-4,.11).connect(i),l.start(n+.056),l.stop(n+.2)}}_buildDryFire(t){this._click(t,t.destination,0,2900,.3,.02),this._click(t,t.destination,.012,1400,.12,.03)}_buildSelector(t){this._click(t,t.destination,0,4200,.28,.012)}_click(t,e,i,n,s,r){const o=this._noise(t,r+.01,.8),l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=n,l.Q.value=2.2;const c=this._env(t,l,i,s,4e-4,r);o.connect(l),c.connect(e),o.start(i)}_buildFlesh(t,e){const i=t.destination,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(e?260:190,0),n.frequency.exponentialRampToValueAtTime(e?70:55,.1),this._env(t,n,0,e?.75:.55,.001,.11).connect(i),n.start(0),n.stop(.2);const s=this._noise(t,.2,.1),r=t.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(e?1600:1e3,0),r.frequency.exponentialRampToValueAtTime(320,.16),r.Q.value=.6;const o=this._env(t,r,.002,e?.5:.34,.002,.18);if(s.connect(r),o.connect(i),s.start(0),e){const l=this._noise(t,.05,1),c=t.createBiquadFilter();c.type="highpass",c.frequency.value=3200;const h=this._env(t,c,0,.36,4e-4,.035);l.connect(c),h.connect(i),l.start(0)}}_buildImpact(t,e){const i=t.destination,n={concrete:{f0:1500,f1:380,decay:.14,gain:.55,color:.2,ring:0},metal:{f0:2600,f1:900,decay:.1,gain:.5,color:.7,ring:2400},wood:{f0:900,f1:260,decay:.13,gain:.5,color:-.1,ring:420},glass:{f0:3400,f1:1500,decay:.22,gain:.42,color:.9,ring:5200},sand:{f0:700,f1:180,decay:.11,gain:.4,color:-.4,ring:0}}[e],s=this._noise(t,n.decay+.12,n.color),r=t.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(n.f0,0),r.frequency.exponentialRampToValueAtTime(n.f1,n.decay),r.Q.value=.8;const o=this._env(t,r,0,n.gain,8e-4,n.decay);s.connect(r),o.connect(i),s.start(0);const l=t.createOscillator();if(l.type="sine",l.frequency.setValueAtTime(n.f1*.6,0),l.frequency.exponentialRampToValueAtTime(60,n.decay*1.2),this._env(t,l,0,.28,.001,n.decay*1.3).connect(i),l.start(0),l.stop(n.decay*1.6),n.ring)for(let c=0;c<3;c++){const h=t.createOscillator();h.type="sine",h.frequency.value=n.ring*(1+c*.63)*(.95+Math.random()*.1),this._env(t,h,.001,.09/(1+c),8e-4,.18+c*.06).connect(i),h.start(.001),h.stop(.5)}if(e==="glass")for(let c=0;c<9;c++){const h=.06+Math.random()*.4,u=t.createOscillator();u.type="sine",u.frequency.value=3e3+Math.random()*4500,this._env(t,u,h,.035,5e-4,.04+Math.random()*.05).connect(i),u.start(h),u.stop(h+.12)}}_buildRicochet(t){const e=t.destination;for(let i=0;i<2;i++){const n=t.createOscillator();n.type="sawtooth";const s=2600+Math.random()*1400;n.frequency.setValueAtTime(s,0),n.frequency.exponentialRampToValueAtTime(s*.22,.42);const r=t.createBiquadFilter();r.type="bandpass",r.Q.value=8,r.frequency.setValueAtTime(s,0),r.frequency.exponentialRampToValueAtTime(s*.25,.42),n.connect(r),this._env(t,r,.004,.16,.006,.44).connect(e),n.start(0),n.stop(.5)}this._click(t,e,0,3600,.3,.02)}_buildHitmarker(t,e){const i=t.destination;(e?[1180,1570,2100]:[1750]).forEach((s,r)=>{const o=t.createOscillator();o.type="square",o.frequency.value=s;const l=r*.045,c=this._env(t,o,l,e?.13:.16,.001,e?.1:.045),h=t.createBiquadFilter();h.type="lowpass",h.frequency.value=4200,c.connect(h),h.connect(i),o.start(l),o.stop(l+.2)})}_buildHurt(t){const e=t.destination,i=this._noise(t,.35,-.3),n=t.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(420,0),n.frequency.exponentialRampToValueAtTime(130,.3);const s=this._env(t,n,0,.5,.002,.33);i.connect(n),s.connect(e),i.start(0);const r=t.createOscillator();r.type="sine",r.frequency.setValueAtTime(90,0),r.frequency.exponentialRampToValueAtTime(45,.3),this._env(t,r,0,.4,.002,.32).connect(e),r.start(0),r.stop(.4)}_buildFootstep(t,e,i){const n=t.destination,s={stone:{f:900,decay:.075,color:.1,gain:.34,grit:.25},sand:{f:1500,decay:.1,color:.5,gain:.26,grit:.9},gravel:{f:1900,decay:.13,color:.7,gain:.3,grit:1},wood:{f:620,decay:.11,color:-.1,gain:.34,grit:.15},metal:{f:1700,decay:.16,color:.6,gain:.3,grit:.1}}[e],r=.88+i*.08,o=this._noise(t,s.decay+.06,s.color),l=t.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(s.f*r,0),l.frequency.exponentialRampToValueAtTime(s.f*.35,s.decay),l.Q.value=.7;const c=this._env(t,l,0,s.gain,.001,s.decay);o.connect(l),c.connect(n),o.start(0);const h=t.createOscillator();if(h.type="sine",h.frequency.setValueAtTime(150*r,0),h.frequency.exponentialRampToValueAtTime(58,s.decay),this._env(t,h,0,.22,.001,s.decay*1.1).connect(n),h.start(0),h.stop(.25),s.grit>.05){const u=this._noise(t,.14,.9),d=t.createBiquadFilter();d.type="highpass",d.frequency.value=2400*r;const g=this._env(t,d,.018,.13*s.grit,.006,.11);u.connect(d),g.connect(n),u.start(.018)}if(e==="metal"){const u=t.createOscillator();u.type="sine",u.frequency.value=2300*r,this._env(t,u,.002,.06,.001,.16).connect(n),u.start(.002),u.stop(.25)}}_buildUI(t,e){const i=t.destination,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(e,0),n.frequency.exponentialRampToValueAtTime(e*.8,.05),this._env(t,n,0,.1,8e-4,.05).connect(i),n.start(0),n.stop(.1),this._click(t,i,0,e*2.4,.05,.01)}_buildStinger(t,e){const i=t.destination,n=e?98:131;(e?[1,1.2,1.5]:[1,1.5,2]).forEach((o,l)=>{const c=t.createOscillator();c.type=l===0?"sawtooth":"triangle",c.frequency.value=n*o;const h=t.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(300,0),h.frequency.exponentialRampToValueAtTime(2400,.5),h.frequency.exponentialRampToValueAtTime(400,e?1.7:1.3);const u=t.createGain();u.gain.setValueAtTime(1e-4,0),u.gain.linearRampToValueAtTime(.16/(l+1),.14),u.gain.exponentialRampToValueAtTime(1e-4,e?1.75:1.3),c.connect(h),h.connect(u),u.connect(i),c.start(0),c.stop(e?1.8:1.4)});const r=t.createOscillator();r.type="sine",r.frequency.setValueAtTime(120,0),r.frequency.exponentialRampToValueAtTime(38,.4),this._env(t,r,0,.5,.002,.45).connect(i),r.start(0),r.stop(.6)}_panner(){const t=this.ctx.createPanner();return t.panningModel="HRTF",t.distanceModel="inverse",t.refDistance=3.5,t.maxDistance=400,t.rolloffFactor=.9,t}play(t,e,{gain:i=1,rate:n=1,delay:s=0,filter:r=!0,reverb:o=1}={}){if(!this.ready||this._voices>this._maxVoices)return null;const l=this.buffers[t];if(!l)return null;const c=this.ctx.currentTime+s,h=this.ctx.createBufferSource();h.buffer=l,h.playbackRate.value=n;const u=this.ctx.createGain();u.gain.value=i;let d=h;if(e){const g=this.listenerPos.distanceTo(e);if(r){const v=this.ctx.createBiquadFilter();v.type="lowpass",v.frequency.value=Ht.clamp(19e3*Math.pow(.55,g/22),320,19e3),d.connect(v),d=v}const m=this._panner();m.positionX?m.positionX.value=e.x:m.setPosition(e.x,e.y,e.z),m.positionX&&(m.positionY.value=e.y,m.positionZ.value=e.z),d.connect(m),d=m}if(d.connect(u),o!==1){const g=this.ctx.createGain();g.gain.value=1,u.connect(g),g.connect(this.muffleFilter);const m=this.ctx.createGain();m.gain.value=o*.3,u.connect(m),m.connect(this.reverbNear)}else u.connect(this.sfxBus);return this._voices++,h.onended=()=>{this._voices--},h.start(c),h}playGunshot(t,{firstPerson:e=!1}={}){if(!this.ready)return;const i=this.listenerPos.distanceTo(t),n=i<45,s=e?.85:Ht.clamp(1.6/(1+i*.05),.08,1);n&&this.play(this._rrIndex++&1?"shot":"shotAlt",e?null:t,{gain:s,rate:.97+Math.random()*.06,reverb:1});const r=Math.min(i/343,.9);(!n||i>12)&&this.play("shotDistant",t,{gain:s*(n?.35:1.1),rate:.94+Math.random()*.12,delay:r}),this.play("tail",t,{gain:s*(e?.35:.5),delay:r+.02,rate:.9+Math.random()*.2})}playSupersonicCrack(t,e=.6){this.play("supersonic",t,{gain:e,rate:.9+Math.random()*.25})}playImpact(t,e,i=1){const n=Su(e),s={concrete:"impactConcrete",plaster:"impactConcrete",brick:"impactConcrete",tile:"impactConcrete",metal:"impactMetal",wood:"impactWood",glass:"impactGlass",sand:"impactSand",dirt:"impactSand",fabric:"impactSand",sandbag:"impactSand",rubber:"impactWood"};this.play(s[n]||"impactConcrete",t,{gain:.5*i,rate:.85+Math.random()*.35})}playRicochet(t){this.play("ricochet",t,{gain:.42,rate:.8+Math.random()*.5})}playFleshImpact(t,e){this.play(e==="head"?"fleshHead":"fleshBody",t,{gain:.6,rate:.9+Math.random()*.2})}playFootstep(t,e,i=1){const s={concrete:"stone",plaster:"stone",brick:"stone",tile:"stone",metal:"metal",wood:"wood",glass:"stone",sand:"sand",dirt:"gravel",fabric:"sand",sandbag:"sand",rubber:"wood"}[Su(e)]||"stone",r=Math.random()*4|0;this.play(`step_${s}_${r}`,t,{gain:.42*i,rate:.9+Math.random()*.2})}playReload(t,e=1){this.play("magOut",t,{gain:.5*e}),this.play("magIn",t,{gain:.55*e,delay:.85})}playHitmarker(t){this.play(t?"hitmarkerKill":"hitmarker",null,{gain:.5})}playUI(t){this.play(t==="back"?"uiBack":t==="hover"?"uiHover":"uiClick",null,{gain:t==="hover"?.25:.4})}playStinger(t){this.play(t?"matchEnd":"matchStart",null,{gain:.7})}playHurt(){this.play("hurt",null,{gain:.6})}playCasing(t){this.play("casing",t,{gain:.32,rate:.85+Math.random()*.3})}playBolt(t){this.play(t?"boltBack":"boltForward",null,{gain:.45})}playShot(t,{heat:e=0,indoors:i=0}={}){this.ready&&(this.play(this._rrIndex++&1?"shot":"shotAlt",null,{gain:.9,rate:.985+e*.03+Math.random()*.02,reverb:1}),this.play("tail",null,{gain:.3+i*.5,delay:.015,rate:i>.4?1.25:.95}),this.play("shotDistant",t||null,{gain:.22,delay:.09,rate:.8}))}playExplosion(t){this.ready&&(this.play("explosion",t||null,{gain:1,reverb:1,rate:.92+Math.random()*.16}),this.play("tail",null,{gain:.55,delay:.08,rate:.62+Math.random()*.14}))}playGrenadePin(){this.play("grenadePin",null,{gain:.5})}playGrenadeThrow(){this.play("boltForward",null,{gain:.35,rate:.7})}playDryFire(){this.play("dryFire",null,{gain:.45})}playSelector(){this.play("selector",null,{gain:.4})}playReloadStart(){}playMagOut(){this.play("magOut",null,{gain:.6})}playMagIn(){this.play("magIn",null,{gain:.65})}playChargingHandle(){this.play("boltBack",null,{gain:.6}),this.play("boltForward",null,{gain:.65,delay:.11})}playJump(t,e){this.playFootstep(t,e,.5)}playLand(t,e,i){this.playFootstep(t,e,Math.min(1.6,.7+i*1.4)),i>.5&&this.play("hurt",null,{gain:i*.25})}dispose(){this.ctx?.close()}}function Su(a){return typeof a=="string"?a:Bn[a]?.name??"concrete"}const Cy=5.2;class Ry{constructor(t){this.root=t,this.el=document.createElement("div"),this.el.id="hud",this.el.className="passthrough",this.el.innerHTML=Py,t.appendChild(this.el);const e=i=>this.el.querySelector(i);this.dom={crosshair:e("#crosshair"),ticks:Array.from(this.el.querySelectorAll("#crosshair .tick")),hitmarker:e("#hitmarker"),rounds:e("#ammo .rounds"),reserve:e("#ammo .reserve"),mode:e("#ammo .mode"),reloadHint:e("#reload-hint"),health:e("#vitals .value"),healthFill:e("#health-bar .fill"),chipCrouch:e("#chip-crouch"),chipSprint:e("#chip-sprint"),chipAds:e("#chip-ads"),chipPeek:e("#chip-peek"),grenades:e("#grenades"),grenadePips:e("#grenades .pips"),throwPower:e("#throw-power"),throwFill:e("#throw-power .fill"),scoreA:e("#score-a"),scoreB:e("#score-b"),clock:e("#clock"),killfeed:e("#killfeed"),announce:e("#announce"),announceBig:e("#announce .big"),announceSmall:e("#announce .small"),damageVignette:e("#damage-vignette"),criticalPulse:e("#critical-pulse"),flash:e("#flash"),deathFade:e("#death-fade"),respawn:e("#respawn"),respawnName:e("#respawn .name"),respawnTimer:e("#respawn .timer"),damageDirs:e("#damage-dirs"),compassStrip:e("#compass .strip"),perf:e("#perf")},this._buildCompass(),this._cache={rounds:-1,reserve:-1,mode:"",health:-1,scoreA:-1,scoreB:-1,clock:"",spread:-1,crouch:null,sprint:null,ads:null,reload:null,peek:null,grenadeCount:-1,grenadeReady:null,grenadeCharging:null},this.killEntries=[],this.damageArrows=[],this.damageNumbers=[],this.damageFlash=0,this.visible=!1,this._compassYaw=999}setVisible(t){this.visible=t,this.el.classList.toggle("visible",t)}setPerfVisible(t){this.dom.perf.classList.toggle("show",t)}setPerfText(t){this.dom.perf.textContent!==t&&(this.dom.perf.textContent=t)}updateCrosshair(t,e,i,n){if(this.dom.crosshair.classList.toggle("hidden",n),n)return;const s=Math.tan(t)/Math.tan(e*.5)*i*.5,r=Math.max(3,Math.min(70,s));if(Math.abs(r-this._cache.spread)<.35)return;this._cache.spread=r;const o=this.dom.ticks;o[0].style.transform=`translateY(${-r-7}px)`,o[1].style.transform=`translateY(${r}px)`,o[2].style.transform=`translateX(${-r-7}px)`,o[3].style.transform=`translateX(${r}px)`}showHitmarker(t){const e=this.dom.hitmarker;e.classList.remove("show"),e.classList.toggle("kill",!!t),e.offsetWidth,e.classList.add("show")}showDamageNumber(t,e,i,n){if(this.damageNumbers.length>14)return;const s=document.createElement("div");s.className=`dmg-num${n?" head":""}`,s.textContent=Math.round(t),s.style.left=`${e}px`,s.style.top=`${i}px`,this.el.appendChild(s);const r={el:s,life:.9};this.damageNumbers.push(r)}updateAmmo(t,e,i,n){t!==this._cache.rounds&&(this._cache.rounds=t,this.dom.rounds.textContent=String(t).padStart(2,"0"),this.dom.rounds.classList.toggle("low",t<=7)),e!==this._cache.reserve&&(this._cache.reserve=e,this.dom.reserve.textContent=`/ ${e}`),i!==this._cache.mode&&(this._cache.mode=i,this.dom.mode.textContent=i);const s=t===0&&!n;s!==this._cache.reload&&(this._cache.reload=s,this.dom.reloadHint.classList.toggle("show",s),this.dom.reloadHint.textContent="RELOAD  [R]")}updateHealth(t,e){const i=Math.max(0,Math.round(t));if(i===this._cache.health)return;this._cache.health=i;const n=i/e;this.dom.health.textContent=String(i),this.dom.healthFill.style.width=`${n*100}%`;const s=n<.28?"critical":n<.6?"hurt":"";this.dom.health.className=`value ${s}`,this.dom.healthFill.className=`fill ${s}`,this.dom.criticalPulse.classList.toggle("active",n<.28&&i>0)}updateGrenades({count:t,equipped:e,charging:i,charge:n}){t!==this._cache.grenadeCount&&(this._cache.grenadeCount=t,this.dom.grenadePips.textContent=t>0?"● ".repeat(t).trim():"○"),e!==this._cache.grenadeReady&&(this._cache.grenadeReady=e,this.dom.grenades.classList.toggle("ready",e)),i!==this._cache.grenadeCharging&&(this._cache.grenadeCharging=i,this.dom.throwPower.classList.toggle("active",i)),i&&(this.dom.throwFill.style.width=`${n*100}%`)}updateStance(t,e,i,n=!1){n!==this._cache.peek&&(this._cache.peek=n,this.dom.chipPeek.classList.toggle("on",n)),t!==this._cache.crouch&&(this._cache.crouch=t,this.dom.chipCrouch.classList.toggle("on",t)),e!==this._cache.sprint&&(this._cache.sprint=e,this.dom.chipSprint.classList.toggle("on",e)),i!==this._cache.ads&&(this._cache.ads=i,this.dom.chipAds.classList.toggle("on",i))}updateScore(t,e,i,n){t!==this._cache.scoreA&&(this._cache.scoreA=t,this.dom.scoreA.textContent=t),e!==this._cache.scoreB&&(this._cache.scoreB=e,this.dom.scoreB.textContent=e);const s=Math.max(0,Math.floor(i/60)),r=Math.max(0,Math.floor(i%60)),o=`${s}:${String(r).padStart(2,"0")}`;o!==this._cache.clock&&(this._cache.clock=o,this.dom.clock.textContent=o),n!==void 0&&this._cache.target!==n&&(this._cache.target=n,this.el.querySelector("#score-target").textContent=`TARGET ${n}`)}addKill({killer:t,victim:e,killerTeam:i,victimTeam:n,headshot:s,involvesPlayer:r}){const o=document.createElement("div");for(o.className=`kill-entry${s?" headshot":""}`,o.innerHTML=`
      <span class="name ${i}${r==="killer"?" self":""}">${t}</span>
      <span class="glyph">${s?"&#9678;":"&#9656;"}</span>
      <span class="name ${n}${r==="victim"?" self":""}">${e}</span>`,this.dom.killfeed.appendChild(o),this.killEntries.push({el:o,life:Cy});this.killEntries.length>6;)this.killEntries.shift().el.remove()}announce(t,e=""){this.dom.announceBig.textContent=t,this.dom.announceSmall.textContent=e,this.dom.announce.classList.remove("show"),this.dom.announce.offsetWidth,this.dom.announce.classList.add("show")}showDamageDirection(t){const e=document.createElement("div");e.className="dmg-arrow",e.style.transform=`rotate(${t}rad)`,this.dom.damageDirs.appendChild(e),this.damageArrows.push({el:e,life:1.5})}flashDamage(t){this.damageFlash=Math.min(1,this.damageFlash+t)}screenFlash(t){this.dom.flash.style.opacity=String(Math.min(1,t))}setDeathFade(t){this.dom.deathFade.style.opacity=String(t),this.el.classList.toggle("dead",t>.01)}showRespawn(t,e){this.dom.respawn.classList.add("show"),this.dom.respawnName.textContent=t,this._cache.respawn=null,this.updateRespawn(e,!1)}updateRespawn(t,e=!1){const i=e?"REDEPLOY  [SPACE]":`RESPAWN IN ${Math.max(0,t).toFixed(1)}`;i!==this._cache.respawn&&(this._cache.respawn=i,this.dom.respawnTimer.textContent=i,this.dom.respawnTimer.classList.toggle("ready",e))}hideRespawn(){this.dom.respawn.classList.remove("show")}_buildCompass(){const t=this.dom.compassStrip,e={0:"N",45:"NE",90:"E",135:"SE",180:"S",225:"SW",270:"W",315:"NW"};for(let i=-1;i<=1;i++)for(let n=0;n<360;n+=15){const s=document.createElement("div"),r=e[n];s.className=r?`mark${n%90===0?" card":""}`:"mark tick",r&&(s.textContent=r),s.style.left=`${(i*360+n)*wu}px`,t.appendChild(s)}}updateCompass(t){let e=-t*180/Math.PI%360;e<0&&(e+=360),!(Math.abs(e-this._compassYaw)<.15)&&(this._compassYaw=e,this.dom.compassStrip.style.transform=`translateX(${160-e*wu}px)`)}update(t){this.damageFlash>0&&(this.damageFlash=Math.max(0,this.damageFlash-t*1.5),this.dom.damageVignette.style.opacity=String(this.damageFlash*.9));for(let e=this.killEntries.length-1;e>=0;e--){const i=this.killEntries[e];i.life-=t,i.life<.5&&!i.fading&&(i.fading=!0,i.el.classList.add("fading")),i.life<=0&&(i.el.remove(),this.killEntries.splice(e,1))}for(let e=this.damageArrows.length-1;e>=0;e--){const i=this.damageArrows[e];i.life-=t,i.el.style.opacity=String(Math.max(0,Math.min(1,i.life*1.4))),i.life<=0&&(i.el.remove(),this.damageArrows.splice(e,1))}for(let e=this.damageNumbers.length-1;e>=0;e--){const i=this.damageNumbers[e];i.life-=t,i.life<=0&&(i.el.remove(),this.damageNumbers.splice(e,1))}}clear(){for(const t of this.killEntries)t.el.remove();this.killEntries.length=0;for(const t of this.damageArrows)t.el.remove();this.damageArrows.length=0;for(const t of this.damageNumbers)t.el.remove();this.damageNumbers.length=0,this.damageFlash=0,this.dom.damageVignette.style.opacity="0",this.hideRespawn(),this.setDeathFade(0)}}const wu=320/90,Py=`
<div id="screen-fx">
  <div id="damage-vignette"></div>
  <div id="critical-pulse"></div>
  <div id="flash"></div>
  <div id="death-fade"></div>
</div>

<div id="damage-dirs"></div>

<div id="crosshair">
  <div class="tick v"></div>
  <div class="tick v"></div>
  <div class="tick h"></div>
  <div class="tick h"></div>
  <div class="dot"></div>
</div>

<div id="hitmarker"><span></span><span></span><span></span><span></span></div>

<div id="compass"><div class="strip"></div></div>

<div id="score-strip">
  <div>
    <div class="tally" id="score-a">0</div>
    <div class="tally-label">Eliminated</div>
  </div>
  <div class="divider"></div>
  <div>
    <div class="clock" id="clock">10:00</div>
    <div class="target" id="score-target">TARGET 30</div>
  </div>
  <div class="divider"></div>
  <div>
    <div class="tally down" id="score-b">0</div>
    <div class="tally-label">Losses</div>
  </div>
</div>

<div id="killfeed"></div>

<div id="announce"><div class="big"></div><div class="small"></div></div>

<div id="vitals">
  <div class="value">100</div>
  <div class="label">Vitals</div>
  <div id="health-bar"><div class="fill"></div></div>
</div>

<div id="state-chips">
  <div class="chip" id="chip-crouch">CROUCH</div>
  <div class="chip" id="chip-sprint">SPRINT</div>
  <div class="chip" id="chip-ads">ADS</div>
  <div class="chip" id="chip-peek">PEEK</div>
</div>

<div id="ammo">
  <div class="rounds">30</div>
  <div class="reserve">/ 210</div>
  <div class="weapon">MK18 CARBINE <span class="mode">AUTO</span></div>
  <div id="grenades"><span class="pips"></span><span class="key">[B]</span></div>
</div>

<div id="throw-power"><div class="fill"></div></div>
<div id="reload-hint">RELOAD [R]</div>

<div id="respawn">
  <div class="killed-by">Killed by</div>
  <div class="name">—</div>
  <div class="timer">RESPAWN IN 3.0</div>
</div>

<div id="perf"></div>
`,Mu={ControlLeft:"L CTRL",ControlRight:"R CTRL",ShiftLeft:"L SHIFT",ShiftRight:"R SHIFT",AltLeft:"L ALT",AltRight:"R ALT",Space:"SPACE",Escape:"ESC",Tab:"TAB",Mouse0:"LMB",Mouse1:"MMB",Mouse2:"RMB",Mouse3:"M4",Mouse4:"M5",WheelUp:"WHEEL &uarr;",WheelDown:"WHEEL &darr;"};function bu(a){return a?Mu[a]?Mu[a]:a.startsWith("Key")?a.slice(3):a.startsWith("Digit")?a.slice(5):a.startsWith("Arrow")?a.slice(5).toUpperCase():a.toUpperCase():"—"}const Ly=[["fire","Fire"],["aim","Aim down sights"],["forward","Move forward"],["back","Move back"],["left","Strafe left"],["right","Strafe right"],["jump","Jump"],["crouch","Crouch"],["sprint","Sprint"],["slide","Slide"],["leanLeft","Peek left"],["leanRight","Peek right"],["grenade","Grenade"],["reload","Reload"],["fireMode","Fire mode"],["inspect","Inspect weapon"],["scoreboard","Scoreboard"],["pause","Pause"]];class Dy{constructor(t,{audio:e}={}){this.root=t,this.audio=e,this.el=document.createElement("div"),this.el.id="menu",this.el.innerHTML=Iy,t.appendChild(this.el),this.board=document.createElement("div"),this.board.id="scoreboard",t.appendChild(this.board),this.lockPrompt=document.createElement("div"),this.lockPrompt.id="lock-prompt",this.lockPrompt.textContent="Click to resume",t.appendChild(this.lockPrompt),this.onStart=null,this.onResume=null,this.onRestart=null,this.onQuitToMenu=null,this.onSettingChanged=null,this.mode="start",this.settingsOpen=!1,this._listening=null,this._wire(),this._buildSettings()}_wire(){const t=i=>this.el.querySelector(i);this.dom={inner:t(".menu-inner"),list:t(".menu-list"),title:t(".title-block h1"),eyebrow:t(".title-block .eyebrow"),sub:t(".title-block .sub"),panel:t(".panel"),panelBody:t(".panel .body"),btnPrimary:t("#mi-primary"),btnSettings:t("#mi-settings"),btnRestart:t("#mi-restart"),btnQuit:t("#mi-quit")};for(const i of this.el.querySelectorAll(".menu-item"))i.addEventListener("mouseenter",()=>this.audio?.playUI("hover"));const e=this.el.querySelector(".build-stamp");if(e){const i="2026-11-10 13:29";e.textContent=`build ${i} · mouse: pointer lock only`+(Mt.data.rawInput===!0?", raw input ON":"")}this.dom.btnPrimary.addEventListener("click",()=>{this.audio?.playUI("click"),this.mode==="start"?this.onStart?.():this.onResume?.()}),this.dom.btnSettings.addEventListener("click",()=>{this.audio?.playUI("click"),this.toggleSettings()}),this.dom.btnRestart.addEventListener("click",()=>{this.audio?.playUI("click"),this.onRestart?.()}),this.dom.btnQuit.addEventListener("click",()=>{this.audio?.playUI("back"),this.onQuitToMenu?.()}),window.addEventListener("keydown",i=>{this._listening&&(i.preventDefault(),i.code!=="Escape"&&this._applyBind(this._listening,i.code),this._stopListening())},!0),window.addEventListener("mousedown",i=>{this._listening&&(i.preventDefault(),i.stopPropagation(),this._applyBind(this._listening,`Mouse${i.button}`),this._stopListening())},!0)}_applyBind(t,e){const i={...Mt.data.keybinds,[t]:e};Mt.set("keybinds",i);const n=this.el.querySelector(`.bind-key[data-action="${t}"]`);n&&(n.innerHTML=bu(e)),n&&(e==="ControlLeft"||e==="ControlRight")&&Mt.data.captureShortcuts!==!0?(n.classList.add("bind-risky"),n.title='The browser keeps Ctrl shortcuts. Held with W this closes the tab, and a page cannot prevent it. Turn on "Hold browser shortcuts" to take them.'):n&&(n.classList.remove("bind-risky"),n.title=""),this.audio?.playUI("click")}_stopListening(){this.el.querySelector(".bind-key.listening")?.classList.remove("listening"),this._listening=null}_buildSettings(){const t=this.dom.panelBody;t.innerHTML="",t.appendChild(this._group("Display",[this._slider("Quality",1,10,1,Mt.qualityLevel,s=>this._set("quality",s),s=>`${s}${s===4?" (ultra)":""}${s>=5?` · ${tc[s-1].renderScale}x`:""}`,"4 is the old ultra. 5 and up render above your display resolution and downsample, which is the biggest single lever on how sharp a frame looks — and the most expensive: 8 is 2.6x the pixels of native, 10 is 4x. From 6 the material textures bake at double density and anisotropic filtering doubles; those are set when the page loads, so reload after crossing 6. Watch the frame counter and come back down if it drops — nothing above 6 is free."),this._slider("Field of view",70,110,1,Mt.data.fov,s=>this._set("fov",s),s=>`${s}°`),this._slider("Viewmodel FOV",50,80,1,Mt.data.viewmodelFov,s=>this._set("viewmodelFov",s),s=>`${s}°`),this._toggle("Dynamic resolution",Mt.data.dynamicResolution,s=>this._set("dynamicResolution",s),"Trades resolution to hold the frame rate. Each change costs one aliased frame, so turn it off if you would rather have a stable image than a stable frame time."),this._toggle("Show performance",Mt.data.showFps,s=>this._set("showFps",s))])),t.appendChild(this._group("Image",[this._segment("Motion blur",["off","low","high"],Mt.data.overrides?.motionBlur??Mt.preset.motionBlur,s=>this._setOverride("motionBlur",s)),this._slider("Film grain",0,1,.05,Mt.data.filmGrain,s=>this._set("filmGrain",s),Aa),this._slider("Chromatic aberration",0,1,.05,Mt.data.chromaticAberration,s=>this._set("chromaticAberration",s),Aa),this._slider("Vignette",0,1,.05,Mt.data.vignette,s=>this._set("vignette",s),Aa),this._slider("Camera shake",0,1.5,.05,Mt.data.cameraShake,s=>this._set("cameraShake",s),Aa)])),t.appendChild(this._group("Input",[this._slider("Sensitivity",.1,3,.05,Mt.data.sensitivity,s=>this._set("sensitivity",s),s=>s.toFixed(2)),this._slider("ADS multiplier",.2,1.4,.02,Mt.data.adsMultiplier,s=>this._set("adsMultiplier",s),s=>s.toFixed(2)),this._toggle("Invert vertical",Mt.data.invertY,s=>this._set("invertY",s)),this._toggle("Hold browser shortcuts",Mt.data.captureShortcuts===!0,s=>this._setCaptureShortcuts(s),"Goes fullscreen on deploy so the game can keep Ctrl+W, Ctrl+T and Ctrl+N instead of the browser. This is the only way to bind crouch to Ctrl safely — turning it on offers to do that for you. Escape and F11 always stay yours."),this._toggle("Raw mouse input",Mt.data.rawInput===!0,s=>this._set("rawInput",s),"Skips pointer acceleration for aiming. Leave off if the cursor ever gets stuck in a region of the screen after a match.")])),t.appendChild(this._group("Audio",[this._slider("Master volume",0,1,.05,Mt.data.masterVolume,s=>this._set("masterVolume",s),Aa)])),t.appendChild(this._group("Match",[this._segment("AI difficulty",["recruit","regular","veteran","elite"],Mt.data.difficulty,s=>this._set("difficulty",s),"Sets how fast they react and how straight they shoot, and how hard they work the map: veterans and elites flank, use cover and stay suppressed. Applies from the next deploy."),this._segment("Time of day",["dawn","morning","day","sunset","night"],Mt.data.timeOfDay??"day",s=>this._set("timeOfDay",s),"Changes the light, not just the sky. Takes effect immediately.")]));const e=document.createElement("div");e.className="group";const i=document.createElement("div");i.className="group-title",i.textContent="Controls",e.appendChild(i);for(const[s,r]of Ly){const o=document.createElement("div");o.className="bind-row";const l=document.createElement("label");l.textContent=r;const c=document.createElement("button");c.className="bind-key",c.dataset.action=s,c.innerHTML=bu(Mt.data.keybinds[s]),c.addEventListener("click",h=>{h.stopPropagation(),this._stopListening(),this._listening=s,c.classList.add("listening"),c.textContent="PRESS…",this.audio?.playUI("hover")}),o.append(l,c),e.appendChild(o)}t.appendChild(e);const n=document.createElement("button");n.className="menu-item",n.style.fontSize="13px",n.innerHTML="<span>Reset all settings</span>",n.addEventListener("click",()=>{Mt.reset(),this._buildSettings(),this.onSettingChanged?.("*"),this.audio?.playUI("back")}),t.appendChild(n)}_set(t,e){Mt.set(t,e),this.onSettingChanged?.(t,e),this.audio?.playUI("click")}_setOverride(t,e){Mt.set("overrides",{...Mt.data.overrides,[t]:e}),this.onSettingChanged?.("quality",e),this.audio?.playUI("click")}_setCaptureShortcuts(t){this._set("captureShortcuts",t);const e=Mt.data.keybinds.crouch;t&&e==="KeyC"?this._applyBind("crouch","ControlLeft"):!t&&(e==="ControlLeft"||e==="ControlRight")&&this._applyBind("crouch","KeyC")}_group(t,e){const i=document.createElement("div");i.className="group";const n=document.createElement("div");n.className="group-title",n.textContent=t,i.appendChild(n);for(const s of e)i.appendChild(s);return i}_row(t){const e=document.createElement("div");e.className="setting";const i=document.createElement("label");i.textContent=t;const n=document.createElement("div");return n.className="control",e.append(i,n),{row:e,control:n}}_slider(t,e,i,n,s,r,o=c=>String(c),l=""){const{row:c,control:h}=this._row(t);if(l){const g=document.createElement("span");g.className="setting-hint",g.textContent=l,c.querySelector("label").appendChild(g)}const u=document.createElement("input");u.type="range",u.min=e,u.max=i,u.step=n,u.value=s;const d=document.createElement("span");return d.className="readout",d.textContent=o(s),u.addEventListener("input",()=>{const g=parseFloat(u.value);d.textContent=o(g),r(g)}),h.append(u,d),c}_toggle(t,e,i,n=""){const{row:s,control:r}=this._row(t);if(n){const l=document.createElement("span");l.className="setting-hint",l.textContent=n,s.querySelector("label").appendChild(l)}const o=document.createElement("div");return o.className=`toggle${e?" on":""}`,o.addEventListener("click",()=>{const l=!o.classList.contains("on");o.classList.toggle("on",l),i(l)}),r.append(o),s}_segment(t,e,i,n,s=""){const{row:r,control:o}=this._row(t);if(s){const c=document.createElement("span");c.className="setting-hint",c.textContent=s,r.querySelector("label").appendChild(c)}const l=document.createElement("div");l.className="seg";for(const c of e){const h=document.createElement("button");h.textContent=c,h.className=c===i?"on":"",h.addEventListener("click",()=>{for(const u of l.children)u.className="";h.className="on",n(c)}),l.appendChild(h)}return o.append(l),r}showStart(){this.mode="start",this.el.classList.add("show"),this.dom.eyebrow.textContent="Team Deathmatch — Suq Al-Rimal",this.dom.title.textContent="DUST CORRIDOR",this.dom.sub.innerHTML="A market district at midday. Two fireteams, one street, no respawn timer worth waiting out.<br>Everything you are about to see — terrain, buildings, weapon, sky and every sound — is generated at runtime.",this.dom.btnPrimary.querySelector("span").textContent="Deploy",this.dom.btnPrimary.querySelector(".hint").textContent="ENTER",this.dom.btnRestart.style.display="none",this.dom.btnQuit.style.display="none",this.hideBoard(),this.hideLockPrompt()}showPause(){this.mode="pause",this.el.classList.add("show"),this.dom.eyebrow.textContent="Match paused",this.dom.title.textContent="STAND BY",this.dom.sub.textContent="The match is still running in the background. Take your time.",this.dom.btnPrimary.querySelector("span").textContent="Resume",this.dom.btnPrimary.querySelector(".hint").textContent="ENTER",this.dom.btnRestart.style.display="",this.dom.btnQuit.style.display="",this.dom.btnQuit.querySelector(".hint").textContent="Q"}hide(){this.el.classList.remove("show"),this.settingsOpen=!1,this.dom.panel.classList.remove("show"),this._stopListening()}get visible(){return this.el.classList.contains("show")}toggleSettings(t){this.settingsOpen=t!==void 0?t:!this.settingsOpen,this.dom.panel.classList.toggle("show",this.settingsOpen),this.settingsOpen||this._stopListening()}showLockPrompt(){this.lockPrompt.classList.add("show")}hideLockPrompt(){this.lockPrompt.classList.remove("show")}showBoard({won:t,scoreA:e,scoreB:i,rows:n,reason:s}){this.board.innerHTML=`
      <div class="board">
        <div class="result ${t?"win":"loss"}">${t?"Victory":"Defeat"}</div>
        <div class="final">${e} eliminated &nbsp;·&nbsp; ${i} lost &nbsp;·&nbsp; ${s}</div>
        <table>
          <thead>
            <tr><th>Operator</th><th>Kills</th><th>Deaths</th><th>K/D</th><th>Headshots</th><th>Accuracy</th></tr>
          </thead>
          <tbody>
            ${n.map(r=>`
              <tr class="${r.self?"self ":""}team-${r.team.toLowerCase()}">
                <td>${r.name}</td>
                <td>${r.kills}</td>
                <td>${r.deaths}</td>
                <td>${(r.kills/Math.max(1,r.deaths)).toFixed(2)}</td>
                <td>${r.headshots}</td>
                <td>${r.accuracy===null?"—":`${Math.round(r.accuracy*100)}%`}</td>
              </tr>`).join("")}
          </tbody>
        </table>
        <div class="actions">
          <button id="board-again">Play again</button>
          <button id="board-menu">Main menu</button>
        </div>
      </div>`,this.board.classList.add("show"),this.board.querySelector("#board-again").addEventListener("click",()=>{this.audio?.playUI("click"),this.onRestart?.()}),this.board.querySelector("#board-menu").addEventListener("click",()=>{this.audio?.playUI("back"),this.onQuitToMenu?.()})}hideBoard(){this.board.classList.remove("show")}get boardVisible(){return this.board.classList.contains("show")}}function Aa(a){return`${Math.round(a*100)}%`}const Iy=`
<div class="frame"></div>
<div class="menu-inner">
  <div class="title-block">
    <div class="eyebrow"></div>
    <h1>DUST CORRIDOR</h1>
    <div class="sub"></div>
  </div>
  <div class="menu-list">
    <button class="menu-item" id="mi-primary"><span>Deploy</span><span class="hint">ENTER</span></button>
    <button class="menu-item" id="mi-settings"><span>Settings</span><span class="hint">O</span></button>
    <button class="menu-item" id="mi-restart"><span>Restart match</span><span class="hint"></span></button>
    <button class="menu-item" id="mi-quit"><span>Abandon match</span><span class="hint"></span></button>
  </div>
</div>
<div class="menu-footer">
  <div><kbd>WASD</kbd> move &nbsp; <kbd>SHIFT</kbd> sprint &nbsp; <kbd>C</kbd> crouch, or slide out of a sprint &nbsp; <kbd>SPACE</kbd> jump</div>
  <div><kbd>Q</kbd> <kbd>E</kbd> peek round corners &nbsp; <kbd>LMB</kbd> fire &nbsp; <kbd>RMB</kbd> aim</div>
  <div><kbd>B</kbd> grenade, hold <kbd>LMB</kbd> for range &nbsp; <kbd>R</kbd> reload &nbsp; <kbd>V</kbd> fire mode &nbsp; <kbd>F</kbd> inspect</div>
  <div><kbd>TAB</kbd> scoreboard &nbsp; <kbd>ESC</kbd> pause, <kbd>ENTER</kbd> resume, <kbd>Q</kbd> abandon</div>
  <div class="build-stamp"></div>
</div>
<div class="panel">
  <h2>Settings</h2>
  <div class="body"></div>
</div>
`;class Fy{constructor(t){this.timings=[],this._last=performance.now(),this._pending=null,this.el=document.createElement("div"),this.el.id="loading",this.el.innerHTML=`
      <div class="brand">Dust Corridor</div>
      <div class="bar"><div class="fill"></div></div>
      <div class="stage">Initialising</div>`,t.appendChild(this.el),this.fill=this.el.querySelector(".fill"),this.stageEl=this.el.querySelector(".stage")}async step(t,e){const i=performance.now();this._pending&&this.timings.push({stage:this._pending,ms:Math.round(i-this._last)}),this._pending=e,this._last=i,this.fill.style.width=`${Math.round(t*100)}%`,this.stageEl.textContent=e,await new Promise(n=>requestAnimationFrame(()=>requestAnimationFrame(n))),this._last=performance.now()}async tick(t,e){this.fill.style.width=`${Math.round(t*100)}%`,e&&(this.stageEl.textContent=e),await new Promise(i=>requestAnimationFrame(i))}done(){this._pending&&(this.timings.push({stage:this._pending,ms:Math.round(performance.now()-this._last)}),this._pending=null),this.el.classList.add("done"),setTimeout(()=>this.el.remove(),600)}}function od(a,t,e,i=""){const n=document.createElement("div");return n.id="fatal",n.innerHTML=`
    <div class="fatal-title"></div>
    <div class="fatal-detail"></div>
    <div class="fatal-hint"></div>`,n.querySelector(".fatal-title").textContent=t,n.querySelector(".fatal-detail").textContent=e,n.querySelector(".fatal-hint").textContent=i,a.appendChild(n),n}const Me={PLAYER:"PLAYER",SISTER_AI:"SISTER_AI"};class Uy{constructor(t){this.raw=t,this.mode=Me.PLAYER,this.sister=null,this.onModeChange=null,this._aiHeld=new Set,this._aiEdges=new Set,this._aiLook={x:0,y:0},this._look={x:0,y:0},this._lockChange=null,this._lockError=null,t.onPointerLockChange=e=>{e?this._lockChange?.(!0):this.mode===Me.PLAYER&&this._lockChange?.(!1)},t.onPointerLockError=()=>{this.mode===Me.PLAYER&&this._lockError?.()}}get onPointerLockChange(){return this._lockChange}set onPointerLockChange(t){this._lockChange=t}get onPointerLockError(){return this._lockError}set onPointerLockError(t){this._lockError=t}get locked(){return this.raw.locked}get enabled(){return this.raw.enabled}set enabled(t){this.raw.enabled=!!t}get discardedLookSpikes(){return this.raw.discardedLookSpikes}get aiControlled(){return this.mode===Me.SISTER_AI}requestLock(){return this.aiControlled?Promise.resolve():this.raw.requestLock()}releaseLock(){this.raw.releaseLock()}inject(t){this.raw.inject(t)}setMode(t,{gesture:e=!1}={}){if(t!==Me.PLAYER&&t!==Me.SISTER_AI||t===this.mode)return!1;const i=this.mode;return this.mode=t,this._disarmAll(),this.raw.enabled=!this.aiControlled,this.aiControlled||this.raw.keys?.clear(),this.sister?.onControlTaken(this.aiControlled),this.onModeChange?.(t,i,e),!0}toggleMode(t){return this.setMode(this.aiControlled?Me.PLAYER:Me.SISTER_AI,t)}_disarmAll(){this._aiHeld.clear(),this._aiEdges.clear(),this._aiLook.x=0,this._aiLook.y=0,this._look.x=0,this._look.y=0;const t=this.raw;t.keys?.clear(),t.pressedThisFrame?.clear(),t.releasedThisFrame?.clear(),t.buttons=[!1,!1,!1],t.buttonsPressed=[!1,!1,!1],t.mouseDX=0,t.mouseDY=0,t.wheel=0,t.locked&&t.releaseLock()}action(t){return this.aiControlled?this._aiHeld.has(t):this.raw.action(t)}actionPressed(t){return this.aiControlled?this._aiEdges.has(t)?(this._aiEdges.delete(t),!0):!1:this.raw.actionPressed(t)}consumeLook(){return this.aiControlled?(this._look.x=this._aiLook.x,this._look.y=this._aiLook.y,this._aiLook.x=0,this._aiLook.y=0,this._look):this.raw.consumeLook()}endFrame(){this.raw.endFrame(),this._aiEdges.clear()}aiBeginStep(){this._aiHeld.clear()}aiHold(t){this._aiHeld.add(t)}aiPress(t){this._aiEdges.add(t)}aiLookBy(t,e){this._aiLook.x+=t,this._aiLook.y+=e}aiPendingLook(){return this._aiLook}aiSnapshot(){return[...this._aiHeld]}}const me={EXPLORE:"explore",INVESTIGATE:"investigate",ENGAGE:"engage",COVER:"cover",RELOAD:"reload"},By={turnRate:5.6,pitchRate:4,sprintChase:24,fovCos:Math.cos(1.15),sightRange:90,reaction:.3,fireTolerance:.075,aimJitter:.02,jitterRate:2.1,settleTime:1.6,burst:[3,6],burstGap:[.34,.62],reloadAt:7,lowHealth:45,engageBand:[8,22],strafeEvery:[1.1,2.3]},Ny=.5,Tu=1.3,Oy=.6,Eu=.22,ky={COVER:4,ADVANCE:4,HOLD:2,RELOAD:1.2,LOOK_LEFT:1.4,LOOK_RIGHT:1.4,LOOK_BACK:1.8};class zy{constructor({bus:t,player:e,weapon:i,world:n,nav:s,director:r,rng:o,profile:l={}}){this.bus=t,this.player=e,this.weapon=i,this.world=n,this.nav=s,this.director=r,this.rng=o,this.profile={...By,...l},this.active=!1,this.state=me.EXPLORE,this.stateTime=0,this.target=null,this.targetVisible=!1,this.lastSeenPos=new y,this.lastSeenTime=99,this.trackTime=0,this.suspicion=new y,this.hasSuspicion=!1,this.suspicionTime=0,this._seenDamage=null,this._scanYaw=0,this._scanTimer=0,this.path=[],this.pathIndex=0,this.repathTimer=0,this._lastPos=new y,this._stuckTimer=0,this._stuckCount=0,this._wantsMove=!1,this.coverPoint=new y,this.hasCover=!1,this.peeking=!1,this.peekTimer=0,this._burstLeft=0,this._burstTimer=0,this._firing=!1,this._reloadPoll=0,this._aimNoisePhase=o.next()*100,this._desired={yaw:0,pitch:0},this._adsHeld=!1,this._strafeDir=o.next()<.5?-1:1,this._strafeTimer=0,this.intent=null,this.resetPrompts(),this.onFeedback=null,this._hit=new Xi,this._eye=new y}onControlTaken(t){this._promptScan=null,this._coverReport=null,this._reloadReport=null,this._scanTimer=0,this.active=t,t?(this._lastPos.copy(this.player.position),this._stuckTimer=0,this._stuckCount=0,this.path.length=0,this.pathIndex=0,this._firing=!1,this._burstLeft=0,this._burstTimer=0,this.target=null,this.targetVisible=!1,this.trackTime=0,this.hasSuspicion=!1,this.hasCover=!1,this.state=me.EXPLORE,this.stateTime=0,this.intent=null):(this._firing=!1,this.path.length=0)}update(t){if(!this.active)return;const e=this.bus;if(e.aiBeginStep(),this._promptClock+=t,this.stateTime+=t,this.trackTime=Math.max(0,this.trackTime),this._tickIntent(t),!this.player.alive){this._promptScan=null,this._coverReport=null,this._reloadReport=null,this._deadTimer=(this._deadTimer??0)+t,this._deadTimer>.35&&(this._deadTimer=0,e.aiPress("jump")),this._firing=!1;return}this._readDamage(),this._sense(t),this._updatePromptReports(t),this._think(t),this._aim(t),this._move(t),this._shoot(t)}_eyePoint(t){const e=this.player;return t.copy(e.position),t.y+=e.crouched?.86:1.62,t}_readDamage(){const t=this.player.lastDamage;if(!t||t===this._seenDamage)return;this._seenDamage=t,this._lastHitAt=this._promptClock;const e=t.source;e?.position&&(this.suspicion.copy(e.position),this.hasSuspicion=!0,this.suspicionTime=0,this._scanYaw=cs(e.position.x-this.player.position.x,e.position.z-this.player.position.z),this._scanTimer=1.2)}_sense(t){const e=this.player,i=this._eyePoint(this._eye);let n=null,s=-1/0;for(const r of this.director.characters){if(!r.alive||r.team===e.team)continue;const o=this._aimPointFor(r,ta);if(!this._canSee(i,o))continue;const l=e.position.distanceTo(r.position),c=this._centrality(r.position),h=100-l*.8+c*24+(r===this.target?18:0);h>s&&(s=h,n=r)}n?(n!==this.target&&(this.trackTime=0),this.target=n,this.targetVisible=!0,this.lastSeenPos.copy(n.position),this.lastSeenTime=0,this.trackTime+=t,this.hasSuspicion=!1):(this.targetVisible=!1,this.lastSeenTime+=t,this.trackTime=Math.max(0,this.trackTime-t*1.5),this.lastSeenTime>6&&(this.target=null)),this.suspicionTime+=t}_aimPointFor(t,e){return t.getEyePosition(e),e.y-=.26,e}_canSee(t,e){Pe.subVectors(e,t);const i=Pe.length();return i>this.profile.sightRange||i<.001||(Pe.multiplyScalar(1/i),this._centrality(e)<this.profile.fovCos)?!1:!this.world.bvh.raycast(t,Pe,i-.3,this._hit).hit}_centrality(t){const e=this.player.yaw,i=t.x-this.player.position.x,n=t.z-this.player.position.z,s=Math.hypot(i,n)||1e-4;return i/s*-Math.sin(e)+n/s*-Math.cos(e)}_think(t){const e=this.player,i=this.intent;if(i&&i.kind==="COVER"){this._enter(me.COVER);return}if(i&&i.kind==="HOLD"){this._setStateIfChanged(me.ENGAGE);return}if(i&&i.kind==="RELOAD"&&this._pollReload(t,!0),this._needsReload()){this._setStateIfChanged(me.RELOAD),this._pollReload(t,!0);return}if(e.health<this.profile.lowHealth&&this.target&&this.state!==me.COVER){this._enter(me.COVER);return}if(this.targetVisible&&this.target){this._setStateIfChanged(me.ENGAGE);return}if(this.hasSuspicion&&this.suspicionTime<12){this._setStateIfChanged(me.INVESTIGATE);return}this.state===me.COVER&&this.stateTime<3.2||this._setStateIfChanged(me.EXPLORE)}_setStateIfChanged(t){this.state!==t&&(this.state=t,this.stateTime=0,this.path.length=0,this.pathIndex=0,this.repathTimer=0,t!==me.COVER&&(this.hasCover=!1))}_enter(t){this._setStateIfChanged(t)}_needsReload(){const t=this.weapon;return t.reloading||t.ammo<=0?!0:!this.targetVisible&&t.ammo<=this.profile.reloadAt}_pollReload(t,e){this._reloadPoll-=t,!(!e||this._reloadPoll>0)&&(this._reloadPoll=Ny,this.bus.aiPress("reload"))}_aim(t){const e=this.player,i=this.profile,n=this._solveAim(t),s=this.bus.aiPendingLook?.()??{x:0,y:0},r=e.yaw-s.x,o=e.pitch-s.y;let l=jr(n.yaw-r),c=n.pitch-o;const h=i.turnRate*t,u=i.pitchRate*t;l=Ht.clamp(l,-h,h),c=Ht.clamp(c,-u,u),this.bus.aiLookBy(-l,-c);const d=this.state===me.ENGAGE&&this.targetVisible&&this.target.position.distanceTo(e.position)>12;d&&Math.abs(l)<.05?this._adsHeld=!0:(!d||Math.abs(l)>.12)&&(this._adsHeld=!1),this._adsHeld&&this.bus.aiHold("aim")}_solveAim(t){const e=this.player;let i=e.yaw,n=e.pitch;if(this._promptScan&&this._scanTimer>0&&!this._promptScan.locked)i=this._scanYaw,n=0;else if(this.target&&this.targetVisible){const o=this._aimPointFor(this.target,ta);Pe.subVectors(o,this._eyePoint(this._eye));const l=Pe.length()||1e-4;i=cs(Pe.x,Pe.z),n=Math.asin(Ht.clamp(Pe.y/l,-1,1))}else if(this._scanTimer>0)i=this._scanYaw,n=0;else if(this.hasSuspicion)Pe.subVectors(this.suspicion,e.position),i=cs(Pe.x,Pe.z),n=0;else if(this.path.length&&this.pathIndex<this.path.length){const o=this.path[this.pathIndex];i=cs(o.x-e.position.x,o.z-e.position.z),n=0}this._aimNoisePhase+=t*this.profile.jitterRate;const s=1/(1+this.trackTime*this.profile.settleTime),r=this.profile.aimJitter*(.35+s);return i+=Math.sin(this._aimNoisePhase*2.7)*r,n+=Math.sin(this._aimNoisePhase*3.9+1.3)*r*.6,this._desired={yaw:i,pitch:n}}_move(t){const e=this.bus;this._wantsMove=!1,yi.set(0,0,0);let i=!1;switch(this.state){case me.ENGAGE:this._moveEngage(t);break;case me.COVER:this._moveCover(t);break;case me.RELOAD:this._moveHold();break;case me.INVESTIGATE:this._moveInvestigate(t);break;default:this._moveExplore(t);break}if(this.intent?.kind==="HOLD"&&yi.set(0,0,0),this.state===me.COVER&&this.hasCover&&this._atCover()&&yi.set(0,0,0),yi.lengthSq()>1e-6){this._wantsMove=!0,this._toLocalKeys(yi.x,yi.z);const n=this._pathRemaining();i=this.state===me.COVER?n>6:(this.state===me.EXPLORE||this.state===me.INVESTIGATE)&&n>this.profile.sprintChase,i&&e.aiHold("sprint")}this.state===me.COVER&&this._atCover()&&!this.peeking&&e.aiHold("crouch"),this._unstick(t)}_moveExplore(t){if(this.repathTimer-=t,!this.path.length||this.pathIndex>=this.path.length||this.repathTimer<=0){const e=this.nav.randomPoint(this.rng,Cu,this.player.position,16);e&&this._repath(e),this.repathTimer=Tu+this.rng.next()*1.4}this._followPath()}_moveInvestigate(t){if(this.repathTimer-=t,this.player.position.distanceTo(this.suspicion)<3.2){this.hasSuspicion=!1,this._setStateIfChanged(me.EXPLORE);return}(!this.path.length||this.pathIndex>=this.path.length||this.repathTimer<=0)&&(this._repath(this.suspicion),this.repathTimer=Tu),this._followPath()}_moveEngage(t){const e=this.target;if(!e)return;Pe.subVectors(e.position,this.player.position),Pe.y=0;const i=Pe.length()||1e-4;Pe.multiplyScalar(1/i),Nl.set(-Pe.z,0,Pe.x).multiplyScalar(this._strafeDir);const[n,s]=this.profile.engageBand,r=i>s?.8:i<n?-.8:0;yi.copy(Nl).multiplyScalar(.9).addScaledVector(Pe,r),yi.lengthSq()>1e-6&&yi.normalize(),ta.copy(this.player.position).addScaledVector(Nl,1.6),this.nav.isWalkableAt(ta.x,ta.z)||(this._strafeDir*=-1,yi.multiplyScalar(-1)),this._strafeTimer-=t,this._strafeTimer<=0&&(this._strafeTimer=this.profile.strafeEvery[0]+this.rng.next()*(this.profile.strafeEvery[1]-this.profile.strafeEvery[0]),this.rng.next()<.45&&(this._strafeDir*=-1))}_moveCover(t){if(!this.hasCover){const e=this.target?this.target.position:this.hasSuspicion?this.suspicion:null,i=e?this.nav.findCover(this.player.position,e,18,this.rng,Cu):null;if(i)this.coverPoint.copy(i),this.hasCover=!0,this._repath(i);else if(e){Pe.subVectors(this.player.position,e),Pe.y=0,Pe.lengthSq()>1e-6&&yi.copy(Pe).normalize();return}else{this._setStateIfChanged(me.EXPLORE);return}}if(this._atCover()){this.peekTimer-=t,this.peekTimer<=0&&(this.peeking=!this.peeking,this.peekTimer=this.peeking?1+this.rng.next()*1.2:.8+this.rng.next()*1.4),this.player.health>this.profile.lowHealth+25&&this.stateTime>4.5&&(this.hasCover=!1,this._setStateIfChanged(me.ENGAGE));return}(!this.path.length||this.pathIndex>=this.path.length)&&this._repath(this.coverPoint),this._followPath()}_moveHold(){yi.set(0,0,0)}_atCover(){return this.player.position.distanceTo(this.coverPoint)<1.3}_repath(t){const e=this.nav.findPath(this.player.position.x,this.player.position.z,t.x,t.z,this.path);this.pathIndex=0,e||(this.path.length=0)}_followPath(){if(!this.path.length||this.pathIndex>=this.path.length)return;const t=this.path[this.pathIndex],e=t.x-this.player.position.x,i=t.z-this.player.position.z,n=e*e+i*i,s=this.pathIndex===this.path.length-1?.7:1;if(n<s*s){this.pathIndex++;return}const r=1/Math.sqrt(n);yi.set(e*r,0,i*r)}_pathRemaining(){if(!this.path.length||this.pathIndex>=this.path.length)return 0;const t=this.path[this.path.length-1];return this.player.position.distanceTo(t)}_toLocalKeys(t,e){const i=this.player.yaw,n=-Math.sin(i),s=-Math.cos(i),r=Math.cos(i),o=-Math.sin(i),l=t*n+e*s,c=t*r+e*o,h=.38;l>h?this.bus.aiHold("forward"):l<-h&&this.bus.aiHold("back"),c>h?this.bus.aiHold("right"):c<-h&&this.bus.aiHold("left")}_unstick(t){if(this._stuckTimer+=t,this._stuckTimer<Oy)return;const e=this.player.position.distanceTo(this._lastPos);this._wantsMove&&e<Eu?(this._stuckCount++,this.path.length=0,this.pathIndex=0,this._strafeDir*=-1,this.repathTimer=0,this._stuckCount>=3&&(this.bus.aiPress("jump"),this._stuckCount=0)):e>Eu&&(this._stuckCount=0),this._lastPos.copy(this.player.position),this._stuckTimer=0}_shoot(t){const e=this.profile,i=this.weapon;if(!((this.state===me.ENGAGE||this.state===me.COVER&&this.peeking)&&this.targetVisible&&this.target&&!i.reloading&&i.ammo>0)){this._firing=!1,this._burstLeft=0,this._burstTimer=0;return}if(this.trackTime<e.reaction)return;const s=this.target;if(Math.abs(jr(cs(s.position.x-this.player.position.x,s.position.z-this.player.position.z)-this.player.yaw))>e.fireTolerance){this._firing=!1;return}if(this._burstTimer-=t,this._burstTimer>0){this._firing&&this.bus.aiHold("fire");return}if(this._firing)this._firing=!1,this._burstTimer=Au(this.rng,e.burstGap);else{this._firing=!0;const o=Math.round(Au(this.rng,e.burst));this._burstTimer=o*.0857}this._firing&&this.bus.aiHold("fire")}issueIntent(t){this.promptStats.issued++;const e=this._promptClock-this._lastPromptAt<3;this._lastPromptAt=this._promptClock,this._rushed=e;const i=ky[t]*(e?.5:1);if(!i)return this._feedback("没听懂这句话。",!1);if(!this.active||!this.player.alive)return this._feedback("等我拿稳手机再说。",!1);if(t==="COVER"&&!this.target&&!this.hasSuspicion)return this._feedback("没看到敌人，先别躲。",!1);if(t==="ADVANCE"&&this.state===me.RELOAD)return this._feedback("正在换弹，等一下。",!1);if(t==="HOLD"&&(!this.hasSuspicion||!this.isExposedAhead()))return this._feedback("这里还好，先走着。",!1);if(t==="LOOK_BACK"&&!this.perceivedBehind())return this._feedback("后面没听到动静。",!1);if(t==="LOOK_LEFT"||t==="LOOK_RIGHT"||t==="LOOK_BACK"){const n=t==="LOOK_LEFT"?1:t==="LOOK_RIGHT"?-1:0;return this._promptScan={kind:t,yaw:this.player.yaw,side:n,locked:null,found:!1},this.targetVisible&&this.target&&this._inScanDirection(this.target.position)&&(this._promptScan.locked=this.target),this._scanYaw=this.player.yaw+(n?n*.9:Math.PI),this._scanTimer=i,this.intent={kind:t,ttl:i},this._feedback(t==="LOOK_LEFT"?"好，我看左边。":t==="LOOK_RIGHT"?"好，我看右边。":"好，我看后面。",!0)}if(t==="RELOAD"){const n=this.weapon;return n.reloading?this._feedback("已经在换了。",!1):n.ammo>=n.spec.magSize?this._feedback("弹匣是满的。",!1):n.reserve<=0?this._feedback("没有备弹了。",!1):(this.intent={kind:t,ttl:i},this._reloadReport={ammo:n.ammo,started:!1,ttl:5},this._feedback("好，换弹。",!0))}return this.intent={kind:t,ttl:i},t==="COVER"?(this._coverReport={ttl:3,quiet:0,low:this.player.health/this.player.maxHealth<.3,threatened:this.targetVisible||this.hasSuspicion&&this.suspicionTime<3},this._feedback("好，找掩体。",!0)):t==="ADVANCE"?(this.path.length=0,this.repathTimer=0,this._feedback("好，往前走。",!0)):this._feedback("好。",!0)}_tickIntent(t){this._scanTimer=Math.max(0,this._scanTimer-t),this.intent&&(this.intent.ttl-=t,this.intent.ttl<=0&&(this.intent=null))}_feedback(t,e,{complete:i=!1,important:n=!1,savedHer:s=!1}={}){return i||(this.promptStats[e?"accepted":"refused"]++,this._rushed&&(t="慢点说。"+t)),this.onFeedback?.(t,e,{complete:i,important:n,savedHer:s}),{ok:e,text:t}}resetPrompts(){this.intent=null,this._scanTimer=0,this.promptStats={issued:0,accepted:0,refused:0,savedHer:0},this._promptClock=0,this._lastPromptAt=-1/0,this._rushed=!1,this._promptScan=null,this._coverReport=null,this._reloadReport=null,this._lastReloadReply=-1/0,this._lastHitAt=-1/0}_inScanDirection(t){const e=this._promptScan;if(!e)return!1;const i=jr(cs(t.x-this.player.position.x,t.z-this.player.position.z)-e.yaw);return e.side?i*e.side>.15&&i*e.side<2.4:Math.abs(i)>2.1}_updatePromptReports(t){const e=this._promptScan;if(e&&(this.targetVisible&&this.target&&this._inScanDirection(this.target.position)&&(e.found=!0),this.hasSuspicion&&this.suspicionTime<3&&this._inScanDirection(this.suspicion)&&(e.found=!0),this._scanTimer<=0)){const s=e.kind==="LOOK_LEFT"?"左边":e.kind==="LOOK_RIGHT"?"右边":"后面",r=e.locked&&this.target===e.locked&&this.targetVisible;this._feedback(r?"我早看见了。":e.found?"真有，交给我。":`${s}没人啊。`,!0,{complete:!0,important:!!e.found&&!r}),this._promptScan=null}const i=this._coverReport;if(i){i.ttl-=t;const s=this._promptClock-this._lastHitAt<.6;i.quiet=!this.targetVisible&&!s?i.quiet+t:0,this.player.alive&&i.threatened&&i.ttl>=0&&i.quiet>=.6?(i.low&&this.promptStats.savedHer++,this._feedback("躲对了。",!0,{complete:!0,important:!0,savedHer:i.low}),this._coverReport=null):(i.ttl<=0||!this.player.alive)&&(this._coverReport=null)}const n=this._reloadReport;n&&(n.ttl-=t,n.started||=this.weapon.reloading,n.started&&!this.weapon.reloading&&this.weapon.ammo>n.ammo?(this._promptClock-this._lastReloadReply>8&&(this._feedback("换好了。",!0,{complete:!0}),this._lastReloadReply=this._promptClock),this._reloadReport=null):n.ttl<=0&&(this._reloadReport=null))}observe(t){if(this._promptClock+=t,!this.player.alive){this.target=null,this.targetVisible=!1,this.hasSuspicion=!1;return}this._readDamage(),this._sense(t)}perceivedBehind(){const t=this.targetVisible&&this.target?this.target.position:this.hasSuspicion&&this.suspicionTime<3?this.suspicion:null;if(!t)return!1;const e=jr(cs(t.x-this.player.position.x,t.z-this.player.position.z)-this.player.yaw);return Math.abs(e)>2.1}isExposedAhead(){const t=this.player,e=t.position.x-Math.sin(t.yaw)*3,i=t.position.z-Math.cos(t.yaw)*3;return this._wantsMove&&this.nav.isWalkableAt(e,i)&&!this.world.bvh.raycast(this._eyePoint(this._eye),ta.set(-Math.sin(t.yaw),0,-Math.cos(t.yaw)),6,this._hit).hit}contextualPrompt(){return this.player.alive?this.perceivedBehind()?{kind:"LOOK_BACK",label:"后面！"}:this.player.health/this.player.maxHealth<.3?{kind:"COVER",label:"回来！"}:this.hasSuspicion&&this.suspicionTime<3&&this.isExposedAhead()?{kind:"HOLD",label:"停！"}:null:null}snapshot(){const t=this.player;return{active:this.active,state:this.state,targetId:this.target?.id??null,visible:this.targetVisible,ammo:this.weapon.ammo,reserve:this.weapon.reserve,reloading:this.weapon.reloading,health:Math.round(t.health),alive:t.alive,position:{x:+t.position.x.toFixed(2),y:+t.position.y.toFixed(2),z:+t.position.z.toFixed(2)},stuck:this._stuckCount,intent:this.intent?.kind??null,held:this.bus.aiSnapshot()}}}function Au(a,[t,e]){return t+a.next()*(e-t)}function cs(a,t){return Math.atan2(-a,-t)}function jr(a){for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;return a}const Pe=new y,yi=new y,Nl=new y,Cu=new y,ta=new y,Vy=[{kind:"LOOK_LEFT",label:"左边有人"},{kind:"LOOK_RIGHT",label:"右边有人"},{kind:"COVER",label:"先躲一下"},{kind:"RELOAD",label:"子弹不多了"},{kind:"ADVANCE",label:"往前走"}],Hy=3.4;class Gy{constructor(t,{onPrompt:e}={}){this.onPrompt=e,this.context=null,this.visible=!1,this.el=document.createElement("div"),this.el.id="control-panel",this.el.className="cp",this.el.innerHTML=Wy,t.appendChild(this.el);const i=n=>this.el.querySelector(n);this.dom={prompts:i("#cp-prompts"),feedback:i("#cp-feedback"),needClick:i("#cp-need-click")};for(const[n,s]of[...Vy,{kind:"",label:"留意周围"}].entries()){const r=document.createElement("button");r.type="button",r.className="cp-chip",r.dataset.kind=s.kind,r.innerHTML=`<span>${s.label}</span><kbd>${n+1}</kbd>`,r.addEventListener("click",()=>{this.activate(n),r.blur()}),this.dom.prompts.appendChild(r)}this.chips=[...this.dom.prompts.querySelectorAll(".cp-chip")],this._feedbackTimer=0,this._needClick=!1,this.mode=null,this.setVisible(!1)}setVisible(t){this.visible=!!t,this.el.classList.toggle("show",!!t)}setMode(t){if(t===this.mode)return;this.mode=t;const e=t==="SISTER_AI";this.el.classList.toggle("ai",e);for(const[i,n]of this.chips.entries())n.disabled=!e||i===5&&!this.context;this.dom.prompts.classList.toggle("muted",!e)}setContext(t){if((t?.kind??null)===(this.context?.kind??null)&&(t?.label??null)===(this.context?.label??null))return;this.context=t;const e=this.chips[5];e.dataset.kind=t?.kind??"",e.querySelector("span").textContent=t?.label??"留意周围",e.disabled=this.mode!=="SISTER_AI"||!t,e.classList.toggle("contextual",!!t)}activate(t){const e=this.chips[t];return!this.visible||!e||e.disabled?!1:(this.onPrompt?.(e.dataset.kind,e.querySelector("span").textContent),!0)}handleKey(t){const e=/^Digit([1-6])$/.exec(t);return!!e&&this.activate(Number(e[1])-1)}flash(t,e){const i=this.chips.find(n=>n.dataset.kind===t)??this.chips[5];i===this.chips[5]&&(i.querySelector("span").textContent=e),this._flashChip?.classList.remove("calling"),i.classList.add("calling"),this._flashChip=i,this._flashTimer=1.5}say(t,e=!0){const i=this.dom.feedback;i.textContent=t,i.classList.toggle("bad",!e),i.classList.add("show"),this._feedbackTimer=Hy}setNeedClick(t){t!==this._needClick&&(this._needClick=t,this.dom.needClick.classList.toggle("show",t))}update(t){this._flashTimer>0&&(this._flashTimer-=t,this._flashTimer<=0&&this._flashChip?.classList.remove("calling")),!(this._feedbackTimer<=0)&&(this._feedbackTimer-=t,this._feedbackTimer<=0&&this.dom.feedback.classList.remove("show"))}}const Wy=`
  <div id="cp-need-click">点击画面接管</div>
  <div id="cp-prompts"></div>
  <div id="cp-feedback"></div>
`;class qy{constructor(t){this.el=document.createElement("div"),this.el.id="subtitle",this.el.innerHTML='<div class="speaker"></div><div class="line"></div>',t.appendChild(this.el),this.dom={speaker:this.el.querySelector(".speaker"),line:this.el.querySelector(".line")},this.text=""}show(t,e){e!==this.text&&(this.text=e,this.dom.speaker.textContent=t?`${t}：`:"",this.dom.line.textContent=e,this.el.classList.remove("show"),this.el.offsetWidth,this.el.classList.add("show"))}hide(){this.text="",this.el.classList.remove("show")}setVisible(t){this.el.classList.toggle("enabled",!!t),t||this.hide()}}const Ba=[{speaker:"朱里",text:"这关我打了好几遍了，你看着。",control:Me.SISTER_AI,hold:6},{speaker:"朱里",text:"看着就行，有情况就喊我。",hold:4},{speaker:"朱里",text:"左边那个，别急着冲。",hold:6.5},{speaker:"朱里",text:"等他们换弹再上。",hold:7},{speaker:"朱里",text:"你看，这样一枪一个。",hold:6.5},{speaker:"朱里",text:"这把枪后坐力大，点着打。",hold:7},{speaker:"朱里",text:"等一下，这关打完。",hold:4.5},{speaker:"和臣",text:"我？……行吧。",hold:2.5},{speaker:"朱里",text:"喏，给你。",control:Me.PLAYER,cg:"handover",hold:5.5},{speaker:"朱里",text:"我去看电视，你打。",hold:6},{speaker:"朱里",text:"别站中间，贴着墙走。",variant:a=>a.prompts?.refused>a.prompts?.accepted?"刚才喊得太急了。你自己打，记得贴着墙。":"刚才提醒得挺准。自己打也记得贴着墙。",hold:8},{speaker:"朱里",text:"打不过就躲，别硬顶。",variant:a=>a.prompts?.refused>a.prompts?.accepted?"慢慢来，看清楚再动。":"有情况我也喊你，别硬顶。",hold:8},{speaker:"妈妈",text:"——回家吃饭了！",until:a=>a.playerTime>a.dinnerAt||a.forceCall,minHold:3,freeze:!0},{speaker:"和臣",text:"……这就来。",hold:2.5},{speaker:"朱里",text:"我妈叫你了，手机给我吧。",hold:4}],Xy=[{speaker:"朱里",text:"那你先来，我在旁边看着。",control:Me.PLAYER,hold:5},{speaker:"朱里",text:"这把枪后坐力大，点着打。",hold:6},{speaker:"朱里",text:"别站中间，贴着墙走。",hold:8},{speaker:"和臣",text:"……你来试试。",hold:2.5},{speaker:"朱里",text:"给我，我打一会儿，你看。",control:Me.SISTER_AI,hold:5.5},{speaker:"朱里",text:"看着就行，有情况就喊我。",hold:4},{speaker:"朱里",text:"刚才冲早了。等他们换弹再上。",hold:7},{speaker:"朱里",text:"看，贴着这面墙就好打了。",hold:7},{speaker:"和臣",text:"……再打一会儿。",hold:2.5},{speaker:"朱里",text:"喏，再试试。",control:Me.PLAYER,cg:"handover",hold:5.5},{speaker:"朱里",text:"有情况我也喊你，别硬顶。",hold:8},...Ba.slice(Ba.findIndex(a=>a.speaker==="妈妈"))],Ky=[{id:"her-streak",when:a=>a.controlMode===Me.SISTER_AI&&a.herStreak>=3,lines:[{speaker:"和臣",text:"……三个了。"},{speaker:"朱里",text:"看见没，跟着我学。"}]},{id:"her-hurt",when:a=>a.controlMode===Me.SISTER_AI&&(a.herDeaths>0||a.hp<.3),lines:[{speaker:"和臣",text:"小心点。"},{speaker:"朱里",text:"知道啦，还撑得住。"}]},{id:"first-kill",when:a=>a.controlMode===Me.PLAYER&&a.kills>0,lines:[{speaker:"朱里",text:"不错啊。"},{speaker:"和臣",text:"……运气好。"}]},{id:"first-death",when:a=>a.controlMode===Me.PLAYER&&a.deaths>0,lines:[{speaker:"朱里",text:"又冲到中间去了吧。"},{speaker:"和臣",text:"……再来。"}]},{id:"low-hp",when:a=>a.controlMode===Me.PLAYER&&a.alive&&a.hp<.3,lines:[{speaker:"朱里",text:"血快没了，先缓一缓。"}]},{id:"empty",when:a=>a.controlMode===Me.PLAYER&&a.ammoEmpty,lines:[{speaker:"和臣",text:"……没子弹了。"}]}];class Yy{constructor({beats:t=Ba,reactions:e=Ky,onBeat:i=null,onEnd:n=null,onBetween:s=null}={}){this.beats=t,this.onBeat=i,this.onEnd=n,this.onBetween=s,this.index=-1,this.timer=0,this.phase="idle",this.running=!1,this.reactions=e,this.used=new Set,this.queue=[],this.reaction=null,this.reactionsEnabled=!0,this.clock=0,this.quiet=!1,this.currentBeat=null}start(t=this.beats){this.beats=t,this.index=-1,this.timer=0,this.phase="idle",this.running=!0,this.used.clear(),this.queue.length=0,this.reaction=null,this.reactionsEnabled=!0,this.clock=0,this.quiet=!1,this._advance()}stop(){this.running=!1,this.phase="idle",this.queue.length=0,this.reaction=null,this.reactionsEnabled=!1}enqueue(t,{key:e=null,mode:i=null,ttl:n=8}={}){return!this.running||!this.reactionsEnabled||this.beats[this.index]?.freeze||e&&this.queue.some(s=>s.key===e)||this.queue.length>=6?!1:(this.queue.push({lines:t,key:e,mode:i,expires:this.clock+n}),!0)}_collect(t){if(!(!this.reactionsEnabled||this.beats[this.index]?.freeze))for(const e of this.reactions)this.used.has(e.id)||!e.when(t)||this.enqueue(e.lines,{key:e.id,mode:t.controlMode,ttl:20})&&this.used.add(e.id)}_react(t){for(;this.queue.length;){const e=this.queue.shift();if(!(e.expires<this.clock||e.mode&&e.mode!==t.controlMode))return this.reaction={...e,index:0},this.phase="reacting",this._reactionLine(),!0}return!1}_reactionLine(){const t=this.reaction.lines[this.reaction.index];this.quiet=!1,this.timer=t.hold??2.2,this.onBeat?.(t,this.index)}update(t,e={}){if(!this.running)return;this.clock+=t,this._collect(e);const i=this.beats[this.index];if(!i)return;if(this.phase==="reacting"){if(this.timer-=t,this.timer>0)return;const s=this.beats[this.index+1];if(!e.forceCall&&!(s?.until&&s.until(e))&&++this.reaction.index<this.reaction.lines.length){this._reactionLine();return}if(this.reaction=null,s&&(!s.until||s.until(e))){this._advance(e);return}this.phase="between"}if(this.phase==="between"){const s=this.beats[this.index+1];if(s?.until&&s.until(e)){this._advance(e);return}if(this._react(e))return;if(s&&s.until&&!s.until(e)){this.quiet||(this.onBetween?.(i,s),this.quiet=!0);return}this._advance(e);return}if(this.timer-=t,this.timer>0)return;const n=this.beats[this.index+1];if(n?.until&&n.until(e)){this._advance(e);return}if(!this._react(e)){if(n&&n.until&&!n.until(e)){this.phase="between",this.timer=0,this.onBetween?.(i,n),this.quiet=!0;return}this._advance(e)}}requestAdvance(){if(!(!this.running||!this.beats[this.index])){if(this.phase==="between"){this._advance();return}this.timer=Math.min(this.timer,.4)}}skipTo(t){if(!this.running)return!1;for(let e=this.index+1;e<this.beats.length;e++)if(t(this.beats[e]))return this.queue.length=0,this.reaction=null,this.reactionsEnabled=!1,this.index=e-1,this._advance(),!0;return!1}_advance(t={}){if(this.index++,this.index>=this.beats.length){this.running=!1,this.phase="idle",this.onEnd?.();return}const e=this.beats[this.index];this.phase="holding",this.quiet=!1,e.freeze&&(this.queue.length=0,this.reactionsEnabled=!1),this.timer=e.until?e.minHold??2:e.hold??4,this.currentBeat=e.variant&&t.prompts?.issued?{...e,text:e.variant(t)}:e,this.onBeat?.(this.currentBeat,this.index)}snapshot(){const t=this.beats[this.index];return{running:this.running,phase:this.phase,index:this.index,total:this.beats.length,text:this.running?this.reaction?.lines[this.reaction.index]?.text??this.currentBeat?.text??null:null,control:t?.control??null}}}class $y{constructor(){this.reset()}reset(){this.playerKills=0,this.playerDeaths=0,this.herKills=0,this.herDeaths=0,this.herStreak=0,this.ammoEmpty=!1}recordKill(t,e){const i=e===Me.SISTER_AI;t.involvesPlayer==="killer"?i?(this.herKills++,this.herStreak++):this.playerKills++:t.involvesPlayer==="victim"&&(i?(this.herDeaths++,this.herStreak=0):this.playerDeaths++)}context(t,e,i,n){return i===Me.PLAYER&&t.alive&&e.ammo===0&&(this.ammoEmpty=!0),{kills:this.playerKills,deaths:this.playerDeaths,herKills:this.herKills,herDeaths:this.herDeaths,herStreak:this.herStreak,hp:t.health/t.maxHealth,alive:t.alive,ammoEmpty:this.ammoEmpty,controlMode:i,prompts:n}}result(t,e={}){return{winner:t.A===t.B?null:t.A>t.B?"A":"B",playerKills:this.playerKills,playerDeaths:this.playerDeaths,herKills:this.herKills,herDeaths:this.herDeaths,prompts:{issued:0,accepted:0,refused:0,savedHer:0,...e}}}}function Ru(a){return Math.atan2(Math.sin(a),Math.cos(a))}class jy{constructor(){this.reset()}reset(){this.cooldown=10,this.pending=null}update(t,{sister:e,player:i,story:n,panel:s,enabled:r}){if(!r||!i.alive){this.pending=null;return}if(this.cooldown-=t,this.pending){const v=this.pending;if(!v.started){n.clock>v.expires&&(this.pending=null);return}v.remaining-=t;const p=Ru(i.yaw-v.yaw),f=v.side?p*v.side>=.35:Math.abs(p)>=.7;(f||v.remaining<=0)&&(n.enqueue([{speaker:"朱里",text:f?"对，就是那儿。":"……算了，你自己打吧。"}],{key:"coach-reply",mode:"PLAYER",ttl:5}),this.pending=null);return}if(this.cooldown>0)return;const o=e.targetVisible&&e.target?e.target.position:e.hasSuspicion&&e.suspicionTime<3?e.suspicion:null;if(!o)return;const l=Ru(Math.atan2(-(o.x-i.position.x),-(o.z-i.position.z))-i.yaw);if(Math.abs(l)<.4)return;const c=Math.abs(l)>2.1,h=c?0:Math.sign(l),u=c?"LOOK_BACK":h>0?"LOOK_LEFT":"LOOK_RIGHT",d=c?"后面！":h>0?"左边！":"右边！",g={side:h,started:!1,remaining:1.5,yaw:i.yaw,expires:n.clock+8};this.pending=g,n.enqueue([{speaker:"朱里",text:d,onShow:()=>{this.pending===g&&(g.started=!0,g.yaw=i.yaw,s.flash(u,d))}}],{key:"coach-call",mode:"PLAYER",ttl:8})||(this.pending=null),this.cooldown=12}}class Zy{constructor(t,{onRestart:e}={}){this.onRestart=e,this.el=document.createElement("div"),this.el.id="outro",this.el.innerHTML=Jy,t.appendChild(this.el),this.dom={act:this.el.querySelector(".act"),title:this.el.querySelector(".title"),note:this.el.querySelector(".note"),restart:this.el.querySelector("button")},this.dom.restart.addEventListener("click",()=>{this.hide(),this.onRestart?.()})}show({act:t="第一幕",title:e="结束",note:i="手机上的那一局，到此为止。"}={}){this.dom.act.textContent=t,this.dom.title.textContent=e,this.dom.note.textContent=i,this.el.classList.add("show")}hide(){this.el.classList.remove("show")}get visible(){return this.el.classList.contains("show")}}const Jy=`
  <div class="inner">
    <div class="act">第一幕</div>
    <div class="title">结束</div>
    <div class="rule"></div>
    <div class="note"></div>
    <button type="button">重看这段</button>
  </div>
`,Pu={handover:"./cg/handover.jpg"},Qy=520;class t1{constructor(t){this.el=document.createElement("img"),this.el.id="cg-cut",this.el.alt="",this.el.decoding="async",t.appendChild(this.el),this._token=0,this._timer=0,this._resolve=null,this.visible=!1;for(const e of Object.values(Pu)){const i=new Image;i.src=e}}show(t,{hold:e=2400}={}){const i=Pu[t];if(!i)return Promise.resolve(!1);this._token++;const n=this._token;return clearTimeout(this._timer),this._settle(!1),this.el.src=i,this.el.classList.add("show"),this.visible=!0,new Promise(s=>{this._resolve=s,this._timer=setTimeout(()=>{n===this._token&&(this.el.classList.remove("show"),this.visible=!1,this._timer=setTimeout(()=>{n===this._token&&this._settle(!0)},Qy))},e)})}hide(){this._token++,clearTimeout(this._timer),this.el.classList.remove("show"),this.visible=!1,this._settle(!0)}_settle(t){const e=this._resolve;this._resolve=null,e?.(t)}}const e1=6;function i1(a,t,e,i,n){const s=new Uint8ClampedArray(i*n*4),r=t/i,o=e/n;for(let l=0;l<n;l++){const c=Math.floor((n-1-l)*o),h=Math.max(c+1,Math.floor((n-l)*o));for(let u=0;u<i;u++){const d=Math.floor(u*r),g=Math.max(d+1,Math.floor((u+1)*r));let m=0,v=0,p=0,f=0;for(let x=c;x<h;x++)for(let _=d;_<g;_++){const M=(x*t+_)*4;m+=a[M],v+=a[M+1],p+=a[M+2],f++}const S=(l*i+u)*4;s[S]=m/f,s[S+1]=v/f,s[S+2]=p/f,s[S+3]=255}}return{width:i,height:n,data:Array.from(s)}}function Lu(a,t){const e=a*Math.PI/360;return 2*Math.atan(Math.tan(e)/t)*180/Math.PI}function n1(a){const t=String(a);return/Disabled|BindToCurrentSequence|GPU process/i.test(t)?"The browser has switched off GPU access for this session, usually after a graphics driver reset. Fully quit the browser and reopen it — a reload will not bring it back.":/blocklist|blacklist|software/i.test(t)?'The browser is blocking hardware acceleration for this GPU. Enable "Use graphics acceleration when available" in the browser settings and restart it.':t?`Error creating WebGL context: ${t}`:""}const Du=1.1,s1=8,a1=55,r1=34,o1=.82,l1=.7,c1=1.07,h1=1/60,Zr=.1,u1=.6,d1=3,Iu={recruit:[.18,.38],regular:[.38,.62],veteran:[.58,.82],elite:[.78,.98]};class f1{constructor(t,e){this.canvas=t,this.uiRoot=e,this.state="loading",this.time=0,this.frameStats={fps:0,cpu:0,drawCalls:0,triangles:0},this.onFrame=null,this.embed=!1,this.onSegmentEnd=null,this.onSegmentStart=null,this._firstFramePending=!1,this._resizePending=!0,this._dynScale=Mt.preset.renderScale,this._dynCooldown=0,this._frameTimes=[],this._pendingHits=[]}async boot(){const t=new Fy(this.uiRoot);this.loading=t,await t.step(.04,"Creating context");let e="";this.canvas.addEventListener("webglcontextcreationerror",o=>{e=o.statusMessage||""},{once:!0});try{this.renderer=new $g({canvas:this.canvas,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1})}catch(o){throw new Error(n1(e)||o.message)}if(this._bindContextLoss(),this.renderer.setPixelRatio(1),this.renderer.autoClear=!0,this.renderer.setSize(window.innerWidth,window.innerHeight,!1),!this.renderer.capabilities.isWebGL2)throw new Error("WebGL2 is required.");this.quality=Mt.preset;const i=new URLSearchParams(location.search);i.has("nomb")&&(this.quality.motionBlur="off"),i.has("notaa")&&(this.quality.taa=!1),i.has("noao")&&(this.quality.aoEnabled=!1);const n=parseFloat(i.get("dinner"));this.dinnerAt=Number.isFinite(n)&&n>0?n:150,await t.step(.1,"Generating materials");const s=Mt.qualityLevel;this.materialLibrary=new vv(this.renderer,s>=6?1024:512,s>=6?16:8);const r=this.materialLibrary.compile();return await t.step(.16,"Building render graph"),this.graph=new Jv(this.renderer,this.quality),this.graph.resize(window.innerWidth,window.innerHeight,!0),this.graph.debugView=parseInt(i.get("debug")??"0",10)||0,await t.step(.22,"Baking sky and irradiance"),this.graph.sky.setTimeOfDay(Mt.data.timeOfDay??"day"),this.graph.sky.bake(),this.graph.updateSkyUniforms(),this.factory=new wv(this.graph.lightUniforms,this.materialLibrary),await t.step(.32,"Generating district"),this.world=new A_(this.factory).build(zl),await t.step(.5,"Baking navigation"),this.nav=new H_(this.world.bvh,this.world.bounds,{buildings:this.world.buildings,playBounds:this.world.playBounds}).bake(),await t.step(.62,"Painting surfaces"),await r,await this.materialLibrary.draw(o=>t.tick(.62+o*.1,`Painting surfaces ${Math.round(o*100)}%`)),await t.step(.74,"Arming systems"),this.rigid=new D_(this.world.bvh,260),this.rigid.maxBodies=this.quality.maxRigidBodies,this.audio=new Ay,this.rawInput=new iv(this.canvas),this.input=new Uy(this.rawInput),this.combat=new my({world:this.world,rigidWorld:this.rigid,lightUniforms:this.graph.lightUniforms,quality:this.quality,audio:this.audio}),this.player=new Cx(this.world,this.input,this.audio),this.player.team="A",this.playerTarget=new Px(this.player),this.combat.registerCharacter(this.playerTarget),this.viewModel=new Zx(this.factory,this.graph.vmPrevViewProjection),this.weapon=new ty({audio:this.audio,viewModel:this.viewModel,player:this.player,combat:this.combat}),this.grenades=new Ey({player:this.player,audio:this.audio,onThrow:(o,l)=>{this.combat.throwGrenade({position:o,velocity:l,owner:this.playerTarget,team:this.player.team})}}),await t.step(.8,"Deploying opposition"),this.rng=new Ms(zl^20958),this.director=new yx({scene:this.world.scene,nav:this.nav,bvh:this.world.bvh,factory:this.factory,rng:this.rng,shadowSystem:this.graph.shadows,prevViewProjection:this.graph.prevViewProjection,combat:this.combat,audio:this.audio}),this.director.setSpawnPoints(this.world.spawns.A,this.world.spawns.B),this.director.setPlayer(this.playerTarget),this.sister=new zy({bus:this.input,player:this.player,weapon:this.weapon,world:this.world,nav:this.nav,director:this.director,rng:this.rng}),this.input.sister=this.sister,this.match=new eu({scoreLimit:30,timeLimit:600}),await t.step(.88,"Building interface"),this.hud=new Ry(this.uiRoot),this.menu=new Dy(this.uiRoot,{audio:this.audio}),this.controlPanel=new Gy(this.uiRoot,{onPrompt:(o,l)=>{this.state!=="playing"||this.frozen||this.cgPlaying||!this.input.aiControlled||(this.story.enqueue([{speaker:"和臣",text:l.replace(/[！。]$/,"")+"！"}],{key:`prompt-${o}`,mode:Me.SISTER_AI}),this.sister.issueIntent(o))}}),this.sister.onFeedback=(o,l,c)=>{this.controlPanel.say(o,l),c.important&&this.story.enqueue([{speaker:"朱里",text:o}],{key:"prompt-report",mode:Me.SISTER_AI})},this.segmentStats=new $y,this.promptCoach=new jy,this.firstControl=i.get("first")==="player"?"player":"sister",this.subtitle=new qy(this.uiRoot),this.story=new Yy({beats:Ba,onBeat:o=>this._onStoryBeat(o),onEnd:()=>this._endSegment(),onBetween:()=>this.subtitle?.hide()}),this.storyCtx={playerTime:0,dinnerAt:this.dinnerAt,forceCall:!1},this.playerControlTime=0,this.forceCall=!1,this.frozen=!1,this.outro=new Zy(this.uiRoot,{onRestart:()=>this.startMatch()}),this.cg=new t1(this.uiRoot),this.cgPlaying=!1,this._wireCallbacks(),this.camera=new Mi(Mt.data.fov,1,.06,600),this.vmCamera=new Mi(Mt.data.viewmodelFov,1,.012,12),this._applyResize(),await t.step(.94,"Compiling shaders"),this._warmup(),await t.step(1,"Ready"),t.done(),this.bootTimings=t.timings,this.state="menu",this.menu.showStart(),this._startLoop(),this}_bindContextLoss(){this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.contextLost=!0,this.loop?.stop(),this.input&&(this.input.enabled=!1,this.input.releaseLock()),od(this.uiRoot,"Graphics context lost","The graphics driver reset. Reload the page to start a new match.")}),window.addEventListener("pagehide",()=>{try{this.renderer?.dispose()}catch{}try{this.renderer?.forceContextLoss()}catch{}}),window.addEventListener("beforeunload",t=>{this.state==="playing"&&(t.preventDefault(),t.returnValue="")})}_warmup(){const t=this.camera.clone();t.position.copy(this.world.spawns.A[0]??new y(0,2,0)),t.position.y+=1.6,t.updateMatrixWorld(),this.renderer.compile(this.world.scene,t),this.renderer.compile(this.combat.scene,t),this.renderer.compile(this.combat.transparentScene,t),this.renderer.compile(this.viewModel.root,t)}_wireCallbacks(){this.combat.onHitConfirm=({zone:t,damage:e,killed:i,position:n})=>{this.hud.showHitmarker(i),this.audio.playHitmarker(i),this._pendingHits.push({position:n,damage:e,headshot:t==="head"}),this.match.registerShot(0,!0)},this.combat.onKill=(t,e,i)=>{(t===this.playerTarget||t===this.player)&&this.match.registerKill(0,e.id,{headshot:i==="head"})},this.weapon.onFire=()=>{this.match.registerShot(0,!1),this.director.playerFired(this.player.eye)},this.playerTarget.onDamaged=(t,e)=>{if(this.hud.flashDamage(Math.min(.75,t/55)),this.audio.playHurt(),e?.point){Ca.subVectors(e.source?.position??e.point,this.player.eye);const i=Math.atan2(Ca.x,-Ca.z)-Math.atan2(-Math.sin(this.player.yaw),-Math.cos(this.player.yaw));this.hud.showDamageDirection(-i)}},this.player.onDeath=t=>{this._onPlayerDeath(t)},this.director.onAgentKilled=(t,e)=>{const i=e?.source===this.playerTarget?0:e?.source?.id??null;this.match.registerKill(i??null,t.character.id,{headshot:e?.zone==="head"})},this.match.onKill=t=>{this.segmentStats.recordKill(t,this.input.mode),this.hud.addKill(t),t.involvesPlayer==="killer"&&(t.streak===3?this.hud.announce("Triple","three without dying"):t.streak===5?this.hud.announce("Rampage","five without dying"):t.streak>=8&&t.streak%3===2&&this.hud.announce("Unstoppable",`${t.streak} streak`))},this.match.onEnd=(t,e)=>this._onMatchEnd(t,e),this.menu.onStart=()=>this.startMatch(),this.menu.onResume=()=>this.resume(),this.menu.onRestart=()=>this.startMatch(),this.menu.onQuitToMenu=()=>this.quitToMenu(),this.menu.onSettingChanged=t=>this._applySettings(t),this._applySettings("*"),this.input.onModeChange=(t,e,i)=>this._onControlModeChanged(t,i),this.canvas.addEventListener("click",()=>{this.state==="playing"&&!this.input.aiControlled&&!this.input.locked&&this.input.requestLock()}),this.input.onPointerLockChange=t=>{!t&&this.state==="playing"&&!this.embed&&this.pause()},this.input.onPointerLockError=()=>{this.state==="playing"&&!this.embed&&this.pause()},window.addEventListener("resize",()=>{this._resizePending=!0}),window.addEventListener("blur",()=>{this.state==="playing"&&!this.embed&&this.pause()})}startMatch({firstControl:t=this.firstControl}={}){this.firstControl=t==="player"?"player":"sister",this.segmentStats.reset(),this.sister.resetPrompts(),this.promptCoach.reset(),this.menu.hide(),this.menu.hideBoard(),this.hud.clear(),this.hud.setVisible(!0),this.state="playing",this.match.reset(),this.match.registerPlayer(0,{name:"YOU",team:"A",isLocal:!0}),this.director.dispose();const[e,i]=Iu[Mt.data.difficulty]??Iu.regular;this.director.spawnTeam("B",e1,[e,i]);for(const n of this.director.characters){const s=this.match.players.size,r=eu.callsign(n.team,s);n.name=r,this.match.registerPlayer(n.id,{name:r,team:n.team})}this.combat.clear(),this._respawnPlayer(!0),this.match.start(),this.audio.init().then(()=>{this.audio.resume(),this.audio.setVolumes({master:Mt.data.masterVolume}),this.audio.playStinger(!1)}),this.outro.hide(),this.cg.hide(),this.cgPlaying=!1,this.playerControlTime=0,this.forceCall=!1,this.frozen=!1,this.storyCtx={playerTime:0,dinnerAt:this.dinnerAt,forceCall:!1},this.controlPanel.setVisible(!0),this.controlPanel.setMode(this.input.mode),this.subtitle.setVisible(!0),this.story.start(this.firstControl==="player"?Xy:Ba),this.input.aiControlled||this.input.requestLock(),this.hud.announce("Contact expected","Suq Al-Rimal — 13:40"),this._firstFramePending=!0}setControlMode(t,{gesture:e=!1}={}){return this.input?this.input.setMode(t,{gesture:e}):!1}_onControlModeChanged(t,e){this.controlPanel?.setMode(t),t===Me.PLAYER&&e&&this.state==="playing"&&this.input.requestLock()}_onStoryBeat(t){t.onShow?.(),t.freeze&&(this.frozen=!0),this.subtitle.show(t.speaker,t.text);const e=()=>{t.control&&this.setControlMode(t.control,{gesture:!1})};t.cg?this._playCg(t.cg).then(e):e()}_playCg(t){return this.lastCg=t,this.cg?(this.cgPlaying=!0,this.cg.show(t).then(e=>(this.cgPlaying=!1,e))):Promise.resolve(!1)}_endSegment(){if(this.state==="playing"){if(this.state="outro",this.frozen=!0,this.cg.hide(),this.cgPlaying=!1,this.hud.setVisible(!1),this.controlPanel?.setVisible(!1),this.subtitle?.setVisible(!1),this.input.releaseLock(),this.audio.setMuffle(.55),this.embed){this.outro.hide(),this.onSegmentEnd?.(this.segmentStats.result(this.match.scores,this.sister.promptStats));return}this.outro.show({act:"第一幕",title:"结束",note:"手机上的那一局，到此为止。"})}}pause(){this.state!=="playing"||this.embed||(this.state="paused",this.menu.showPause(),this.input.releaseLock(),this.audio.setMuffle(.55))}resume(){this.state==="paused"&&(this.menu.hide(),this.state="playing",this.input.requestLock(),this.audio.setMuffle(0))}quitToMenu(){this.state="menu",this.hud.setVisible(!1),this.hud.clear(),this.controlPanel?.setVisible(!1),this.story?.stop(),this.subtitle?.setVisible(!1),this.cg?.hide(),this.cgPlaying=!1,this.menu.hideBoard(),this.menu.showStart(),this.input.releaseLock(),this.audio.setMuffle(0)}_onMatchEnd(t,e){if(this.embed){const i=this.match.scores;i[t]>=this.match.scoreLimit&&(i[t]=this.match.scoreLimit-1),this.match.running=!0,this.match.ended=!1;return}this.state="ended",this.hud.setVisible(!1),this.controlPanel?.setVisible(!1),this.story?.stop(),this.subtitle?.setVisible(!1),this.input.releaseLock(),this.audio.playStinger(!0),this.menu.showBoard({won:t==="A",scoreA:this.match.scores.A,scoreB:this.match.scores.B,rows:this.match.scoreboard(),reason:e})}_onPlayerDeath(t){this.respawnTimer=this.match.respawnDelay;const e=t?.name??"the world";this.hud.showRespawn(e,this.respawnTimer),this.match.registerKill(t?.id??null,0,{headshot:!1}),this.audio.setMuffle(.35),this.weapon.setTrigger(!1)}_pickRespawn(){const t=[];for(const i of this.director.characters)i.alive&&i.team!==this.player.team&&t.push(i);let e=null;for(let i=0;i<s1;i++){const n=this.nav.spawnPoint(this.rng,Uu,{enemies:t,minEnemyDist:r1});if(!n)break;let s=!1;for(const r of t)if(!(n.distanceTo(r.position)>a1)&&(Bu.copy(n).y+=1.5,Nu.copy(r.position).y+=1.5,!this.world.bvh.occluded(Bu,Nu))){s=!0;break}if(!s)return n;e=(e??new y).copy(n)}return e||this.nav.spawnPoint(this.rng,Uu,{minEnemyDist:0,clearance:.7,samples:256})}_respawnPlayer(t=!1){Un.copy(this._pickRespawn()??this.world.spawns.A[0]),Un.y=this.world.groundAt(Un.x,Un.z)+.08,this.player.spawn(Un);let e=null,i=1/0;for(const r of this.director.characters){if(!r.alive||r.team===this.player.team)continue;const o=r.position.distanceToSquared(Un);o<i&&(i=o,e=r.position)}const n=e?e.x:0,s=e?e.z:0;this.player.yaw=Math.atan2(-(n-Un.x),-(s-Un.z)),this.player.pitch=0,this.weapon.ammo=this.weapon.spec.magSize,this.weapon.reserve=this.weapon.spec.reserve,this.weapon.reloading=!1,this.weapon.boltLocked=!1,this.hud.hideRespawn(),this.hud.setDeathFade(0),this.audio.setMuffle(0),t||this.hud.announce("Redeployed","")}_startLoop(){this.loop=new nv({fixedHz:120,maxSubSteps:5,update:t=>this._fixedUpdate(t),render:(t,e)=>this._render(t,e)}),this.loop.start()}_fixedUpdate(t){if(this.time+=t,this._steppedThisFrame=!0,this.state==="playing"&&(this.input.aiControlled||(this.playerControlTime+=t),this.storyCtx.playerTime=this.playerControlTime,this.storyCtx.forceCall=this.forceCall,Object.assign(this.storyCtx,this.segmentStats.context(this.player,this.weapon,this.input.mode,this.sister.promptStats)),this.cgPlaying||this.story.update(t,this.storyCtx),!(this.frozen||this.cgPlaying))){if(this.match.update(t),this.input.aiControlled&&this.sister?this.sister.update(t):this.sister.observe(t),this.controlPanel.setContext(this.input.aiControlled?this.sister.contextualPrompt():null),this.promptCoach.update(t,{sister:this.sister,player:this.player,story:this.story,panel:this.controlPanel,enabled:!this.input.aiControlled&&this.story.running&&this.story.reactionsEnabled}),this.player.alive){const e=this.input.action("fire");this.input.actionPressed("grenade")&&this.grenades.toggle(),this.grenades.update(t,{firing:e});const i=!this.grenades.blocksWeapon;this.weapon.setTrigger(i&&e),this.player.wantsAds=i&&this.input.action("aim"),i&&this.input.actionPressed("reload")&&this.weapon.startReload(),i&&this.input.actionPressed("fireMode")&&this.weapon.cycleFireMode(),i&&this.input.actionPressed("inspect")&&this._inspect()}else{this.grenades.stow(),this.grenades.update(t,{firing:!1}),this.weapon.setTrigger(!1),this.respawnTimer-=t;const i=this.respawnTimer<=this.match.respawnDelay-Du&&(this.input.actionPressed("jump")||this.input.actionPressed("fire"));(this.respawnTimer<=0||i)&&this._respawnPlayer()}this.player.update(t,this.time),this.playerTarget.sync(),this.weapon.update(t,this.time),this.director.update(t),this.rigid.step(t),this.combat.update(t,this.time,this.camera)}}_render(t,e){this._resizePending&&this._applyResize();const i=performance.now();if(this.state==="playing"||this.state==="paused"){const n=this.input.consumeLook();this.state==="playing"&&this.player.alive&&this.player.look(n.x,n.y),this.player.updateView(t,e,this.time),this.player.applyToCamera(this.camera),this._applyAdsZoom(this.player.adsBlend,t),this.vmCamera.position.copy(this.camera.position),this.vmCamera.quaternion.copy(this.camera.quaternion),this.vmCamera.updateMatrixWorld(),this.viewModel.update(t,{camera:this.vmCamera,player:this.player,weapon:this.weapon,lookDelta:p1.set(n.x*.0022,n.y*.0022),wallProximity:this._wallProximity(),grenade:this.grenades}),this.viewModel.root.visible=this.player.alive}else this._menuCamera(t);this.world.update(t,this.time),this.graph.sky.update(t,this.time),this.graph.updateSkyUniforms(),this.graph.setPointLights(this.combat.activeLights()),this.graph.render(this.camera,this.vmCamera,{world:this.world.scene,transparent:this.combat.transparentScene,viewmodel:this.viewModel.root,viewmodelTransparent:this.viewModel.transparent},t,{time:this.time,damageFlash:this.hud.damageFlash,criticalHealth:this.player.alive?Math.max(0,1-this.player.health/32):1,motionBlurScale:Math.min(1,h1/Math.max(t,1e-4))}),this._captureRequest?.(),this._updateHud(t),this._steppedThisFrame&&(this.input.endFrame(),this._steppedThisFrame=!1),this._trackPerformance(performance.now()-i,t),this._firstFramePending&&this.state==="playing"&&(this._firstFramePending=!1,this.onSegmentStart?.())}captureFrame(t=192,e=108){return new Promise(i=>{this._captureRequest=()=>{this._captureRequest=null;const n=this.renderer.getContext(),s=this.renderer.domElement.width,r=this.renderer.domElement.height,o=new Uint8Array(s*r*4);n.bindFramebuffer(n.FRAMEBUFFER,null),n.readPixels(0,0,s,r,n.RGBA,n.UNSIGNED_BYTE,o),i(i1(o,s,r,t,e))}})}_menuCamera(t){this._menuAngle=(this._menuAngle??0)+t*.045;const e=46,i=this._menuAngle,n=Math.sin(i)*e*.5,s=Math.cos(i)*e,r=this.world.groundAt(n,s)+9.5+Math.sin(i*1.7)*1.6;this.camera.position.set(n,r,s),this.camera.lookAt(0,this.world.groundAt(0,0)+3.2,0),this.camera.updateMatrixWorld(),this.vmCamera.position.copy(this.camera.position),this.vmCamera.quaternion.copy(this.camera.quaternion),this.vmCamera.updateMatrixWorld(),this.viewModel.root.visible=!1}_applyAdsZoom(t,e=0){const i=this.player?.alive?this.player.sprintNorm:0;if(this._sprintFov=e>0?this._sprintFov+(i-this._sprintFov)*Math.min(1,e*6):i,t===this._adsZoomApplied&&this._sprintFov===this._sprintFovApplied)return;this._adsZoomApplied=t,this._sprintFovApplied=this._sprintFov;const n=t*t*(3-2*t),s=1+this._sprintFov*(c1-1)*(1-n);this.camera.fov=this._baseFov*(1-n*(1-o1))*s,this.camera.updateProjectionMatrix(),this.vmCamera.fov=this._baseVmFov*(1-n*(1-l1)),this.vmCamera.updateProjectionMatrix()}_wallProximity(){this.player.forward(Ca),Fu.copy(this.player.eye);const t=this.world.bvh.raycast(Fu,Ca,.9,this.combat.hit);return t.hit?Ht.clamp(1-(t.t-.35)/.5,0,1):0}_inspect(){this.viewModel.busy||(this.viewModel.startAction("inspect",2.1,(t,e,i)=>{const n=Math.sin(Math.min(1,t/.22)*Math.PI*.5)*(1-Math.max(0,(t-.78)/.22));e.x+=-.055*n,e.y+=.055*n,e.z+=.075*n,i.x+=.22*n,i.y+=.95*n*Math.sin(t*Math.PI*1.1),i.z+=-.55*n}),this.audio.playBolt(!1))}_updateHud(t){if(this.hud.update(t),this.controlPanel?.update(t),this.controlPanel?.setNeedClick(this.state==="playing"&&!this.input.aiControlled&&!this.input.locked),this.state!=="playing"&&this.state!=="paused")return;const e=this.weapon.hudState();this.hud.updateAmmo(e.ammo,e.reserve,e.mode,e.reloading),this.hud.updateHealth(this.player.health,this.player.maxHealth),this.hud.updateGrenades(this.grenades.hudState()),this.hud.updateStance(this.player.crouched,this.player.sprinting,this.player.adsBlend>.6,Math.abs(this.player.leanBlend)>.25);const i=this.match.localPlayer();this.hud.updateScore(i?.kills??0,i?.deaths??0,this.match.timeLeft,this.match.scoreLimit),this.hud.updateCompass(this.player.yaw),this.hud.updateCrosshair(e.spread,this.camera.fov*Math.PI/180,this.graph.height,this.player.adsBlend>.62||!this.player.alive),this.player.alive||(this.hud.setDeathFade(Math.min(.55,(this.match.respawnDelay-this.respawnTimer)*.5)),this.hud.updateRespawn(this.respawnTimer,this.respawnTimer<=this.match.respawnDelay-Du));for(const n of this._pendingHits)Jr.copy(n.position).project(this.camera),Jr.z<1&&this.hud.showDamageNumber(n.damage,(Jr.x*.5+.5)*this.graph.width,(-Jr.y*.5+.5)*this.graph.height,n.headshot);this._pendingHits.length=0}_applyResize(){this._resizePending=!1;const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1);const i=t/e;this.camera.aspect=i,this._baseFov=Lu(Mt.data.fov,i),this._baseVmFov=Lu(Mt.data.viewmodelFov,i),this.camera.fov=this._baseFov,this.camera.updateProjectionMatrix(),this.vmCamera.aspect=i,this.vmCamera.fov=this._baseVmFov,this.vmCamera.updateProjectionMatrix(),this._adsZoomApplied=-1,this._sprintFovApplied=-1,this._sprintFov=this._sprintFov??0,this._applyAdsZoom(this.player?.adsBlend??0),this.graph.resize(t,e,!0)}_trackPerformance(t,e){this._frameTimes.push(e),this._frameTimes.length>60&&this._frameTimes.shift();const i=this._frameTimes.reduce((n,s)=>n+s,0)/this._frameTimes.length;if(this.frameStats.fps=1/Math.max(i,1e-4),this.frameStats.cpu=t,this.frameStats.drawCalls=this.graph.stats.drawCalls,this.frameStats.triangles=this.graph.stats.triangles,this.onFrame?.(e,t),this._dynCooldown=Math.max(0,this._dynCooldown-e),Mt.data.dynamicResolution&&this._frameTimes.length>=60&&this._dynCooldown===0){const n=.016666666666666666,s=this.quality.renderScale;let r=this._dynScale;i>n*1.25?r=this._dynScale-Zr:i<n*.8&&(r=this._dynScale+Zr),r=Ht.clamp(Math.round(r/Zr)*Zr,Math.min(u1,s),s),Math.abs(r-this.graph.renderScale)>.001&&(this._dynScale=r,this.graph.renderScale=r,this.graph.resize(this.graph.width,this.graph.height,!0),this._dynCooldown=d1)}Mt.data.showFps?(this.hud.setPerfVisible(!0),this.hud.setPerfText(`${this.frameStats.fps.toFixed(0)} fps   ${(i*1e3).toFixed(1)} ms
cpu ${t.toFixed(1)} ms   scale ${(this.graph.renderScale*100).toFixed(0)}%
${this.frameStats.drawCalls} draws   ${(this.frameStats.triangles/1e3).toFixed(0)}k tris
${this.combat.particles.count} particles   ${this.director.agents.length} agents`)):this.hud.setPerfVisible(!1)}_applySettings(t){(t==="quality"||t==="*")&&(this.quality=Mt.preset,this.graph.setQuality(this.quality),this.combat.setQuality?.(this.quality),this._dynScale=this.quality.renderScale,this._resizePending=!0),(t==="timeOfDay"||t==="*")&&(this.graph.sky.setTimeOfDay(Mt.data.timeOfDay??"day"),this.graph.sky.bake(),this.graph.updateSkyUniforms()),(t==="fov"||t==="viewmodelFov"||t==="*")&&(this._resizePending=!0),(t==="masterVolume"||t==="*")&&this.audio.setVolumes({master:Mt.data.masterVolume});const e=this.graph.compositePass.uniforms;e.uSharpen.value=this.quality.sharpen??.32,e.uGrain.value=Mt.data.filmGrain,e.uChromatic.value=Mt.data.chromaticAberration,e.uVignette.value=Mt.data.vignette}handleKey(t){if(this.state==="playing"&&!this.frozen&&!this.cgPlaying&&this.controlPanel?.handleKey(t))return!0;if(t==="F1"&&(this.state==="playing"||this.state==="paused"))return this.story?.stop(),this.setControlMode(this.input.aiControlled?Me.PLAYER:Me.SISTER_AI,{gesture:!0}),!0;if(t===Mt.data.keybinds.pause)return this.state==="playing"?this.pause():this.state==="paused"?this.resume():this.menu.settingsOpen&&this.menu.toggleSettings(!1),!0;if(t==="KeyH"&&this.state==="playing"&&!this.input.aiControlled&&this.story?.running)return this.forceCall=!0,this.story.skipTo(i=>typeof i.until=="function")||this.story.requestAdvance(),!0;if(t==="Enter"&&this.state==="outro")return this.startMatch(),!0;if(t==="Enter"&&this.state==="menu")return this.startMatch(),!0;if(this.state==="paused"){if(t==="Enter")return this.resume(),!0;if(t==="KeyQ")return this.quitToMenu(),!0}return t==="Enter"&&this.state==="ended"?(this.startMatch(),!0):t==="KeyO"&&this.menu.visible?(this.menu.toggleSettings(),!0):t==="Backquote"?(this.graph.debugView=(this.graph.debugView+1)%10,!0):!1}dispose(){this.loop?.stop(),this.director.dispose(),this.combat.dispose(),this.viewModel.dispose(),this.world.dispose(),this.graph.dispose(),this.factory.dispose(),this.materialLibrary.dispose(),this.audio.dispose(),this.renderer.dispose()}}const Ca=new y,Fu=new y,Un=new y,Uu=new y,Bu=new y,Nu=new y,Jr=new y,p1=new It;function m1(a){const t=new Set,e={get game(){return a},start(){return a.startMatch(),e.snapshot()},pause(){a.pause()},resume(){a.resume()},quit(){a.quitToMenu()},key(i,n){a.input.inject({key:i,down:n}),n?t.add(i):t.delete(i)},async tap(i,n=.08){e.key(i,!0),await e.wait(n),e.key(i,!1)},async wait(i,n=3e4){const s=a.time+i,r=performance.now()+n;for(;a.time<s&&performance.now()<r;)await Ol(8);return a.time},releaseAll(){for(const i of[...t])e.key(i,!1);e.fire(!1),e.ads(!1)},look(i,n){a.input.inject({look:{x:i,y:n}})},fire(i){a.input.inject({button:0,down:i})},ads(i){a.input.inject({button:2,down:i})},aimAt(i,n,s){const r=a.player.eye,o=i-r.x,l=n-r.y,c=s-r.z,h=Math.hypot(o,c)||1e-6;return a.player.yaw=Math.atan2(-o,-c),a.player.pitch=Math.atan2(l,h),{yaw:a.player.yaw,pitch:a.player.pitch}},aimAtEnemy(){const i=e.nearestEnemy();if(!i)return null;const n=i.rig?.joints?.[2]??i.position;return e.aimAt(n.x,n.y,n.z),{name:i.name,distance:a.player.eye.distanceTo(n)}},nearestEnemy(){let i=null,n=1/0;for(const s of a.director.characters){if(!s.alive||s.team===a.player.team)continue;const r=a.player.eye.distanceToSquared(s.position);r<n&&(n=r,i=s)}return i},teleport(i,n,s){const r=a.player;r.controller.position.set(i,n,s),r.controller.velocity.set(0,0,0),r._prevPosition.set(i,n,s),r._renderPosition.set(i,n,s),r._eyeY=null,r.eye.set(i,n+r.heightSpring.value,s)},engageNearestEnemy(i=9){const n=e.nearestEnemy();if(!n)return null;const s=a.world.bvh,r=n.position.clone();r.y+=.9;let o=null;for(let l=0;l<24;l++){const c=l/24*Math.PI*2,h=new y(n.position.x+Math.cos(c)*i,0,n.position.z+Math.sin(c)*i);if(!a.nav.isWalkableAt(h.x,h.z))continue;h.y=a.nav.heightAt(h.x,h.z)+.05;const u=h.clone();u.y+=1.62;const d=r.clone().sub(u),g=d.length();if(d.multiplyScalar(1/g),!s.raycast(u,d,g-.3,a.combat.hit).hit){o=h;break}}return o?(e.teleport(o.x,o.y,o.z),a.playerTarget.sync(),e.aimAt(r.x,r.y,r.z),{target:n.name,standoff:i,position:o.toArray().map(si)}):null},freezeAI(i=!0){const n=a.director;if(i){if(n.__liveUpdate)return!0;n.__liveUpdate=n.update.bind(n);const s=n.agents.map(r=>({agent:r,control:{yaw:r.aimYaw,pitch:r.aimPitch,stance:r.stance,aiming:r.aiming}}));n.update=r=>{for(const{agent:o,control:l}of s)o.controller.velocity.set(0,0,0),o.character.velocity.set(0,0,0),o.character.update(r,l)}}else n.__liveUpdate&&(n.update=n.__liveUpdate,n.__liveUpdate=null);return i},snapshot(){const i=a.match;return{state:a.state,timeLeft:si(i.timeLeft),scores:{...i.scores},player:{alive:a.player.alive,health:Math.round(a.player.health),position:a.player.controller.position.toArray().map(si),yaw:si(a.player.yaw),pitch:si(a.player.pitch),stance:a.player.stance,sliding:a.player.sliding,speed:si(a.player.speed2D)},grenades:{...a.grenades.hudState(),live:a.combat.liveGrenades.length},weapon:{name:a.weapon.spec.name,ammo:a.weapon.ammo,reserve:a.weapon.reserve,mode:a.weapon.hudState().mode,reloading:a.weapon.reloading},ai:{total:a.director.agents.length,aliveA:a.director.aliveCount("A"),aliveB:a.director.aliveCount("B"),engaged:a.director.agents.filter(n=>n.alive&&n.target).length},fx:{particles:a.combat.particles.count,decals:a.combat.decals.count},perf:{fps:Math.round(a.frameStats.fps),cpuMs:si(a.frameStats.cpu),renderScale:si(a.graph.renderScale),drawCalls:a.frameStats.drawCalls,triangles:a.frameStats.triangles}}},async profile(i=4e3,n=900){const s=[],r=a.onFrame;if(a.onFrame=null,await Ol(n),a.onFrame=(h,u)=>{s.push({dt:h*1e3,cpu:u})},await Ol(i),a.onFrame=r,!s.length)return null;const o=s.map(h=>h.dt).sort((h,u)=>h-u),l=s.map(h=>h.cpu).sort((h,u)=>h-u),c=(h,u)=>h[Math.min(h.length-1,Math.floor(h.length*u))];return{frames:s.length,fps:si(1e3/(o.reduce((h,u)=>h+u,0)/o.length)),frameMs:{p50:si(c(o,.5)),p95:si(c(o,.95)),max:si(o[o.length-1])},cpuMs:{p50:si(c(l,.5)),p95:si(c(l,.95))},renderScale:si(a.graph.renderScale)}},capture(i,n){return a.captureFrame(i,n)},setQuality(i){e.setSetting("quality",i)},setSetting(i,n){Mt.set(i,n),a.menu.onSettingChanged?.(i,n)},debugView(i){a.graph.debugView=i},control:{mode(){return a.input.mode},set(i){return a.setControlMode(i)},toggle(){return a.setControlMode(a.input.aiControlled?"PLAYER":"SISTER_AI")},sister(){return a.sister?a.sister.snapshot():null},prompt(i){return a.sister?a.sister.issueIntent(i):null},held(){return a.input.aiSnapshot()},story(){return a.story?a.story.snapshot():null},stopStory(){a.story?.stop()},subtitle(){const i=document.querySelector("#subtitle");return!i||!i.classList.contains("show")?null:i.querySelector(".line").textContent},speaker(){const i=document.querySelector("#subtitle .speaker");return i?i.textContent:null},needClick(){const i=document.querySelector("#cp-need-click");return!!i&&i.classList.contains("show")},outro(){const i=document.querySelector("#outro");return!!i&&i.classList.contains("show")},frozen(){return!!a.frozen},playerTime(){return+a.playerControlTime.toFixed(2)},state(){return a.state},lastCg(){return a.lastCg??null},cg(){const i=document.querySelector("#cg-cut");return i?{visible:i.classList.contains("show"),playing:!!a.cgPlaying,loaded:i.naturalWidth>0,width:i.naturalWidth,height:i.naturalHeight}:null},leaveEarly(){return a.handleKey("KeyH")}}};return window.__harness=e,e}const Ol=a=>new Promise(t=>setTimeout(t,a)),si=a=>Math.round(a*1e3)/1e3,g1=document.getElementById("scene"),Xl=document.getElementById("ui-root"),ld=new URLSearchParams(location.search),co=ld.get("embed")==="1",v1=co&&window.parent!==window?window.parent:null,Na=a=>v1?.postMessage({source:"dust-corridor",...a},"*"),oi=new f1(g1,Xl);oi.embed=co;oi.onSegmentEnd=a=>Na({type:"result",result:a});oi.onSegmentStart=()=>Na({type:"started"});window.addEventListener("keydown",a=>{a.repeat||oi.handleKey?.(a.code)&&a.preventDefault()},!1);co&&(window.addEventListener("keydown",a=>{a.repeat||oi.state!=="outro"||(a.code==="KeyE"||a.code==="Enter")&&(a.preventDefault(),Na({type:"exit"}))},!1),window.addEventListener("message",a=>{const t=a.data;!t||t.source!=="phone-story"||(t.type==="start"&&oi.state==="menu"?oi.startMatch({firstControl:t.firstControl}):t.type==="switchControl"&&typeof t.mode=="string"?oi.setControlMode(t.mode,{gesture:!1}):t.type==="exit"&&(oi.story?.stop(),oi.quitToMenu()))},!1));oi.boot().then(()=>{window.__game=oi,m1(oi),window.__ready=!0,co?(oi.menu.hide(),Na({type:"ready"})):ld.get("auto")==="1"&&oi.startMatch()}).catch(a=>{console.error(a),Xl.innerHTML="",od(Xl,"Failed to start",a.message,"Requires WebGL2 with multiple render targets and float textures."),Na({type:"failed",reason:a.message})});window.__settings=Mt;
