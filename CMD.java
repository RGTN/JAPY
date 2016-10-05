package main;

public class CMD extends ADAPTER{
	public String sys=System.getProperty("os.name")
	public static Boolean runcommand(command){
		Process process=Runtime.getRuntime().exec(command);
		return process.getExitValue();
	}
	public static Boolean interpreter(String cmd){
		Boolean rtrn=true;
		String sys=System.getProperty("os.name");
		if(sys.contains("Win")){}
		else if
		else{
			public
		}
		if(cmd==""){}
		else if(cmd.contains("run")){
			finishedcommand=cmd.replace("run ", "");
			returnstuff=ADAPTER.runCommand(finishedcommand);
			return returnstuff;
		}
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
