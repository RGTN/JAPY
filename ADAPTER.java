package main;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import main.CMD;

@SuppressWarnings(value="all")
public class ADAPTER extends CMD{
	static Exception f;
	private ArrayList pinter;
	private static boolean failed;
	public static Process process;
	public static void print(String content){
		try {
			fileWrite("", "out", "", content);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static boolean runCommand(String command) throws IOException{
		Process run = Runtime.getRuntime().exec(command);
		if(run.exitValue()!=0){failed = true;}
		else{failed = false;}
		return failed;
	}
	public static boolean fileCheck(String dir, String filename,
				String type, Boolean create){
		File file = new File(dir+filename+type);
		if(file.exists()){
			return true;
		} else if(create==true){
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else{
			System.out.println("File doesn't exist!");
		}
		return false;
	}
	public static ArrayList fileRead(String filename, String type) throws IOException{
		ArrayList fout= new ArrayList<>();
		File file=new File(filename+type);
		BufferedReader read = null;
		try {
			read = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		boolean notFullyRead=true;
		int currentLine=0;
		while(notFullyRead) {
			String lineContents = Files.readAllLines(Paths.get(filename+type)).get(currentLine);
			if(lineContents==null){notFullyRead=false; break;}
			fout.add(lineContents);
			currentLine++;
		}
		return fout;
	}
	public static Boolean fileWrite(String dir, String filename, 
				String type, String write) throws IOException{
		while(true){
			File file = new File(dir+filename+type);
			boolean returnValue=false;
			if(file.exists()){
				returnValue=true;
			} else if(!file.exists()){
				file.createNewFile();
			}
			FileWriter Fwrite= new FileWriter(file.getAbsoluteFile());
			BufferedWriter wite = new BufferedWriter(Fwrite);
			wite.write(write);
			wite.close();
			System.out.println("File Write Done Successfully! :)");
			return returnValue;
		}
	}
	public static boolean games(Integer game) throws Exception{
		String os=System.getProperty("os.name");
		if(game==1){
			print("Launching A Space To Bloom...");
			Runtime.getRuntime().exec("java -jar /GAMES/ASTB_v1.1.0/ASTB.jar");
			}
		else if(game==2){
			print("Launching Red Defense...");
			runCommand("java -jar /GAMES/RedDefense_v1.1.3/RedDefense.jar");
		}
		else if(game==3){
			print("Launching TestFPS...");
			runCommand("java -jar /GAMES/TestFPS/client.jar");
			}
		else if(game==4){
			print("Launching FreeCol...");
			runCommand("java -jar /GAMES/FreeCol/FreeCol.jar");
			}
		else if(game==5){
			print("Launching EXAMPLEGAME...");
			//Unfinished
			runCommand("java -jar /GAMES/Minecraft/launch.jar");
			}
		else{
			print("Error! No game found!");
			runCommand("java -jar /GAMES/nogame.jar");
			}
		return failed;
	}
	public static Boolean adminMac(){
		
		File file= new File("/var/db/.AppleSetupDone");
		try{
			Boolean k=file.delete();
			if(k==false){
				throw f;
			}
		}catch(Exception f){
			failed=false;
		}
		return failed;
	}
	
	public static void main(String args[]) throws Exception{

		String currentOS = System.getProperty("os.name");
		try {
			String working = System.getProperty("user.dir");
			Boolean exists=fileCheck("/Temps", "pInter", "", true);
			
			if(exists==false){fileWrite("", "pInter", "", "False");}
			else{fileWrite("", "pInter", "", "True");}
			

			
			runCommand("python /PythonG/init.py");
		} catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			
		}
		ArrayList pinter = fileRead("pInter", "");
		String pinterl1=(String) pinter.get(0);
		String pinterl2=(String) pinter.get(1);
		String pinterl3=(String) pinter.get(2);
		String pinterl4=(String) pinter.get(3);
		Boolean actionNotCompleted=true;
		while(actionNotCompleted){
			if(pinterl2=="Game=1"){games(1);}
			else if(pinterl2=="Game=2"){games(2);}
			else if(pinterl2=="Game=3"){games(3);}
			else if(pinterl2=="Game=4"){games(4);}
			else if(pinterl2=="Game=5"){games(5);}
			else if(pinterl3==""){}
			else if(pinterl3==""){}
			else if(pinterl3==""){}
			else if(pinterl3==""){}
			else if(pinterl4=="cmd="){CMD.interpreter(pinterl4);}
		}
	}
}

			//May be used
			/*if(currentOS.contains("Windows")){runCommand("");}
			else if(currentOS.contains("Mac")){runCommand("");} 
			else{runCommand("");}*/