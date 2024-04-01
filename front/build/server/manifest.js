const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BZYIrAxU.js","app":"_app/immutable/entry/app.-r89q90B.js","imports":["_app/immutable/entry/start.BZYIrAxU.js","_app/immutable/chunks/entry.DkkCAbr_.js","_app/immutable/chunks/scheduler.TjET1Dad.js","_app/immutable/chunks/index.B2Tz5-b5.js","_app/immutable/entry/app.-r89q90B.js","_app/immutable/chunks/scheduler.TjET1Dad.js","_app/immutable/chunks/index.CogmN7-S.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-C7448tW6.js')),
			__memo(() => import('./chunks/1-BVBmJroA.js')),
			__memo(() => import('./chunks/2-Cv2n4qQk.js')),
			__memo(() => import('./chunks/3-DuMtTfbN.js')),
			__memo(() => import('./chunks/4-zTo3olF0.js')),
			__memo(() => import('./chunks/5-BfzJ6FtX.js')),
			__memo(() => import('./chunks/6-Ux3q0-MI.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/famous-people",
				pattern: /^\/famous-people\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/famous-people/[name]/[country]",
				pattern: /^\/famous-people\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false},{"name":"country","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/forbes-billonaires",
				pattern: /^\/forbes-billonaires\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/forbes-billonaires/[name]/[country]",
				pattern: /^\/forbes-billonaires\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false},{"name":"country","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
