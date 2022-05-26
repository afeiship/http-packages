# cache
- https://lavas-project.github.io/pwa-book/chapter05/3-respond-strategy.html


## strategy
- Network First，网络优先策略。该策略会优先尝试发送网络请求获取资源，在资源获取成功的同时会复制一份资源缓存到本地，当网络请求失败时再尝试从本地缓存中读取缓存资源。Network First 策略一般适用于对请求的实时性和稳定性有要求的情况。
- Cache First，缓存优先策略。该策略会优先从本地缓存读取资源，读取失败后再发起网络请求，成功获得网络请求响应结果时会将该结果缓存到本地。
- Network Only，仅通过发送正常的网络请求获取资源，并将请求响应结果直接返回。该策略适用于对实时性要求非常高的资源，或者是无需进行缓存的资源。
- Cache Only，仅从缓存中读取资源。这个策略一般需要配合预缓存方案使用。
- Stale While Revalidate，该策略跟 Cache First 策略比较类似，都是优先返回本地缓存的资源。不同的地方在于，Stale While Revalidate 策略无论在缓存读取是否成功的时候都会发送网络请求更新本地缓存。
