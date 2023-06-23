export const PT_BR_DEFAULT_LOCALE_TEXT = {
    // Root
    noRowsLabel: "Nenhuma linha",
    noResultsOverlayLabel: "Nenhum resultado encontrado.",
    errorOverlayDefaultLabel: "Ocorreu um erro.",

    // Density selector toolbar button text
    toolbarDensity: "", //ELIMINAR O TEXTO DA LABEL DO BOTÃO
    toolbarDensityLabel: "Densidade",
    toolbarDensityCompact: "Compacto",
    toolbarDensityStandard: "Padrão",
    toolbarDensityComfortable: "Confortável",

    // Columns selector toolbar button text
    toolbarColumns: "", //ELIMINAR O TEXTO DA LABEL DO BOTÃO
    toolbarColumnsLabel: "Exibir seletor de colunas",

    // Filters toolbar button text
    toolbarFilters: "", //ELIMINAR O TEXTO DA LABEL DO BOTÃO
    toolbarFiltersLabel: "Exibir filtros",
    toolbarFiltersTooltipHide: "Ocultar filtros",
    toolbarFiltersTooltipShow: "Exibir filtros",
    toolbarFiltersTooltipActive: (count) => `${count} ${count !== 1 ? "filtros" : "filtro"} ${count !== 1 ? "ativos" : "ativo"}`,

    // Export selector toolbar button text
    toolbarExport: "", //ELIMINAR O TEXTO DA LABEL DO BOTÃO
    toolbarExportLabel: "Exportar",
    toolbarExportCSV: "Exportar em CSV",

    // Columns panel text
    columnsPanelTextFieldLabel: "Localizar coluna",
    columnsPanelTextFieldPlaceholder: "Título da coluna",
    columnsPanelDragIconLabel: "Reordenar coluna",
    columnsPanelShowAllButton: "Mostrar todas",
    columnsPanelHideAllButton: "Ocultar todas",

    // Filter panel text
    filterPanelAddFilter: "Adicionar filtro",
    filterPanelDeleteIconLabel: "Excluir",
    filterPanelOperators: "Operadores",
    filterPanelOperatorAnd: "E",
    filterPanelOperatorOr: "Ou",
    filterPanelColumns: "Colunas",
    filterPanelInputLabel: "Valor",
    filterPanelInputPlaceholder: "Filtrar valor",

    // Filter operators text
    filterOperatorContains: "contém",
    filterOperatorEquals: "é igual a",
    filterOperatorStartsWith: "começa com",
    filterOperatorEndsWith: "termina com",
    filterOperatorIs: "é",
    filterOperatorNot: "não é",
    filterOperatorOnOrAfter: "em ou após",
    filterOperatorBefore: "antes de",
    filterOperatorOnOrBefore: "em ou antes de",
    filterOperatorAfter: "após",
    filterOperatorIsEmpty: "está vazio",
    filterOperatorIsNotEmpty: "não está vazio",

    // Column menu text
    columnMenuLabel: "Menu",
    columnMenuShowColumns: "Exibir colunas",
    columnMenuFilter: "Filtrar",
    columnMenuHideColumn: "Ocultar",
    columnMenuUnsort: "Desfazer ordenação",
    columnMenuSortAsc: "Ordenar do menor para o maior",
    columnMenuSortDesc: "Ordenar do maior para o menor",

    // Column header text
    columnHeaderFiltersTooltipActive: (count) => `${count} ${count !== 1 ? "filtros" : "filtro"} ${count !== 1 ? "ativos" : "ativo"}`,
    columnHeaderFiltersLabel: "Exibir filtros",
    columnHeaderSortIconLabel: "Ordenar",

    // Rows selected footer text
    footerRowSelected: (count) => (count !== 1 ? `${count.toLocaleString()} linhas selecionadas` : `${count.toLocaleString()} linha selecionada`),

    // Total rows footer text
    footerTotalRows: "Total de linhas:",

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

    // Checkbox selection text
    checkboxSelectionHeaderName: "Seleção",

    // Boolean cell text
    booleanCellTrueLabel: "sim",
    booleanCellFalseLabel: "não",

    // Actions cell more text
    actionsCellMore: "mais",
    //toolbarQuickFilterPlaceholder: "", Texto já definido dentro da prop PLACEHOLDER no component Datagrid.
};
