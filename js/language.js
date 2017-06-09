var currentFile = window.location.pathname.split("/").pop().split(".html")[0];

var xml = 	"<language>" + 
				"<slo>" +
					"<title>Mikroskop</title>" +
					"<again>Ponastavi</again>" + 
					"<lng>Language</lng>" + 
					"<helpTitle>Avtorstvo</helpTitle>" + 
					"<helpContent>Igra je nastala v okviru predmeta Interaktivnost in oblikovanje informacij na Fakulteti za računalništvo in informatiko (Univerza v Ljubljani) pod mentorstvom prof. dr. Franca Soline in viš. pred. dr. Boruta Batagelja.</helpContent>" + 
					"<close>Zapri</close>" + 

					"<page name='index'>" +
						"<title>Poglejva vzorce kovin skozi mikroskop.</title>" +
						"<btn>Začni</btn>" +
					"</page>" +

					"<page name='sample'>" +
						"<title>IZBERI VZOREC</title>" +
						"<btn>Pripravi in poglej</btn>" +
					"</page>" +

					"<page name='scratch'>" +
						"<title>ZBRUSI IN SPOLIRAJ</title>" +
						"<btn>Nadaljuj</btn>" +
						"<content></content>" +
					"</page>" +

					"<page name='etch'>" +
						"<title>JEDKAJ</title>" +
						"<btn>Nadaljuj</btn>" +
						"<content></content>" +
					"</page>" +

					"<page name='microscope'>" +
						"<title></title>" +
						"<btn>Odgovori</btn>" +
						"<content></content>" +
					"</page>" +

					"<page name='result'>" +
						"<title>Katero kovino opazuješ?</title>" +
						"<btn>Nazaj</btn>" +
						"<content></content>" +

						"<iron>ŽELEZO</iron>" + 
						"<brass>MEDENINA</brass>" +
						"<nonmetalic>ŽELEZO Z NEKOVINSKIMI VKLJUČKI</nonmetalic>" +
						"<aluminium>ALUMINIJ</aluminium>" + 
						"<slag>ŽELEZO Z VKLJUČKI ŽLINDRE</slag>" +
					"</page>" +
				"</slo>" +

				"<eng>" +
					"<title>Microscope</title>" +
					"<again>Reset</again>" + 
					"<lng>Jezik</lng>" + 
					"<helpTitle>Copyright</helpTitle>" + 
					"<helpContent>Made in the context of the course Interaction and information design at the Faculty of Computer and Information Science (University of Ljubljana) under the mentorship of prof. dr. Franc Solina and sr. lect. dr. Borut Batagelj.</helpContent>" + 
					"<close>Close</close>" + 

					"<page name='index'>" +
						"<title>Let's look at the metal samples through the microscope.</title>" +
						"<btn>Start</btn>" +
					"</page>" +

					"<page name='sample'>" +
						"<title>SELECT A SAMPLE</title>" +
						"<btn>Prepare and inspect</btn>" +
					"</page>" +

					"<page name='scratch'>" +
						"<title>GRIND AND POLISH</title>" +
						"<btn>Continue</btn>" +
						"<content></content>" +
					"</page>" +

					"<page name='etch'>" +
						"<title>ETCH</title>" +
						"<btn>Continue</btn>" +
						"<content></content>" +
					"</page>" +

					"<page name='microscope'>" +
						"<title></title>" +
						"<btn>Answer</btn>" +
						"<content></content>" +
					"</page>" +

					"<page name='result'>" +
						"<title>Which metal are you looking at?</title>" +
						"<btn>Back</btn>" +
						"<content></content>" +

						"<iron>IRON</iron>" + 
						"<brass>BRASS</brass>" +
						"<nonmetalic>IRON WITH NON-METALLIC INCLUSIONS</nonmetalic>" + 
						"<aluminium>ALUMINIUM</aluminium>" + 
						"<slag>IRON WITH SLAG INCLUSIONS</slag>" +
					"</page>" +
				"</eng>" +
			"</language>",

	xmlDoc = $.parseXML( xml ),
  	$xml = $( xmlDoc );


if(QueryString().lang) {
    lang = QueryString().lang;

    changeLanguage(lang);
} else {
	changeLanguage("slo");
}


function changeLanguage(lang) {



	$language = $xml.find(lang);

	$title = $language.find("title:first");
	$again = $language.find("again");
	$helpTitle = $language.find("helpTitle");
	$helpContent = $language.find("helpContent");
	$close = $language.find("close");
	$lng = $language.find("lng");

	if (currentFile === "")
		currentFile = "index";

	$page = $language.find("page[name='" + currentFile + "']");
	$pageTitle = $page.find("title");
	$pageBtn = $page.find("btn");
	$pageContent = $page.find("content");

		

	$("title").html($title.text());
	$(".header-left h3").html($title.text());
	// $("#again").html('<i class="fa fa-power-off" aria-hidden="true"></i> ' + $again.text());
	$("#again").html('<i class="fa fa-power-off" aria-hidden="true"></i> ' + $again.text());
	$("#lng").html($lng.text());

	$(".modal-title").html($helpTitle.text());
	$(".modal-body").html($helpContent.text());
	$(".modal-footer button").html($close.text());

	$("#pageTitle").html($pageTitle.text());
	$(".sidBtn").html($pageBtn.text());
	$(".pageContent").html("<p>" + $pageContent.text() + "</p>");


	var url = $(".sidBtn").attr("href").split("/").pop().split(".html")[0] + ".html";
	if (QueryString().sid) {
		if (QueryString().lang)
			$(".sidBtn").attr("href",url+"?sid=" + QueryString().sid +"&lang=" + QueryString().lang);
		else
			$(".sidBtn").attr("href",url+"?sid=" + QueryString().sid);
	}  
	    

	else
		$(".sidBtn").attr("href",url+"?lang=" + lang);

	if (currentFile === "result") {
		$iron = $page.find("iron");
		$brass = $page.find("brass");
		$nonmetalic = $page.find("nonmetalic");
		$aluminium = $page.find("aluminium");
		$slag = $page.find("slag");

		$("#iron").html("<text>" + $iron.text() + "</text>");
		$("#brass").html("<text>" + $brass.text() + "</text>");
		$("#nonmetalic").html("<text>" + $nonmetalic.text() + "</text>");
		$("#aluminium").html("<text>" + $aluminium.text() + "</text>");
		$("#slag").html("<text>" + $slag.text() + "</text>");
	}
}


$(".lang").click(function() {
	lang = $(this).html().toLowerCase();


	if (vars.length == 1)
		vars[0] = "lang=" + lang;
	else
		vars[1] = "lang=" + lang;

	changeLanguage(lang);
	window.location.href = window.location.href.split("?")[0] + (QueryString().sid ? "?sid="+QueryString().sid + "&" : "?") + 'lang=' + lang;
});


