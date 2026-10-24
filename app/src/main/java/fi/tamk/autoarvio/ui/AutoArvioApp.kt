package fi.tamk.autoarvio.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.ui.makes.MakeListScreen
import fi.tamk.autoarvio.ui.makes.MakeListViewModel
import fi.tamk.autoarvio.ui.models.ModelListScreen
import fi.tamk.autoarvio.ui.models.ModelListViewModel
import fi.tamk.autoarvio.ui.navigation.Routes
import fi.tamk.autoarvio.ui.splash.SplashScreen

@Composable
fun AutoArvioApp(
    catalogRepository: CatalogRepository = remember { CatalogRepository() },
) {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Routes.SPLASH,
    ) {
        composable(Routes.SPLASH) {
            SplashScreen(
                onFinished = {
                    navController.navigate(Routes.MAKE_LIST) {
                        popUpTo(Routes.SPLASH) { inclusive = true }
                    }
                },
            )
        }
        composable(Routes.MAKE_LIST) {
            val vm: MakeListViewModel = viewModel(
                factory = MakeListViewModel.factory(catalogRepository),
            )
            MakeListScreen(
                viewModel = vm,
                onMakeClick = { make ->
                    navController.navigate(Routes.modelList(make.id))
                },
            )
        }
        composable(
            route = Routes.MODEL_LIST,
            arguments = listOf(navArgument("makeId") { type = NavType.StringType }),
        ) { entry ->
            val makeId = entry.arguments?.getString("makeId").orEmpty()
            val vm: ModelListViewModel = viewModel(
                factory = ModelListViewModel.factory(makeId, catalogRepository),
            )
            ModelListScreen(
                viewModel = vm,
                onBack = { navController.popBackStack() },
            )
        }
    }
}
