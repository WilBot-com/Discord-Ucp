const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "handleregist",
    description: "Menampilkan Panel Register Miracle ",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const msgEmbed = new MessageEmbed()
        .setAuthor({ name:"Miracle  Roleplay", iconURL:client.config.ICON_URL })
        .setColor("BLUE")
        .setImage(client.config.ICON_URL)
        .setTitle("User Control Panel Miracle  Roleplay")
        .setDescription("Halo Player!!, Selamat datang di Miracle  Roleplay, disini adalah tempat untuk mengatur User Control Panel anda Seperti Mendaftar, dll")
        .addField("Kegunaan Tombol", "• `『 🎫 Ambil Tiket 』:` \nSebagaimana dengan judulnya, ini merupakan tombol dimana kamu dapat mengambil Tiket (membuat akun UCP) Sebelum kamu bermain peran di Miracle Roleplay maka Tiket adalah kewajiban utama yang harus kamu miliki, disinilah tempatnya!.\n\n• `『 🔐 Resend Code 』:` \nKamu dapat melihat status tiketmu apakah sudah terverifikasi ataukah belum, kamu juga dapat melihat informasi kode verifikasi melalui ini jikalau kamu belum menerima DM dari BOT sebelumnya.\n\n• `『 🔑 Generate Code 』:` \nUntuk mengubah kode/pin akun UCP anda\n\n", true)					  
        .addField("Requirements Discord Account", "Akun Discord Harus Berumur 1 hari Paling Lambat, jika akun discord anda kurang dari 1 hari maka tidak akan bisa mengambil tiket, dan pengambilan tiket hanya berlaku satu kali.")
        .setFooter({ text:"Bot The Miracle " })
        .setTimestamp()

        const Buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("button-resendcode")
            .setLabel("ResendCode")
            //.setColor("BLUE")
            .setStyle("PRIMARY")
            .setEmoji("🔐"),
            
            new MessageButton()
            .setCustomId("button-register")
            .setLabel("Ambil Tiket")
            .setStyle("SUCCESS")
            .setEmoji("🎫"),
            
            new MessageButton()
            .setCustomId("button-gencode")
            .setLabel("Generate Code")
            .setStyle("PRIMARY")
            .setEmoji("🔑")
        )

        interaction.reply({  embeds: [msgEmbed], components: [Buttons] })
    },
};
