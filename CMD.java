package main;

public class CMD extends ADAPTER{
	
	public static Boolean interpreter(String cmd){
		Boolean rtrn=true;
		String sys=System.getProperty("os.name");
		if(sys.contains("Win")){}
		if(cmd==""){}
		else if(cmd.contains("run")){ADAPTER.runCommand("death");}
		else if(cmd==""){}
		else if(cmd==""){}
		else if(cmd==""){}
		else if(cmd==""){}
		else if(cmd==""){}
		else if(cmd==""){}
		else if(cmd==""){}
		else if(cmd==""){}
		else{rtrn=false;}
		return rtrn;
	}
	
	public static void main(String[] args) throws Exception{

	}

}
