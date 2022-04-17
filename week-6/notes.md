# Week-6 (17.04.2022)

Strapi -> Headless CMS

## Ödev

-	Searchbar yapacağız, autocomplete özelliği olacak. Searchbar a harf girdikçe önerilen en fazla 5 adet sonuç alacağız.
-	Searchbar a tıkladığımızda veya bir karaktere tıkladığımızda detay sayfası açılacak.
-	İngilizce ve Türkçe olmak üzere 2 ayrı dil olacak.
-	Bitirme ödevi bu değil, o pzt günü belli olacak.

## Multilanguage 

```npm i i18next react-i18next```

Öncelikle yapmamız gereken config dosyası oluşturmak. `i18next.js`

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	fallbackLng: 'tr',
	lng: 'tr',
	resources: {
		en: {
			translation: require(./constants/language/en.json) // bu dosyaya ingilizce kelimelerimizi yazacağız.
		},
		tr: {
			translation: require(./constants/language/tr.json) // bu dosyaya türkçe kelimelerimizi yazacağız.
		}

	},
	ns: ['translation'],
	defaultNS: 'translation'
})

i18n.languages = ['en', 'tr'];

export default i18n;
```

index.js dosyasında config dosyasını import etmemiz gerekiyor.
Daha sonrasında:

```jsx
// on any component that we want
import { useTranslation } from react-i18next; 

const { t } = useTranslation();

//on Any-text in same component
<strong>{t('auth.login')}</strong>

```

```json
/* Now we have to create our language files */
// constants/language/en.json
{
	"auth" : {
		"login":"Login",
		"email":"Email",
		"password":"Password",
	},
}

// constants/language/tr.json
{
	"auth" : {
		"login":"Giriş",
		"email":"E-posta",
		"password":"Şifre",
	},
}
```

> yup içerisindeki error mesajlarını da değiştirmeyi unutma!

```js
const changeLanguage = (lang) => {
	i18n.changeLanguage(lang)
}


<button onClick={() => changeLanguage('en')}>
	İngilizce
</button>

<button onClick={() => changeLanguage('tr')}>
	Türkçe<
</button>
```

> Mümkün mertebe useState içerisinde object veya array kullanmayın. Objelerin ve araylerin referans değerleri farklı olduğu için `{} == {} veya [] == [] eşit değil` re-render işlemi yapılıyor.

> Because [] creates a new array, so you are comparing one array object with another array object. It's not the contents of the arrays that is compared, the object references are compared. They are not equal because it's not the same object instance.

```useState(() => getValue(5))``` callback ile state atarsak sadece initialization'da bu callback'i koşar, daha sonrasında bizi işlemlerimizi yapabiliriz. Bu sebeple o yüzden callback ile değer almak önemli.

> useEffect'te dependency array'e objenin içerisinden bir değer verir isek örn. `[user.name]`. useState'de olduğu gibi re-render işlemine ihtiyacımız kalmıyor.