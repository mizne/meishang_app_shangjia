package com.tencent.qcloud.suixinbo;

import android.content.Intent;
import android.util.Log;
import com.alibaba.fastjson.JSONObject;
import com.tencent.qcloud.suixinbo.views.LoginActivity;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class Act1Plugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, String rawArgs, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, rawArgs, callbackContext);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        return super.execute(action, args, callbackContext);
    }

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("show")) {

            //以下用原生代码打开一个Act1Activity（可以理解为让界面跳转到Act1Activity这个界面）
            //PS：原生很多地方都要获取当前Activity的实例对象（如果在Activity里就用this），在CordovaPlugin用的是cordova.getActivity()

            Intent intent = new Intent(cordova.getActivity(), LoginActivity.class);

            //传入参数，参数分别是key和value

            cordova.getActivity().startActivity(intent);

            return true;

        } 

        // 登录
        else if (action.equals("Login")) {
            JSONObject jsonObject = JSONObject.parseObject(args.getString(0));
            String id = jsonObject.getString("id");
            String userSig = jsonObject.getString("userSig");
            String token = jsonObject.getString("token");

            Intent intent = new Intent(cordova.getActivity(), LoginActivity.class);
            intent.putExtra("id", id);
            intent.putExtra("userSig", userSig);
            intent.putExtra("token", token);
            cordova.getActivity().startActivity(intent);
            return true;
        } else if (action.equals("publish")) {

        }

        return false;

    }

}