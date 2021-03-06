Vue.config.devtools = true

const root = new Vue({
	el: '#root',
	data: {
		currentChat: 0,
		newString: '',
		contactSearch: '',
		newMessage: {
			date: '10/01/2020 15:50:00',
			text: '',
			status: 'sent'
		},
		user: {
			name: 'Elisa Toffoli',
			avatar: '_io'
		},
		contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				visible: true,
				messages: [{
					date: '10/01/2020 15:30:55',
					text: 'Hai portato a spasso il cane?',
					status: 'sent'
				},
				{
					date: '10/01/2020 15:50:00',
					text: 'Ricordati di dargli da mangiare',
					status: 'sent'
				},
				{
					date: '10/01/2020 16:15:22',
					text: 'Tutto fatto!',
					status: 'received'
				}
				],
			},
			{
				name: 'Fabio',
				avatar: '_2',
				visible: true,
				messages: [{
					date: '20/03/2020 16:30:00',
					text: 'Ciao come stai?',
					status: 'sent'
				},
				{
					date: '20/03/2020 16:30:55',
					text: 'Bene grazie! Stasera ci vediamo?',
					status: 'received'
				},
				{
					date: '20/03/2020 16:35:00',
					text: 'Mi piacerebbe ma devo andare a fare la spesa.',
					status: 'sent'
				}
				],
			},
			{
				name: 'Samuele',
				avatar: '_3',
				visible: true,
				messages: [{
					date: '28/03/2020 10:10:40',
					text: 'La Marianna va in campagna',
					status: 'received'
				},
				{
					date: '28/03/2020 10:20:10',
					text: 'Sicuro di non aver sbagliato chat?',
					status: 'sent'
				},
				{
					date: '28/03/2020 16:15:22',
					text: 'Ah scusa!',
					status: 'received'
				}
				],
			},
			{
				name: 'Luisa',
				avatar: '_6',
				visible: true,
				messages: [{
					date: '10/01/2020 15:30:55',
					text: 'Lo sai che ha aperto una nuova pizzeria?',
					status: 'sent'
				},
				{
					date: '10/01/2020 15:50:00',
					text: 'Si, ma preferirei andare al cinema',
					status: 'received'
				}
				],
			},
		],
	},
	methods: {
		setCurrentChat(index) {
			this.currentChat = (index);
		},
		autoReply(index) {
			setTimeout(() => {
				this.contacts[index].messages.push({
					date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
					text: 'ok',
					status: 'received'
				})
				console.log("timeout");
			}, 2000)
		},
		sendNewMessage(index) {
			if (this.newString.trim()) {
				this.contacts[index].messages.push({
					date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
					text: this.newString.trim(),
					status: 'sent'
				});
				this.autoReply(index);
			};
			this.newString = '';
		},
		searchBar() {
			this.contacts.forEach((contact => {
				if (!contact.name.toLowerCase().includes(this.contactSearch.toLowerCase())) {
					contact.visible = false;
				} else if (!this.contactSearch) contact.visible = true;
				else contact.visible = true;
			}))
		},
		removeMessage(index) {
			this.contacts[this.currentChat].messages.splice(index, 1)
		},
	}, watch: {
		contactSearch: function () {
			this.searchBar();
		}
	},
})