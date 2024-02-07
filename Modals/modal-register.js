const { CommandInteraction, MessageEmbed, WebhookClient } = require("discord.js")
const { Modal } = require("discord-modals");
const MysqlMerpati = require("../Mysql")
const MySQL = require("../Events/ready");
const client = require("../Merpati");
require("../Functions")

module.exports = {
    id: "modal-register",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;
        const currentDate = new Date();
        const inputName = interaction.fields.getTextInputValue('reg-name');
        var randCode = Math.floor(Math.random() * 99999) + 1;

        if(inputName.includes("_") === true) return IntError(interaction, "Nama akun User Control Panel Tidak boleh disertai dengan Simbol \"_\"");
        if(inputName.includes(" ") === true) return IntError(interaction, "Nama akun User Control Panel Tidak boleh disertai dengan Spasi")
        if(!/^[a-z]+$/i.test(inputName)) return IntError(interaction, "Nama akun User Control Panel Tidak boleh disertai dengan simbol ataupun angka!")
    
        MysqlMerpati.query(`SELECT * FROM playerucp WHERE ucp = '${inputName}'`, async(err, row) =>{
            if(row.length < 1) {
                await MysqlMerpati.query(`INSERT INTO playerucp SET ucp = '${inputName}', DiscordID = '${userid}', verifycode = '${randCode}'`);
                const msgEmbed = new MessageEmbed()
                .setAuthor({ name:"Passport Kota Miracle  Roleplay", iconURL:client.config.ICON_URL })
                .setDescription(`Yang terhormat, (\`${interaction.user.tag}\`)\n\nMohon perhatian anda, pengambilan Tiket masuk\nKota Miracle berhasil di lakukan.\nGunakan UCP untuk login ke dalam server!\n\nSegera masuk ke pintu utama kota miracle melalui\nPintu #1(login in-game)dan masukkan kode verifikasi di bawah ini!\n\n \`Pemilik Akun\`:\n ${userid}\n\n \`UCP\`:\n ${inputName}\n\n \`Verification code\`:\n ${randCode}\n\n \`Waktu Pendaftaran\`:\n <t:${Math.round(Date.now() / 1000)}:R> \n\n \`IP Address\`:\n 204.10.192.221\n\n \`PORT\`:\n 7006`)
                .setColor("BLUE")
                .setImage(client.config.ICON_TIKET)
                .setFooter({ text:"Bot The Miracle " })
                .setTimestamp()
                await interaction.user.send({ embeds:[msgEmbed] }).catch(error => {
                    interaction.reply({ content:"```\nTidak dapat mengirimkan kode/pin Verifikasi akun ucp anda, Silahkan gunakan command resendcode jika sudah melakukan intruksi di bawah ini:\n- INTRUKSI OPEN DIRECT MESSAGE -\n• Tips Pertama, Kamu Pergi Ke Pengaturan Discord\n• Tips Ke Dua, Pilih Privacy & Safety\n• Tips Ke Tiga, Pilih Do Not Scan\n```", ephemeral: true });
                })

                console.log(`\x1b[36m[BOT]: \x1b[0mUser \x1b[36m(${interaction.user.tag}) \x1b[0mTelah Berhasil mendaftarkan akun UCP nya dengan Nama \x1b[36m(${inputName}) \x1b[0mDan Pin \x1b[36m(${randCode})`)
                // const hook = new WebhookClient({ id: "1005134730779443330", token: "Rs_d0oEauXzaF3i4Pm4gUI-Puys1ur-H3GjxoM1GDY6au8k1LlkK4S5vBo2xODj47mRN" });
                // hook.send(`\`\`\`\nUser (${interaction.user.tag}) Telah Berhasil mendaftarkan akun UCP nya dengan Nama (${inputName}) Dan Pin (${randCode})\n\`\`\``)
                IntSucces(interaction, `Selamat akun User Control Panel Anda telah berhasil kami daftarkan, Silahkan cek Direct Message/DM Discord anda untuk mendapatkan Kode/Pin Verifikasi!`);

                const rUCP = await interaction.guild.roles.cache.get(client.config.ROLE_UCP);

                if(!interaction.member.permissions.has("ADMINISTRATOR")) {
                    interaction.member.roles.add(rUCP);
                    interaction.member.setNickname(`WARGA | ${inputName}`);
                }
            }
            else return IntError(interaction, "Maaf nama akun yang anda input telah terdaftar, Silahkan mencoba nama akun yang lain!");
        })
    }
}