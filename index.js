const { ActivityType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } = require('discord.js');
const { token } = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
       Discord.GatewayIntentBits.Guilds,
       Discord.IntentsBitField.Flags.Guilds,
       Discord.IntentsBitField.Flags.GuildMessages,
       Discord.IntentsBitField.Flags.MessageContent
    ]
});

function handleCommand(msg) {
    const command = msg.content.split(' ').slice(0, 1)[0];
    
    console.log(`Komenda: '${command}'`);

    switch(command) {
        case '/mute':
            console.log('Obsluga /mute')
            const mutedRole = msg.guild.roles.cache.find((role) => role.name.includes('Muted'));

            if (!mutedRole) {
                msg.channel.send('Nie ma roli Muted na tym serwerze');
                break;
            }

            if (!msg.mentions.members.size) {
                msg.channel.send('**Użycie:** /mute @<nazwa użytownika>');
                break;
            }
            
            msg.channel.send(`Próbuję wyciszyć użytkownika za pomocą roli ${mutedRole.name}...`);
            const target = msg.mentions.members.first();
            target.roles.add(mutedRole);
            msg.channel.send(`${target.nickname} wyciszony`);
        break;
        case '/zajety':
            console.log(`Obsluga ${command}`)
            client.user.setStatus('dnd'); 
        break;
        case '/dostepny':
            console.log(`Obsluga ${command}`)
            client.user.setStatus('online'); 
        break;
        case '/spiacy':
            console.log(`Obsluga ${command}`)
            client.user.setStatus('idle'); 
        break;
        case '/awatar':
            console.log(`Obsluga ${command}`)
            const avatarurl = msg.mentions.users.at(0).defaultAvatarURL;
            msg.channel.send(avatarurl);
        break;
        default:
            console.log('Nie rozpoznałem komendy');
        break;
        case '/clowny':
            console.log('Obsluga /clowny')
            msg.channel.send("1. Julek zawsze wszytkich podcina na piłce, cwany jest jak nie wiem.");
            msg.channel.send("2. Width rozwalił mi już 5 serwerów, jak i mojego kolegi, ma już z 60 projektów i żaden mu nie wyszedł XD");
        break;
    }
}

client.once('ready', () => {
    console.log('Bot jest na stanowisku');

    client.user.setActivity('Twoich Poleceń!', { type: ActivityType.Listening });
});

client.on('messageCreate', msg => {
    
    if (msg.content.startsWith('/')) {
        console.log('Obsluguję komendę');
        handleCommand(msg)
    }
    else {
        console.log('Obsluguję wiadomość');
        switch (msg.content) {
            case "ping":
            msg.reply("Pong!");
            break;
            case 'o co tu chodzi':
                msg.reply(`na tym serwerze mozna kupowac pluginy ${msg.author.username}`);
            break;
        }
        }
    });

    
    client.on(Events.MessageCreate, (message) => {
        if(message.content != '?weryfikacja') return;
        let weryfikacjaembed = new EmbedBuilder()
        .setAuthor({ name: 'Zweryfikuj się!'})
        .setDescription( '> Aby dostać dostęp do kanałów, najpierw musisz się zweryfikować!')
        //.setThumbnail(client.user.displayAvatarURL())
        .setImage('https://cdn.discordapp.com/attachments/1099430306504769637/1104443798597152778/weryfikacja_-_arena_-_v2.png.png')
        .setFooter({ text: 'ArenaPvP - System weryfikacji', icon_url: message.author.displayAvatarURL() })
        .setColor('#FF0000')
    
        let weryfikacjaprzycisk = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel('Zweryfikuj konto!')
        .setCustomId('przyciskweryfikacji')

        const akcje = new ActionRowBuilder()
        .addComponents(
            weryfikacjaprzycisk
        );

        message.delete()

        message.channel.send({
            ephemeral: true,
            embeds: [ weryfikacjaembed ],
            components: [ akcje ]
        });
    
        client.on(Events.InteractionCreate, async(interaction) => {
            if (!interaction.isButton()) return;
            console.log(interaction);
            if(interaction.component.customId != 'przyciskweryfikacji') return;

            const member = interaction.member;
            await member.roles.add('1099035641624395796')
            let inverify = new EmbedBuilder()
            .setAuthor({ name: 'ArenaPvP.pl〡Dziękujemy!' })
            .setDescription('> Pomyślnie zweryfikowano! \n\ > Oraz nadano ci rangę.`')
            .setColor('#0000FF')
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: 'Bot〡ARENAPVP', icon_url: client.user.displayAvatarURL() })
            interaction.reply({ ephemeral: true, embeds: [ inverify ]})
        })
    });

    client.on(Events.MessageCreate, (message) => {
        if(message.content != '?regulamin') return;
        let regulaminembed = new EmbedBuilder()
        .setAuthor({ name: 'Regulamin - ArenaPvP.pl'})
        .setDescription( `> 《✰》‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒《✰》
        ︙       Postanowienia Ogólne
《✰》‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒《✰》

﹝1﹞ » Zakazuje się crashowania/ddosowania serwera.
﹝2﹞ » Administrator ma prawo ukarać osobę za podpunkt niewymieniony w regulaminie.
﹝3﹞ » Administracja serwera nie odpowiada za utraty konta w sposób: włam, słabe hasła czy udostępnianie swoich haseł postronnym osobom itp.
﹝4﹞ » Każdy gracz jest zobowiązany do przestrzegania regulaminu serwera.
﹝5﹞ » Regulamin może zmienić się w każdej chwili.
﹝6﹞ » Zachowuj się dobrze, jeżeli chcesz otrzymać szybką, sprawną pomoc.
﹝7﹞ » Zakazuje się kopiowania niniejszego regulaminu.
﹝8﹞ » Ubiegać się o unbana po niesłusznym banie możesz jedynie po nagraniu lub zdjęciu ekranu z następujących klientów/paczek:
BlazingPack 
LunarClient,
Badlion Client

《✰》‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒《✰》
        ︙      Zasady Dotyczące Rozgrywki
《✰》‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒《✰》

﹝1﹞ » Zakazuje się używania cheatów/skryptów które ułatwiają rozgrywkę. (wyjątkiem jest tryb Anarchia) (serduszka i zużycie seta na txt jest dozwolone)
﹝2﹞ » Zakazuje się nadmiernego obrażania graczy.
﹝3﹞ » Zakazuje się nadużywania chatu (spamu).
﹝4﹞ » Zakazuje się nadużywania wulgaryzmów.
﹝5﹞ » Zakazuje się wzbogacania kosztem serwera.
﹝6﹞ » Zakazuje się upubliczniania adresu IP swojego, graczy lub Administracji.
﹝7﹞ » Zakazuje się podszywania pod Administrację.
﹝8﹞ » Administracja nie ma obowiązku oddać ci itemów jeżeli nie masz dowodu że je miałeś.
﹝9﹞  » Zakazuje się żulenia od Administracji punktów oraz statystyk
﹝10﹞ » Zakaz proszenia Administracji jak i graczy o itemy/pieniądze
﹝11﹞  » Zakaz crashowania serwera używając maszyn do ddesowoania.
﹝12﹞ »  Zakazuje się wywoływania spamu - np. kto chce kase/vip pisze 123.
﹝13﹞ » Zakazuje się reklamowania innych serwerów Minecraft/Stron Internetowych/TeamSpeak3/Facebook itp.
﹝14﹞ » Zakazuje się upubliczniania danych osobowych innych użytkowników lub Administracji bez ich zgody
﹝15﹞ » Zakazuje się nagrywania Administratorów podczas sprawdzania.
﹝16﹞ » Zakazuje się utrudniania rozgrywki innym graczom i Administracji. 
﹝17﹞ » Zakazuje się reklamowania treści niezwiązanych z **ArenaPvP.pl**
﹝18﹞ » Zakazuje się grożenia Administracji serwera oraz graczom.
﹝19﹞ » Zakazuje się wprowadzania administracji i graczy w błąd.
﹝20﹞ » Zakazuje się używania LiteMatic. (o ile trwa event na danym trybie)
﹝21﹞ » Zakazuje się obrazy administracji jak i również graczy.
﹝22﹞ » Zakazuje się wykorzystywania błędów Serwera
﹝23﹞ » Zakazuje się scamu.

《✰》‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒《✰》
        ︙      Usługi Premium
《✰》‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒《✰》

﹝1﹞» Zakup usług premium jest dobrowolny
﹝2﹞» W przypadku otrzymania kary, Administracja nie odpowiada za utracone pieniądze
﹝3﹞» Wykonana transakcja nie podlega zwrotom.` )

        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: 'ArenaPvP - System regulaminu', icon_url: message.author.displayAvatarURL() })
        .setColor('#FF0000')
    
        let regulaminprzycisk = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel('Akceptuje regulamin!')
        .setCustomId('przyciskregulaminu')

        const akcje = new ActionRowBuilder()
        .addComponents(
            regulaminprzycisk
        );

        message.delete()

        message.channel.send({
            ephemeral: true,
            embeds: [ regulaminembed ],
            components: [ akcje ]
        });
    
        client.on(Events.InteractionCreate, async(interaction) => {
            if (!interaction.isButton()) return;
            console.log(interaction);
            if(interaction.component.customId != 'przyciskregulaminu') return;

            const member = interaction.member;
            await member.roles.add('1104426807517794314')
            let inverify = new EmbedBuilder()
            .setAuthor({ name: 'ArenaPvP.pl〡Dziękujemy!' })
            .setDescription('> Pomyślnie zaakcpetowano regulamin! :)`')
            .setColor('#0000FF')
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: 'Bot〡ARENAPVP', icon_url: client.user.displayAvatarURL() })
            interaction.reply({ ephemeral: true, embeds: [ inverify ]})
        })
    });

client.login(token);