import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  result: any = [];
  invoiceList: any = [];
  type = 'PieChart';
  columnNames = ['Browser', 'Percentage'];
  options = {
    pieHole: 0.4
  };
  width = 600;
  height = 350;
  data = [];
  currentYear: any;

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.currentYear = (new Date()).getFullYear();

    this.dashboardService.getDashboardData().subscribe((x: any) => {
      if (x.length > 0) {
        this.result = x;
        this.invoiceList = x[12].Invoice;

        var totalReceivable = parseFloat(x[0].TotalReceivable.replace(/,/g, ""));
        var totalReceivedAmount = parseFloat(x[1].TotalReceivedAmount.replace(/,/g, ""));
        var totalDiscountGiven = parseFloat(x[2].TotalDiscountGiven.replace(/,/g, ""));
        var totalAmountToBeRecovered = parseFloat(x[3].TotalAmountToBeRecovered.replace(/,/g, ""));

        this.data = [
          ['Received Amount %', totalReceivedAmount],
          ['Receivable %', totalReceivable],
          ['Discount Given %', totalDiscountGiven],
          ['Amount to be Recovered %', totalAmountToBeRecovered]
        ];

      }
    });

  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

}
