package com.tns.gen.com.google.android.gms.maps;

public class GoogleMap_OnMapLongClickListener implements com.google.android.gms.maps.GoogleMap.OnMapLongClickListener {
	public GoogleMap_OnMapLongClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onMapLongClick(com.google.android.gms.maps.model.LatLng param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onMapLongClick", void.class, args);
	}

}
