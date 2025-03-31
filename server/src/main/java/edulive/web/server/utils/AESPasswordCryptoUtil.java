package edulive.web.server.utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Random;

public class AESPasswordCryptoUtil {

    public static SecretKey generateSecretKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        return keyGen.generateKey();
    }

    public static String encrypt(String data, SecretKey secretKey) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static String decrypt(String encryptedData, SecretKey secretKey) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decodedData = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData);
    }

    public static String encodeKeyToString(SecretKey secretKey) {
        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }

    public static SecretKey decodeKeyFromString(String encodedKey) {
        byte[] decodedKey = Base64.getDecoder().decode(encodedKey);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
    }

    public static String genPassword(Long charter) {
        String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String specialChars = "!@#$%^&*()-_+=<>?/";
        String digits = "0123456789";
        String lowerCase = "abcdefghijklmnopqrstuvwxyz";
        String allChars = upperCase + specialChars + digits + lowerCase;
        Random random = new Random();

        char randomUpperCase = upperCase.charAt(random.nextInt(upperCase.length()));
        char randomSpecialChar = specialChars.charAt(random.nextInt(specialChars.length()));

        StringBuilder password = new StringBuilder();
        password.append(randomUpperCase);
        password.append(randomSpecialChar);

        for (int i = 0; i < charter - 2; i++) {
            password.append(allChars.charAt(random.nextInt(allChars.length())));
        }

        char[] passwordArray = password.toString().toCharArray();
        for (int i = 0; i < passwordArray.length; i++) {
            int randomIndex = random.nextInt(passwordArray.length);
            char temp = passwordArray[i];
            passwordArray[i] = passwordArray[randomIndex];
            passwordArray[randomIndex] = temp;
        }

        return new String(passwordArray);
    }

    public static void main(String[] args) {
        try {
            SecretKey secretKey = AESPasswordCryptoUtil.generateSecretKey();

            System.out.println(secretKey);

            String pass = "HaoVe01";
            String encryptedPassword = AESPasswordCryptoUtil.encrypt(pass, secretKey);
            System.out.println("Encrypted Password: " + encryptedPassword);

            String decryptedPassword = AESPasswordCryptoUtil.decrypt(encryptedPassword, secretKey);
            System.out.println("Decrypted Password: " + decryptedPassword);

            String encodedKey = AESPasswordCryptoUtil.encodeKeyToString(secretKey);
            System.out.println("Encoded Key: " + encodedKey);

            SecretKey restoredKey = AESPasswordCryptoUtil.decodeKeyFromString(encodedKey);

            String decryptedPasswordWithRestoredKey = AESPasswordCryptoUtil.decrypt(encryptedPassword, restoredKey);
            System.out.println("Decrypted Email with Restored Key: " + decryptedPasswordWithRestoredKey);

            Long charter = 8L;
            System.out.println("AESPasswordCryptoUtil.genPassword(charter): " + AESPasswordCryptoUtil.genPassword(charter));
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }
}
