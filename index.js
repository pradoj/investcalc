(function() {
    $("form").submit(function(event){
        $(this).blur();
        return false;
    });

    $("form :input").bind("change keyup click", function(event){
        var InvestCalc = {};
        InvestCalc.impostoRenda = ($("input[name='imposto-renda']:checked").val() == true);
        InvestCalc.prazo = parseInt($("input[name='prazo']:checked").val());
        InvestCalc.taxa =  parseFloat($("input[name='taxa']").val());
        InvestCalc.taxaEquivalente = [];

        if (InvestCalc.impostoRenda) {
            InvestCalc.taxaEquivalente = [
                InvestCalc.taxa * (1 - 0.225),
                InvestCalc.taxa * (1 - 0.20),
                InvestCalc.taxa * (1 - 0.175),
                InvestCalc.taxa * (1 - 0.15),
            ];
        } else {
            InvestCalc.taxaEquivalente = [
                InvestCalc.taxa / (1 - 0.225),
                InvestCalc.taxa / (1 - 0.20),
                InvestCalc.taxa / (1 - 0.175),
                InvestCalc.taxa / (1 - 0.15),
            ];
        }

        $("#prazo-0").html(accounting.formatMoney(InvestCalc.taxaEquivalente[0], '', 2, ".", ","));
        $("#prazo-6").html(accounting.formatMoney(InvestCalc.taxaEquivalente[1], '', 2, ".", ","));
        $("#prazo-12").html(accounting.formatMoney(InvestCalc.taxaEquivalente[2], '', 2, ".", ","));
        $("#prazo-24").html(accounting.formatMoney(InvestCalc.taxaEquivalente[3], '', 2, ".", ","));

        // cor linha
        if (InvestCalc.impostoRenda) {
            $("tbody > tr")
                .addClass("bg-info").removeClass("bg-warning");
            $("thead > tr")
                .addClass("bg-warning").removeClass("bg-info");
        } else {
            $("tbody > tr")
                .addClass("bg-warning").removeClass("bg-info");
            $("thead > tr")
                .addClass("bg-info").removeClass("bg-warning");
        }

        // cor inputs
        var labelForIr = "label[for='imposto-renda-FOR']";
        var textFor;
        if (InvestCalc.impostoRenda) {
            labelForIr = labelForIr.replace("FOR", "tributado");
            textFor = "tributado";
        } else {
            labelForIr = labelForIr.replace("FOR", "isento");
            textFor = "isento";
        }
        $(labelForIr)
            .addClass("bg-info").removeClass("bg-warning");
        $("#imposto-renda label:not([for=imposto-renda-" + textFor + "])")
            .addClass("bg-warning").removeClass("bg-info");

        // cor body
        if (InvestCalc.impostoRenda) {
            $("body")
                .addClass("bg-warning").removeClass("bg-info");
        } else {
            $("body")
                .addClass("bg-info").removeClass("bg-warning");
        }

        // nome taxa equivalente
        if (InvestCalc.impostoRenda) {
            $("#taxa-equivalente").text("Isento");
        } else {
            $("#taxa-equivalente").text("Tributado");
        }
    });

})();

