package java.com.bge.lib;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;
/*
class UniqueId
{  
  private int counter;
  private MessageDigest md;

  public UniqueId() {
    counter = 0;
    md =  MessageDigest.getInstance("SHA-1"); 
  }

  public static String apply() throws NoSuchAlgorithmException {
      counter++;
      return byteArray2Hex(md.digest(counter));
  }

  private static String byteArray2Hex(final byte[] hash) {
    Formatter formatter = new Formatter();
    for (byte b : hash) {
        formatter.format("%02x", b);
    }
    return formatter.toString();
  }
}*/
