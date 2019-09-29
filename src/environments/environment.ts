// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: `//apiali.xiaovbao.cn`,
// serverUrl: `//api.baizhanke.com`,
version: 'v2',
mobileBaseUrl: 'https://mobiletest.xiaovbao.cn',
needMock: false,
MYLOGIN_HOST: `https://huizhanali.xiaovbao.cn`,
exhibitorShowBaseUrl: 'https://mobiletest.xiaovbao.cn',
multiChannelRegister: 'https://reg.xiaovbao.cn',
internalTest: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
