import LxCommunicator from 'lxcommunicator';

// Connection configuration
const connectionConfig = {
    url: 'wss://dns.loxonecloud.com/504F94D04BEF',
    username: 'admin',
    password: 'Modo@2023'
};

const loxoneService = {
    connection: null,

    // Initialize and establish a connection
    init: async function() {
        try {
            const { url, username, password } = connectionConfig;
            const auth = new LxCommunicator.Auth();
            const token = await auth.getToken(url, username, password);

            this.connection = new LxCommunicator.Connection(url, token);
            this.connection.connect();
            console.log('Connected to Loxone Miniserver');
        } catch (error) {
            console.error('Failed to connect to Loxone Miniserver:', error);
        }
    },

    // Toggle light function
    toggleLight: async function() {
        if (!this.connection) {
            console.error('No connection established.');
            return;
        }

        // Command to toggle the light, you may need to customize this based on your setup
        const lightControlUUID = 'replace_with_actual_light_uuid';

        try {
            await this.connection.sendCommand(`/jdev/sps/io/${lightControlUUID}/Pulse`);
            console.log('Light toggled successfully');
        } catch (error) {
            console.error('Failed to toggle the light:', error);
        }
    },

    // Function to get the light status
    getLightStatus: async function() {
        if (!this.connection) {
            console.error('No connection established.');
            return;
        }

        // Command to get the light status, customize as needed
        const lightStatusUUID = 'replace_with_actual_status_uuid';

        try {
            const status = await this.connection.sendCommand(`/jdev/sps/io/${lightStatusUUID}/Status`);
            console.log('Light status:', status);
            return status;
        } catch (error) {
            console.error('Failed to get light status:', error);
        }
    }
};

export default loxoneService;
