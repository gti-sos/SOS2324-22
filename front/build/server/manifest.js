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
		client: {"start":"_app/immutable/entry/start.D9MWzP3C.js","app":"_app/immutable/entry/app.CAseR_ZJ.js","imports":["_app/immutable/entry/start.D9MWzP3C.js","_app/immutable/chunks/entry.CRJkPTsb.js","_app/immutable/chunks/scheduler.wWR6jiGY.js","_app/immutable/chunks/index.V6bxQW6v.js","_app/immutable/entry/app.CAseR_ZJ.js","_app/immutable/chunks/scheduler.wWR6jiGY.js","_app/immutable/chunks/index.BrUfcjbG.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BOF57sfF.js')),
			__memo(() => import('./chunks/1-CHCq_fos.js')),
			__memo(() => import('./chunks/2-KFH15vbh.js')),
			__memo(() => import('./chunks/3-sTLePJeZ.js')),
			__memo(() => import('./chunks/4-D4NISS8c.js')),
			__memo(() => import('./chunks/5-BbUtj4ip.js')),
			__memo(() => import('./chunks/6-CDayo0FP.js')),
			__memo(() => import('./chunks/7-Cy3Ckxax.js')),
			__memo(() => import('./chunks/8-DUKDzWXx.js')),
			__memo(() => import('./chunks/9-DvKKngJM.js')),
			__memo(() => import('./chunks/10-BOiGNux7.js')),
			__memo(() => import('./chunks/11-C5_cygEO.js'))
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
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/famous-people",
				pattern: /^\/famous-people\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/famous-people/[name]/[country]",
				pattern: /^\/famous-people\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false},{"name":"country","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/forbes-billionaires-list",
				pattern: /^\/forbes-billionaires-list\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/forbes-billionaires-list/[rank]",
				pattern: /^\/forbes-billionaires-list\/([^/]+?)\/?$/,
				params: [{"name":"rank","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/forbes-billonaires",
				pattern: /^\/forbes-billonaires\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/forbes-billonaires/[name]/[country]",
				pattern: /^\/forbes-billonaires\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false},{"name":"country","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/top-richest",
				pattern: /^\/top-richest\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/top-richest/[name]/[nationality]",
				pattern: /^\/top-richest\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false},{"name":"nationality","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
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
