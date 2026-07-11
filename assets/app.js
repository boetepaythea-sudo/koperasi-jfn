 </style>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
        <!-- XLSX -->
        <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
    </head>

    <body>
        <!-- LOGIN -->
        <div class="login-page" id="loginPage">
            <div class="login-box">
                <div class="text-center mb-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJU8NnrW7TQ1QSEQpI1FwRwsOEZkVDKjYd8gILg5q1g&s=10"
                        class="app-logo" alt="Logo">
                    <h2 class="text-white mt-2">ERP Prema Rasa</h2>
                </div>
                <div class="text-white mb-3">
                    <label>Email</label>
                    <input type="email" id="email" class="form-control">
                </div>
                <div class="text-white mb-3">
                    <label>Password</label>
                    <input type="password" id="password" class="form-control">
                </div>
                <button class="btn btn-warning w-100" onclick="login()">
                    LOGIN
                </button>
                <div id="error" class="text-danger mt-3"></div>
            </div>
        </div>
        <!-- DASHBOARD -->
        <div class="dashboard" id="dashboardPage">
            <!-- SIDEBAR -->
            <div class="sidebar">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJU8NnrW7TQ1QSEQpI1FwRwsOEZkVDKjYd8gILg5q1g&s=10"
                    class="sidebar-logo" alt="Logo">
                <h2 class="text-white mt-2">ERP Prema Rasa</h2>

                <a href="#" onclick="showPage('dashboard')">
                    <i class="fa-solid fa-chart-line"></i>
                    Dashboard
                </a>

                <!-- ================= PRODUKSI MENU ================= -->
                <a href="#" onclick="toggleProduksi()">
                    <i class="fa-solid fa-industry"></i>
                    MRP Production
                </a>
                <div id="produksiSubMenu" style="display:none; padding-left:20px;">
                    <a href="#" onclick="showPage('produksi_input')">- MRP Recipe Production</a>
                    <a href="#" onclick="showPage('produksi_hasil');loadProductionOrdersToResultSelect();">-
                        Production Data FG</a>
                    <a href="#" onclick="showPage('input_waste')">- Waste Data</a>
                </div>

                <!-- ================= MARKETING MENU ================= -->
                <a href="#" onclick="toggleMarketing()">
                    <i class="fa-solid fa-bullhorn"></i>
                    Marketing
                </a>
                <div id="marketingSubMenu" style="display:none; padding-left:20px;">
                    <a href="#" onclick="showPage('marketing_toko')">- Data Store</a>
                    <a href="#" onclick="openSalesFGPage()">- Sales FG</a>
                    <a href="#" onclick="openMarketingSales()">- Sales Value</a>
                    <a href="#" onclick="showPage('marketing_report'); loadSalesReport()">- Report Sales</a>
                </div>

                <!-- ================= ACCOUNTING MENU ================= -->
                <li>
                    <a href="#" onclick="toggleAccounting()">
                        <i class="fa-solid fa-coins"></i>
                        Accounting
                    </a>
                    <!-- SUB MENU -->
                    <div id="accountingSubMenu" class="submenu" style="display:none; padding-left:15px;">

                        <a href="#" onclick="openAccountingReport()">
                            - Report Data COGS
                        </a>
                    </div>
                </li>
                <!-- ================= BACK TO DASHBOARD MADE BALI ================= -->
                <a href="https://erpmadebali.github.io/Made-Bali-System/">
                    <i class="fa-solid fa-earth-asia"></i>
                    Made Bali App
                </a>
                <!-- ================= LOGOUT MENU ================= -->
                <a href="#" onclick="logout()">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Logout
                </a>
                <!-- ================= ADMIN MENU ================= -->
                <a href="https://s.id/atrisna" target="_blank">
                    <i class="fa-solid fa-user-shield"></i>
                    Admin
                </a>
            </div>
            <!-- CONTENT -->
            <div class="main">
                <div class="topbar d-flex justify-content-between align-items-center">
                    <!-- Text Berjalan -->
                    <div class="marquee-container">
                        <div class="marquee-text">
                            Dashboard Production & Sales of Prema Rasa | Monitoring Produksi dan Penjualan Secara
                            Real-Time | Aneka Camilan Khas Bali......
                        </div>
                    </div>
                    <div class="text-end">
                        <div id="hari" class="fw-bold"></div>
                        <div id="tanggal"></div>
                        <div id="jam"></div>
                        <div id="userEmail"></div>
                    </div>
                </div>
                <!-- DASHBOARD -->
                <div class="content">
                    <div id="dashboard" class="menu-page active-page">
                        <!-- FILTER -->
                        <div class="row mb-3">
                            <div class="col-md-2">
                                <select id="dashMonth" class="form-control"></select>
                            </div>
                            <div class="col-md-2">
                                <select id="dashYear" class="form-control"></select>
                            </div>
                        </div>
                        <!-- STAT -->
                        <div class="row mb-4">
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Total Sales</h6>
                                    <h2 id="dashTotalSales">Rp 0</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Total Production</h6>
                                    <h2 id="dashTotalProduction">0 Pcs</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Hpp & Cost Production</h6>
                                    <h2 id="dashTotalCostProduction">Rp 0</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card">
                                    <h6>Net Profit</h6>
                                    <h2 id="dashNettProfit">Rp 0</h2>
                                </div>
                            </div>
                        </div>
                        <!-- CHART -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card-custom">
                                    <h5>Chart Sales Per Year</h5>
                                    <canvas id="salesChart"></canvas>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card-custom">
                                    <h5>Chart Production</h5>
                                    <canvas id="productionChart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <div class="card-custom">
                                    <h5>Best Selling Product Variants</h5>
                                    <canvas id="variantChart"></canvas>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card-custom">
                                    <h5>Best Sales Store </h5>
                                    <canvas id="storeChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- MASTER DATA -->
                    <div id="masterdata" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-3">
                                <i class="fa-solid fa-database"></i>
                                Master Data
                            </h3>
                            <hr>
                            <!-- INI TEMPAT FORM MUNCUL -->
                            <div id="masterContent"></div>
                        </div>
                    </div>
                    <!-- INPUT DATA PRODUCTION MRP -->
                    <div id="produksi_input" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-industry"></i>
                                Produkction MRP
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-layer-group"></i>
                                Input Recipe Production
                            </h5>
                            <div class="section-divider"></div>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Product</label>
                                    <select id="prodProduct" class="form-control"></select>
                                </div>
                                <div class="col-md-3">
                                    <label>Qty Production</label>
                                    <input type="number" id="prodQty" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Prodction Date</label>
                                    <input type="date" id="prodDate" class="form-control">
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-warning w-100" onclick="saveProduction()">
                                        Save production
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- LIST PRODUKSI -->
                        <div class="card-custom">
                            <div class="row align-items-end mb-3">
                                <div class="col-md-3">
                                    <label>Year</label>
                                    <select id="productionYear" class="form-control"
                                        onchange="loadProductionListData()">
                                    </select>
                                </div>
                                <div class="row mt-1">
                                    <h5 class="text-dark mb-3">
                                        Tabel Data Recipe Production
                                    </h5>
                                </div>
                            </div>
                            <table class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Production Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="productionList"></tbody>
                            </table>
                        </div>
                    </div>
                    <!-- COGS PRODUKSI -->
                    <div id="productioncogs" class="menu-page">
                        <div class="card-custom">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h3 class="text-dark">
                                    COGS Production Report
                                </h3>
                                <button class="btn btn-secondary" onclick="backProduction()">
                                    <i class="fa fa-arrow-left"></i>
                                    Back
                                </button>
                            </div>
                            <h4 id="productionCogsTitle"></h4>
                            <table class="table table-light table-striped mt-4">
                                <thead>
                                    <tr>
                                        <th>PLU Code</th>
                                        <th>Raw Material</th>
                                        <th>UOM</th>
                                        <th>Weight Recipe</th>
                                        <th>Price Average</th>
                                        <th>Weight Production</th>
                                        <th>Cost Production</th>
                                    </tr>
                                </thead>
                                <tbody id="productionCogsTable"></tbody>
                            </table>
                            <div class="text-end mt-3">
                                <h4 class="text-dark">
                                    Total Cost :
                                    <span id="productionCogsTotal"></span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <!-- INPUT HASIL PRODUKSI -->
                    <div id="produksi_hasil" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-industry"></i>
                                Production MRP
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-boxes-packing"></i>
                                Input Finish Good
                            </h5>
                            <div class="section-divider"></div>
                            <!-- FORM INPUT -->
                            <div class="row mb-4">
                                <div class="col-md-3">
                                    <label>Select Produk</label>
                                    <select id="resProduct" class="form-control"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>FG PCS</label>
                                    <input type="number" id="resFgPcs" class="form-control">
                                </div>
                                <div class="col-md-2">
                                    <label>FG BOX</label>
                                    <input type="number" id="resFgBox" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Production Date</label>
                                    <input type="date" id="resDate" class="form-control">
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-warning w-100" onclick="saveProductionResult()">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- FILTER -->
                        <div class="card-custom">
                            <div class="row mb-4">
                                <div class="col-md-3">
                                    <label>Start Date</label>
                                    <input type="date" id="prodStartDate" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>End Date</label>
                                    <input type="date" id="prodEndDate" class="form-control">
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-info w-100" onclick="loadProductionResult()">
                                        Filter
                                    </button>
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-warning w-100" onclick="viewForecastProduction()">
                                        View Forecast
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <h5 class="text-dark mb-3">
                                    Tabel Data Finished Good Production
                                </h5>
                            </div>
                            <!-- TABLE HASIL PRODUKSI -->
                            <table class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Code</th>
                                        <th>Product Name</th>
                                        <th>FG PCS</th>
                                        <th>FG BOX</th>
                                        <th>Production Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="productionResultList"></tbody>
                            </table>
                        </div>
                    </div>
                    <!-- FORECAST PRODUKSI -->
                    <div id="forecast_production" class="menu-page">
                        <div class="card-custom">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h3 class="text-dark" id="forecastProductionTitle">
                                    Production Forecase
                                </h3>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-danger w-100" onclick="exportForecastPDF()">
                                        Export PDF
                                    </button>
                                </div>
                                <button class="btn btn-secondary" onclick="showPage('produksi_hasil')">
                                    <i class="fa fa-arrow-left"></i>
                                    Back
                                </button>
                            </div>
                            <!-- TABLE FINISHED GOODS HASIL PRODUKSI -->
                            <table id="finishedGoodsForecastTable" class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Code</th>
                                        <th>Product Name</th>
                                        <th>FG PCS</th>
                                        <th>FG BOX</th>
                                        <th>Production Date</th>
                                    </tr>
                                </thead>
                                <tbody id="productionForecastTable"></tbody>
                            </table>
                        </div>
                        <!-- TABLE MATERIAL FORECAST -->
                        <div class="card-custom mt-4">
                            <h5 class="mb-3">Material Forecast Production</h5>
                            <table id="materialForecastTable" class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Materials Code</th>
                                        <th>Materials Name</th>
                                        <th>UOM</th>
                                        <th>Weight</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody id="forecastProductionTable"></tbody>
                            </table>
                            <!-- TOTAL -->
                            <div class="text-end mt-4">
                                <h4 class="text-dark">
                                    Total Forecast :
                                    <span id="forecastProductionTotal">
                                        Rp 0
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <!-- ================= INPUT WASTE MENU ================= -->
                    <div id="input_waste" class="menu-page">
                        <h3 class="text-dark mb-4">
                            <i class="fa-solid fa-industry"></i>
                            Production MRP
                        </h3>
                        <div class="section-divider"></div>
                        <h5 class="text-dark mb-3">
                            <i class="fa-solid fa-trash-can me-2"></i>
                            INPUT DATA WASTE FG & RAW MATERIALS
                        </h5>
                        <div class="section-divider"></div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <button class="btn btn-danger w-100 p-4" onclick="openWasteFGPage()">
                                    INPUT WASTE FINISHED GOOD
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- ================= WASTE FG PAGE ================= -->
                    <div id="produksi_waste_fg" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-trash-can me-2"></i>
                                INPUT WASTE
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-box-open me-2"></i>
                                Input Waste Finished Good
                            </h5>
                            <div class="section-divider"></div>
                            <div class="row mb-3">
                                <div class="col-md-4">
                                    <label>Produk</label>
                                    <select id="wasteFgProduct" class="form-control">
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label>Qty PCS</label>
                                    <input type="number" id="wasteFgQty" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Tanggal</label>
                                    <input type="date" id="wasteFgDate" class="form-control">
                                </div>
                                <div class="col-md-3 d-flex align-items-end">
                                    <button class="btn btn-danger w-100" onclick="saveWasteFG()">
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <!-- FILTER FINISH GOOD -->
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <input type="date" id="wasteFgStart" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="wasteFgEnd" class="form-control">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-info w-100" onclick="loadWasteFGTable()">
                                        Filter
                                    </button>
                                </div>
                            </div>
                            <!-- TABLE -->
                            <table class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Code</th>
                                        <th>Product Name</th>
                                        <th>Qty Waste</th>
                                        <th>Expired Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="wasteFGList"></tbody>
                            </table>
                            <button class="btn btn-secondary mt-3" onclick="showPage('input_waste')">
                                Back
                            </button>
                        </div>
                    </div>
                    <!-- MARKETING MENU -->
                    <div id="marketing_toko" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-bullhorn"></i>
                                Marketing
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-shop"></i>
                                Input Data Store
                            </h5>
                            <div class="section-divider"></div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label>PLU Code</label>
                                    <input type="text" id="storeCode" class="form-control auto-field" readonly>
                                </div>
                                <div class="col-md-3">
                                    <label>Store Name</label>
                                    <input type="text" id="storeName" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Address Store</label>
                                    <input type="text" id="storeAddress" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>Contact/Mobile Phone</label>
                                    <input type="text" id="storePhone" class="form-control">
                                </div>
                            </div>
                            <button class="btn btn-warning mt-3 w-100" onclick="saveStore()">
                                Save
                            </button>
                            <table class="table table-light mt-4">
                                <thead>
                                    <tr>
                                        <th>PLU Code</th>
                                        <th>Store Name</th>
                                        <th>Address Store</th>
                                        <th>Contact/Mobile Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="storeList"></tbody>
                            </table>
                        </div>
                    </div>
                    <!-- SALES FINISH GOOD -->
                    <div id="salesFinishGood" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-bullhorn"></i>
                                Marketing
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-box-open me-2"></i>
                                Input Sales finished Good
                            </h5>
                            <div class="section-divider"></div>
                            <!-- HEADER -->
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Store</label>
                                    <select id="salesFGStore" class="form-control">
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label>Select Date</label>
                                    <input type="date" id="salesFGDate" class="form-control">
                                </div>
                                <div class="col-md-4 d-flex align-items-end">
                                    <button class="btn btn-warning w-100" onclick="addSalesFGRow()">
                                        <i class="fa fa-plus"></i>
                                        Add Product
                                    </button>
                                </div>
                            </div>
                            <!-- TABLE -->
                            <div class="table-responsive mt-4">
                                <table class="table table-light table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Qty Box</th>
                                            <th>Qty PCS</th>
                                            <th>Price / Box</th>
                                            <th>Total Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="salesFGTable"></tbody>
                                </table>
                            </div>
                            <!-- SAVE -->
                            <button class="btn btn-success w-100 mt-3" onclick="saveSalesFG()">
                                Save FG Sales
                            </button>
                            <hr>
                            <!-- TABEL DATA SALES FG -->
                            <div class="mt-4">
                                <h5 class="text-dark mb-3">
                                    Finished Goods Sales Data Report
                                </h5>
                                <div class="row align-items-end mb-3">
                                    <div class="col-md-3">
                                        <label>Month</label>
                                        <select id="salesFGMonth" class="form-control" onchange="loadSalesFGTable()">
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label>Year</label>
                                        <select id="salesFGYear" class="form-control" onchange="loadSalesFGTable()">
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label>Total Sales FG Value</label>
                                        <div class="form-control bg-warning-subtle fw-bold">
                                            <span id="salesFGTotal">Rp 0</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-light table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Qty Box</th>
                                                <th>Qty PCS</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                                <th>Sales Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="salesFGList"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- INPUT DATA SALES VALUE -->
                    <div id="marketing_sales" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-bullhorn"></i>
                                Marketing
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                Input Sales Value
                            </h5>
                            <div class="section-divider"></div>
                            <!-- INPUT -->
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Toko</label>
                                    <select id="salesStore" class="form-control"></select>
                                </div>
                                <div class="col-md-4">
                                    <label>Sales Value</label>
                                    <input type="number" id="salesValue" class="form-control">
                                </div>
                                <div class="col-md-4">
                                    <label>Tanggal</label>
                                    <input type="date" id="salesDate" class="form-control">
                                </div>
                            </div>
                            <button class="btn btn-warning mt-3 w-100" onclick="saveSales()">
                                Save Sales
                            </button>
                            <hr>
                            <h5 class="text-dark mb-3">
                                Sales Value Data Report Table
                            </h5>
                            <!-- FILTER -->
                            <div class="row align-items-end mb-3">
                                <div class="col-md-3">
                                    <label>Year</label>
                                    <select id="salesYear" class="form-control" onchange="loadSalesTable()">
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Total Sales Value</label>
                                    <div class="form-control bg-warning-subtle fw-bold">
                                        <span id="salesTotal">Rp 0</span>
                                    </div>
                                </div>
                            </div>
                            <!-- TABEL -->
                            <table class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Store Code</th>
                                        <th>Store Name</th>
                                        <th>Sales Value</th>
                                        <th>Sales Date</th>
                                        <th width="120">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="salesList"></tbody>
                            </table>
                        </div>
                    </div>
                    <!-- SUMMARY TABEL DATA SALES VALUE -->
                    <div id="marketing_report" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-bullhorn"></i>
                                Marketing
                            </h3>
                            <div class="section-divider"></div>
                            <h5 class="text-dark mb-3">
                                <i class="fa-solid fa-chart-column me-2"></i>
                                Summary Report Sales
                            </h5>
                            <div class="section-divider"></div>
                            <div class="col-md-4">
                                <label>Select date</label>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <input type="date" id="salesStartDate" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="salesEndDate" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-warning w-100" onclick="loadSalesReport()">
                                        Filter
                                    </button>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-danger w-100" onclick="exportSalesPDF()">
                                        <i class="fa fa-file-pdf"></i> Export PDF
                                    </button>
                                </div>
                            </div>
                            <div id="salesReportTotal" style="margin-bottom:10px; font-size:18px; color:#0c0d0d;">
                                Total Sales: Rp 0
                            </div>
                            <table id="salesReportExportTable" class="table table-light">
                                <thead>
                                    <tr>
                                        <th>Store Code</th>
                                        <th>Store Name</th>
                                        <th>Sales Value</th>
                                        <th>Sales Date</th>
                                    </tr>
                                </thead>
                                <tbody id="salesReportList"></tbody>
                            </table>
                        </div>
                    </div>
                    <!-- ================= ACCOUNTING REPORT MENU ================= -->
                    <div id="accounting_report" class="menu-page">
                        <div class="card-custom">
                            <h3 class="text-dark mb-4">
                                <i class="fa-solid fa-file-lines"></i>
                                Accounting Report
                            </h3>
                            <div class="section-divider"></div>
                            <!-- REPORT GRID -->
                            <div id="reportGrid" class="report-grid">

                                <div class="report-card" onclick="openReport('production')">
                                    <i class="fa-solid fa-industry fa-3x"></i>
                                    <h5>Production</h5>
                                </div>

                                <div class="report-card" onclick="openReport('profitloss')">
                                    <i class="fa-solid fa-chart-line fa-3x"></i>
                                    <h5>Profit & Loss</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ================= REPORT DETAIL PAGE ================= -->
                    <div id="report_detail" class="menu-page" style="display:none;">
                        <div class="card-custom">
                            <!-- TITLE -->
                            <h3 id="reportTitle" class="text-dark mb-4">
                                Report Detail
                            </h3>
                            <div class="section-divider"></div>
                            <!-- FILTER -->
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <label>Start Date</label>
                                    <input type="date" id="reportStartDate" class="form-control">
                                </div>
                                <div class="col-md-3">
                                    <label>End Date</label>
                                    <input type="date" id="reportEndDate" class="form-control">
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-warning w-100" onclick="loadSelectedReport()">
                                        Load Data
                                    </button>
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-danger w-100" onclick="exportReportPDF()">
                                        Export PDF
                                    </button>
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-secondary w-100" onclick="backToReportMenu()">
                                        Back
                                    </button>
                                </div>
                                <!-- TABLE -->
                                <div id="generalReportArea">
                                    <h5 id="reportSubTitle" class="text-dark mb-3"></h5>
                                    <table class="table table-light table-striped">
                                        <thead id="reportHead"></thead>
                                        <tbody id="reportBody"></tbody>
                                    </table>
                                </div>
                                <!-- TABLE REPORT PRODUCTION-->
                                <div id="productionReportArea" style="display:none;">
                                    <h5 class="text-dark">Finished Goods Production</h5>
                                    <table id="productionFGExportTable" class="table table-light table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product Code</th>
                                                <th>Product Name</th>
                                                <th>FG PCS</th>
                                                <th>FG Box</th>
                                                <th>Production Date</th>
                                            </tr>
                                        </thead>
                                        <tbody id="productionFGTable"></tbody>
                                    </table>
                                    <h5 class="text-dark mt-4">Material Usage</h5>
                                    <table id="productionMaterialExportTable" class="table table-light table-striped">
                                        <thead>
                                            <tr>
                                                <th>Material Code</th>
                                                <th>Material Name</th>
                                                <th>UOM/Unit</th>
                                                <th>Qty Used</th>
                                                <th>Average Price</th>
                                                <th>Usage Value</th>
                                            </tr>
                                        </thead>
                                        <tbody id="productionMaterialTable"></tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- ================= COGS REPORT ================= -->
                            <div id="cogsReportArea" style="display:none;">
                                <h5 class="text-dark">
                                    Usage Material COGS Qty
                                </h5>
                                <table id="cogsQtyExportTable" class="table table-light table-striped">
                                    <thead>
                                        <tr>
                                            <th>Code Material</th>
                                            <th>Material Name</th>
                                            <th>UOM/Unit</th>
                                            <th>Average</th>
                                            <th>Start SO BB</th>
                                            <th>Purchase Order Material</th>
                                            <th>Waste Material</th>
                                            <th>Last SO BB</th>
                                            <th>Usage Material Production</th>
                                            <th>Cogs Production</th>
                                            <th>Qty Different</th>
                                        </tr>
                                    </thead>
                                    <tbody id="cogsQtyTable">
                                    </tbody>
                                </table>
                                <h5 class="text-dark">
                                    Usage Material COGS Value
                                </h5>
                                <table id="cogsValueExportTable" class="table table-light table-striped">
                                    <thead>
                                        <tr>
                                            <th>Code Material</th>
                                            <th>Material Name</th>
                                            <th>UOM/Unit</th>
                                            <th>Average</th>
                                            <th>Start SO BB</th>
                                            <th>Purchase Order Material</th>
                                            <th>Waste Material</th>
                                            <th>Last SO BB</th>
                                            <th>Usage Material Production</th>
                                            <th>Cogs Production</th>
                                            <th>Value Different</th>
                                        </tr>
                                    </thead>
                                    <tbody id="cogsValueTable">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <script type="module">

                            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
                            import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
                            import { getFirestore, collection, onSnapshot, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

                            const firebaseConfig1 = {
                                apiKey: "AIzaSyCqmojmZagGLMpxpemlhf3L0u42lShW6NM",
                                authDomain: "pia-made-bali.firebaseapp.com",
                                projectId: "pia-made-bali",
                                storageBucket: "pia-made-bali.firebasestorage.app",
                                messagingSenderId: "140052385978",
                                appId: "1:140052385978:web:64b934a162de955f01b283",
                                measurementId: "G-M0QC6C6VNS"
                            };

                            const firebaseConfig2 = {
                                apiKey: "AIzaSyAINEugboloQA7jg7PDWMM9GHsMMXwM2Cg",
                                authDomain: "prema-rasa-v2.firebaseapp.com",
                                projectId: "prema-rasa-v2",
                                storageBucket: "prema-rasa-v2.firebasestorage.app",
                                messagingSenderId: "397923099388",
                                appId: "1:397923099388:web:0c1842519b5d4b9246ed79",
                                measurementId: "G-QKXHYDN63D"
                            };

                            // Firebase 1 (Pia Made Bali) -> BACA
                            const app1 = initializeApp(firebaseConfig1, "pia-made-bali");
                            const dbRead = getFirestore(app1);

                            // Firebase 2 (Prema Rasa) -> SIMPAN
                            const app2 = initializeApp(firebaseConfig2, "prema-rasa");
                            const auth = getAuth(app2);
                            const db = getFirestore(app2);

                            /* ================= SESSION LOGIN ================= */
                            onAuthStateChanged(auth, (user) => {
                                if (user) {
                                    document.getElementById('loginPage').style.display = 'none';
                                    document.getElementById('dashboardPage').style.display = 'block';
                                    document.getElementById('userEmail').innerHTML = user.email;
                                    startIdleTimer();

                                } else {
                                    document.getElementById('dashboardPage').style.display = 'none';
                                    document.getElementById('loginPage').style.display = 'flex';
                                }
                            });
                            /* ================= AUTO LOGOUT ================= */

                            let idleTimer;
                            function resetIdleTimer() {
                                clearTimeout(idleTimer);
                                idleTimer = setTimeout(async () => {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Session Expired',
                                        text: 'Anda logout otomatis karena idle 30 menit'
                                    });

                                    await logout();
                                }, 30 * 60 * 1000); // 30 menit
                            }

                            function startIdleTimer() {
                                // event aktivitas user
                                const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

                                events.forEach(event => {
                                    document.addEventListener(event, resetIdleTimer);

                                });
                                resetIdleTimer();
                            }

                            let currentMaster = "";
                            let recipeItems = [];
                            let forecastSource = "forecast";
                            let loginAttempt = 0;

                            /* ================= LOGIN ================= */
                            async function login() {
                                const email = document.getElementById('email').value;
                                const password = document.getElementById('password').value;
                                try {
                                    const user = await signInWithEmailAndPassword(auth, email, password);
                                    // reset jika berhasil login
                                    loginAttempt = 0;
                                    document.getElementById('userEmail').innerHTML = user.user.email;
                                    document.getElementById('loginPage').style.display = 'none';
                                    document.getElementById('dashboardPage').style.display = 'block';

                                } catch (error) {
                                    if (error.code === "auth/invalid-credential") {
                                        loginAttempt++;
                                        document.getElementById('error').innerHTML =
                                            `Password salah! Percobaan ${loginAttempt} dari 3`;
                                        if (loginAttempt >= 3) {
                                            alert("Password salah 3 kali. Halaman akan dimuat ulang.");
                                            loginAttempt = 0;

                                            document.getElementById('email').value = '';
                                            document.getElementById('password').value = '';
                                            document.getElementById('error').innerHTML = '';

                                            location.reload();
                                        }

                                    } else {
                                        document.getElementById('error').innerHTML =
                                            "Terjadi kesalahan saat login";
                                        console.error(error);
                                    }
                                }
                            }

                            async function logout() {
                                clearTimeout(idleTimer);
                                await signOut(auth);
                                document.getElementById('dashboardPage').style.display = 'none';
                                document.getElementById('loginPage').style.display = 'flex';
                            }
                            async function testRead() {
                                try {
                                    const snap = await getDocs(collection(dbRead, "products"));

                                    console.log("Jumlah data:", snap.size);

                                    snap.forEach(doc => {
                                        console.log(doc.id, doc.data());
                                    });

                                } catch (e) {
                                    console.error("ERROR FIREBASE 1:", e);
                                }
                            }

                            testRead();
                            /* ================= MASTER MENU ================= */
                            function toggleMaster() {
                                const menu = document.getElementById("masterSubMenu");
                                menu.style.display = (menu.style.display === "block") ? "none" : "block";
                            }

                            async function showMaster(type) {
                                /*====HAK AKSES MASTER DATA====*/
                                const user = auth.currentUser;

                                if (!user) {
                                    alert("Silakan login terlebih dahulu.");
                                    return;
                                }

                                const username = user.email.split("@")[0].toLowerCase().trim();
                                if (username !== "user") {
                                    alert("You do not have access to Master Data!");
                                    return;
                                }

                                /* ================= SATUAN ================= */
                                currentMaster = type;
                                let html = "";

                                if (type === "satuan") {
                                    html = `
        <h5 class="mb-3 text-dark">
          <i class="fa-solid fa-sliders"></i>
            Unit Master Data
        </h5>
        <div class="section-divider"></div>
        <div class="row mb-3">
             <div class="col-md-4">
                    <label>UOM Code</label>
                        <input type="text"
                        id="units"
                        class="form-control auto-field" readonly>
                    </div>
            <div class="col-md-4">
                <label>UOM Name</label>
                <input type="text"
                    id="unitName"
                    class="form-control"
                    placeholder="Example : Kg, Gram, Pcs, Liter">
            </div>
            <div class="col-md-4">
                <label>Submit</label>
                <button class="btn btn-warning w-100"
                    onclick="addUnit()">
                    Submit UOM
                </button>
            </div>
        </div>
        <table class="table table-light table-striped">
            <thead>
                <tr>
                    <th>UOM Code</th>
                    <th>UOM Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="unitList"></tbody>
        </table>
        `;
                                }

                                /* ================= SUPPLIER ================= */
                                if (type === "supplier") {
                                    html = `
        <h5 class="mb-3 text-dark">
            <i class="fa-solid fa-truck"></i>
            Master Data Supplier
        </h5>
         <div class="section-divider"></div>
       <div class="row mb-3">
             <div class="col-md-3">
                    <label>SUP Code</label>
                        <input type="text"
                        id="suppliers"
                        class="form-control auto-field" readonly>
                    </div>
            <div class="col-md-3">
                <label>Supplier Name</label>
                <input type="text"
                    id="supplierName"
                    class="form-control mb-2"
                    placeholder="Input Supplier Name">
            </div>
            <div class="col-md-3">
                <label>Supplier Address</label>
                <input type="text"
                    id="supplierAddress"
                    class="form-control mb-2"
                    placeholder="Input Address">
            </div>
            <div class="col-md-3">
                <label>Contact / Mobile Phone</label>
                <input type="text"
                    id="supplierPhone"
                    class="form-control mb-2"
                    placeholder="Input Contact/Mobile Phone">
            </div>
        </div>
        <button class="btn btn-warning w-100 mb-3"
            onclick="addSupplier()">
            Save Supplier
        </button>
        <table class="table table-light table-striped">
            <thead>
                <tr>
                    <th>Supplier Code</th>
                    <th>Supplier Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="supplierList"></tbody>
        </table>
        `;
                                }
                                /* ================= BAHAN BAKU ================= */
                                if (type === "bahan") {
                                    html = `
        <h5 class="mb-3 text-dark">
             <i class="fa-solid fa-boxes-stacked"></i>     
            Master of Raw Materials
                </h5>
                 <div class="section-divider"></div>
        <div class="row mb-3">
             <div class="col-md-2">
                    <label>MAT Code</label>
                        <input type="text"
                        id="materials"
                        class="form-control auto-field" readonly>
                    </div>
            <div class="col-md-3">
                <label>Raw Material</label>
                <input type="text"
                    id="materialName"
                    class="form-control mb-2"
                    placeholder="Input Raw Material">
            </div>
            <div class="col-md-2">
                <label>UOM / Units</label>
                <select id="materialUnit"
                    class="form-control mb-2">
                    <option value="">Select UOM</option>
                </select>
            </div>
            <div class="col-md-2">
                <label>Weight/Satuan</label>
                <input type="number"
                    id="materialWeight"
                    class="form-control mb-2"
                    placeholder="Weight">
            </div>
            <div class="col-md-3">
                <label>Purchase Price</label>
                <input type="number"
                    id="materialPrice"
                    class="form-control mb-2"
                    placeholder="Input Purchase Price">
            </div>
        </div>
        <button class="btn btn-warning w-100 mb-3"
            onclick="addMaterial()">
            Save Raw Materials
        </button>
        <table class="table table-light table-striped">
           <thead>
            <tr>
                <th>Materials Code</th>
                <th>Raw Material</th>
                <th>UOM/Unit</th>
                <th>Weight</th>
                <th>Purchase Price</th>
                <th>Average</th>
                <th>Action</th>
            </tr>
        </thead>
            <tbody id="materialList"></tbody>
        </table>
        `;
                                }
                                document.getElementById("masterContent").innerHTML = html;
                                showPage('masterdata');
                                loadAll();

                                /* KHUSUS MENU SATUAN */
                                if (type === "satuan") {
                                    await setNextUnitCode();
                                }
                                /* KHUSUS MENU SATUAN */
                                if (type === "supplier") {
                                    await setNextSupCode();
                                }

                                /* KHUSUS MENU BAHAN */
                                if (type === "bahan") {
                                    await setNextMaterialCode();
                                    await loadUnitOptions();

                                }
                            }

                            /* ================= UOM / UNIT DATA ================= */
                            function genCode(prefix, size, pad = 3) {
                                return prefix + String(size + 1).padStart(pad, "0");
                            }

                            /* AUTO TAMPILKAN CODE BERIKUTNYA */
                            async function setNextUnitCode() {
                                const code = await generateCode("units", "UNT");
                                const input = document.getElementById("units");
                                if (input) {
                                    input.value = code;
                                }
                            }

                            /* TAMBAH UNIT */
                            async function addUnit() {
                                const nameInput = document.getElementById("unitName");
                                const name = nameInput.value.trim();
                                if (!name) {
                                    return alert("Wajib isi");
                                }
                                try {

                                    const code = await generateCode("units", "UNT");
                                    await addDoc(collection(db, "units"), {
                                        code: code,
                                        name: name

                                    });

                                    nameInput.value = "";
                                    await loadUnits();
                                    await setNextUnitCode();
                                    alert("Data berhasil disimpan");
                                } catch (e) {
                                    console.error(e);
                                    alert("Gagal simpan data");
                                }
                            }


                            /* ================= AUTO NUMBER CODE ================= */
                            async function generateCode(collectionName, prefix) {
                                try {

                                    const snap = await getDocs(
                                        collection(db, collectionName)
                                    );

                                    if (snap.empty) {
                                        return prefix + "001";


                                    }

                                    let maxNumber = 0;
                                    snap.forEach((d) => {
                                        const data = d.data();
                                        /* PASTIKAN ADA CODE */
                                        if (data.code) {
                                            /*
                                                CONTOH:
                                                UNT001 -> 001
                                            */
                                            const numericPart = data.code.replace(prefix, "");
                                            const number = parseInt(numericPart);

                                            /* CEK VALID NUMBER */
                                            if (!isNaN(number)) {

                                                /* CARI NOMOR TERBESAR */
                                                if (number > maxNumber) {
                                                    maxNumber = number;
                                                }
                                            }
                                        }
                                    });

                                    /* NEXT NUMBER */
                                    const nextNumber = maxNumber + 1;
                                    /* FORMAT */
                                    return prefix + String(nextNumber).padStart(3, "0");
                                } catch (error) {
                                    console.error("Generate Code Error:", error);
                                    return prefix + "001";
                                }
                            }

                            /* LOAD DATA UNIT */
                            async function loadUnits() {
                                try {
                                    const q = query(
                                        collection(db, "units"),
                                        orderBy("code", "asc")
                                    );
                                    const snap = await getDocs(q);
                                    let html = "";
                                    snap.forEach((d) => {

                                        const data = d.data();

                                        html += `
            <tr>
                <td>${data.code}</td>
                <td>${data.name}</td>
                <td width="120">
                    <button
                        class="btn btn-danger btn-sm w-100"
                        onclick="deleteUnit('${d.id}')">
                        Hapus
                    </button>
                </td>
            </tr>
            `;

                                    });
                                    const el = document.getElementById("unitList");
                                    if (el) {
                                        el.innerHTML = html;
                                    }
                                } catch (e) {
                                    console.error(e);

                                    // hanya alert jika user sudah login
                                    if (auth.currentUser) {
                                        alert("Gagal load data");
                                    }
                                }
                            }

                            /* HAPUS UNIT */
                            async function deleteUnit(id) {
                                const confirmDelete = confirm("Yakin andak ingin Hapus data UOM ?");
                                if (!confirmDelete) {
                                    return;
                                }
                                try {
                                    await deleteDoc(doc(db, "units", id));
                                    await loadUnits();
                                    /* UPDATE CODE BERIKUTNYA */
                                    await setNextUnitCode();
                                    alert("Data UOM berhasil dihapus");

                                } catch (e) {
                                    console.error(e);
                                    alert("Gagal hapus data");

                                }
                            }
                            /* ================= SUPPLIER ================= */
                            /* AUTO TAMPILKAN CODE BERIKUTNYA */
                            async function setNextSupCode() {
                                const code = await generateCode("suppliers", "SUP");
                                const input = document.getElementById("suppliers");

                                if (input) {
                                    input.value = code;
                                }
                            }
                            async function addSupplier() {
                                const name = document.getElementById("supplierName").value;
                                const address = document.getElementById("supplierAddress").value;
                                const phone = document.getElementById("supplierPhone").value;
                                if (!name || !address || !phone) {
                                    alert("Lengkapi data supplier");
                                    return;
                                }
                                // ambil jumlah data supplier
                                const q = query(
                                    collection(db, "suppliers"),
                                    orderBy("code", "asc")
                                );

                                const snap = await getDocs(q);
                                // generate kode otomatis
                                const code = await generateCode("suppliers", "SUP");
                                await addDoc(collection(db, "suppliers"), {
                                    code,
                                    name,
                                    address,
                                    phone

                                });

                                /* TAMPILKAN CODE BERIKUTNYA */
                                await setNextSupCode();

                                // reset form
                                document.getElementById("supplierName").value = "";
                                document.getElementById("supplierAddress").value = "";
                                document.getElementById("supplierPhone").value = "";
                                loadSuppliers();
                                alert("Supplier berhasil disimpan");
                            }
                            async function loadSuppliers() {
                                const q = query(
                                    collection(db, "suppliers"),
                                    orderBy("code", "asc")
                                );

                                const snap = await getDocs(q);
                                let html = "";
                                snap.forEach(d => {
                                    html += `
        <tr>
            <td>${d.data().code}</td>
            <td>${d.data().name}</td>
            <td>${d.data().address}</td>
            <td>${d.data().phone}</td>
            <td width="120">
                <button
                    class="btn btn-danger btn-sm w-100"
                    onclick="deleteSupplier('${d.id}')">
                    Hapus
                </button>
            </td>
        </tr>
        `;
                                });

                                const el = document.getElementById("supplierList");
                                if (el) el.innerHTML = html;
                            }

                            async function deleteSupplier(id) {
                                const confirmDelete = confirm("Yakin anda akan Hapus data supplier ini ?");
                                if (!confirmDelete) return;
                                await deleteDoc(doc(db, "suppliers", id));

                                loadSuppliers();
                                await setNextSupCode();
                                alert("Supplier berhasil dihapus");
                            }

                            /* ================= RAW MATERIAL DATA ================= */
                            /* AUTO TAMPILKAN CODE BERIKUTNYA */
                            async function setNextMaterialCode() {
                                const code = await generateCode("materials", "MAT");
                                const input = document.getElementById("materials");

                                if (input) {
                                    input.value = code;
                                }
                            }

                            async function addMaterial() {
                                const name = document.getElementById("materialName").value;
                                const unit = document.getElementById("materialUnit").value;
                                const weight = document.getElementById("materialWeight").value;
                                const price = document.getElementById("materialPrice").value;

                                if (!name || !unit || !weight || !price) {
                                    alert("Lengkapi data bahan");
                                    return;
                                }

                                // hitung average
                                const average = Number(price) / Number(weight);

                                // generate kode
                                const code = await generateCode("materials", "MAT");

                                await addDoc(collection(db, "materials"), {
                                    code,
                                    name,
                                    unit,
                                    weight,
                                    price,
                                    average,
                                    createdAt: serverTimestamp()
                                });

                                /* TAMPILKAN CODE BERIKUTNYA */
                                await setNextMaterialCode();

                                // reset form
                                document.getElementById("materialName").value = "";
                                document.getElementById("materialWeight").value = "";
                                document.getElementById("materialPrice").value = "";
                                document.getElementById("materialUnit").value = "";

                                loadMaterials();

                                alert("Bahan berhasil disimpan");
                            }

                            async function loadMaterials() {
                                const q = query(
                                    collection(db, "materials"),
                                    orderBy("code", "asc")
                                );

                                const snap = await getDocs(q);
                                let html = "";
                                snap.forEach(d => {

                                    html += `
    <tr>
        <td>${d.data().code}</td>
        <td>${d.data().name}</td>
        <td>${d.data().unit}</td>
        <td>
            ${Number(d.data().weight).toLocaleString()}
        </td>
        <td>
            Rp ${Number(d.data().price).toLocaleString()}
        </td>
        <td>
            Rp ${Number(d.data().average).toLocaleString()}
        </td>
        <td width="120">
            <button
                class="btn btn-danger btn-sm w-100"
                onclick="deleteMaterial('${d.id}')">
                Hapus
            </button>
        </td>
    </tr>
    `;
                                });

                                const el = document.getElementById("materialList");
                                if (el) el.innerHTML = html;
                            }

                            async function deleteMaterial(id) {
                                const confirmDelete = confirm("Yakin anda akan Hapus data bahan baku ini ?");
                                if (!confirmDelete) return;

                                await deleteDoc(doc(db, "materials", id));
                                await setNextMaterialCode();

                                loadMaterials();
                                alert("Bahan berhasil dihapus");
                            }

                            async function loadUnitOptions() {
                                const q = query(
                                    collection(db, "units"),
                                    orderBy("code", "asc")
                                );

                                const snap = await getDocs(q);
                                let html = `<option value="">Select UOM</option>`;
                                snap.forEach(d => {
                                    html += `
        <option value="${d.data().name}">
            ${d.data().name}
        </option>
        `;
                                });

                                const el = document.getElementById("materialUnit");
                                if (el) el.innerHTML = html;
                            }

                            /* ================= RECIPE ================= */
                            /* ==LOCK ACCES INPUT DATA==== */
                            async function showProductionRecipe() {
                                const user = auth.currentUser;
                                if (!user) return;
                                const username = user.email.split("@")[0].toLowerCase().trim();

                                if (username !== "user") {
                                    alert("You do not have access to Master Data!");
                                    return;
                                }

                                showPage('forecastproduk');
                                recipeItems = [];
                                document.getElementById("recipeTable").innerHTML = "";
                                // generate kode otomatis
                                const q = query(
                                    collection(db, "products"),
                                    orderBy("code", "asc")
                                );

                                const snap = await getDocs(q);
                                const code = genCode("PKMB", snap.size);
                                document.getElementById("recipeCode").value = code;
                                loadRecipeMaterials();
                                loadRecipeUnits();

                                document.getElementById("recipeMaterial").addEventListener("change", calculateRecipePrice);
                                document.getElementById("recipeQty").addEventListener("input", calculateRecipePrice);

                                loadForecast();
                            }

                            async function loadRecipeMaterials() {
                                const q = query(
                                    collection(db, "materials"),
                                    orderBy("code", "asc")
                                );

                                const snap = await getDocs(q);
                                let html = "";
                                snap.forEach(d => {

                                    html += `
        <option value="${d.data().name}">
            ${d.data().name}
        </option>
        `;
                                });

                                document.getElementById("recipeMaterial").innerHTML = html;
                            }
                            async function loadRecipeUnits() {
                                const q = query(
                                    collection(db, "units"),
                                    orderBy("code", "asc")
                                );
                                const snap = await getDocs(q);
                                let html = "";
                                snap.forEach(d => {
                                    html += `
        <option value="${d.data().name}">
            ${d.data().name}
        </option>
        `;
                                });

                                document.getElementById("recipeUnit").innerHTML = html;
                            }

                            async function calculateRecipePrice() {
                                const material =
                                    document.getElementById("recipeMaterial").value;
                                const qty =
                                    Number(document.getElementById("recipeQty").value || 0);

                                if (!material || qty <= 0) {
                                    document.getElementById("recipePrice").value = "";
                                    return;
                                }

                                const materialSnap =
                                    await getDocs(collection(db, "materials"));

                                let average = 0;
                                materialSnap.forEach(mat => {

                                    const m = mat.data();

                                    if (
                                        m.name?.toLowerCase().trim() ===
                                        material.toLowerCase().trim()
                                    ) {
                                        average = Number(m.average || 0);
                                    }

                                });
                                const totalPrice = qty * average;
                                document.getElementById("recipePrice").value =
                                    totalPrice.toLocaleString("id-ID");
                            }

                            async function addRecipeItem() {
                                const material = document.getElementById("recipeMaterial").value;
                                const qty = Number(document.getElementById("recipeQty").value);
                                const unit = document.getElementById("recipeUnit").value;

                                if (!material || !qty || !unit) {
                                    alert("Lengkapi data bahan");
                                    return;
                                }

                                // cari average material
                                const materialSnap =
                                    await getDocs(collection(db, "materials"));

                                let materialPrice = 0;
                                materialSnap.forEach(mat => {
                                    const m = mat.data();
                                    if (
                                        m.name?.toLowerCase().trim() ===
                                        material.toLowerCase().trim()
                                    ) {
                                        materialPrice = Number(m.average || 0);
                                    }
                                });

                                const totalPrice = qty * materialPrice;
                                recipeItems.push({
                                    material,
                                    qty,
                                    unit,
                                    price: totalPrice
                                });

                                document.getElementById("recipeQty").value = "";
                                document.getElementById("recipePrice").value = "";
                                renderRecipeTable();
                            }

                            function renderRecipeTable() {

                                let html = "";
                                let grandTotal = 0;

                                recipeItems.forEach((item, index) => {

                                    grandTotal += Number(item.price || 0);

                                    html += `
        <tr>
            <td>${item.material}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>Rp ${Number(item.price || 0).toLocaleString()}</td>
            <td width="120">
                <button class="btn btn-danger btn-sm"
                    onclick="deleteRecipeItem(${index})">
                    Hapus
                </button>
            </td>
        </tr>
        `;
                                });

                                document.getElementById("recipeTable").innerHTML = html;
                                document.getElementById("priceForecaseTotal").innerHTML =
                                    `Rp ${grandTotal.toLocaleString()}`;
                            }

                            async function saveRecipe() {
                                const code = document.getElementById("recipeCode").value;
                                const name = document.getElementById("recipeProductName").value;
                                if (!name) {

                                    alert("Nama produk wajib diisi");

                                    return;
                                }
                                // save produk
                                await addDoc(collection(db, "products"), {
                                    code,
                                    name,
                                    createdAt: serverTimestamp()
                                });

                                // save detail recipe
                                for (const item of recipeItems) {

                                    await addDoc(collection(db, "product_recipes"), {
                                        productCode: code,
                                        productName: name,
                                        material: item.material,
                                        qty: item.qty,
                                        unit: item.unit,
                                        createdAt: serverTimestamp()
                                    });
                                }

                                alert("Forecast produk berhasil disimpan");

                                // reset form
                                recipeItems = [];

                                // refresh tabel input bahan
                                renderRecipeTable();

                                document.getElementById("recipeProductName").value = "";
                                document.getElementById("recipeQty").value = "";

                                // reload data forecast
                                loadForecast();
                            }

                            async function loadForecast() {
                                const productSnap = await getDocs(
                                    query(collection(db, "products"), orderBy("code", "asc"))
                                );
                                const recipeSnap = await getDocs(
                                    collection(db, "product_recipes")
                                );

                                const materialSnap = await getDocs(
                                    collection(db, "materials")
                                );

                                const recipes = recipeSnap.docs.map(d => d.data());
                                let html = "";

                                for (const productDoc of productSnap.docs) {
                                    const product = productDoc.data();
                                    const productRecipes = recipes.filter(
                                        r => r.productCode === product.code
                                    );

                                    const count = productRecipes.length;
                                    let totalCost = 0;
                                    productRecipes.forEach(r => {
                                        let materialPrice = 0;
                                        materialSnap.forEach(mat => {
                                            const m = mat.data();

                                            if (
                                                m.name?.toLowerCase().trim() ===
                                                r.material?.toLowerCase().trim()
                                            ) {
                                                materialPrice = Number(m.average || 0);
                                            }

                                        });

                                        const qty = Number(r.qty || 0);
                                        totalCost += qty * materialPrice;

                                    });

                                    html += `
    <tr>
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${count} bahan</td>
        <td>Rp ${totalCost.toLocaleString()}</td>
        <td>
            <button class="btn btn-info btn-sm"
                onclick="viewForecast('${product.code}')">
                Detail
            </button>

            <button class="btn btn-danger btn-sm"
                onclick="deleteForecast('${product.code}')">
                Delete
            </button>
        </td>
    </tr>
    `;
                                }

                                const el = document.getElementById("forecastList");
                                if (el) el.innerHTML = html;
                            }

                            window.deleteForecast = async function (code) {
                                const confirmDelete = confirm(
                                    "Yakin ingin menghapus forecast ini?"
                                );
                                if (!confirmDelete) return;
                                try {

                                    // hapus product
                                    const productSnap = await getDocs(
                                        query(
                                            collection(db, "products"),
                                            where("code", "==", code)
                                        )
                                    );
                                    for (const docItem of productSnap.docs) {
                                        await deleteDoc(doc(db, "products", docItem.id));
                                    }

                                    // hapus recipe terkait
                                    const recipeSnap = await getDocs(
                                        query(
                                            collection(db, "product_recipes"),
                                            where("productCode", "==", code)
                                        )
                                    );
                                    for (const docItem of recipeSnap.docs) {
                                        await deleteDoc(doc(db, "product_recipes", docItem.id));
                                    }
                                    alert("Forecast berhasil dihapus");
                                    loadForecast();
                                } catch (err) {

                                    console.error(err);
                                    alert("Gagal menghapus forecast");
                                }
                            }

                            async function viewForecast(code) {
                                forecastSource = "forecast";
                                showPage('forecastdetail');
                                // ambil produk
                                const productSnap = await getDocs(collection(db, "products"));
                                let productName = "";
                                productSnap.forEach(d => {

                                    if (d.data().code === code) {
                                        productName = d.data().name;
                                    }
                                });

                                document.getElementById("forecastTitle").innerHTML =
                                    `Forecast Produk : ${productName}`;
                                // ambil recipe
                                const recipeSnap =
                                    await getDocs(collection(db, "product_recipes"));
                                // ambil bahan baku
                                const materialSnap =
                                    await getDocs(collection(db, "materials"));

                                let grandTotal = 0;
                                let rows = [];
                                recipeSnap.forEach(recipe => {
                                    const r = recipe.data();
                                    if (r.productCode === code) {
                                        let materialCode = "";
                                        let materialPrice = 0;
                                        materialSnap.forEach(mat => {
                                            const m = mat.data();

                                            if (
                                                m.name?.toLowerCase().trim() ===
                                                r.material?.toLowerCase().trim()
                                            ) {
                                                materialCode = m.code;
                                                materialPrice = Number(m.average || 0);
                                            }
                                        });

                                        const qty = Number(r.qty || 0);
                                        const totalPrice = qty * materialPrice;
                                        grandTotal += totalPrice;
                                        rows.push({
                                            code: materialCode || "UNKNOWN",
                                            html: `
<tr>
    <td>${materialCode}</td>
    <td>${r.material}</td>
    <td>${qty}</td>
    <td>${r.unit}</td>
    <td>Rp ${totalPrice.toLocaleString()}</td>
</tr>
`
                                        });
                                    }
                                });

                                rows.sort((a, b) =>
                                    (a.code || "").localeCompare(b.code || "")
                                );

                                let html = "";
                                rows.forEach(r => html += r.html);

                                document.getElementById("forecastDetailTable").innerHTML = html;
                                document.getElementById("forecastTotal").innerHTML =
                                    `Rp ${grandTotal.toLocaleString()}`;
                            }

                            function backForecast() {
                                if (forecastSource === "produksi") {
                                    showPage("produksi");
                                } else {
                                    showPage("forecastproduk");
                                }
                            }

                            /* =========================================================
                            PRICE FG
                            ========================================================= */

                            /* ================= OPEN PAGE ================= */
                            async function showPriceProduct() {

                                /* ========LOCK ACCESS INPUT DATA========== */
                                const user = auth.currentUser;
                                if (!user) return;
                                const username = user.email.split("@")[0].toLowerCase().trim();
                                if (username !== "user") {
                                    alert("You do not have access to Master Data!");
                                    return;
                                }

                                showPage("pricefg");
                                await loadPriceFGProducts();
                                await loadPriceFGMaterials();
                                await loadPriceFGPlastic();
                                await loadPriceFGTable();
                            }

                            /* ================= LOAD PRODUCT ================= */
                            async function loadPriceFGProducts() {
                                const select =
                                    document.getElementById("priceFgProduct");
                                if (!select) return;
                                const snap = await getDocs(
                                    query(
                                        collection(db, "products"),
                                        orderBy("code", "asc")
                                    )
                                );

                                let html = `
        <option value="">
            Select Product
        </option>
    `;

                                snap.forEach(d => {
                                    const data = d.data();
                                    html += `
            <option value="${data.code}">
                ${data.code} - ${data.name}
            </option>
        `;
                                });

                                select.innerHTML = html;
                            }

                            async function loadPriceFGMaterials() {
                                const select =
                                    document.getElementById("priceFgMaterial");
                                console.log("SELECT =", select);
                                if (!select) return;
                                const snap = await getDocs(
                                    query(
                                        collection(db, "materials"),
                                        orderBy("code", "asc")
                                    )
                                );
                                console.log("TOTAL MATERIAL =", snap.size);
                                let html = `
        <option value="">
            Select Box product
        </option>
    `;

                                snap.forEach(d => {
                                    console.log(d.data());
                                    const data = d.data();
                                    html += `
            <option
                value="${d.id}"
                data-name="${data.name}"
                data-price="${Number(data.average || 0)}">
                ${data.code} - ${data.name}
            </option>
        `;
                                });

                                select.innerHTML = html;
                            }

                            async function loadPriceFGPlastic() {
                                const select =
                                    document.getElementById("priceFgPlastic");
                                if (!select) return;
                                const snap = await getDocs(
                                    query(
                                        collection(db, "materials"),
                                        orderBy("code", "asc")
                                    )
                                );

                                let html = `
        <option value="">
            Select Plastic Srink
        </option>
    `;

                                snap.forEach(d => {
                                    const data = d.data();
                                    html += `
            <option
                value="${d.id}"
                data-name="${data.name}"
                data-price="${Number(data.average || 0)}">
                ${data.code} - ${data.name}

            </option>
        `;
                                });
                                select.innerHTML = html;
                            }
                            async function calculatePriceFG() {
                                const productCode =
                                    document.getElementById("priceFgProduct").value;
                                const materialSelect =
                                    document.getElementById("priceFgMaterial");
                                let forecastHpp = 0;
                                if (productCode) {
                                    const recipeSnap =
                                        await getDocs(
                                            collection(db, "product_recipes")
                                        );
                                    const materialSnap =
                                        await getDocs(
                                            collection(db, "materials")
                                        );
                                    recipeSnap.forEach(recipe => {
                                        const r = recipe.data();
                                        if (r.productCode === productCode) {
                                            let avg = 0;
                                            materialSnap.forEach(mat => {
                                                const m = mat.data();
                                                if (
                                                    m.name?.toLowerCase().trim() ===
                                                    r.material?.toLowerCase().trim()
                                                ) {
                                                    avg = Number(m.average || 0);
                                                }
                                            });

                                            forecastHpp +=
                                                Number(r.qty || 0) * avg;
                                        }
                                    });
                                }

                                document.getElementById("priceFgForecastHpp").value = forecastHpp.toLocaleString();
                                let materialPrice = 0;
                                if (materialSelect.value) {
                                    const selected =
                                        materialSelect.options[
                                        materialSelect.selectedIndex
                                        ];
                                    materialPrice =
                                        Number(
                                            selected.getAttribute("data-price")
                                        ) || 0;
                                }
                                document.getElementById("priceFgMaterialPrice").value = materialPrice.toLocaleString();
                                const qtyPerBox = Number(document.getElementById("priceFgQtyBox").value) || 0;
                                const forecastBox = forecastHpp * qtyPerBox; document.getElementById("priceFgForecastBox").value = forecastBox.toLocaleString();
                                let plasticPrice = 0;
                                const plasticSelect = document.getElementById("priceFgPlastic");
                                if (plasticSelect && plasticSelect.value) {
                                    const selected =
                                        plasticSelect.options[
                                        plasticSelect.selectedIndex
                                        ];
                                    plasticPrice =
                                        Number(
                                            selected.getAttribute("data-price")
                                        ) || 0;
                                }

                                document.getElementById("priceFgPlasticPrice").value = plasticPrice.toLocaleString();
                                const totalHpp = forecastBox + materialPrice + plasticPrice;
                                document.getElementById("priceFgTotalHpp").value = totalHpp.toLocaleString();
                            }

                            /* ================= SAVE PRICE ================= */
                            async function savePriceFG() {
                                const productCode = document.getElementById("priceFgProduct").value;
                                const qtyPerBox = Number(document.getElementById("priceFgQtyBox").value);
                                const price = Number(document.getElementById("priceFgPrice").value);
                                const priceStore = Number(document.getElementById("priceFgPriceStore").value);
                                const materialSelect = document.getElementById("priceFgMaterial");
                                const materialName =
                                    materialSelect.value
                                        ? materialSelect.options[
                                            materialSelect.selectedIndex
                                        ].getAttribute("data-name")
                                        : "";
                                const materialPrice =
                                    materialSelect.value
                                        ? Number(
                                            materialSelect.options[
                                                materialSelect.selectedIndex
                                            ].getAttribute("data-price")
                                        )
                                        : 0;
                                const plasticSelect =
                                    document.getElementById("priceFgPlastic");
                                const plasticName =
                                    plasticSelect.value
                                        ? plasticSelect.options[
                                            plasticSelect.selectedIndex
                                        ].getAttribute("data-name")
                                        : "";
                                const plasticPrice =
                                    plasticSelect.value
                                        ? Number(
                                            plasticSelect.options[
                                                plasticSelect.selectedIndex
                                            ].getAttribute("data-price")
                                        )
                                        : 0;

                                const hppForecast =
                                    Number(
                                        document.getElementById("priceFgForecastHpp")
                                            .value.replace(/,/g, "")
                                    ) || 0;
                                const hppTotal =
                                    Number(
                                        document.getElementById("priceFgTotalHpp")
                                            .value.replace(/,/g, "")
                                    ) || 0;

                                if (
                                    !productCode ||
                                    !qtyPerBox ||
                                    !price
                                ) {

                                    alert("Lengkapi data");
                                    return;
                                }
                                /* ================= PRODUCT NAME ================= */
                                let productName = "";
                                const productSnap =
                                    await getDocs(collection(db, "products"));
                                productSnap.forEach(d => {
                                    const data = d.data();
                                    if (data.code === productCode) {
                                        productName = data.name;
                                    }
                                });
                                /* ================= CHECK EXIST ================= */
                                const priceSnap =
                                    await getDocs(collection(db, "price_fg"));
                                let existingId = null;
                                priceSnap.forEach(d => {
                                    const data = d.data();
                                    if (data.productCode === productCode) {
                                        existingId = d.id;
                                    }
                                });
                                /* ================= UPDATE ================= */
                                if (existingId) {
                                    await updateDoc(
                                        doc(db, "price_fg", existingId),
                                        {
                                            qtyPerBox,
                                            price,
                                            materialName,
                                            materialPrice,
                                            hppForecast,
                                            hppTotal,
                                            updatedAt: serverTimestamp()
                                        }
                                    );

                                    alert("Harga jual berhasil diupdate");
                                }

                                /* ================= INSERT ================= */
                                else {
                                    await addDoc(
                                        collection(db, "price_fg"),
                                        {
                                            productCode,
                                            productName,
                                            qtyPerBox,
                                            materialName,
                                            materialPrice,
                                            hppForecast,
                                            hppTotal,
                                            price,
                                            priceStore,
                                            createdAt: serverTimestamp()
                                        }
                                    );

                                    alert("Harga jual berhasil disimpan");
                                }

                                /* ================= RESET ================= */
                                document.getElementById("priceFgProduct").value = "";
                                document.getElementById("priceFgQtyBox").value = "";
                                document.getElementById("priceFgPrice").value = "";
                                document.getElementById("priceFgPriceStore").value = "";
                                document.getElementById("priceFgMaterial").value = "";
                                document.getElementById("priceFgPlastic").value = "";
                                document.getElementById("priceFgForecastHpp").value = "";
                                document.getElementById("priceFgForecastBox").value = "";
                                document.getElementById("priceFgMaterialPrice").value = "";
                                document.getElementById("priceFgPlasticPrice").value = "";
                                document.getElementById("priceFgTotalHpp").value = "";

                                await loadPriceFGTable();
                            }
                            /* ================= LOAD TABLE ================= */
                            async function loadPriceFGTable() {
                                const tbody =
                                    document.getElementById("priceFGList");
                                if (!tbody) return;
                                const snap = await getDocs(
                                    query(
                                        collection(db, "price_fg"),
                                        orderBy("productCode", "asc")
                                    )
                                );
                                let html = "";
                                snap.forEach(d => {
                                    const data = d.data();
                                    html += `
                        <tr>
                            <td>${data.productCode}</td>
                            <td>${data.productName}</td>
                            <td>${data.qtyPerBox}</td>
                            <td>
                                Rp ${Number(
                                        data.hppTotal || 0
                                    ).toLocaleString()}
                            </td>
                            <td>
                                Rp ${Number(
                                        data.price || 0
                                    ).toLocaleString()}
                            </td>
                            <td>
                                Rp ${Number(
                                        data.priceStore || 0
                                    ).toLocaleString()}
                            </td>
                            <td width="120">
                                <button
                                    class="btn btn-danger btn-sm w-100"
                                    onclick="deletePriceFG('${d.id}')">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                        `;
                                });

                                tbody.innerHTML =
                                    html ||
                                    `
                    <tr>
                        <td colspan="7">
                        <td colspan="8" class="text-center">
                            Tidak ada data
                        </td>
                    </tr>
                    `;
                            }
                            /* ================= DELETE ================= */
                            async function deletePriceFG(id) {
                                if (!confirm("Hapus harga jual produk?")) return;

                                await deleteDoc(
                                    doc(db, "price_fg", id)
                                );
                                await loadPriceFGTable();
                                alert("Harga jual berhasil dihapus");
                            }
                            /* ================= PURCHASING ================= */
                            function togglePurchasing() {
                                const menu = document.getElementById("purchasingSubMenu");
                                menu.style.display = (menu.style.display === "block") ? "none" : "block";
                            }
                            function initPurchaseFilter() {
                                const yearSelect = document.getElementById("filterYear");
                                const currentYear = new Date().getFullYear();
                                let html = "";
                                for (let year = 2025; year <= currentYear + 50; year++) {
                                    html += `<option value="${year}">${year}</option>`;
                                }
                                yearSelect.innerHTML = html;
                                document.getElementById("filterMonth").value =
                                    String(new Date().getMonth() + 1);
                                document.getElementById("filterYear").value =
                                    String(currentYear);
                            }
                            window.addEventListener("load", async () => {
                                initPurchaseFilter();
                                await loadUnits();
                                await loadPurchases();
                                await loadPurchasesData();
                            });

                            /* ================= LOAD OPTIONS ================= */
                            async function loadPurchaseOptions() {
                                // ================= MATERIAL =================
                                const materialSnap = await getDocs(
                                    query(
                                        collection(db, "materials"),
                                        orderBy("code", "asc")
                                    )
                                );

                                let materialHtml = `<option value="">Select Materials</option>`;
                                materialSnap.forEach(d => {
                                    const data = d.data();
                                    materialHtml += `
            <option
                value="${data.code}"
                data-name="${data.name}"
                data-unit="${data.unit}">
                ${data.code} - ${data.name}
            </option>
        `;
                                });

                                document.getElementById("purchaseMaterial").innerHTML = materialHtml;

                                // ================= SUPPLIER =================
                                const supplierSnap = await getDocs(
                                    query(
                                        collection(db, "suppliers"),
                                        orderBy("code", "asc")
                                    )
                                );

                                let supplierHtml = `<option value="">Select Supplier</option>`;
                                supplierSnap.forEach(d => {
                                    supplierHtml += `
            <option value="${d.data().name}">
                ${d.data().name}
            </option>
        `;
                                });

                                document.getElementById("purchaseSupplier").innerHTML = supplierHtml;

                                // ================= AUTO UOM =================
                                const materialSelect = document.getElementById("purchaseMaterial");
                                materialSelect.onchange = function () {
                                    const selected = this.options[this.selectedIndex];
                                    if (!selected.value) {
                                        document.getElementById("purchaseUnit").value = "";
                                        return;
                                    }
                                    document.getElementById("purchaseUnit").value =
                                        selected.dataset.unit || "";
                                };
                            }

                            /* ================= AVERAGE ================= */
                            function calculateAverage() {
                                const qty = Number(document.getElementById("purchaseQty").value);
                                const price = Number(document.getElementById("purchasePrice").value);

                                if (qty <= 0 || price <= 0) {
                                    document.getElementById("purchaseAverage").value = "";
                                    return;
                                }

                                document.getElementById("purchaseAverage").value = (price / qty).toFixed(2);
                            }

                            /* ================= SAVE ================= */
                            async function savePurchase() {
                                const materialSelect = document.getElementById("purchaseMaterial");
                                if (materialSelect.selectedIndex < 0) {
                                    alert("Pilih material");
                                    return;
                                }
                                const materialCode = materialSelect.value;
                                const materialName = materialSelect.options[materialSelect.selectedIndex].dataset.name;
                                const qty = Number(document.getElementById("purchaseQty").value);
                                const unit = document.getElementById("purchaseUnit").value;
                                const price = Number(document.getElementById("purchasePrice").value);
                                const supplier = document.getElementById("purchaseSupplier").value;
                                const date = document.getElementById("purchaseDate").value;

                                if (!materialCode || !qty || !unit || !price || !supplier || !date) {
                                    alert("Lengkapi data purchasing");
                                    return;
                                }
                                const snap = await getDocs(collection(db, "purchasing"));
                                const code = genCode("PUR", snap.size);
                                await addDoc(collection(db, "purchasing"), {

                                    materialCode,
                                    materialName,
                                    qty,
                                    unit,
                                    price,
                                    supplier,
                                    date,
                                    createdAt: serverTimestamp()
                                });

                                alert("Purchase Order Material Berhasil Disimpan");

                                document.getElementById("purchaseMaterial").value = "";
                                document.getElementById("purchaseQty").value = "";
                                document.getElementById("purchasePrice").value = "";
                                document.getElementById("purchaseUnit").value = "";
                                document.getElementById("purchaseAverage").value = "";
                                document.getElementById("purchaseSupplier").value = "";

                                await loadPurchases();
                                await loadPurchasesData();
                            }

                            /* ================= LIST TABLE ================= */
                            async function loadPurchases() {
                                console.log("loadPurchases dijalankan");
                                console.log("Month =", document.getElementById("filterMonth")?.value);
                                console.log("Year =", document.getElementById("filterYear")?.value);

                                const selectedMonth = Number(document.getElementById("filterMonth").value);
                                const selectedYear = Number(document.getElementById("filterYear").value);
                                const firstDay = new Date(
                                    selectedYear,
                                    selectedMonth - 1,
                                    1
                                );

                                const lastDay = new Date(
                                    selectedYear,
                                    selectedMonth,
                                    0
                                );

                                const startDate = firstDay.toISOString().split("T")[0];
                                const endDate = lastDay.toISOString().split("T")[0];

                                const snap = await getDocs(
                                    query(
                                        collection(db, "purchasing"),
                                        where("date", ">=", startDate),
                                        where("date", "<=", endDate),
                                        orderBy("date", "asc")
                                    )
                                );

                                let html = "";
                                let totalPurchasePrice = 0;

                                snap.forEach(d => {
                                    const item = d.data();

                                    const qty = Number(item.qty || 0);
                                    const price = Number(item.price || 0);
                                    const average = price / (qty || 1);

                                    totalPurchasePrice += price;

                                    html += `
    <tr>
        <td>${item.materialCode}</td>
        <td>${item.materialName}</td>
        <td>${qty}</td>
        <td>${item.unit}</td>
        <td>Rp ${price.toLocaleString("id-ID")}</td>
        <td>Rp ${average.toLocaleString("id-ID")}</td>
        <td>${item.supplier}</td>
        <td>${item.date}</td>
        <td>
            <button class="btn btn-danger btn-sm"
                onclick="deletePurchase('${d.id}')">
                Hapus
            </button>
        </td>
    </tr>
    `;
                                });

                                document.getElementById("purchaseList").innerHTML =
                                    html || "<tr><td colspan='9'>Tidak ada data</td></tr>";

                                document.getElementById("totalPurchaseAmount").innerHTML =
                                    `Rp ${totalPurchasePrice.toLocaleString("id-ID")}`;
                            }

                            /* ================= DELETE ================= */
                            async function deletePurchase(id) {
                                if (!confirm("Hapus purchasing?")) return;

                                await deleteDoc(doc(db, "purchasing", id));
                                await loadPurchases();
                                await loadPurchasesData();

                                alert("Berhasil dihapus");
                            }

                            /* ================= VIEW DATA PURCHASING ================= */
                            async function loadPurchasesData() {
                                const startDate =
                                    document.getElementById("filterStartDate").value;
                                const endDate =
                                    document.getElementById("filterEndDate").value;
                                let q;

                                // FILTER TANGGAL
                                if (startDate && endDate) {
                                    q = query(
                                        collection(db, "purchasing"),
                                        where("date", ">=", startDate),
                                        where("date", "<=", endDate),
                                        orderBy("date", "asc")
                                    );

                                } else {

                                    q = query(
                                        collection(db, "purchasing"),
                                        orderBy("date", "asc")
                                    );
                                }

                                const snap = await getDocs(q);
                                let html = "";
                                let grandTotal = 0;
                                snap.forEach(d => {

                                    const item = d.data();
                                    const qty = Number(item.qty || 0);
                                    const price = Number(item.price || 0);
                                    const average = price / (qty || 1);
                                    grandTotal += price;

                                    html += `
            <tr>
                <td>${item.materialCode}</td>
                <td>${item.materialName}</td>
                <td>${qty}</td>
                <td>${item.unit}</td>
                <td>
                    Rp ${price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                </td>
                <td>
                    Rp ${average.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                </td>
                <td>${item.supplier}</td>
                <td>${item.date}</td>
            </tr>
        `;
                                });

                                // TOTAL HARGA BELI
                                document.getElementById("totalPurchasePrice").innerHTML =
                                    `Rp ${grandTotal.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}`;

                                // TABLE
                                document.getElementById("purchaseViewList").innerHTML =
                                    html || `
            <tr>
                <td colspan="8" class="text-center">
                    Tidak ada data
                </td>
            </tr>
        `;
                            }
                            window.addEventListener("load", () => {
                                const today = new Date().toISOString().split("T")[0];
                                document.getElementById("filterStartDate").value = today;
                                document.getElementById("filterEndDate").value = today;

                            });

                            /* ================= EXPORT PURCHASE PDF ================= */
                            async function printPurchasePDF() {

                                // ================= JSPDF =================
                                const { jsPDF } = window.jspdf;

                                // PDF
                                const doc = new jsPDF(
                                    "landscape",
                                    "pt",
                                    "a4"
                                );

                                // ================= FILTER TANGGAL =================
                                const startDate =
                                    document.getElementById("filterStartDate").value;
                                const endDate =
                                    document.getElementById("filterEndDate").value;

                                let q;

                                // ================= QUERY =================
                                if (startDate && endDate) {

                                    q = query(
                                        collection(db, "purchasing"),
                                        where("date", ">=", startDate),
                                        where("date", "<=", endDate),
                                        orderBy("date", "asc")
                                    );

                                } else {

                                    q = query(
                                        collection(db, "purchasing"),
                                        orderBy("date", "desc")
                                    );
                                }

                                // ================= GET DATA =================
                                const snap = await getDocs(q);

                                // ================= CEK DATA =================
                                if (snap.empty) {
                                    alert("Data purchasing kosong");
                                    return;
                                }

                                // ================= FORMAT PRINT DATE =================
                                const today = new Date();

                                const printDate =
                                    today.getDate().toString().padStart(2, "0") + "/" +
                                    (today.getMonth() + 1).toString().padStart(2, "0") + "/" +
                                    today.getFullYear();

                                // ================= TOTAL =================
                                let totalPrice = 0;

                                // ================= TABLE ROW =================
                                const rows = [];
                                let no = 1;
                                snap.forEach(d => {
                                    const item = d.data();
                                    const qty = Number(item.qty || 0);
                                    const price = Number(item.price || 0);
                                    const average = price / (qty || 1);
                                    totalPrice += price;
                                    rows.push([
                                        no++,
                                        item.materialCode,
                                        item.materialName,
                                        qty,
                                        item.unit,
                                        "Rp " + price.toLocaleString(),
                                        "Rp " + average.toLocaleString(),
                                        item.supplier,
                                        item.date
                                    ]);
                                });

                                // ================= HEADER =================
                                doc.setFontSize(16);
                                doc.text(
                                    "LIST DETAIL PURCHASE ORDER",
                                    40,
                                    40
                                );

                                // ================= PERIODE =================
                                doc.setFontSize(11);
                                doc.text(
                                    `PERIODE ${startDate || "-"} S.D ${endDate || "-"}`,
                                    40,
                                    60
                                );

                                // ================= PRINT DATE =================
                                doc.text(
                                    `Print Date : ${printDate}`,
                                    650,
                                    60
                                );

                                // ================= TOTAL HARGA BELI =================
                                doc.setFontSize(12);
                                doc.text(
                                    `Total Purchase Order : Rp ${totalPrice.toLocaleString()}`,
                                    40,
                                    80
                                );

                                // ================= TABLE PDF =================
                                doc.autoTable({
                                    startY: 100,
                                    head: [[
                                        "No",
                                        "Kode",
                                        "Material Name",
                                        "Qty",
                                        "UOM",
                                        "Purchase Price",
                                        "Average",
                                        "Supplier",
                                        "Purchase Date"
                                    ]],

                                    body: rows,
                                    theme: "grid",
                                    styles: {
                                        fontSize: 9
                                    },
                                    headStyles: {
                                        fillColor: [255, 193, 7]
                                    }
                                });

                                // ================= NAMA FILE PDF =================
                                let fileName = "Purchase Order";

                                const bulan = [
                                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                                ];

                                if (startDate && endDate) {

                                    // Format input date = YYYY-MM-DD
                                    const [startYear, startMonth, startDay] = startDate.split("-");
                                    const [endYear, endMonth, endDay] = endDate.split("-");

                                    // Jika bulan & tahun sama
                                    if (startMonth === endMonth && startYear === endYear) {

                                        fileName += ` ${bulan[parseInt(startMonth, 10) - 1]} ${startYear}`;

                                    }

                                    // Jika tahun sama tetapi beda bulan
                                    else if (startYear === endYear) {

                                        fileName += ` ${bulan[parseInt(startMonth, 10) - 1]} - ${bulan[parseInt(endMonth, 10) - 1]} ${startYear}`;

                                    }

                                    // Jika beda tahun
                                    else {

                                        fileName += ` ${startDay}-${startMonth}-${startYear}`;
                                        fileName += ` s.d. `;
                                        fileName += `${endDay}-${endMonth}-${endYear}`;

                                    }

                                } else {

                                    // Jika tidak memakai filter
                                    const today = new Date();

                                    fileName += ` ${bulan[today.getMonth()]} ${today.getFullYear()}`;
                                }

                                // ================= SAVE PDF =================
                                doc.save(`${fileName}.pdf`);
                            }

                            // ================= GLOBAL =================
                            window.printPurchasePDF = printPurchasePDF;

                            /* ================= PRODUKSI ================= */
                            function toggleProduksi() {
                                const menu = document.getElementById("produksiSubMenu");
                                menu.style.display = (menu.style.display === "block") ? "none" : "block";
                            }

                            function showProduksi(type) {

                                document.querySelectorAll(".produksi-subpage")
                                    .forEach(el => el.style.display = "none");

                                let targetId = "";

                                /* ================= WASTE FG ================= */
                                if (type === "waste_fg") {
                                    targetId = "produksi_waste_fg";
                                    document.getElementById(targetId).innerHTML = `
                                    <h4>Waste Finished Goods</h4>
                                    <table class="table table-light table-striped">
                                        <thead>
                                            <tr>
                                                <th>Produk</th>
                                                <th>Qty Waste</th>
                                                <th>Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody id="wasteFGList"></tbody>
                                    </table>
                                `;

                                    loadWasteFG();
                                }

                            }

                            /* ================= DROPDOWN PRODUK ================= */
                            async function loadProductionProducts() {
                                const q = query(collection(dbRead, "products"), orderBy("code", "asc"));

                                initProductionFilter();

                                const snap = await getDocs(q);
                                const select = document.getElementById("prodProduct");
                                if (!select) return;
                                let html = `<option value="">Select Product</option>`;
                                snap.forEach(d => {
                                    const data = d.data();
                                    html += `<option value="${data.code}">${data.name}</option>`;
                                });
                                select.innerHTML = html;

                                await loadProductionListData();
                            }


                            /* ================= SAVE PRODUKSI ================= */
                            async function saveProduction() {
                                const productCode = document.getElementById("prodProduct").value;
                                const qty = Number(document.getElementById("prodQty").value);
                                const date = document.getElementById("prodDate").value;
                                if (!productCode || !qty || !date) {
                                    alert("Lengkapi data");
                                    return;
                                }

                                const snap = await getDocs(collection(dbRead, "products"));
                                let productName = "";
                                snap.forEach(d => {
                                    if (d.data().code === productCode) {
                                        productName = d.data().name;
                                    }
                                });
                                const code = await generateCode("production_orders", "PRD");
                                await addDoc(collection(db, "production_orders"), {
                                    code,
                                    productCode,
                                    productName,
                                    qtyProduction: qty,
                                    date,
                                    createdAt: serverTimestamp()
                                });

                                alert("Produksi tersimpan");
                                await loadProductionListData();
                                document.getElementById("prodProduct").value = "";
                                document.getElementById("prodQty").value = "";
                            }

                            /* ================= LIST PRODUKSI ================= */
                            async function loadProductionListData() {

                                const selectedYear = parseInt(document.getElementById("productionYear").value);
                                const snap = await getDocs(collection(db, "production_orders"));
                                let data = [];

                                snap.forEach(doc => {
                                    data.push({
                                        id: doc.id,
                                        ...doc.data()
                                    });
                                });

                                data.sort((a, b) => new Date(a.date) - new Date(b.date));

                                let html = "";
                                data.forEach(d => {

                                    const dateObj = new Date(d.date);
                                    const year = dateObj.getFullYear();

                                    if (year !== selectedYear) return;

                                    html += `
        <tr>
            <td>${d.productCode}</td>
            <td>${d.productName}</td>
            <td>${d.qtyProduction}</td>
            <td>${d.date}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteProduction('${d.id}')">
                    Hapus
                </button>

                <button class="btn btn-info btn-sm"
                    onclick="viewProductionDetail('${d.productCode}','${d.productName}',${d.qtyProduction})">
                    Detail
                </button>
            </td>
        </tr>
        `;
                                });

                                document.getElementById("productionList").innerHTML = html;
                            }

                            function initProductionFilter() {

                                const yearSelect = document.getElementById("productionYear");

                                let html = "";

                                for (let y = 2025; y <= 2075; y++) {
                                    html += `<option value="${y}">${y}</option>`;
                                }

                                yearSelect.innerHTML = html;
                                yearSelect.value = new Date().getFullYear();
                            }

                            async function deleteProduction(id) {
                                if (!confirm("Yakin anda akan Hapus data produksi ini?")) return;
                                await deleteDoc(doc(db, "production_orders", id));
                                await loadProductionListData();
                            }

                            function clearProductionFilter() {
                                document.getElementById("productionDateFrom").value = "";
                                document.getElementById("productionDateTo").value = "";

                                loadProductionListData();
                            }

                            /* ================= HASIL PRODUKSI ================= */
                            async function loadProductionOrdersToResultSelect() {
                                const select = document.getElementById("resProduct");
                                if (!select) return;
                                const snap = await getDocs(
                                    query(collection(db, "production_orders"),
                                        orderBy("code", "asc"))
                                );
                                let html = `<option value="">Select Product</option>`;
                                const added = [];
                                snap.forEach(d => {
                                    const data = d.data();
                                    if (!added.includes(data.productCode)) {
                                        added.push(data.productCode);
                                        html += `
                <option value="${data.productCode}">
                    ${data.productCode} - ${data.productName}
                </option>
            `;
                                    }
                                });

                                select.innerHTML = html;
                            }

                            async function viewProductionDetail(code, name, qtyProd) {
                                forecastSource = "produksi";
                                showPage("productioncogs");
                                document.getElementById("productionCogsTitle").innerHTML =
                                    `COGS Produksi : ${name} | Qty : ${qtyProd}`;
                                const recipeSnap =
                                    await getDocs(collection(dbRead, "product_recipes"));
                                const materialSnap = await getDocs(
                                    query(collection(dbRead, "materials"), orderBy("code", "asc"))
                                );

                                let html = "";
                                let grandTotal = 0;
                                materialSnap.forEach(m => {
                                    const material = m.data();
                                    const recipe = recipeSnap.docs
                                        .map(r => r.data())
                                        .find(r =>
                                            r.productCode === code &&
                                            r.material === material.name
                                        );

                                    if (!recipe) return;
                                    const recipeQty = Number(recipe.qty);
                                    const materialPrice = Number(material.average);
                                    const totalMaterialQty = recipeQty * qtyProd;
                                    const totalCost = totalMaterialQty * materialPrice;

                                    grandTotal += totalCost;

                                    html += `
                <tr>
                    <td>${material.code}</td>
                    <td>${material.name}</td>
                    <td>${material.unit || "-"}</td>
                    <td>${recipeQty}</td>
                    <td>${materialPrice.toLocaleString()}</td>
                    <td>${totalMaterialQty}</td>
                    <td>${totalCost.toLocaleString()}</td>
                </tr>
                `;
                                });

                                document.getElementById("productionCogsTable").innerHTML = html;
                                document.getElementById("productionCogsTotal").innerHTML =
                                    `Rp ${grandTotal.toLocaleString()}`;
                            }

                            function backProduction() {
                                console.log("BACK clicked");
                                showPage('produksi_input');

                                console.log(document.getElementById('produksi'));
                            }

                            function deleteRecipeItem(index) {
                                recipeItems.splice(index, 1);
                                renderRecipeTable();
                            }

                            async function openProductionResult() {
                                showPage('produksi_hasil');

                                await loadProductionOrdersToResultSelect();
                                await loadProductionResult();
                            }
                            async function saveProductionResult() {
                                const productCode = document.getElementById("resProduct").value;
                                const fgPcs = document.getElementById("resFgPcs").value;
                                const fgBox = document.getElementById("resFgBox").value;
                                const date = document.getElementById("resDate").value;

                                if (!productCode || fgPcs === "" || fgBox === "" || !date) {
                                    alert("Lengkapi data");
                                    return;
                                }

                                let productName = "";
                                const prodSnap = await getDocs(collection(dbRead, "products"));

                                prodSnap.forEach(d => {
                                    if (d.data().code === productCode) {
                                        productName = d.data().name;
                                    }
                                });

                                const code = await generateCode("production_results", "FG");

                                await addDoc(collection(db, "production_results"), {
                                    code,
                                    productCode,
                                    productName,
                                    fgPcs: Number(fgPcs),
                                    fgBox: Number(fgBox),
                                    date,
                                    createdAt: serverTimestamp()
                                });

                                alert("Hasil produksi berhasil disimpan");

                                document.getElementById("resFgPcs").value = "";
                                document.getElementById("resFgBox").value = "";

                                loadProductionResult();
                            }

                            async function loadProductionResult() {
                                const start = document.getElementById("prodStartDate").value;
                                const end = document.getElementById("prodEndDate").value;
                                const q = query(
                                    collection(db, "production_results"),
                                    orderBy("date", "asc")
                                );
                                const snap = await getDocs(q);

                                let data = [];
                                snap.forEach(d => {
                                    data.push({ id: d.id, ...d.data() });
                                });

                                if (!start || !end) {
                                    alert("Pilih tanggal filter dulu");
                                    return;
                                }

                                let html = "";
                                data.forEach(d => {

                                    if (start && end) {
                                        const itemDate = new Date(d.date);
                                        const startDate = new Date(start);
                                        const endDate = new Date(end);

                                        if (itemDate < startDate || itemDate > endDate) return;
                                    }

                                    html += `
        <tr>
            <td>${d.productCode}</td>
            <td>${d.productName}</td>
            <td>${d.fgPcs}</td>
            <td>${d.fgBox}</td>
            <td>${d.date}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteProductionResult('${d.id}')">
                    Hapus
                </button>
            </td>
        </tr>
        `;
                                });

                                document.getElementById("productionResultList").innerHTML = html;
                            }


                            async function deleteProductionResult(id) {
                                if (!confirm("Hapus hasil produksi?")) return;
                                await deleteDoc(doc(db, "production_results", id));
                                loadProductionResult();
                            }

                            async function loadWasteFG() {
                                const start = document.getElementById("wasteFgStart").value;
                                const end = document.getElementById("wasteFgEnd").value;
                                const snap = await getDocs(collection(db, "waste_fg"));
                                let html = "";
                                snap.forEach(d => {
                                    const data = d.data();
                                    if (!data.date) return;

                                    if (start && end) {
                                        const itemDate = parseDate(data.date);
                                        const startDate = parseDate(start);
                                        const endDate = parseDate(end);

                                        if (!itemDate) return;
                                        if (itemDate < startDate || itemDate > endDate) return;
                                    }

                                    html += `
        <tr>
            <td>${data.productCode}</td>
            <td>${data.productName}</td>
            <td>${data.qty}</td>
            <td>${data.date}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteWasteFG('${d.id}')">
                    Hapus
                </button>
            </td>
        </tr>
        `;
                                });

                                document.getElementById("wasteFGList").innerHTML = html;
                            }
                            async function loadWasteMaterial() {
                                const start = document.getElementById("wasteMaterialStart").value;
                                const end = document.getElementById("wasteMaterialEnd").value;
                                const snap = await getDocs(collection(db, "waste_material"));
                                let html = "";
                                snap.forEach(d => {
                                    const data = d.data();

                                    if (!data.date) return;

                                    if (start && end) {
                                        const itemDate = parseDate(data.date);
                                        const startDate = parseDate(start);
                                        const endDate = parseDate(end);

                                        if (!itemDate) return;
                                        if (itemDate < startDate || itemDate > endDate) return;
                                    }

                                    html += `
        <tr>
            <td>${data.materialCode}</td>
            <td>${data.materialName}</td>
            <td>${data.qty}</td>
            <td>${data.unit}</td>
            <td>Rp ${Number(data.price).toLocaleString()}</td>
            <td>${data.date}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="deleteWasteMaterial('${d.id}')">
                    Hapus
                </button>
            </td>
        </tr>
        `;
                                });
                                document.getElementById("wasteMaterialList").innerHTML = html;
                            }
                            /* ================= FORECAST PRODUKSI ================= */
                            let forecastProductionData = [];
                            function parseDate(str) {
                                const [y, m, d] = str.split("-").map(Number);
                                return new Date(y, m - 1, d);
                            }

                            function formatBulan(start) {
                                const [y, m] = start.split("-");
                                const bulanNama = [
                                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                                ];

                                return `${bulanNama[parseInt(m) - 1]} ${y}`;
                            }

                            async function viewForecastProduction() {
                                const start = document.getElementById("prodStartDate").value;
                                const end = document.getElementById("prodEndDate").value;

                                if (!start || !end) {
                                    alert("Pilih tanggal filter dulu");
                                    return;
                                }

                                showPage("forecast_production");

                                const recipeSnap = await getDocs(collection(dbRead, "product_recipes"));
                                const materialSnap = await getDocs(collection(dbRead, "materials"));
                                const priceFgSnap = await getDocs(collection(dbRead, "price_fg"));
                                const q = query(
                                    collection(db, "production_results"),
                                    orderBy("date", "asc")
                                );

                                const prodSnap = await getDocs(q);
                                const materialMap = {};
                                let fgHtml = "";

                                const startDate = parseDate(start);
                                const endDate = parseDate(end);

                                prodSnap.forEach(prod => {

                                    const p = prod.data();
                                    const itemDate = parseDate(p.date);

                                    // Filter tanggal
                                    if (itemDate < startDate || itemDate > endDate) return;

                                    // ==========================
                                    // TABEL FINISHED GOODS
                                    // ==========================
                                    fgHtml += `
        <tr>
            <td>${p.productCode}</td>
            <td>${p.productName}</td>
            <td>${Number(p.fgPcs).toLocaleString()}</td>
            <td>${Number(p.fgBox).toLocaleString()}</td>
            <td>${new Date(p.date).toLocaleDateString("id-ID")}</td>
        </tr>
        `;

                                    // ==========================
                                    // HITUNG MATERIAL RECIPE
                                    // ==========================
                                    recipeSnap.forEach(recipe => {

                                        const r = recipe.data();

                                        if (r.productCode !== p.productCode) return;

                                        const material = materialSnap.docs
                                            .map(m => m.data())
                                            .find(m =>
                                                m.name.toLowerCase().trim() ===
                                                r.material.toLowerCase().trim()
                                            );

                                        if (!material) return;

                                        const key = material.code;

                                        const weight =
                                            Number(r.qty || 0) *
                                            Number(p.fgPcs || 0);

                                        const price =
                                            weight *
                                            Number(material.average || 0);

                                        if (!materialMap[key]) {
                                            materialMap[key] = {
                                                code: material.code,
                                                name: material.name,
                                                unit: material.unit,
                                                weight: 0,
                                                price: 0
                                            };
                                        }

                                        materialMap[key].weight += weight;
                                        materialMap[key].price += price;
                                    });

                                    // ==========================
                                    // HITUNG PEMAKAIAN BOX
                                    // ==========================
                                    const productCode = String(p.productCode || "").trim();
                                    const fgBox = Number(p.fgBox || 0);

                                    priceFgSnap.forEach(priceDoc => {

                                        const priceData = priceDoc.data();

                                        if (
                                            String(priceData.productCode || "").trim() !== productCode
                                        ) return;

                                        const boxName = String(priceData.materialName || "").trim();

                                        const boxMaterial = materialSnap.docs
                                            .map(m => m.data())
                                            .find(m =>
                                                String(m.name).trim().toLowerCase() ===
                                                boxName.toLowerCase()
                                            );

                                        if (!boxMaterial) return;

                                        const key = boxMaterial.code;

                                        const weight = fgBox;

                                        const price =
                                            weight *
                                            Number(boxMaterial.average || 0);

                                        if (!materialMap[key]) {
                                            materialMap[key] = {
                                                code: boxMaterial.code,
                                                name: boxMaterial.name,
                                                unit: boxMaterial.unit,
                                                weight: 0,
                                                price: 0
                                            };
                                        }

                                        materialMap[key].weight += weight;
                                        materialMap[key].price += price;
                                    });

                                });

                                // ==========================
                                // TAMPILKAN TABEL FG
                                // ==========================
                                document.getElementById("productionForecastTable").innerHTML = fgHtml;

                                // ==========================
                                // TABEL MATERIAL
                                // ==========================
                                forecastProductionData = Object.values(materialMap);
                                forecastProductionData.sort((a, b) =>
                                    a.code.localeCompare(b.code)
                                );

                                let html = "";
                                let grandTotal = 0;
                                forecastProductionData.forEach(item => {

                                    grandTotal += item.price;

                                    html += `
        <tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.unit}</td>
            <td>${item.weight.toLocaleString()}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
        </tr>
        `;
                                });

                                document.getElementById("forecastProductionTitle").innerHTML =
                                    `Forecast Produksi Bulan ${formatBulan(start)}`;

                                document.getElementById("forecastProductionTable").innerHTML = html;
                                document.getElementById("forecastProductionTotal").innerHTML =
                                    `Rp ${grandTotal.toLocaleString()}`;
                            }

                            window.viewForecastProduction = viewForecastProduction;
                            /* ================= EXPORT PDF ================= */
                            async function exportForecastPDF() {
                                const { jsPDF } = window.jspdf;
                                const doc = new jsPDF("landscape", "pt", "a4");
                                const start = document.getElementById("prodStartDate").value;
                                const bulanNama = [
                                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                                ];
                                const [y, m] = start.split("-");
                                const bulan = `${bulanNama[parseInt(m) - 1]} ${y}`;
                                doc.setFontSize(16);
                                doc.text(
                                    `Forecast Produksi Bulan ${bulan}`,
                                    40,
                                    40
                                );
                                // ==========================
                                // EXPORT TABEL FINISHED GOODS
                                // ==========================
                                doc.setFontSize(12);
                                doc.text(
                                    "Finished Goods Production",
                                    40,
                                    70
                                );
                                doc.autoTable({
                                    html: "#finishedGoodsForecastTable",
                                    startY: 85,
                                    theme: "grid",
                                    headStyles: {
                                        fillColor: [52, 58, 64]
                                    }
                                });
                                // ==========================
                                // EXPORT TABEL MATERIAL
                                // ==========================
                                let nextY = doc.lastAutoTable.finalY + 40;
                                doc.text(
                                    "Material Forecast",
                                    40,
                                    nextY
                                );
                                doc.autoTable({
                                    html: "#materialForecastTable",
                                    startY: nextY + 15,
                                    theme: "grid",
                                    headStyles: {
                                        fillColor: [52, 58, 64]
                                    }
                                });

                                // ==========================
                                // TOTAL
                                // ==========================
                                const totalText =
                                    document.getElementById("forecastProductionTotal").innerText;
                                doc.setFontSize(14);
                                doc.text(
                                    `Total Forecast : ${totalText}`,
                                    40,
                                    doc.lastAutoTable.finalY + 30
                                );
                                doc.save(
                                    `Forecast-Produksi-${bulan}.pdf`
                                );
                            }
                            window.exportForecastPDF = exportForecastPDF;

                            /* =========================================================
                            WASTE FG
                            ========================================================= */
                            async function openWasteFGPage() {
                                showPage("produksi_waste_fg");
                                const select = document.getElementById("wasteFgProduct");

                                if (!select) return;
                                const snap = await getDocs(
                                    query(
                                        collection(dbRead, "products"),
                                        orderBy("code", "asc")
                                    )
                                );

                                let html = `
                        <option value="">
                            Select Product
                        </option>
                        `;

                                snap.forEach(d => {
                                    const data = d.data();
                                    html += `
                        <option value="${data.code}">
                            ${data.code} - ${data.name}
                        </option>
                        `;
                                });

                                select.innerHTML = html;

                            }
                            async function saveWasteFG() {
                                const productCode = document.getElementById("wasteFgProduct")?.value;
                                const qty = document.getElementById("wasteFgQty")?.value;
                                const date = document.getElementById("wasteFgDate")?.value;

                                if (!productCode || !qty || !date) {
                                    alert("Lengkapi data");
                                    return;
                                }
                                let productName = "";
                                const snap = await getDocs(
                                    collection(db, "products")
                                );
                                snap.forEach(d => {

                                    if (d.data().code === productCode) {
                                        productName = d.data().name;
                                    }
                                });
                                await addDoc(
                                    collection(db, "waste_fg"),
                                    {
                                        productCode,
                                        productName,
                                        qty: Number(qty),
                                        date,
                                        createdAt: serverTimestamp()
                                    }
                                );

                                alert("Waste FG berhasil disimpan");
                                document.getElementById("wasteFgQty").value = "";
                                document.getElementById("wasteFgDate").value = "";
                                loadWasteFGTable();
                            }
                            async function loadWasteFGTable() {

                                const start = document.getElementById("wasteFgStart").value;
                                const end = document.getElementById("wasteFgEnd").value;
                                const tbody = document.getElementById("wasteFGList");

                                if (!start || !end) {
                                    tbody.innerHTML = "";
                                    document.getElementById("wasteFgTotal").innerHTML = "Total Waste FG : 0";
                                    return;
                                }

                                const snap = await getDocs(collection(db, "waste_fg"));

                                let data = [];
                                snap.forEach(d => {
                                    data.push({ id: d.id, ...d.data() });
                                });

                                let html = "";
                                let totalWaste = 0;

                                const startDate = new Date(start);
                                const endDate = new Date(end);
                                data.forEach(d => {

                                    const itemDate = new Date(d.date);

                                    if (itemDate < startDate || itemDate > endDate) return;
                                    totalWaste += Number(d.qty || 0);

                                    html += `
<tr>
    <td>${d.productCode}</td>
    <td>${d.productName}</td>
    <td>${d.qty}</td>
    <td>${d.date}</td>
    <td>
        <button class="btn btn-danger btn-sm"
            onclick="deleteWasteFG('${d.id}')">
            Hapus
        </button>
    </td>
</tr>
`;
                                });

                                tbody.innerHTML = html;

                                document.getElementById("wasteFgTotal").innerHTML =
                                    `Total Waste FG : ${totalWaste}`;
                            }

                            async function deleteWasteFG(id) {
                                if (!confirm("Hapus waste FG ?")) return;
                                await deleteDoc(
                                    doc(db, "waste_fg", id)
                                );

                                loadWasteFGTable();

                            }

                            /* ================= MARKETING CODE ================= */
                            function toggleMarketing() {
                                const menu = document.getElementById("marketingSubMenu");
                                if (!menu) return;
                                menu.style.display = (menu.style.display === "block") ? "none" : "block";
                            }
                            /* ================= STORE CODE ================= */
                            async function generateStoreCode() {
                                const snap = await getDocs(
                                    query(collection(db, "stores"), orderBy("code", "desc"))
                                );
                                if (snap.empty) return "ST001";
                                const last = snap.docs[0].data().code;
                                const num = parseInt(last.replace("ST", "")) + 1;
                                return "ST" + String(num).padStart(3, "0");
                            }

                            /* SET STORE CODE INPUT */
                            async function setStoreCode() {
                                const el = document.getElementById("storeCode");
                                if (!el) return;

                                el.value = await generateStoreCode();
                            }

                            /* SAVE STORE */
                            async function saveStore() {
                                const code = document.getElementById("storeCode").value;
                                const name = document.getElementById("storeName").value;
                                const address = document.getElementById("storeAddress").value;
                                const phone = document.getElementById("storePhone").value;

                                if (!name || !address || !phone) {
                                    alert("Lengkapi data toko");
                                    return;
                                }

                                await addDoc(collection(db, "stores"), {
                                    code,
                                    name,
                                    address,
                                    phone,
                                    createdAt: serverTimestamp()
                                });

                                alert("Toko berhasil disimpan");

                                await loadStores();
                                await setStoreCode();
                                document.getElementById("storeName").value = "";
                                document.getElementById("storeAddress").value = "";
                                document.getElementById("storePhone").value = "";
                            }

                            /* LOAD STORES */
                            async function loadStores() {
                                const snap = await getDocs(collection(db, "stores"));
                                let data = [];
                                snap.forEach(d => {
                                    data.push({ id: d.id, ...d.data() });
                                });

                                data.sort((a, b) => {
                                    const numA = parseInt(a.code.replace("ST", ""));
                                    const numB = parseInt(b.code.replace("ST", ""));
                                    return numA - numB;
                                });

                                let html = "";

                                data.forEach(d => {
                                    html += `
<tr>
    <td>${d.code}</td>
    <td>${d.name}</td>
    <td>${d.address}</td>
    <td>${d.phone}</td>
    <td>
        <button class="btn btn-danger btn-sm w-100"
            onclick="deleteStore('${d.id}')">
            Hapus
        </button>
    </td>
</tr>
`;
                                });

                                document.getElementById("storeList").innerHTML = html;
                                await setStoreCode();
                            }

                            /* DELETE STORE */
                            async function deleteStore(id) {
                                if (!confirm("Yakin anda akan Hapus data store ini?")) return;
                                await deleteDoc(doc(db, "stores", id));
                                await loadStores();
                                alert("Data Store berhasil dihapus");
                            }

                            /* =========================================================
                                    SALES FINISH GOOD
                            ========================================================= */
                            let salesFGRowIndex = 0;
                            /* OPEN PAGE */
                            async function openSalesFGPage() {
                                showPage("salesFinishGood");
                                await loadSalesFGStores();

                                document.getElementById("salesFGTable").innerHTML = "";
                                await addSalesFGRow();
                            }

                            /* LOAD STORE */
                            async function loadSalesFGStores() {
                                const q = query(collection(db, "stores"), orderBy("code", "asc"));
                                const snap = await getDocs(q);
                                let html = `<option value="">Select Store</option>`; snap.forEach(doc => {

                                    const d = doc.data();

                                    html += `
<option value="${d.code}">
    ${d.code} - ${d.name}
</option>
`;
                                });

                                document.getElementById(
                                    "salesFGStore"
                                ).innerHTML = html;
                            }

                            /* ADD ROW */
                            async function addSalesFGRow() {
                                salesFGRowIndex++;
                                const rowId = `salesfgrow${salesFGRowIndex}`;
                                const q = query(collection(dbRead, "price_fg"), orderBy("productCode", "asc"));
                                const productSnap = await getDocs(q);

                                let productOptions = `<option value="">Select Product</option>`; productSnap.forEach(doc => {

                                    const d = doc.data();

                                    productOptions += `
<option value="${d.productCode}">
    ${d.productCode} - ${d.productName}
</option>
`;
                                });

                                const html = `
<tr id="${rowId}">
    <td>
        <select class="form-control salesfg-product"
            onchange="setSalesFGPrice(this)">
            ${productOptions}
        </select>
    </td>
    <td>
        <input type="number"
            class="form-control salesfg-box"
            value="0"
            oninput="calculateSalesFGTotal(this)">
    </td>
    <td>
        <input type="number"
            class="form-control salesfg-pcs auto-field"
            value="0"
            readonly>
    </td>
    <td>
        <input type="text"
            class="form-control salesfg-price auto-field"
            value="Rp. 0"
            readonly>
    </td>
    <td>
        <input type="text"
            class="form-control salesfg-total auto-field"
             value="Rp. 0"
            readonly>
    </td>
    <td>
        <button class="btn btn-danger btn-sm"
            onclick="removeSalesFGRow('${rowId}')">
            Hapus
        </button>
    </td>
</tr>
`;

                                document.getElementById(
                                    "salesFGTable"
                                ).insertAdjacentHTML(
                                    "beforeend",
                                    html
                                );
                            }

                            /* REMOVE ROW */
                            function removeSalesFGRow(id) {
                                const el =
                                    document.getElementById(id);
                                if (el) el.remove();
                            }

                            /* SET PRICE */
                            async function setSalesFGPrice(selectEl) {
                                const row = selectEl.closest("tr");
                                const productCode = selectEl.value;
                                const priceInput = row.querySelector(".salesfg-price");
                                const snap = await getDocs(collection(dbRead, "price_fg"));

                                let price = 0;
                                let qtyPerBox = 0;

                                snap.forEach(doc => {
                                    const data = doc.data();

                                    if (data.productCode === productCode) {
                                        price = Number(data.price || 0);
                                        qtyPerBox = Number(data.qtyPerBox || 0);
                                    }
                                });

                                // simpan qtyPerBox di row
                                row.dataset.qtyPerBox = qtyPerBox;
                                /* AUTO SET PRICE */
                                priceInput.value = price;
                                /* AUTO HITUNG TOTAL */
                                calculateSalesFGTotal(row.querySelector(".salesfg-box"));
                            }

                            /* CALCULATE TOTAL */
                            function calculateSalesFGTotal(inputEl) {

                                const row = inputEl.closest("tr");

                                const qtyBox = Number(row.querySelector(".salesfg-box").value || 0);
                                const price = Number(row.querySelector(".salesfg-price").value || 0);

                                // AMBIL qtyPerBox yang disimpan saat pilih produk
                                const qtyPerBox = Number(row.dataset.qtyPerBox || 0);

                                // Hitung Qty PCS otomatis
                                const qtyPcs = qtyBox * qtyPerBox;
                                row.querySelector(".salesfg-pcs").value = qtyPcs;

                                // Hitung Total Harga
                                const total = qtyBox * price;
                                row.querySelector(".salesfg-total").value =
                                    "Rp " + total.toLocaleString();
                            }

                            /* SAVE */
                            async function saveSalesFG() {
                                const store = document.getElementById("salesFGStore").value;
                                const date = document.getElementById("salesFGDate").value;
                                if (!store || !date) {
                                    alert("Lengkapi data");
                                    return;
                                }
                                const rows = document.querySelectorAll("#salesFGTable tr");
                                if (rows.length <= 0) {
                                    alert("Tambah produk");
                                    return;
                                }

                                for (const row of rows) {
                                    const productSelect = row.querySelector(".salesfg-product");
                                    const productCode = productSelect.value;
                                    const productName = productSelect.options[productSelect.selectedIndex].text;
                                    const qtyBox = Number(row.querySelector(".salesfg-box").value || 0);
                                    const qtyPcs = Number(row.querySelector(".salesfg-pcs").value || 0);
                                    const price = Number(row.querySelector(".salesfg-price").value || 0); const total = qtyBox * price;

                                    if (!productCode) continue;
                                    await addDoc(
                                        collection(db, "sales_fg"),
                                        {
                                            store,
                                            productCode,
                                            productName,
                                            qtyBox,
                                            qtyPcs,
                                            price,
                                            total,
                                            date,
                                            createdAt: serverTimestamp()
                                        }
                                    );
                                }

                                alert("Sales FG berhasil disimpan");
                                document.getElementById(
                                    "salesFGTable"
                                ).innerHTML = "";
                                addSalesFGRow();
                                loadSalesFGTable();
                            }

                            /* LOAD TABLE SALES FG */
                            async function loadSalesFGTable() {

                                const selectedMonth = parseInt(document.getElementById("salesFGMonth").value);
                                const selectedYear = parseInt(document.getElementById("salesFGYear").value);

                                // ===========================
                                // LOAD MASTER STORE
                                // ===========================
                                const storeSnap = await getDocs(collection(db, "stores"));

                                const storeMap = {};

                                storeSnap.forEach(doc => {
                                    const s = doc.data();

                                    storeMap[s.code] = s.name;
                                });

                                // ===========================
                                // LOAD SALES FG
                                // ===========================
                                const snap = await getDocs(collection(db, "sales_fg"));

                                let data = [];

                                snap.forEach(d => {
                                    data.push({
                                        id: d.id,
                                        ...d.data()
                                    });
                                });

                                // ===========================
                                // SORT BERDASARKAN KODE STORE
                                // ===========================
                                data.sort((a, b) => {

                                    const numA = parseInt((a.store || "").replace("ST", "")) || 0;
                                    const numB = parseInt((b.store || "").replace("ST", "")) || 0;

                                    return numA - numB;
                                });

                                let html = "";
                                let totalFG = 0;

                                data.forEach(d => {

                                    const dateObj = new Date(d.date);

                                    const month = dateObj.getMonth() + 1;
                                    const year = dateObj.getFullYear();

                                    if (month !== selectedMonth || year !== selectedYear) return;

                                    totalFG += Number(d.total || 0);

                                    html += `
<tr>
    <td>${d.productName}</td>
    <td>${d.qtyBox}</td>
    <td>${d.qtyPcs}</td>
    <td>Rp ${Number(d.price).toLocaleString()}</td>
    <td>Rp ${Number(d.total).toLocaleString()}</td>
    <td>${d.date}</td>
    <td>
        <button class="btn btn-danger btn-sm"
            onclick="deleteSalesFG('${d.id}')">
            Hapus
        </button>
    </td>
</tr>
`;
                                });

                                document.getElementById("salesFGList").innerHTML = html;

                                document.getElementById("salesFGTotal").innerHTML =
                                    `Rp ${totalFG.toLocaleString()}`;
                            }

                            /* DELETE */
                            async function deleteSalesFG(id) {

                                if (!confirm("Yakin anda aka Hapus data Finihed Good ini ?")) return;

                                await deleteDoc(
                                    doc(db, "sales_fg", id)
                                );

                                loadSalesFGTable();
                            }
                            function initSalesFGFilter() {
                                const now = new Date();

                                const monthSelect = document.getElementById("salesFGMonth");
                                const yearSelect = document.getElementById("salesFGYear");

                                const months = [
                                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                                ];

                                let mHtml = "";
                                months.forEach((m, i) => {
                                    mHtml += `<option value="${i + 1}">${m}</option>`;
                                });

                                monthSelect.innerHTML = mHtml;
                                monthSelect.value = now.getMonth() + 1;

                                let yHtml = "";
                                for (let y = 2025; y <= 2075; y++) {
                                    yHtml += `<option value="${y}">${y}</option>`;
                                }

                                yearSelect.innerHTML = yHtml;
                                yearSelect.value = now.getFullYear();
                            }

                            /* ================= SALES VALUE ================= */
                            async function openMarketingSales() {
                                showPage("marketing_sales");
                                initSalesFilter();
                                const q = query(collection(db, "stores"), orderBy("code", "asc"));
                                const snap = await getDocs(q);
                                let html = `<option value="">Select Store</option>`;
                                snap.forEach(d => {
                                    const data = d.data();
                                    html += `
<option value="${data.code}">
    ${data.code} - ${data.name}
</option>`;
                                });

                                const select = document.getElementById("salesStore");
                                if (select) select.innerHTML = html;
                                await loadSalesTable();
                            }

                            /* SAVE SALES */
                            async function saveSales() {
                                const storeCode = document.getElementById("salesStore").value;
                                const value = document.getElementById("salesValue").value;
                                const date = document.getElementById("salesDate").value;
                                if (!storeCode || !value || !date) {
                                    alert("Lengkapi data sales");
                                    return;
                                }

                                let storeName = "";
                                const snap = await getDocs(collection(db, "stores"));
                                snap.forEach(d => {
                                    if (d.data().code === storeCode) {
                                        storeName = d.data().name;
                                    }
                                });

                                await addDoc(collection(db, "sales"), {
                                    storeCode,
                                    storeName,
                                    value: Number(value),
                                    date,
                                    createdAt: serverTimestamp()
                                });

                                document.getElementById("salesValue").value = "";
                                document.getElementById("salesDate").value = "";

                                alert("Sales berhasil disimpan");

                                await loadSalesTable();
                                await loadSalesDashboard();
                                await loadDashboardSales();

                            }

                            /* LOAD SALES TABLE (INPUT PAGE) */
                            async function loadSalesTable() {
                                const selectedYear = parseInt(document.getElementById("salesYear").value);
                                const snap = await getDocs(collection(db, "sales"));

                                let data = [];

                                snap.forEach(d => {
                                    data.push({
                                        id: d.id,
                                        ...d.data()
                                    });
                                });

                                // Urutkan berdasarkan tanggal paling lama
                                data.sort((a, b) => new Date(a.date) - new Date(b.date));

                                let html = "";
                                let totalSales = 0;

                                data.forEach(d => {

                                    const year = new Date(d.date).getFullYear();

                                    // Filter hanya tahun
                                    if (year !== selectedYear) return;

                                    totalSales += Number(d.value);

                                    data.sort((a, b) => new Date(a.date) - new Date(b.date));

                                    html += `
        <tr>
            <td>${d.storeCode}</td>
            <td>${d.storeName}</td>
            <td>Rp ${Number(d.value).toLocaleString()}</td>
            <td>${d.date}</td>
            <td>
                <button class="btn btn-danger btn-sm w-100"
                    onclick="deleteSales('${d.id}')">
                    Hapus
                </button>
            </td>
        </tr>`;
                                });

                                document.getElementById("salesList").innerHTML = html;

                                document.getElementById("salesTotal").innerHTML =
                                    `Rp ${totalSales.toLocaleString()}`;
                            }

                            function initSalesFilter() {

                                const yearSelect = document.getElementById("salesYear");

                                let html = "";

                                for (let y = 2025; y <= 2075; y++) {
                                    html += `<option value="${y}">${y}</option>`;
                                }

                                yearSelect.innerHTML = html;
                                yearSelect.value = new Date().getFullYear();
                            }


                            /* DELETE SALES */
                            async function deleteSales(id) {
                                if (!confirm("Yakin anad akan Hapus Data Sales ini ?")) return;
                                await deleteDoc(doc(db, "sales", id));
                                await loadSalesTable();
                                await loadSalesReport();
                                alert("Sales berhasil dihapus");
                            }

                            /* =========================================================
                             TABEL DATA SUMMARY SALES REPORT
                            ========================================================= */
                            async function loadSalesReport() {
                                const start = document.getElementById("salesStartDate").value;
                                const end = document.getElementById("salesEndDate").value;

                                // BELUM PILIH TANGGAL
                                if (!start || !end) {
                                    document.getElementById("salesReportList").innerHTML = "";

                                    const totalEl = document.getElementById("salesReportTotal");
                                    if (totalEl) {
                                        totalEl.innerHTML = "Total Sales: Rp 0";
                                    }

                                    return;
                                }
                                const snap = await getDocs(collection(db, "sales"));
                                let data = [];
                                snap.forEach(d => {
                                    data.push({ id: d.id, ...d.data() });
                                });

                                data.sort((a, b) => new Date(a.date) - new Date(b.date));

                                let html = "";
                                let total = 0;

                                data.forEach(d => {

                                    // filter tanggal (tetap kamu pakai)
                                    if (start && end) {
                                        const itemDate = new Date(d.date);
                                        const startDate = new Date(start);
                                        const endDate = new Date(end);

                                        if (itemDate < startDate || itemDate > endDate) return;
                                    }

                                    total += Number(d.value);

                                    html += `
<tr>
    <td>${d.storeCode}</td>
    <td>${d.storeName}</td>
    <td>Rp ${Number(d.value).toLocaleString()}</td>
    <td>${d.date}</td>
</tr>
`;
                                });

                                document.getElementById("salesReportList").innerHTML = html;
                                const totalEl = document.getElementById("salesReportTotal");
                                if (totalEl) {
                                    totalEl.innerHTML = `Total Sales: Rp ${total.toLocaleString()}`;
                                }
                            }

                            async function exportSalesPDF() {

                                const start = document.getElementById("salesStartDate").value;
                                const end = document.getElementById("salesEndDate").value;

                                if (!start || !end) {
                                    alert("Pilih Start Date dan End Date terlebih dahulu");
                                    return;
                                }

                                const { jsPDF } = window.jspdf;
                                const pdf = new jsPDF("p", "mm", "a4");

                                pdf.setFontSize(16);
                                pdf.text("Report Sales Prema Rasa", 14, 15);

                                pdf.setFontSize(10);
                                pdf.text(`Periode : ${start} - ${end}`, 14, 22);

                                pdf.autoTable({
                                    html: "#salesReportExportTable",
                                    startY: 30,
                                    theme: "grid",
                                    styles: {
                                        fontSize: 9
                                    },
                                    headStyles: {
                                        fillColor: [255, 193, 7],
                                        textColor: 0,
                                        fontStyle: "bold"
                                    }
                                });

                                const totalSales = document.getElementById("salesReportTotal").innerText;

                                pdf.setFontSize(11);
                                pdf.text(totalSales, 14, pdf.lastAutoTable.finalY + 10);

                                pdf.save(`Report_Sales_${start}_${end}.pdf`);
                            }

                            /* =========================================================
                            ACCOUNTING
                            ========================================================= */
                            function toggleAccounting() {

                                const menu = document.getElementById("accountingSubMenu");
                                if (!menu) {
                                    console.error("accountingSubMenu tidak ditemukan");
                                    return;
                                }

                                const isHidden = getComputedStyle(menu).display === "none";
                                menu.style.display = isHidden ? "block" : "none";
                            }

                            /* ================================================= */
                            /* ==========FUNCTION OPEN REPORT ACCOUNTING======= */
                            /* ================================================= */
                            let currentReport = "";

                            function openAccountingReport() {
                                showPage("accounting_report");
                            }

                            window.openAccountingReport = openAccountingReport;
                            function openReport(type) {
                                currentReport = type;

                                document.getElementById("productionReportArea").style.display =
                                    type === "production" ? "block" : "none";

                                document.getElementById("cogsReportArea").style.display =
                                    type === "cogs" ? "block" : "none";

                                document.getElementById("generalReportArea").style.display =
                                    (type === "production" || type === "cogs")
                                        ? "none"
                                        : "block";

                                // set judul report
                                const title = document.getElementById("reportTitle");

                                if (type === "purchasing") {
                                    title.innerHTML = "Purchasing Report";
                                    document.getElementById("reportSubTitle").innerHTML =
                                        "Purchase Order Raw Material";
                                }

                                else if (type === "production") {
                                    title.innerHTML = "Production Report";
                                }

                                else if (type === "cogs") {
                                    title.innerHTML = "COGS Report";

                                }

                                else if (type === "profitloss") {
                                    title.innerHTML = "Profit & Loss Report";
                                }

                                // pindah halaman detail report
                                showPage("report_detail");
                            }

                            function backToReportMenu() {
                                showPage("accounting_report");

                                // reset table
                                document.getElementById("reportHead").innerHTML = "";
                                document.getElementById("reportBody").innerHTML = "";
                            }

                            function loadSelectedReport() {
                                if (currentReport === "purchasing") {
                                    loadPurchasingReport();
                                }
                                else if (currentReport === "production") {
                                    loadProductionReport();
                                }
                                else if (currentReport === "cogs") {
                                    loadCOGSReport();
                                }
                                else if (currentReport === "profitloss") {
                                    loadProfitLossReport();
                                }
                            }

                            // =======================================================
                            // ========== FUNCTION REPORT PRODUCTION DATA =============
                            // =======================================================
                            async function loadProductionReport() {

                                const start = document.getElementById("reportStartDate").value;
                                const end = document.getElementById("reportEndDate").value;

                                if (!start || !end) {
                                    alert("Pilih Start Date dan End Date");
                                    return;
                                }
                                const fgTable = document.getElementById("productionFGTable");
                                const materialTable = document.getElementById("productionMaterialTable");
                                fgTable.innerHTML = "";
                                materialTable.innerHTML = "";

                                try {

                                    // ================= LOAD DATA =================
                                    const prodSnap = await getDocs(collection(db, "production_results"));
                                    const recipeSnap = await getDocs(collection(dbRead, "product_recipes"));
                                    const materialSnap = await getDocs(collection(dbRead, "materials"));
                                    // ================= GROUP FG =================
                                    let fgMap = {};
                                    prodSnap.forEach(docu => {
                                        const prod = docu.data();
                                        // FILTER DATE
                                        if (prod.date < start || prod.date > end)
                                            return;

                                        const key = prod.productCode;
                                        if (!fgMap[key]) {

                                            fgMap[key] = {
                                                productCode: prod.productCode,
                                                productName: prod.productName,
                                                qty: 0,
                                                qtyPerBox: prod.fgBox,
                                                date: prod.date
                                            };
                                        }

                                        fgMap[key].qty += Number(
                                            prod.fgPcs || 0
                                        );
                                    });

                                    // ================= RENDER FG =================
                                    Object.values(fgMap)
                                        .sort((a, b) =>
                                            a.productCode.localeCompare(
                                                b.productCode
                                            )
                                        )
                                        .forEach(item => {

                                            fgTable.innerHTML += `
                <tr>
                    <td>${item.productCode}</td>
                    <td>${item.productName}</td>
                    <td>${item.qty}</td>
                    <td>${item.qtyPerBox}</td>
                    <td>${item.date}</td>
                </tr>
            `;
                                        });


                                    // ================= MATERIAL USAGE =================
                                    let materialUsage = {};
                                    let totalUsageValue = 0;
                                    // ================= LOAD PRICE FG UNTUK BOX =================
                                    const priceFgSnap =
                                        await getDocs(
                                            collection(dbRead, "price_fg")
                                        );
                                    // ================= MATERIAL DARI RECIPE =================
                                    for (const fg of Object.values(fgMap)) {
                                        const recipes =
                                            recipeSnap.docs
                                                .map(d => d.data())
                                                .filter(r =>
                                                    String(r.productCode).trim()
                                                    === String(fg.productCode).trim()
                                                );


                                        for (const recipe of recipes) {
                                            const material =
                                                materialSnap.docs
                                                    .map(d => d.data())
                                                    .find(m =>
                                                        String(m.name).trim().toLowerCase()
                                                        === String(recipe.material).trim().toLowerCase()
                                                    );


                                            if (!material) continue;
                                            const materialPrice = Number(material.average || 0);
                                            const usedQty = Number(recipe.qty || 0) * Number(fg.qty || 0);
                                            const usageValue = usedQty * materialPrice;

                                            totalUsageValue += usageValue;
                                            if (!materialUsage[material.code]) {
                                                materialUsage[material.code] = {
                                                    code: material.code,
                                                    name: material.name,
                                                    unit: material.unit,
                                                    qty: 0,
                                                    average: materialPrice,
                                                    value: 0

                                                };

                                            }
                                            materialUsage[material.code].qty += usedQty;
                                            materialUsage[material.code].value += usageValue;
                                        }
                                    }

                                    // ================= MATERIAL BOX DARI HASIL PRODUKSI =================
                                    prodSnap.forEach(prodDoc => {
                                        const prod = prodDoc.data();
                                        if (
                                            prod.date < start ||
                                            prod.date > end
                                        ) return;
                                        const productCode = String(prod.productCode || "").trim();
                                        const fgBox = Number(prod.fgBox || 0);

                                        priceFgSnap.forEach(priceDoc => {
                                            const price =
                                                priceDoc.data();
                                            if (

                                                String(price.productCode || "").trim()
                                                === productCode

                                            ) {

                                                const boxName =
                                                    String(price.materialName || "").trim();
                                                const boxMaterial =
                                                    materialSnap.docs
                                                        .map(d => d.data())
                                                        .find(m =>
                                                            String(m.name).trim().toLowerCase()
                                                            === boxName.toLowerCase()
                                                        );

                                                if (!boxMaterial) return;
                                                const boxPrice = Number(boxMaterial.average || 0);
                                                const boxValue = fgBox * boxPrice;

                                                totalUsageValue += boxValue;
                                                if (!materialUsage[boxMaterial.code]) {
                                                    materialUsage[boxMaterial.code] = {

                                                        code: boxMaterial.code,
                                                        name: boxMaterial.name,
                                                        unit: boxMaterial.unit,
                                                        qty: 0,
                                                        average: boxPrice,
                                                        value: 0

                                                    };

                                                }
                                                materialUsage[boxMaterial.code].qty += fgBox;
                                                materialUsage[boxMaterial.code].value += boxValue;
                                            }
                                        });
                                    });

                                    // ================= RENDER MATERIAL =================
                                    Object.values(materialUsage)
                                        .sort((a, b) =>
                                            a.code.localeCompare(
                                                b.code,
                                                undefined,
                                                {
                                                    numeric: true,
                                                    sensitivity: "base"
                                                }
                                            )
                                        )
                                        .forEach(mat => {

                                            materialTable.innerHTML += `
                                <tr>
                                    <td>${mat.code}</td>
                                    <td>${mat.name}</td>
                                    <td>${mat.unit}</td>
                                    <td>${mat.qty.toFixed(2)}</td>
                                    <td>Rp ${mat.average.toLocaleString("id-ID")}</td>
                                    <td>Rp ${mat.value.toLocaleString("id-ID")}</td>
                                </tr>
                            `;
                                        });

                                    // TOTAL ROW
                                    materialTable.innerHTML += `
                                <tr class="table-warning text-dark fw-bold">
                                    <td colspan="5" class="text-end">
                                        TOTAL USAGE VALUE
                                    </td>
                                    <td>
                                        Rp ${totalUsageValue.toLocaleString("id-ID")}
                                    </td>
                                </tr>
                            `;
                                }
                                catch (error) {
                                    console.error(
                                        "Error load production report:",
                                        error
                                    );
                                    alert(
                                        "Gagal load Production Report"
                                    );
                                }
                            }

                            // ========= EXPORT PRODUCTION PDF ============
                            async function exportProductionPDF() {
                                const start =
                                    document.getElementById("reportStartDate").value;
                                const end =
                                    document.getElementById("reportEndDate").value;
                                // =========================
                                // VALIDASI DATE
                                // =========================
                                if (!start || !end) {
                                    alert(
                                        "Pilih Start Date dan End Date terlebih dahulu"
                                    );
                                    return;
                                }
                                const { jsPDF } = window.jspdf;
                                const pdf = new jsPDF(
                                    "l",
                                    "mm",
                                    "a4"
                                );
                                // =========================
                                // TITLE
                                // =========================
                                pdf.setFontSize(16);
                                pdf.text(
                                    "Production Report",
                                    14,
                                    15
                                );
                                pdf.setFontSize(10);
                                pdf.text(
                                    `Period : ${start} - ${end}`,
                                    14,
                                    22
                                );
                                // =========================
                                // FINISHED GOODS
                                // =========================
                                pdf.text(
                                    "Finished Goods Production",
                                    14,
                                    32
                                );
                                pdf.autoTable({
                                    html: "#productionFGExportTable",
                                    startY: 38,
                                    theme: "grid",
                                    styles: {
                                        fontSize: 8
                                    },
                                    headStyles: {
                                        fillColor: [40, 167, 69],
                                        textColor: 255,
                                        fontStyle: "bold"
                                    }
                                });
                                // =========================
                                // MATERIAL USAGE
                                // =========================
                                let y =
                                    pdf.lastAutoTable.finalY + 15;
                                pdf.text(
                                    "Material Usage",
                                    14,
                                    y
                                );
                                pdf.autoTable({
                                    html: "#productionMaterialExportTable",
                                    startY: y + 5,
                                    theme: "grid",
                                    styles: {
                                        fontSize: 8
                                    },
                                    headStyles: {
                                        fillColor: [255, 193, 7],
                                        textColor: 0,
                                        fontStyle: "bold"
                                    }
                                });
                                // =========================
                                // SAVE
                                // =========================
                                pdf.save(
                                    `Production_Report_${start}_${end}.pdf`
                                );

                            }


                            /* ================= INIT ================= */
                            function loadAll() {
                                loadUnits();
                                loadSuppliers();
                                loadMaterials();
                                loadPurchases();
                                loadPurchasesData();
                                loadPurchaseOptions();
                                loadProductionProducts();
                                loadProductionListData();
                                loadForecast();
                                loadStores();
                                setStoreCode();
                                initSalesFGFilter();
                                loadSalesFGStores();
                                loadSalesFGTable();
                                loadSalesTable();
                                initDashboard();

                            }

                            window.addEventListener("DOMContentLoaded", async () => {
                                await loadAll();

                            });

                            /* ================= GLOBAL EXPORT ================= */
                            window.login = login;
                            window.logout = logout;
                            window.toggleMaster = toggleMaster;
                            window.showMaster = showMaster;
                            window.showPage = showPage;

                            window.addUnit = addUnit;
                            window.addSupplier = addSupplier;
                            window.addMaterial = addMaterial;

                            window.loadUnits = loadUnits;
                            window.loadSuppliers = loadSuppliers;
                            window.loadMaterials = loadMaterials;
                            window.deleteProduction = deleteProduction;

                            window.deleteUnit = deleteUnit;
                            window.deleteSupplier = deleteSupplier;
                            window.deleteMaterial = deleteMaterial;

                            window.showProductionRecipe = showProductionRecipe;
                            window.addRecipeItem = addRecipeItem;
                            window.saveRecipe = saveRecipe;
                            window.deleteRecipeItem = deleteRecipeItem;
                            window.viewForecast = viewForecast;
                            window.backForecast = backForecast;
                            window.calculateAverage = calculateAverage;
                            window.togglePurchasing = togglePurchasing;
                            window.savePurchase = savePurchase;
                            window.deletePurchase = deletePurchase;
                            window.printPurchasePDF = printPurchasePDF;
                            window.loadPurchases = loadPurchases;
                            window.loadPurchasesData = loadPurchasesData;
                            window.loadPurchaseOptions = loadPurchaseOptions;

                            window.toggleProduksi = toggleProduksi;
                            window.showProduksi = showProduksi;
                            window.saveProduction = saveProduction;
                            window.loadProductionListData = loadProductionListData;
                            window.viewProductionDetail = viewProductionDetail;
                            window.loadProductionProducts = loadProductionProducts;
                            window.backProduction = backProduction;
                            window.clearProductionFilter = clearProductionFilter;

                            window.loadProductionOrdersToResultSelect = loadProductionOrdersToResultSelect;
                            window.saveProductionResult = saveProductionResult;
                            window.loadProductionResult = loadProductionResult;
                            window.deleteProductionResult = deleteProductionResult;

                            window.toggleMarketing = toggleMarketing;
                            window.saveStore = saveStore;
                            window.openMarketingSales = openMarketingSales;
                            window.saveSales = saveSales;
                            window.loadSalesFGTable = loadSalesFGTable;
                            window.loadSalesReport = loadSalesReport;
                            window.deleteStore = deleteStore;
                            window.deleteSales = deleteSales;
                            window.loadSalesTable = loadSalesTable;
                            window.exportSalesPDF = exportSalesPDF;

                            window.openWasteFGPage = openWasteFGPage;
                            window.saveWasteFG = saveWasteFG;
                            window.deleteWasteFG = deleteWasteFG;
                            window.loadWasteFGTable = loadWasteFGTable;

                            window.toggleAccounting = toggleAccounting;

                            window.showPriceProduct = showPriceProduct;
                            window.savePriceFG = savePriceFG;
                            window.loadPriceFGTable = loadPriceFGTable;
                            window.deletePriceFG = deletePriceFG;

                            window.loadPriceFGMaterials = loadPriceFGMaterials;
                            window.calculatePriceFG = calculatePriceFG;

                            window.openSalesFGPage = openSalesFGPage;
                            window.addSalesFGRow = addSalesFGRow;
                            window.saveSalesFG = saveSalesFG;
                            window.deleteSalesFG = deleteSalesFG;
                            window.setSalesFGPrice = setSalesFGPrice;
                            window.calculateSalesFGTotal = calculateSalesFGTotal;
                            window.removeSalesFGRow = removeSalesFGRow;


                            window.openReport = openReport;
                            window.backToReportMenu = backToReportMenu;
                            window.loadSelectedReport = loadSelectedReport;
                            window.loadProductionReport = loadProductionReport;


                            // ==========================
                            // FUNCITON OPEN PAGE ALL
                            // ==========================
                            function showPage(pageId) {
                                document.querySelectorAll(".menu-page").forEach(page => {
                                    page.style.display = "none";
                                });

                                const activePage = document.getElementById(pageId);
                                if (!activePage) {
                                    console.error("Page tidak ditemukan:", pageId);
                                    return;
                                }
                                activePage.style.display = "block";
                                if (pageId === "dashboard") {
                                    refreshDashboard();
                                }
                            }
                            // ==========================
                            // GLOBAL CHART VARIABLES
                            // ==========================
                            let salesChart = null;
                            let productionChart = null;
                            let variantChart = null;
                            let storeChart = null;
                            let dashboardTotalSales = 0;
                            let dashboardTotalProductionCost = 0;

                            //=============================
                            // LOAD FILTER BULAN & TAHUN
                            //=============================
                            function initDashboard() {

                                console.log(document.getElementById("dashMonth"));
                                console.log(document.getElementById("dashYear"));
                                console.log(document.getElementById("dashTotalSales"));
                                console.log(document.getElementById("salesChart"));

                                const month = document.getElementById("dashMonth");
                                const year = document.getElementById("dashYear");

                                month.innerHTML = "";
                                year.innerHTML = "";
                                const monthName = [
                                    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                                monthName.forEach((m, i) => {

                                    month.innerHTML += `
            <option value="${i + 1}">
                ${m}
            </option>
        `;
                                });
                                const now = new Date();
                                for (let y = now.getFullYear() - 3; y <= now.getFullYear() + 2; y++) {
                                    year.innerHTML += `
            <option value="${y}">
                ${y}
            </option>
        `;
                                }
                                month.value = now.getMonth() + 1;
                                year.value = now.getFullYear();

                                month.addEventListener("change", refreshDashboard);
                                year.addEventListener("change", refreshDashboard);
                                refreshDashboard();
                            }
                            //=============================
                            // LOAD DASHBOARD SALES
                            //=============================
                            async function loadDashboardSales() {
                                const month = Number(document.getElementById("dashMonth").value);
                                const year = Number(document.getElementById("dashYear").value);
                                const snap = await getDocs(collection(db, "sales"));
                                let totalSales = 0;
                                let monthlySales = Array(12).fill(0);
                                snap.forEach(doc => {
                                    const d = doc.data();
                                    if (!d.date) return;
                                    const dt = new Date(d.date);
                                    const y = dt.getFullYear();
                                    const m = dt.getMonth() + 1;
                                    // Chart tahunan
                                    if (y === year) {
                                        monthlySales[m - 1] += Number(d.value || 0);
                                    }

                                    // KPI bulan berjalan
                                    if (y === year && m === month) {
                                        totalSales += Number(d.value || 0);
                                    }

                                });

                                document.getElementById("dashTotalSales").innerHTML =
                                    "Rp " + totalSales.toLocaleString("id-ID");

                                dashboardTotalSales = totalSales;

                                document.getElementById("dashTotalSales").innerHTML =
                                    "Rp " + totalSales.toLocaleString("id-ID");

                                const ctx = document.getElementById("salesChart");
                                if (salesChart != null) {
                                    salesChart.destroy();
                                }

                                salesChart = new Chart(ctx, {
                                    type: "line",
                                    data: {
                                        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                        datasets: [{
                                            label: "Sales",
                                            data: monthlySales,
                                            borderColor: "#22c55e",
                                            backgroundColor: "rgba(250,204,21,0.2)",
                                            fill: true,
                                            tension: 0.4,
                                            pointRadius: 3
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            legend: { display: true }
                                        }
                                    }
                                });
                            }

                            //=============================
                            // LOAD DASHBOARD PRODUCTION
                            //=============================
                            async function loadDashboardProduction() {
                                const month = parseInt(document.getElementById("dashMonth").value);
                                const year = parseInt(document.getElementById("dashYear").value);
                                const snap = await getDocs(collection(db, "production_results"));
                                let totalFG = 0;
                                snap.forEach(doc => {
                                    const d = doc.data();
                                    if (!d.date) return;
                                    // Format YYYY-MM-DD
                                    const arr = d.date.split("-");
                                    const itemYear = Number(arr[0]);
                                    const itemMonth = Number(arr[1]);
                                    if (itemYear === year && itemMonth === month) {
                                        totalFG += Number(d.fgPcs || 0);
                                    }
                                });

                                document.getElementById("dashTotalProduction").innerHTML =
                                    totalFG.toLocaleString("id-ID") + " Pcs";

                            }
                            async function loadProductionChart() {
                                const year = Number(document.getElementById("dashYear").value);
                                const snap = await getDocs(collection(db, "production_results"));
                                let monthlyFG = Array(12).fill(0);
                                snap.forEach(doc => {
                                    const d = doc.data();
                                    if (!d.date) return;
                                    const dt = new Date(d.date);
                                    if (dt.getFullYear() === year) {
                                        monthlyFG[dt.getMonth()] += Number(d.fgPcs || 0);
                                    }
                                });

                                const ctx = document.getElementById("productionChart");
                                if (productionChart) {
                                    productionChart.destroy();
                                }
                                productionChart = new Chart(ctx, {
                                    type: "bar",
                                    data: {
                                        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                                        datasets: [{
                                            label: "FG Production",
                                            data: monthlyFG,
                                            backgroundColor: "#22c55e",
                                            borderRadius: 6
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        plugins: {
                                            legend: { display: true }
                                        }
                                    }
                                });
                            }
                            //=============================
                            // LOAD DASHBOARD COST PRODUCTION
                            //=============================
                            async function loadDashboardCostProduction() {

                                const month = Number(document.getElementById("dashMonth").value);
                                const year = Number(document.getElementById("dashYear").value);
                                const prodSnap = await getDocs(collection(db, "production_results"));
                                const recipeSnap = await getDocs(collection(dbRead, "product_recipes"));
                                const materialSnap = await getDocs(collection(dbRead, "materials"));
                                const costSnap = await getDocs(collection(db, "production_cost"));

                                let fgMap = {};
                                let totalCOGS = 0;
                                let totalOverhead = 0;

                                // ===============================
                                // HITUNG TOTAL FG PER PRODUCT
                                // ===============================
                                prodSnap.forEach(doc => {
                                    const prod = doc.data();
                                    if (!prod.date) return;
                                    const dt = new Date(prod.date);
                                    if (
                                        dt.getFullYear() === year &&
                                        (dt.getMonth() + 1) === month
                                    ) {

                                        if (!fgMap[prod.productCode]) {
                                            fgMap[prod.productCode] = {
                                                qty: 0
                                            };
                                        }
                                        fgMap[prod.productCode].qty += Number(prod.fgPcs || 0);
                                    }
                                });

                                // ===============================
                                // HITUNG HPP
                                // ===============================
                                for (const productCode in fgMap) {
                                    const recipes = recipeSnap.docs
                                        .map(doc => doc.data())
                                        .filter(r => r.productCode === productCode);
                                    for (const recipe of recipes) {
                                        const material = materialSnap.docs
                                            .map(doc => doc.data())
                                            .find(m =>
                                                m.name.trim().toLowerCase() ===
                                                recipe.material.trim().toLowerCase()
                                            );

                                        if (!material) continue;
                                        const usedQty =
                                            Number(recipe.qty || 0) *
                                            Number(fgMap[productCode].qty);

                                        totalCOGS +=
                                            usedQty *
                                            Number(material.average || 0);
                                    }
                                }

                                // ===============================
                                // HITUNG OVERHEAD
                                // ===============================
                                costSnap.forEach(doc => {
                                    const cost = doc.data();
                                    if (!cost.date) return;
                                    const dt = new Date(cost.date);
                                    if (
                                        dt.getFullYear() === year &&
                                        (dt.getMonth() + 1) === month
                                    ) {

                                        totalOverhead += Number(cost.value || 0);
                                    }
                                });

                                // ===============================
                                // TOTAL COST PRODUCTION
                                // ===============================
                                dashboardTotalProductionCost = totalCOGS + totalOverhead;

                                document.getElementById("dashTotalCostProduction").innerHTML =
                                    "Rp " + dashboardTotalProductionCost.toLocaleString("id-ID", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    });
                            }
                            //=============================
                            // LOAD DASHBOARD NET PROFIT
                            //=============================
                            function loadDashboardNetProfit() {
                                const nett =
                                    dashboardTotalSales -
                                    dashboardTotalProductionCost;
                                document.getElementById("dashNettProfit").innerHTML =
                                    "Rp " + nett.toLocaleString("id-ID", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    });
                            }

                            //=============================
                            // BEST SELLING PRODUCT
                            //=============================
                            async function loadVariantChart() {
                                const month = Number(document.getElementById("dashMonth").value);
                                const year = Number(document.getElementById("dashYear").value);
                                const snap = await getDocs(collection(db, "sales_fg"));
                                let productMap = {};
                                snap.forEach(doc => {
                                    const d = doc.data();
                                    if (!d.date) return;
                                    const arr = d.date.split("-");
                                    const itemYear = Number(arr[0]);
                                    const itemMonth = Number(arr[1]);

                                    if (
                                        itemYear === year &&
                                        itemMonth === month
                                    ) {

                                        if (!productMap[d.productCode]) {

                                            productMap[d.productCode] = {
                                                name: d.productName,
                                                qty: 0
                                            };
                                        }
                                        productMap[d.productCode].qty += Number(d.qtyPcs || 0);
                                    }
                                });

                                // Urutkan qty terbesar
                                const ranking = Object.values(productMap)
                                    .sort((a, b) => b.qty - a.qty)
                                    .slice(0, 10);

                                const labels = ranking.map(x => x.name);
                                const data = ranking.map(x => x.qty);
                                const ctx = document.getElementById("variantChart");
                                if (variantChart) {
                                    variantChart.destroy();
                                }
                                variantChart = new Chart(ctx, {
                                    type: "doughnut",
                                    data: {
                                        labels: labels,
                                        datasets: [{
                                            data: data,
                                            backgroundColor: [
                                                "#22c55e",
                                                "#fbbf24",
                                                "#f59e0b",
                                                "#eab308",
                                                "#ca8a04"
                                            ],
                                            borderWidth: 1
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        cutout: "60%",
                                        plugins: {
                                            legend: {
                                                display: true
                                            }
                                        }
                                    }
                                });
                            }

                            //=============================
                            // BEST SALES STORE CHART
                            //=============================
                            async function loadStoreChart() {
                                const month = Number(document.getElementById("dashMonth").value);
                                const year = Number(document.getElementById("dashYear").value);
                                const snap = await getDocs(collection(db, "sales"));

                                let storeMap = {};
                                snap.forEach(doc => {
                                    const d = doc.data();

                                    if (!d.date) return;
                                    const dt = new Date(d.date);
                                    const m = dt.getMonth() + 1;
                                    const y = dt.getFullYear();

                                    if (m !== month || y !== year) return;
                                    const key = d.storeName || d.storeCode;

                                    if (!storeMap[key]) {
                                        storeMap[key] = {
                                            name: key,
                                            total: 0
                                        };
                                    }

                                    storeMap[key].total += Number(d.value || 0);
                                });

                                // convert + sort top store
                                const ranking = Object.values(storeMap)
                                    .sort((a, b) => b.total - a.total)
                                    .slice(0, 10);

                                const labels = ranking.map(x => x.name);
                                const data = ranking.map(x => x.total);

                                const ctx = document.getElementById("storeChart");

                                if (storeChart) {
                                    storeChart.destroy();
                                }

                                storeChart = new Chart(ctx, {
                                    type: "pie",   // WAJIB pie
                                    data: {
                                        labels: labels,
                                        datasets: [{
                                            data: data,
                                            backgroundColor: [
                                                "#22c55e",
                                                "#fbbf24",
                                                "#f59e0b",
                                                "#eab308",
                                                "#ca8a04",
                                                "#d97706"
                                            ]
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        cutout: 0,
                                        plugins: {
                                            legend: { display: true },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context) {
                                                        return context.label + " : Rp " +
                                                            context.raw.toLocaleString("id-ID");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                });
                            }

                            async function refreshDashboard() {

                                await loadDashboardSales();
                                await loadDashboardProduction();
                                await loadDashboardCostProduction();
                                loadDashboardNetProfit();
                                await loadProductionChart();
                                await loadVariantChart();
                                await loadStoreChart();
                            }
                            // ==========================
                            // DATE TIME
                            // ==========================
                            function updateDateTime() {
                                const now = new Date();
                                const hariList = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                                const hari = hariList[now.getDay()];
                                const tanggal = now.toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });

                                const jam = now.toLocaleTimeString('id-ID');
                                document.getElementById("hari").innerText = hari;
                                document.getElementById("tanggal").innerText = tanggal;
                                document.getElementById("jam").innerText = jam;
                            }
                            setInterval(updateDateTime, 1000);
                            updateDateTime();
                        </script>
