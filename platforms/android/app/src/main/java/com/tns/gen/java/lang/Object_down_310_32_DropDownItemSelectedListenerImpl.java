/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.java.lang;

public class Object_down_310_32_DropDownItemSelectedListenerImpl extends java.lang.Object implements com.tns.NativeScriptHashCodeProvider, android.widget.AdapterView.OnItemSelectedListener {
	public Object_down_310_32_DropDownItemSelectedListenerImpl(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public void onItemSelected(android.widget.AdapterView param_0, android.view.View param_1, int param_2, long param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "onItemSelected", void.class, args);
	}

	public void onNothingSelected(android.widget.AdapterView param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onNothingSelected", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
