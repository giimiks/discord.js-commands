/*
    Poslání embedu s aktuální covid statistikou (čili statistikou do dnešních 8 hod. ráno)
    --------------------------------------------------------------------------------------
    
                                     Funguje pro Discord.js v12

                                    Instalace potřebných packagů:
                                        npm install discord.js
                                        npm install snekfetch
                                    -----------------------------

    https://v12.discordjs.guide/ - pro vytvoření vlastního Discord bota v Node.js
*/

const request = require('snekfetch')

/*          https://onemocneni-aktualne.mzcr.cz/prihlasit-se - vygenerujte si token, který patří sem ↓↓↓   */
request.get('https://onemocneni-aktualne.mzcr.cz/api/v3/zakladni-prehled?page=1&itemsPerPage=100&apiToken=',
    {
        headers: {
            accept: 'application/json'
        }
    })
    .then(res => {
        const body = res.body[0]
        console.log(body)

        /*     https://discord.js.org/#/docs/main/stable/class/MessageEmbed*/
        /*     ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ ↓↓↓ */
        const embed = new Discord.MessageEmbed()
            .setTitle(`Covid data ke včerejšímu dni (${body.provedene_testy_vcerejsi_den_datum})`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png')
            .setColor(0xFF0000)
            .addFields(
                { name: 'Provedené testy:', value: body.provedene_testy_celkem.toLocaleString(), inline: true },
                { name: 'Potvrzených případů za včerejší den:', value: body.potvrzene_pripady_vcerejsi_den.toLocaleString(), inline: true },
                { name: 'Provedených testů za včerejší den:', value: body.provedene_testy_vcerejsi_den.toLocaleString(), inline: true },
                { name: 'Aktivní případy:', value: body.aktivni_pripady.toLocaleString(), inline: true },
                { name: 'Aktuálně hospitalizovaní:', value: body.aktualne_hospitalizovani.toLocaleString(), inline: true },
                { name: 'Úmrtí:', value: body.umrti.toLocaleString(), inline: true },
                { name: 'Očkovaných celkem\n(dvěma dávkami):', value: body.ockovane_osoby_celkem.toLocaleString(), inline: true },
                { name: 'Očkovaných celkem\n(dvěma dávkami):', value: body.ockovane_osoby_celkem.toLocaleString(), inline: true },

            )
        /* Do kanálu, ve kterém byl zadán příkaz bot pošle tento embed */
        message.channel.send(embed) //Pro Discord.js v13 změnit na ({embeds: [embed]})
    })