
function Client(ip, clientKey)
{
    this.ip = ip;
    this.get_ip = () => {
        return this.ip;
    }
}