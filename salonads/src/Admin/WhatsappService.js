import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.initializeClient();
  }

  initializeClient() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    this.client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr);
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('WhatsApp Client is ready!');
      this.isReady = true;
    });

    this.client.on('auth_failure', () => {
      console.log('Auth failure, restarting...');
      this.isReady = false;
    });

    this.client.initialize();
  }

  async sendMessage(number, message) {
    if (!this.isReady) {
      console.error('WhatsApp client is not ready yet');
      return false;
    }

    try {
      // Format number with country code (remove any non-digit characters)
      const formattedNumber = number.replace(/\D/g, '');
      
      // Check if number has country code, if not add default (you might want to customize this)
      const numberWithCountryCode = formattedNumber.startsWith('+') 
        ? formattedNumber 
        : `+91${formattedNumber}`; // Default to India code, change as needed
        
      const chatId = `${numberWithCountryCode}@c.us`;
      
      await this.client.sendMessage(chatId, message);
      console.log('Message sent successfully to', numberWithCountryCode);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const whatsappService = new WhatsAppService();